export const moneyFormat = (number, dot = " đ") => {
  if (number == 0) return `0${dot}`;
  let numberFormat = number;
  let str = "";
  const ti = 1000000000;
  const trieu = 1000000;
  const nghin = 1000;
  if (numberFormat / ti >= 1) {
    str += `${parseInt(numberFormat / ti)}.`;
    numberFormat %= ti;
  }
  if (numberFormat > trieu && numberFormat / trieu >= 1) {
    str += `${parseInt(numberFormat / trieu)}.`;
    numberFormat %= trieu;
  }
  if (numberFormat > nghin && numberFormat / nghin >= 1) {
    str += `${parseInt(numberFormat / nghin)}.`;
    numberFormat %= nghin;
  }
  if (numberFormat > 100) {
    str += `${numberFormat}`;
  } else if (numberFormat > 10) {
    str += `0${numberFormat}`;
  } else {
    str += `00${numberFormat}`;
  }
  return str + dot;
};
