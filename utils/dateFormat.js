const dateFormat = timestamp => {
    const date = new Date(timestamp);
    // Perform formatting operations on the date object
    // For example:
    const formattedDate = `${date.getMonth() + 1}/${date.getDate()}/${date.getFullYear()}`;
    return formattedDate;
  };
  
  module.exports = dateFormat;