// to help format due_on / created_at date to meet data type requirments of PgSQL

const formatDateToYYYYMMDD = (inputString) => {
  if (!inputString) {   // for testing, if theres no due_on date then dont give random old date 1970 something....
    return '';
  }
  const inputDate = new Date(inputString);
  const year = inputDate.getFullYear();
  const month = (inputDate.getMonth() + 1).toString().padStart(2, '0');
  const day = inputDate.getDate().toString().padStart(2, '0');
  return `${year}-${month}-${day}`;
};

export default formatDateToYYYYMMDD;
