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
    console.log(data[0][0])

    const result = {}

    for (let i = 0; i < header.length; i++) {
        result[header[i]] = []
    }

    for (let r = 0; r < data.length; r++) {
        for (let c = 0; c < header.length; c++) {
            result[header[c]].push(data[r][c])
        }
    }

    return result;
}

export function filterExcel(excel1JSON, excel2JSON, comparator, appendList) {
    const result = []

    const newHeader = excel1JSON["header"]

    for (let i = 0; i < excel1JSON["header"].length; i++) {
        newHeader.push(excel1JSON["header"][i])
    }

    for (let i = 0; i < appendList; i++) {
        newHeader.push(appendList[i])
    }

    result.push(newHeader)

    for (let i = 0; i < excel1JSON["values"][comparator].length; i++) {
        const data = []

        const target = excel2JSON["values"][comparator].indexOf(excel1JSON["values"][comparator][i])

        console.log(target)

        for (let j = 0; j < excel1JSON["header"].length; j++) {
            data.push(excel1JSON["values"][excel1JSON["header"][j]][i])
        }

        if (target !== -1) {
            for (let j = 0; j < appendList.length; j++) {
                data.push(excel2JSON["values"][appendList[j]][target])
            }
        }

        result.push(data)
    }

    return result;
}

function createExcel(parsedOutput, excelName) {
    const workbook = utils.book_new();
    const worksheet = utils.aoa_to_sheet(parsedOutput);

    utils.book_append_sheet(workbook, worksheet)

    writeFile(workbook, excelName + ".xlsx")
}