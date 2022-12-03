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
  let list = fileList.filter((f) => {
    return !f.name.includes(file.name);
  });
  if (list.length === fileList.length) {
    result = false;
  } else result = true;
  return result;
}

export function returnFileSize(number) {
  if (number < 1024) {
    return number + "bytes";
  } else if (number >= 1024 && number < 1048576) {
    return (number / 1024).toFixed(2) + "kB";
  } else if (number >= 1048576) {
    return (number / 1048576).toFixed(2) + "MB";
  }
}
