import { JOB_LIST, COMPANY_LIST, CITY_LIST } from "./data";

export const formSecondStep = {
  type: "companies",
  fields: [
    {
      label: "",
      type: "select-company",
      placeholder: "--Chọn công ty--",
      value: "",
      name: "company",
      list: COMPANY_LIST,
      msg: "",
    },
    {
      label: "Vị trí từng làm",
      required: true,
      type: "text",
      name: "jobName",
      value: "",
      msg: "",
      maxLength: 100,
    },
    {
      label: "Thời gian làm việc",
      required: true,
      type: "daterange",
      name: "jobDate",
      value: { from: "", to: "" },
      msg: "",
    },
    {
      label: "Mô tả về công việc",
      required: false,
      type: "textarea",
      maxLength: 5000,
      name: "jobDesc",
      value: "",
      msg: "",
    },
  ],
};

const firstForm = [
  {
    label: "Họ và tên",
    required: true,
    type: "text",
    name: "fullName",
    value: "",
    msg: "",
  },
  {
    label: "Ngày sinh",
    required: true,
    type: "date",
    name: "dob",
    value: "",
    msg: "",
  },
  {
    label: "Thành phố",
    placeholder: "--Chọn thành phố--",
    required: false,
    type: "select-city",
    list: CITY_LIST,
    name: "city",
    value: "",
  },
  {
    label: "Vị trí làm việc",
    placeholder: "Chọn các vị trí mà bạn muốn",
    required: false,
    type: "multiselect",
    list: JOB_LIST,
    value: [],
    textSmall: "Có thể chọn nhiều vị trí mà bạn muốn làm việc",
    name: "jobs",
  },
  {
    label: "Mô tả về bản thân",
    required: false,
    type: "textarea",
    name: "desc",
    onCounter: true,
    maxLength: 1000,
    value: "",
    msg: "",
  },
  {
    label: "Ảnh cá nhân",
    required: false,
    type: "dropzone",
    placeholder: "Hãy kéo và thả ảnh vào đây hoặc",
    triggerText: "nhấn vào đây",
    dragText: "Thả ảnh muốn tải lên ở đây",
    minFiles: 1,
    maxFiles: 3,
    validExt: ["jpg", "jpeg", "png"],
    value: [],
    name: "img",
  },
];

const secondForm = [JSON.parse(JSON.stringify(formSecondStep))];

const thirdForm = [
  {
    label: "Lý do muốn ứng tuyển vào công ty",
    required: true,
    type: "textarea",
    name: "reason",
    onCounter: true,
    maxLength: 1000,
    value: "",
    msg: "",
  },
  {
    label: "Mức lương mong muốn",
    required: true,
    type: "salary",
    name: "salary",
    currency: "VNĐ",
    maxLength: 10,
    value: "",
    msg: "",
  },
];

export const multiForm = [
  {
    id: 1,
    step: 1,
    data: firstForm,
  },
  {
    id: 2,
    step: 2,
    data: secondForm,
  },
  {
    id: 3,
    step: 3,
    data: thirdForm,
  },
];
