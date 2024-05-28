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
  const time_obj = convertSecondsToDate(timestamp);
  let hours = String(time_obj.hours).padStart(2, "0");
  let minutes = String(time_obj.minutes).padStart(2, "0");
  return `${hours}:${minutes}`;
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

export function decodeBase64(base64) {
  const text = atob(base64);
  const length = text.length;
  const bytes = new Uint8Array(length);
  for (let i = 0; i < length; i++) {
    bytes[i] = text.charCodeAt(i);
  }
  return bytes;
}

export function convertBase64ToBlob(data, type) {
  const result_binary = decodeBase64(data);
  return new Blob([result_binary], { type: type });
}
