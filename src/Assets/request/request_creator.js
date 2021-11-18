import fullreq from "./shearch_req/base_query_val";
import location_filter from "./filter/location";
import language_filter from "./filter/language";
import date_filter from "./filter/date";
import autocompleterequest from "./autocomplete/autocomplete";
import detail_req from "./details__req/detail";
import thumbnail_req from "./details__req/thumbnail_req";
import abstract_req from "./details__req/abstract_req";
import seeAlso_req from "./details__req/seeAlso_req";
import birthDate_req from "./details__req/birthDate_req";
import label_req from "./details__req/label_req";
import birthName_req from "./details__req/birthName_req";
import birthPlace_req from "./details__req/birthPlace_req";
import deathDate_req from "./details__req/deathDate_req";
import deathPlace_req from "./details__req/deathPlace_req";
import feastDay_req from "./details__req/feastDay_req";
import veneratedIn_req from "./details__req/veneratedIn_req";
import successor_req from "./details__req/successor_req";

const createRequest = (type, query_val, option = {}) => {
  if (query_val === "") {
  } else if (!query_val) {
    throw "Bad query";
  }
  let return_val;
  switch (type) {
    case "get_query_val":
      return_val = fullreq;
      let query_val_3 = query_val.toLowerCase();
      let query_val_4 = query_val.charAt(0).toUpperCase() + query_val.slice(1);

      return_val = return_val.replaceAll("$$$BASE_VAL_LOWER$$$", query_val_3);
      return_val = return_val.replaceAll("$$$BASE_VAL_UPPER$$$", query_val_4);
      //replace query value
      //return_val = return_val.replaceAll("$$$QUERY_VAL$$$", query_val);

      //filter replaced if necessarie
      if (option.location && option.location.length > 0) {
        let loc_valu = location_filter;
        console.log(option.location);
        let cond = "";
        option.location.forEach((element, index) => {
          if (index === 0) {
            cond = `regex(str(?birthPlace), "${element}")|| regex(str(?deathPlace), "${element}")`;
          } else {
            cond =
              cond +
              ` || ` +
              ` regex(str(?birthPlace), "${element}")|| regex(str(?deathPlace), "${element}")`;
          }
        });
        loc_valu = loc_valu.replaceAll("$$$LOCATION_REG$$$", cond);

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

    case "get_autocomplete":
      return_val = autocompleterequest;
      //replace query value (Case sensitive )
      let query_val_1 = query_val.toLowerCase();
      let query_val_2 = query_val.charAt(0).toUpperCase() + query_val.slice(1);

      return_val = return_val.replaceAll("$$$BASE_VAL_LOWER$$$", query_val_1);
      return_val = return_val.replaceAll("$$$BASE_VAL_UPPER$$$", query_val_2);

      return return_val;

    case "get_details_info":
      return_val = detail_req;
      //replace query value (Case sensitive )
      if (option.language) {
        return_val = return_val.replaceAll("$$$LANGUAGE$$$", option.language);
      } else {
        return_val = return_val.replaceAll("$$$FILTER_VAL_LANGUAGE$$$", "en");
      }
      return_val = return_val.replaceAll("$$$BASE_VAL$$$", query_val);
      return return_val;
    case "get_thumbnail":
      return_val = thumbnail_req;
      return_val = return_val.replaceAll("$$$BASE_VAL$$$", query_val);
      return return_val;
    case "get_abstract":
      return_val = abstract_req;
      return_val = return_val.replaceAll("$$$BASE_VAL$$$", query_val);
      return_val = return_val.replaceAll(
        "$$$LANGUAGE$$$",
        option.language || "en"
      );
      return return_val;
    case "get_seeAlso":
      return_val = seeAlso_req;
      return_val = return_val.replaceAll("$$$BASE_VAL$$$", query_val);
      return_val = return_val.replaceAll(
        "$$$LANGUAGE$$$",
        option.language || "en"
      );
      return return_val;
    case "get_birthDate":
      return_val = birthDate_req;
      return_val = return_val.replaceAll("$$$BASE_VAL$$$", query_val);
      return return_val;
    case "get_label":
      return_val = label_req;
      return_val = return_val.replaceAll(
        "$$$LANGUAGE$$$",
        option.language || "en"
      );
      return_val = return_val.replaceAll("$$$BASE_VAL$$$", query_val);
      return return_val;
    case "getBirthName":
      return_val = birthName_req;
      return_val = return_val.replaceAll(
        "$$$LANGUAGE$$$",
        option.language || "en"
      );
      return_val = return_val.replaceAll("$$$BASE_VAL$$$", query_val);
      return return_val;
    case "getBirthPlace":
      return_val = birthPlace_req;
      return_val = return_val.replaceAll("$$$BASE_VAL$$$", query_val);
      return return_val;
    case "getdeathDate":
      return_val = deathDate_req;
      return_val = return_val.replaceAll("$$$BASE_VAL$$$", query_val);
      return return_val;
    case "getdeathPlace":
      return_val = deathPlace_req;
      return_val = return_val.replaceAll("$$$BASE_VAL$$$", query_val);
      return return_val;
    case "getfeast":
      return_val = feastDay_req;
      return_val = return_val.replaceAll("$$$BASE_VAL$$$", query_val);
      return return_val;
    case "getsuccessor":
      return_val = successor_req;
      return_val = return_val.replaceAll("$$$BASE_VAL$$$", query_val);
      return return_val;
    case "getveneratedin":
      return_val = veneratedIn_req;
      return_val = return_val.replaceAll("$$$BASE_VAL$$$", query_val);
      return return_val;

    default:
      throw "Bad type";
  }
};
export { createRequest };
