export const download = (url, file_name, file_hash, options) => {
  var link = document.createElement("a");
  link.href = url;
  link.download = file_name || "downloaded-file";

  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
};
