export const formatDate = (date = new Date()) => {
  return new Date(date).toLocaleDateString("en-IN", {
    day: "2-digit",
    month: "long",
    year: "numeric",
  });
};

export const formatDateTime = (date = new Date()) => {
  return new Date(date).toLocaleString("en-IN");
};