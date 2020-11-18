export const sortByTitle = (d1, d2) => {
  return d1.title.toLowerCase() > d2.title.toLowerCase() ? 1 : -1;
};
export const sortByStatus = (d1, d2) => {
  return d1.stage > d2.stage ? 1 : -1;
};
export const sortByDate = (d1, d2) => {
  return d1.id > d2.id ? 1 : -1;
};