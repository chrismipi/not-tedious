export interface Placeholder {
  key: string;
  type: any; // TODO fix type
  value: string;
}

export interface Row extends Record<string, string> {}

export interface Response {
  recordset: RecordSet[];
}

export interface RecordSet {}
