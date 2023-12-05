const formatDate = (isoString) => {
    const date = new Date(isoString);
  
    // JavaScript months are 0-indexed, so add 1 for the correct month number
    const month = date.getMonth() + 1;
    const day = date.getDate();
    const year = date.getFullYear();
  
    return `${month}/${day}/${year}`;
  }

    export default formatDate;