import { useState } from 'react'

import { MultiSelect } from "react-multi-select-component"

const localization = {
    allItemsAreSelected: "모두 선택됨",
    clearSearch: "검색어 지우기",
    clearSelected: "모두 선택 해제",
    noOptions: "필드값 없음",
    search: "검색",
    selectAll: "모두 선택",
    selectAllFiltered: "모두 선택 (필터)",
    create: "생성"
}

function MultiFieldSelect(props) {

    const [selected, setSelected] = useState([])

    const options = []

    props.headers.forEach((option) => {options.push({label: option, value: option})})

    if (options.length === 0) {
        localization["selectSomeItems"] = "엑셀 2를 불러오세요"
    } else {
        localization["selectSomeItems"] = "열 선택..."
    }

    return (
        <div id="multiSelect">
            <label className="form-label">엑셀 2에서 가져올 열</label>
            <MultiSelect 
                options={options}
                value={selected}
                disableSearch={true}
                overrideStrings={localization}
                onChange={setSelected}
                disabled={options.length === 0}
            />
        </div>
    );
    
}

export default MultiFieldSelect