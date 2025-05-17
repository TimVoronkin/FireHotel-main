export interface Cell {
  id: number;
  cellNumber: number;
  locker_id: number;
  size: 'studio' | '1br' | '2br' | '3br' | 'penthouse';
  status: 'free' | 'reserved';
  reserved_until: Date | null;
  order_id: number;
  worker_id: number;
}
