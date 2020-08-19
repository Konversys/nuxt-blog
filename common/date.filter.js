export default (value, type) => {
  switch (type) {
    case "date":
      return new Date(value).toLocaleDateString();
    case "time":
      return new Date(value).toLocaleTimeString();
    default:
      return new Date(value).toLocaleString();
  }
};
