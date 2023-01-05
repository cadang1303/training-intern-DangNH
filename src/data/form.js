import {
  JOB_LIST,
  COMPANY_LIST,
  CITY_LIST,
  SELECT_COMPANY,
  TEXT,
  DATE_RANGE,
  TEXTAREA,
  DATE,
  SELECT_CITY,
  MULTISELECT,
  DROPZONE,
  SALARY,
  COMPANIES,
} from "./data";

export const formSecondStep = {
  type: COMPANIES,
  validation: {},
  fields: [
    {
      id: 1,
      label: "Công ty",
      type: SELECT_COMPANY,
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
      id: 2,
      label: "Vị trí từng làm",
      type: TEXT,
      name: "jobName",
      msg: "",
      value: "",
      validation: {
        required: true,
        maxLength: 100,
      },
    },
    {
      id: 3,
      label: "Thời gian làm việc",
      type: DATE_RANGE,
      name: "jobDate",
      msg: "",
      value: { from: "", to: "" },
      validation: {
        required: true,
      },
    },
    {
      id: 4,
      label: "Mô tả về công việc",
      type: TEXTAREA,
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
    id: 1,
    label: "Họ và tên",
    type: TEXT,
    name: "fullName",
    msg: "",
    value: "",
    validation: {
      required: true,
      maxLength: 100,
    },
  },
  {
    id: 2,
    label: "Ngày sinh",
    type: DATE,
    name: "dob",
    msg: "",
    value: "",
    validation: {
      required: true,
    },
  },
  {
    id: 3,
    label: "Thành phố",
    placeholder: "--Chọn thành phố--",
    type: SELECT_CITY,
    list: CITY_LIST,
    name: "city",
    value: "",
    validation: {
      required: false,
    },
  },
  {
    id: 4,
    label: "Vị trí làm việc",
    placeholder: "Chọn các vị trí mà bạn muốn",
    type: MULTISELECT,
    list: JOB_LIST,
    textSmall: "Có thể chọn nhiều vị trí mà bạn muốn làm việc",
    name: "jobs",
    value: [],
    validation: {
      required: false,
    },
  },
  {
    id: 5,
    label: "Mô tả về bản thân",
    type: TEXTAREA,
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
    id: 6,
    label: "Ảnh cá nhân",
    type: DROPZONE,
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
    id: 7,
    label: "Lý do muốn ứng tuyển vào công ty",
    type: TEXTAREA,
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
    id: 8,
    label: "Mức lương mong muốn",
    type: SALARY,
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
    label: "Thông tin cá nhân",
    name: "firstForm",
    data: firstForm,
  },
  {
    id: 2,
    step: 2,
    type: "company-form",
    label: "Kinh nghiệm làm việc",
    name: "secondForm",
    data: secondForm,
  },
  {
    id: 3,
    step: 3,
    type: "common",
    label: "Xác nhận thông tin",
    name: "thirdForm",
    data: thirdForm,
  },
];
