export interface Order {
  id: number;
  orderUuid: string;
  email: string;
  cell_id: number;
  locker_id: number;
  DateFrom: string; // ISO date string
  DateTo: string;   // ISO date string
  Name: string;
  Surname: string;
}
