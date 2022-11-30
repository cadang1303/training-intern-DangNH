const MAX_SIZE = 10485760;

export function validateExtension(name) {
  const pdf = new RegExp("([a-zA-Z0-9s_\\.-:])+(.pdf)$");
  const excel = new RegExp("([a-zA-Z0-9s_\\.-:])+(.xls|.xlsx|.csv)$");
  const word = new RegExp("([a-zA-Z0-9s_\\.-:])+(.doc|.docx)$");
  if (excel.test(name.toLowerCase())) {
    return 1;
  } else if (pdf.test(name.toLowerCase())) {
    return 2;
  } else if (word.test(name.toLowerCase())) {
    return 3;
  } else {
    return 4;
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
