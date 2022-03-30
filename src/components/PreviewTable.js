import PreviewTableBody from "./PreviewTableBody"

function PreviewTable(props) {

    const renderedHeader = []
    const renderedRows = []

    if (props.excel.length > 0) {
        const headers = props.excel[0]
        headers.forEach((header, index) => {renderedHeader.push(<th key={index} scope="col">{header}</th>)})
        const rows = props.excel.slice(1)
        console.log(rows)
        rows.forEach((row, index) => {renderedRows.push(<PreviewTableBody key={index} row={row} />)})
    }

    return (
        <div className="table-responsive">
            <table className="table table-bordered">
                <thead>
                    <tr>
                        {renderedHeader}
                    </tr>
                </thead>
                <tbody>
                    {renderedRows}
                </tbody>
            </table>
        </div>
    );
    
}

export default PreviewTable