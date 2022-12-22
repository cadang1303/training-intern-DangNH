import { JOB_LIST, COMPANY_LIST, CITY_LIST } from "./data";

export const formSecondStep = {
  type: "companies",
  validation: {},
  fields: [
    {
      label: "",
      type: "select-company",
      placeholder: "--Chọn công ty--",
      name: "company",
      list: COMPANY_LIST,
      msg: "",
      value: "",
      validation: {
        required: true,
      },
    },
    {
      label: "Vị trí từng làm",
      type: "text",
      name: "jobName",
      msg: "",
      value: "",
      validation: {
        required: true,
        maxLength: 100,
      },
    },
    {
      label: "Thời gian làm việc",
      type: "daterange",
      name: "jobDate",
      msg: "",
      value: { from: "", to: "" },
      validation: {
        required: true,
      },
    },
    {
      label: "Mô tả về công việc",
      type: "textarea",
      name: "jobDesc",
      msg: "",
      value: "",
      validation: {
        required: false,
        maxLength: 5000,
      },
    },
  ],
};

const firstForm = [
  {
    label: "Họ và tên",
    type: "text",
    name: "fullName",
    msg: "",
    value: "",
    validation: {
      required: true,
      maxLength: 100,
    },
  },
  {
    label: "Ngày sinh",
    type: "date",
    name: "dob",
    msg: "",
    value: "",
    validation: {
      required: true,
    },
  },
  {
    label: "Thành phố",
    placeholder: "--Chọn thành phố--",
    type: "select-city",
    list: CITY_LIST,
    name: "city",
    value: "",
    validation: {
      required: false,
    },
  },
  {
    label: "Vị trí làm việc",
    placeholder: "Chọn các vị trí mà bạn muốn",
    type: "multiselect",
    list: JOB_LIST,
    textSmall: "Có thể chọn nhiều vị trí mà bạn muốn làm việc",
    name: "jobs",
    value: [],
    validation: {
      required: false,
    },
  },
  {
    label: "Mô tả về bản thân",
    type: "textarea",
    name: "desc",
    onCounter: true,
    msg: "",
    value: "",
    validation: {
      required: false,
      maxLength: 1000,
    },
  },
  {
    label: "Ảnh cá nhân",
    type: "dropzone",
    placeholder: "Hãy kéo và thả ảnh vào đây hoặc",
    triggerText: "nhấn vào đây",
    dragText: "Thả ảnh muốn tải lên ở đây",
    name: "img",
    value: [],
    validation: {
      required: false,
      minFiles: 1,
      maxFiles: 3,
      validExt: ["jpg", "jpeg", "png"],
    },
  },
];

const secondForm = [JSON.parse(JSON.stringify(formSecondStep))];

const thirdForm = [
  {
    label: "Lý do muốn ứng tuyển vào công ty",
    type: "textarea",
    name: "reason",
    onCounter: true,
    msg: "",
    value: "",
    validation: {
      required: true,
      maxLength: 1000,
    },
  },
  {
    label: "Mức lương mong muốn",
    type: "salary",
    name: "salary",
    currency: "VNĐ",
    msg: "",
    value: "",
    validation: {
      required: true,
      maxLength: 10,
    },
  },
];

export const multiForm = [
  {
    id: 1,
    step: 1,
    type: "common",
    name: "firstForm",
    data: firstForm,
  },
  {
    id: 2,
    step: 2,
    type: "company-form",
    name: "secondForm",
    data: secondForm,
  },
  {
    id: 3,
    step: 3,
    type: "common",
    name: "thirdForm",
    data: thirdForm,
  },
];
