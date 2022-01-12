export const delay = ms => {
  return new Promise(resolve => setTimeout(resolve, ms));
};

export function getFileExtenstion(filename) {
  return filename.slice(((filename.lastIndexOf(".") - 1) >>> 0) + 2);
}
