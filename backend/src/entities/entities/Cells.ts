import { Column, Entity, Index, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Locker } from './Locker';
import { Orders } from './Orders';
import { Users } from './Users';

@Index('cells_pkey', ['id'], { unique: true })
@Entity('cells', { schema: 'public' })
export class Cells {
  @PrimaryGeneratedColumn({ type: 'integer', name: 'id' })
  id: number;

  @Column('integer', { name: 'cell_number', nullable: true })
  cellNumber: number | null;

  @Column('enum', {
    name: 'size',
    nullable: true,
    // enum: ['s', 'm', 'l', 'xl', '2xl'],
      enum: ['studio', '1br', '2br', '3br', 'penthouse'],
  })
  // size: 's' | 'm' | 'l' | 'xl' | '2xl' | null;
  size: 'studio' | '1br' | '2br' | '3br' | 'penthouse' | null;

  @Column('character varying', {
    name: 'status',
    nullable: true,
    length: 20,
    default: () => "'free'",
  })
  status: string | null;

  @Column('timestamp without time zone', {
    name: 'reserved_until',
    nullable: true,
  })
  reserved_until: Date | null;

  @Column('integer', { name: 'order_id', nullable: true })
  order_id: number | null;

  @Column('integer', { name: 'worker_id', nullable: true })
  worker_id: number | null;

  @Column('integer', { name: 'locker_id', nullable: false })
  locker_id: number;

  @ManyToOne(() => Locker, (locker) => locker.cells, { onDelete: 'CASCADE' })
  @JoinColumn([{ name: 'locker_id', referencedColumnName: 'id' }])
  locker: Locker;

  @ManyToOne(() => Orders, (orders) => orders.cells, { onDelete: 'SET NULL' })
  @JoinColumn([{ name: 'order_id', referencedColumnName: 'id' }])
  order: Orders;

  @ManyToOne(() => Users, (users) => users.cells, { onDelete: 'SET NULL' })
  @JoinColumn([{ name: 'worker_id', referencedColumnName: 'id' }])
  worker: Users;

  @OneToMany(() => Orders, (orders) => orders.cell)
  orders: Orders[];
}
