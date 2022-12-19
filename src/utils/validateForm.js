export function validateFirstForm(formData) {
  let result = true;

  formData.forEach((i) => (i.msg = ""));
  const today = new Date().getTime();
  const fullName = formData.find((i) => i.name === "fullName");
  const dob = formData.find((i) => i.name === "dob");
  const dobValue = new Date(dob.value).getTime();
  const desc = formData.find((i) => i.name === "desc");

  if (!fullName.value) {
    fullName.msg = `${fullName.label} là bắt buộc !`;
    result = false;
  } else if (fullName.value.length > fullName.maxLength) {
    fullName.msg = `${fullName.label} có độ dài tối đa là ${fullName.maxLength} ký tự!`;
    result = false;
  }

  if (!dob.value) {
    dob.msg = `${dob.label} là bắt buộc !`;
    result = false;
  } else if (dobValue >= today) {
    dob.msg = `${dob.label} không thể vượt quá thời điểm hiện tại.`;
    result = false;
  }

  if (desc.value.length > desc.maxLength) {
    desc.msg = `${desc.label} có độ dài tối đa là ${desc.maxLength}`;
    result = false;
  }

  return result;
}

export function validateSecondForm(formData) {
  let result = true;
  const today = new Date().getTime();

  formData.forEach((i) => {
    i.fields.forEach((c) => (c.msg = ""));
  });

  if (!formData) {
    result = false;
  }

  for (let i = 0; i < formData.length; i++) {
    let company = formData[i].fields.find((item) => item.name === "company");
    let jobName = formData[i].fields.find((item) => item.name === "jobName");
    let jobDate1 = formData[i].fields.find((item) => item.name === "jobDate");
    let jobDesc = formData[i].fields.find((item) => item.name === "jobName");
    let startDate = new Date(jobDate1.value.from).getTime();
    let endDate = new Date(jobDate1.value.to).getTime();

    if (!company.value) {
      result = false;
      company.msg = `Trường này là bắt buộc!`;
    }

    if (!jobName.value) {
      result = false;
      jobName.msg = `${jobName.label} là bắt buộc!`;
    } else if (jobName.length > jobName.maxLength) {
      result = false;
      jobName.msg = `${jobName.label} có độ dài tối đa là ${jobName.maxLength} ký tự.`;
    }

    if (!jobDate1.value.from || !jobDate1.value.to) {
      result = false;
      jobDate1.msg = `${jobDate1.label} là bắt buộc!`;
    } else if (startDate > today || endDate > today) {
      result = false;
      jobDate1.msg = `${jobDate1.label} không thể vượt quá thời gian hiện tại.`;
    } else if (startDate > endDate) {
      result = false;
      jobDate1.msg = `Thời gian bắt đầu không thể vượt quá thời gian kết thúc.`;
    }

    if (jobDesc.length > jobDesc.maxLength) {
      result = false;
      jobDesc.msg = `${jobDesc.label} có độ dài tối đa là ${jobDesc.maxLength} ký tự.`;
    }

    for (let j = 1; j < formData.length; j++) {
      let jobDate2 = formData[j].fields.find((item) => item.name === "jobDate");

      let nextStartDate = new Date(jobDate2.value.from).getTime();
      if (i < j) {
        if (nextStartDate < endDate || nextStartDate < startDate) {
          result = false;
          jobDate1.msg = `Thời gian làm việc không được phép trùng lặp.`;
          jobDate2.msg = `Thời gian làm việc không được phép trùng lặp.`;
        }
      }
    }
  }

  return result;
}

export function validateThirdForm(formData) {
  formData.forEach((i) => (i.msg = ""));

  let result = true;
  const digit = new RegExp("(^[0-9]*$)");
  const reason = formData.find((i) => i.name === "reason");
  const salary = formData.find((i) => i.name === "salary");

  if (!reason.value) {
    result = false;
    reason.msg = `${reason.label} là bắt buộc !`;
  } else if (reason.value.length > reason.maxLength) {
    result = false;
    reason.msg = `${reason.label} có độ dài tối đa là ${reason.maxLength} ký tự.`;
  }

  if (!salary.value) {
    result = false;
    salary.msg = `${salary.label} là bắt buộc !`;
  } else if (salary.value.length > salary.maxLength) {
    result = false;
    salary.msg = `${salary.label} có độ dài tối đa là ${salary.maxLength} ký tự.`;
  } else if (!digit.test(salary.value)) {
    result = false;
    salary.msg = `${salary.label} chỉ chấp nhận chữ số`;
  }

  return result;
}
