import { sha1 } from "object-hash";
export const SUPPORTED_IMAGE_FORMATS = ["jpg", "jpeg", "png", "bmp"];

export function convertSecondsToDate(seconds) {
  let date = new Date(seconds * 1000);
  return {
    minutes: date.getMinutes(),
    hours: date.getHours(),
    day: date.getDate(),
    monthName: date.toLocaleString("default", { month: "long" }),
    month: date.getMonth,
    year: date.getFullYear(),
  };
}

export function getMessageStringDate(timestamp) {
  const date = convertSecondsToDate(timestamp);
  if (date["minutes"] >= 0 && date["minutes"] <= 9)
    date["minutes"] = "0" + date["minutes"];
  return date["hours"] + ":" + date["minutes"];
}

export function get_url_extension(url) {
  return url.split(".").pop().trim();
}

export function get_message_type(message) {
  var message_type = null;
  if (message.file) {
    // message_type = SUPPORTED_IMAGE_FORMATS.includes(
    //   get_url_extension(message.file.file_name)
    // )
    const file_type = message.file.file_type.split("/")[0];
    message_type = file_type == "image" ? "Image" : "File";
  }
  return message_type ? message_type : "Text";
}

export function hash_message(message) {
  return sha1(message);
}
