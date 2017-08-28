import I18n, { getLanguages } from "react-native-i18n";
// import vi from "../langs/vi";

//enable fallbacks
I18n.fallbacks = true;
// Available languages
I18n.translations = {
  en: require("../langs/en"),
  vi: require("../langs/vi")
};

const getLang = (keyLang, lang) =>
  I18n.t(keyLang, { locale: lang != null ? lang : "vi" });

export default getLang;
