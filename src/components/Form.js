import { useState, useEffect } from 'react'
import ExcelField from './ExcelField'
import CommonFieldSelect from './CommonFieldSelect'
import MultiFieldSelect from './MultiFieldSelect'
import { createExcel, filterExcel } from '../utils/helper'
import PreviewTable from './PreviewTable'

const generateHeaderList = (appendList) => {
    const result = []
    appendList.forEach(item => {result.push(item["value"])})
    return result
}

function Form() {
    const [excel1JSON, setExcel1JSON] = useState({header: [], values: []});
    const [excel2JSON, setExcel2JSON] = useState({header: [], values: []});
    const [commonHeader, setCommonHeader] = useState([]);
    const [comparator, setComparator] = useState("");
    const [appendList, setAppendList] = useState([]);

    const [mergedExcel, setMergedExcel] = useState([]);

    const [buttonClass, setButtonClass] = useState("btn btn-primary disabled")

    useEffect(() => {
        const intersection = excel1JSON["header"].filter(value => excel2JSON["header"].includes(value));
        setCommonHeader(intersection);
    }, [excel1JSON, excel2JSON])

    useEffect(() => {
        setMergedExcel([])

        if (comparator !== "" && appendList.length !== 0) {
            setButtonClass("btn btn-primary")
        } else {
            setButtonClass("btn btn-primary disabled")
        }
    }, [comparator, appendList])

    const onPreviewClick = (event) => {
        const newHeaders = generateHeaderList(appendList)
        const result = filterExcel(excel1JSON, excel2JSON, comparator, newHeaders)
        setMergedExcel(result.slice(0, 50))
    }

    const onDownloadClick = (event) => {
        const newHeaders = generateHeaderList(appendList)
        const result = filterExcel(excel1JSON, excel2JSON, comparator, newHeaders)
        createExcel(result)
    }

    return (
        <div className="from-section">
            <form className="row g-3">
                <div className="col-xs-12 col-lg-6">
                    <ExcelField id={1} setExcelJSON={setExcel1JSON}/>
                </div>
                <div className="col-xs-12 col-lg-6">
                    <ExcelField id={2} setExcelJSON={setExcel2JSON}/>
                </div>
                <div className="col-xs-12 col-lg-6">
                    <CommonFieldSelect options={commonHeader} setComparator={setComparator}/>
                </div>
                <div className="col-xs-12 col-lg-6">
                    <MultiFieldSelect headers={excel2JSON["header"]} intersection={commonHeader} appendList={appendList} setAppendList={setAppendList}/>
                </div>
                <div id="tableDiv" className="col-12">
                    <PreviewTable excel={mergedExcel}/>
                </div>
                <div className="col-6" id="previewButtonWrapper">
                    <button type="button" onClick={onPreviewClick} className={buttonClass}>50행 미리보기</button>
                </div>
                <div className="col-6" id="downloadButtonWrapper">
                    <button type="button" onClick={onDownloadClick} className={buttonClass}>병합 + 다운로드</button>
                </div>
            </form>
        </div>
    );
  }
  
  export default Form;
  