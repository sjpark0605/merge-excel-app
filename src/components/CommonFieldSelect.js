function CommonFieldSelect(props) {

    const options = []
    props.options.forEach((option, index) =>  {
        options.push(<option key={index} value={option}>{option}</option>)
    });

    const defaultOption = options.length === 0 ? "병합할 엑셀들을 불러오세요" : "열을 선택하세요"

    return (
        <div id="commonSelect">
            <label className="form-label">엑셀 1과 비교할 열</label>
            <select defaultValue="default" className="form-select" disabled={options.length === 0}>
                <option value="default" disabled hidden>{defaultOption}</option>
                {options}
            </select>
        </div>
    );
    
}

export default CommonFieldSelect