import Moment from "moment";

export const handleDate = (time, language) => {
  if (Moment(time).format("Y") === Moment().format("Y")) {
    if (Moment(time).format("MMDD") === Moment().format("MMDD")) {
      return Moment(time).format("LT");
    } else {
      return language === "vi"
        ? Moment(time).format("DD [thg] MM")
        : Moment(time).format("DD/MM");
    }
  } else {
    return Moment(time).format("DD/MM/Y");
  }
};

export const handleDateTime = (time, language) => {
  if (Moment(time).format("Y") === Moment().format("Y")) {
    if (Moment(time).format("MMDD") === Moment().format("MMDD")) {
      return Moment(time).format("LT");
    } else {
      return language === "vi"
        ? Moment(time).format("H:mm, DD [thg] MM")
        : Moment(time).format("DD/MM H:mm");
    }
  } else {
    return Moment(time).format("DD/MM/Y H:mm");
  }
};
