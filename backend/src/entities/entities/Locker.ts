import { Column, Entity, Index, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Cells } from './Cells';
import { Orders } from './Orders';

@Index('locker_pkey', ['id'], { unique: true })
@Entity('locker', { schema: 'public' })
export class Locker {
  @PrimaryGeneratedColumn({ type: 'bigint', name: 'id' })
  id: number;

  @Column('integer', { name: 'total_cells' })
  total_cells: number;

  @Column('text', { name: 'location' })
  location: string;

  @Column('text', { name: 'name', nullable: false }) // Добавлено
  name: string;

  @Column('text', { name: 'description', nullable: true }) // Добавлено
  description: string | null;

  @OneToMany(() => Cells, (cells) => cells.locker)
  cells: Cells[];

  @OneToMany(() => Orders, (orders) => orders.locker)
  orders: Orders[];
}