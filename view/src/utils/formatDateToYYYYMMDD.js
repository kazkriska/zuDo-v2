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

// ! DOWNSTAIRS CODE IS ONLY FOR DATE FORMATTING TESTING PURPOSES

// console.log(formatDateToYYYYMMDD("2023-10-31T03:13:14.599Z"))
// console.log(new Date('2023-10-31T03:13:14.599Z'));
// console.log(new Date('2023-10-31 14:13:14.599+11').toLocaleString())  // ! This gives an output the user can read in UI easily, in systems local format



// "2023-10-31T03:13:14.599Z"