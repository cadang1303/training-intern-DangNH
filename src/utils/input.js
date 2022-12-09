import { MESSAGE } from "@/constants";

export function validateName(name) {
  if (!name.length) {
    return MESSAGE.REQUIRED;
  } else if (name.length > 100) {
    return MESSAGE.MAX_LENGTH + "100";
  } else return "";
}

export function validateDob(date) {
  const today = new Date().getTime();
  date = new Date(date).getTime();
  if (date === 0) {
    return MESSAGE.REQUIRED;
  } else if (date > today) {
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

export function validateCompany(item, list) {
  let result = "";
  for (let i = 0; i < list.length; i++) {
    if (item.id === list[i].id) {
      result = "";
    } else if (list[i].company === item.company) {
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

export function validateJobDate(item, list) {
  const today = new Date().getTime();
  let result = "";
  item.startDate = new Date(item.startDate).getTime();
  item.endDate = new Date(item.endDate).getTime();
  if (item.startDate === 0 || item.endDate === 0) {
    return MESSAGE.REQUIRED;
  } else if (
    item.startDate >= today ||
    item.endDate >= today ||
    item.startDate >= item.endDate
  ) {
    return MESSAGE.NOT_VALID;
  } else if (list.length > 1) {
    for (let i = 0; i < list.length; i++) {
      if (item.id === list[i]) {
        result = "";
      } else if (item.startDate < list[i].endDate) {
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
