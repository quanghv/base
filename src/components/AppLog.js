import settings from "../config/settings";

/**
 * custom console log
 * chi show log khi trang thai la DEBUG (=true)
 * 
 * @memberof AppComponent
 */
export const consoleLog = (str1, str2) => {
  if (settings.isDebug) {
    console.log(str1, str2);
  }
};
