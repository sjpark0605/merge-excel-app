import { useState, useEffect } from 'react'
import ExcelField from './ExcelField'
import CommonFieldSelect from './CommonFieldSelect'
import MultiFieldSelect from './MultiFieldSelect'

function Form() {
    const [excelData1, setExcelData1] = useState({header: [], values: []});
    const [excelData2, setExcelData2] = useState({header: [], values: []});
    const [commonHeader, setCommonHeader] = useState([]);

    useEffect(() => {
        const intersection = excelData1["header"].filter(value => excelData2["header"].includes(value));
        setCommonHeader(intersection);
        console.log(intersection)
    }, [excelData1, excelData2])

    return (
        <div className="from-section">
            <form className="row g-3">
                <div className="col-xs-12 col-lg-6">
                    <ExcelField id={1} setExcelData={setExcelData1}/>
                </div>
                <div className="col-xs-12 col-lg-6">
                    <ExcelField id={2} setExcelData={setExcelData2}/>
                </div>
                <div className="col-xs-12 col-lg-6">
                    <CommonFieldSelect options={commonHeader}/>
                </div>
                <div className="col-xs-12 col-lg-6">
                    <MultiFieldSelect headers={excelData2["header"]}/>
                </div>
                <div className="col-12">
                    <button type="submit" className="btn btn-primary">병합</button>
                </div>
            </form>
        </div>
    );
  }
  
  export default Form;
  