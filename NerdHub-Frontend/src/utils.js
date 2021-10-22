export const formatDate = (date) => {
  const dateObj = new Date(date);
  return dateObj.toDateString();
};

export const stripHtml = (html) => {
  return html.replace(/<\s*[^>]*>/gi, '');
};
