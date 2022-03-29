import readXlsxFile from "read-excel-file"
import { utils, writeFile } from "xlsx"

export async function excelToJSON(event) {
    const excelFile = event.target.files[0];

    return await readXlsxFile(excelFile)
    .then((data) => {
        const header = data.shift()

        return {
            header: header,
            values: data
        }
    })
    .catch((error) => alert("엑셀 불러오기 실패: " + error))
}