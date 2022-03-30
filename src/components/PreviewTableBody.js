function PreviewTableBody(props) {

    const renderedRow = []
    props.row.forEach((item, index) => {renderedRow.push(<td key={index}>{item}</td>)})

    return (
        <tr>
            {renderedRow}
        </tr>
    );
    
}

export default PreviewTableBody