import { FILE_TYPE, MAX_SIZE } from "@/constants";

export function validateExtension(name) {
  const pdf = new RegExp("([a-zA-Z0-9s_\\.-:])+(.pdf)$");
  const excel = new RegExp("([a-zA-Z0-9s_\\.-:])+(.xls|.xlsx|.csv)$");
  const word = new RegExp("([a-zA-Z0-9s_\\.-:])+(.doc|.docx)$");
  if (excel.test(name.toLowerCase())) {
    return FILE_TYPE.EXCEL;
  } else if (pdf.test(name.toLowerCase())) {
    return FILE_TYPE.PDF;
  } else if (word.test(name.toLowerCase())) {
    return FILE_TYPE.WORD;
  } else {
    return FILE_TYPE.OTHER;
  }
}
export function validateFileSize(file) {
  return file.size > MAX_SIZE;
}
export function validateDuplicate(file, fileList) {
  var result = false;
  fileList.forEach((f) => {
    if (f.name === file.name) {
      result = true;
    } else {
      result = false;
    }
  });
  return result;
}
