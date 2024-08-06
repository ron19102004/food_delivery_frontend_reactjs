export interface ITableProps<T> {
  list: Array<T>;
  rowSelected: T | null;
  setRowSelected(row: T): void;
}
