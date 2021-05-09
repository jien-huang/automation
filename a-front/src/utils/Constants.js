export const columns = [
    { id: 'id', label: 'ID', minWidth: 100 },
    { id: 'suite', label: 'Suite', minWidth: 200 },
    {
      id: 'result',
      label: 'Result',
      minWidth: 70,
      align: 'right',
      format: (value) => value.toLocaleString('en-US'),
    },
    {
      id: 'start',
      label: 'Start',
      minWidth: 100,
      align: 'right',
      format: (value) => value.toLocaleString('en-US'),
    },
    {
      id: 'end',
      label: 'End',
      minWidth: 100,
      align: 'right',
      format: (value) => value.toLocaleString('en-US'),
    },
  ];

export const DATA_TYPE= {
    FOLDER: 'folder',
    CASE: 'case',
    UI: 'ui',
    DATA: 'data',
    ROOT: 'root',
    SUITE: 'suite'
}

export const RESULT_TYPE = {
  SUCCESS: 'Success',
  IGNORED: 'Ignored',
  FAILED: 'Failed'
}

export const API_GET_ALL_RESULTS = "/v1/results";

export function checkItemMatch(item, searchString) {
  if(!item){
    return false;
  }
  if (!searchString) {
    return true;
  }
  var content = JSON.stringify(item);
  if(content.includes(searchString)){
    return true;
  }
  // if(isValidRegex(searchString)) {
  //   return content.match(searchString) != null
  // }
  return false;
}

export const DEBOUNCE_PAUSE = 1000;

// function isValidRegex(str){
//   var isValid = true;
//   try{
//     new RegExp(str, 'gi');
//   } catch(e) {
//     isValid = false
//   }
//   return isValid
// }

