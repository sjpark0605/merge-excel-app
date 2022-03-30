import readXlsxFile from "read-excel-file"
import { utils, writeFile } from "xlsx"

export async function excelToJSON(event) {
    const excelFile = event.target.files[0];

    return await readXlsxFile(excelFile)
    .then((data) => {
        const header = data.shift()

        return {
            header: header,
            values: parseData(header, data)
        }
    })
    .catch((error) => alert("엑셀 불러오기 실패: " + error))
}

function parseData(header, data) {
    const result = {}

    for (let i = 0; i < header.length; i++) {
        result[header[i]] = []
    }

    for (let r = 0; r < data.length; r++) {
        for (let c = 0; c < header.length; c++) {
            const value = data[r][c] === null ? "" : String(data[r][c])
            result[header[c]].push(value)
        }
    }

    return result;
}

export function filterExcel(excel1JSON, excel2JSON, comparator, newHeaders) {
    const result = [combineHeaders(excel1JSON["header"], newHeaders)]

    const excel1Data = excel1JSON["values"]
    const excel2Data = excel2JSON["values"]

    const excel1DataLen = excel1Data[comparator].length

    const targetList = excel1Data[comparator]

    for (let i = 0; i < excel1DataLen; i++) {
        const row = []
        excel1JSON["header"].forEach((header) => {row.push(excel1Data[header][i])})
        const index = excel2Data[comparator].indexOf(targetList[i])
        if (index === -1 || targetList[i] === "") {
            newHeaders.forEach((header) => {row.push("일치하는 값 없음")})
        } else {
            newHeaders.forEach((header) => {row.push(excel2Data[header][index])})
        }
        result.push(row)
    }

    return result
}

function combineHeaders(excel1HeaderList, newHeaderList) {
    const result = []

    excel1HeaderList.forEach((field) => {result.push(field)})
    newHeaderList.forEach((field) => {result.push(field)})

    return result
}

export function createExcel(parsedOutput) {
    const workbook = utils.book_new();
    const worksheet = utils.aoa_to_sheet(parsedOutput);

    utils.book_append_sheet(workbook, worksheet)

    writeFile(workbook, "병합된 엑셀.xlsx")
}