import fullreq from "./base_query_val";
import location_filter from "./filter/location";
import language_filter from "./filter/language";
import date_filter from "./filter/date";
const createRequest = (type, query_val, option = {}) => {
  if (!query_val) {
    throw "Bad qery";
  }
  switch (type) {
    case "get_query_val":
      let return_val = fullreq;
      //replace query value
      return_val = return_val.replaceAll("$$$QUERY_VAL$$$", query_val);

      //filter replaced if necessarie
      if (option.location) {
        let loc_valu = location_filter;
        loc_valu = loc_valu.replaceAll("$$$LOCATION$$$", option.location);
        return_val = return_val.replaceAll(
          "$$$FILTER_VAL_LOCATION$$$",
          loc_valu
        );
      } else {
        return_val = return_val.replaceAll("$$$FILTER_VAL_LOCATION$$$", "");
      }
      if (option.language) {
        let lan_valu = language_filter;
        lan_valu = lan_valu.replaceAll("$$$LANGUAGE$$$", option.language);
        return_val = return_val.replaceAll(
          "$$$FILTER_VAL_LANGUAGE$$$",
          lan_valu
        );
      } else {
        return_val = return_val.replaceAll("$$$FILTER_VAL_LANGUAGE$$$", "");
      }
      if (option.time) {
        if (option.time.date1 && option.time.date2) {
          let time_valu = date_filter;
          time_valu = time_valu.replaceAll(
            "$$$DATE1_VAL$$$",
            option.time.date1
          );
          time_valu = time_valu.replaceAll(
            "$$$DATE2_VAL$$$",
            option.time.date2
          );
          return_val = return_val.replaceAll(
            "$$$FILTER_VAL_DATE$$$",
            time_valu
          );
        } else throw "Bad Date val";
      } else {
        return_val = return_val.replaceAll("$$$FILTER_VAL_DATE$$$", "");
      }

      return return_val;
    default:
      throw "Bad type";
  }
};
export { createRequest };
