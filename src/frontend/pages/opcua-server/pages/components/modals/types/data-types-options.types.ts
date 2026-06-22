import { DataType } from "node-opcua-basic-types";

interface TypeItem {
  label: string;
  value: DataType;
}

export const DATA_TYPE_OPTIONS: TypeItem[] = [
  { label: "Boolean", value: 1 as DataType },
  { label: "Int32", value: 6 as DataType },
  { label: "Double", value: 11 as DataType },
  { label: "String", value: 12 as DataType },
  { label: "DateTime", value: 13 as DataType },
];
