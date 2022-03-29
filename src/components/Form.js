import { useState, useEffect } from 'react'
import ExcelField from './ExcelField'
import CommonFieldSelect from './CommonFieldSelect'
import MultiFieldSelect from './MultiFieldSelect'
import { filterExcel } from '../utils/helper'

function Form() {
    const [excel1JSON, setExcel1JSON] = useState({header: [], values: []});
    const [excel2JSON, setExcel2JSON] = useState({header: [], values: []});
    const [commonHeader, setCommonHeader] = useState([]);
    const [comparator, setComparator] = useState("");
    const [appendList, setAppendList] = useState([]);

    useEffect(() => {
        const intersection = excel1JSON["header"].filter(value => excel2JSON["header"].includes(value));
        setCommonHeader(intersection);
    }, [excel1JSON, excel2JSON])

    const onSubmitClick = (event) => {
        const appendTargetList = []

        for (let i = 0; i < appendList.length; i++) {
            appendTargetList.push(appendList[i]["value"])
        }

        const result = filterExcel(excel1JSON, excel2JSON, comparator, appendTargetList)
        console.log(result)
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
                    <MultiFieldSelect headers={excel2JSON["header"]} appendList={appendList} setAppendList={setAppendList}/>
                </div>
                <div className="col-12">
                    <button type="button" onClick={onSubmitClick} className="btn btn-primary">병합</button>
                </div>
            </form>
        </div>
    );
  }
  
  export default Form;
  