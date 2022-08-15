import Vue from "vue";
import moment from "moment";

Vue.filter("ago", (datetime) => {
  const date = moment(datetime);

  if (date.diff(new Date(), "days") < 1) {
    return date.format("LT");
  }

  return date.format("D MMM");
});
