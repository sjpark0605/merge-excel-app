import {ExcelRenderer} from 'react-excel-renderer'
import {useState} from 'react'

function ExcelField(props) {

    const [cols, setCols] = useState();
    const [rows, setRows] = useState();

    const fileHandler = (event) => {
        const fileObj = event.target.files[0];

        ExcelRenderer(fileObj, (err, resp) => {
            if (err) {
                console.log(err);
            } else {
                setCols(resp.cols)
                setRows(resp.rows)
            }
        });
    }

    return (
        <div id={"excelField" + props.id}>
            <label htmlFor={"inputExcel" + props.id} className="form-label">병합할 엑셀 {props.id}</label>
            <input type="file" onChange={fileHandler} className="form-control" id={"inputExcel" + props.id} />
        </div>
    );
    
}

export default ExcelField