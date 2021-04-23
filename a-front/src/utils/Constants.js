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

export const API_GET_ALL_RESULTS = "/v1/results";

