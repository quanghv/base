const constant = {
  DEBUG: true
};

/**
 * custom console log
 * chi show log khi trang thai la DEBUG (=true)
 * 
 * @memberof AppComponent
 */
export const consoleLog = (str1, str2) => {
  if (constant.DEBUG) {
    str2 ? console.log(str1, str2) : console.log(str1);
  }
};
