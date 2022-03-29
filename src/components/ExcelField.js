import { excelToJSON } from '../utils/helper' 

function ExcelField(props) {

    const onFileUpload = (event) => {
        excelToJSON(event).then((data) => {
            props.setExcelJSON(data)
        });
    }

    return (
        <div id={"excelField" + props.id}>
            <label htmlFor={"inputExcel" + props.id} className="form-label">병합할 엑셀 {props.id}</label>
            <input type="file" accept=".xls,.xlsx" onChange={onFileUpload} className="form-control" id={"inputExcel" + props.id} />
        </div>
    );
    
}

export default ExcelField