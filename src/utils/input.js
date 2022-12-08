import { MESSAGE } from "@/constants";

export function validateName(name) {
  if (!name.length) {
    return MESSAGE.REQUIRED;
  } else if (name.length > 100) {
    return MESSAGE.MAX_LENGTH + "100";
  } else return "";
}

export function validateDob(date) {
  const today = new Date();
  date = new Date(date).getTime();
  if (date > today) {
    return MESSAGE.NOT_VALID;
  } else return "";
}

export function validateDesc(desc) {
  if (desc.length > 1000) {
    return MESSAGE.MAX_LENGTH + "1000";
  } else return "";
}

export function validateCompanyList(list) {
  if (!list.length) {
    return MESSAGE.NOT_VALID;
  } else return "";
}

export function validateCompany(company, list) {
  let result = "";
  for (let i = 0; i < list.length; i++) {
    if (list[i].company === company) {
      result = MESSAGE.NOT_VALID;
    }
  }
  return result;
}

export function validateJobName(jobName) {
  if (!jobName.length) {
    return MESSAGE.REQUIRED;
  } else if (jobName.length > 100) {
    return MESSAGE.MAX_LENGTH + "100";
  } else return "";
}

export function validateJobDate(startDate, endDate, list) {
  const today = new Date().getTime();
  let result = "";
  startDate = new Date(startDate).getTime();
  endDate = new Date(endDate).getTime();
  if (startDate >= today || endDate >= today || startDate >= endDate) {
    return MESSAGE.NOT_VALID;
  } else if (list.length > 1) {
    for (let i = 0; i < list.length; i++) {
      if (startDate < list[i].endDate) {
        result = MESSAGE.NOT_VALID;
      }
    }
  } else result = "";
  return result;
}

export function validateJobDesc(jobDesc) {
  if (!jobDesc.length) {
    return MESSAGE.REQUIRED;
  } else if (jobDesc.length > 5000) {
    return MESSAGE.MAX_LENGTH + "5000";
  } else return "";
}

export function validateReason(reason) {
  if (!reason.length) {
    return MESSAGE.REQUIRED;
  } else if (reason.length > 1000) {
    return MESSAGE.MAX_LENGTH + "1000";
  } else return "";
}

export function validateSalary(salary) {
  const digit = new RegExp("(^[0-9]*$)");
  if (!salary.length) {
    return MESSAGE.REQUIRED;
  } else if (!digit.test(salary)) {
    return MESSAGE.DIGIT_ONLY;
  } else if (salary.length > 10) {
    return MESSAGE.MAX_LENGTH + "10";
  } else return "";
}
