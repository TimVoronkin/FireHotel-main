import { Column, Entity, Index, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Cells } from './Cells';
import { Locker } from './Locker';

@Index('orders_pkey', ['id'], { unique: true })
@Index('orders_order_uuid_key', ['orderUuid'], { unique: true })
@Entity('orders', { schema: 'public' })
export class Orders {
  @PrimaryGeneratedColumn({ type: 'integer', name: 'id' })
  id: number;

  @Column('text', { name: 'order_uuid', nullable: true, unique: true })
  orderUuid: string | null;

  @Column('text', { name: 'email', nullable: false })
  email: string;

  @Column('integer', { name: 'cell_id', nullable: false })
  cell_id: number;

  @Column('integer', { name: 'locker_id', nullable: false })
  locker_id: number;

  @OneToMany(() => Cells, (cells) => cells.order)
  cells: Cells[];

  @ManyToOne(() => Cells, (cells) => cells.orders, { onDelete: 'CASCADE' })
  @JoinColumn([{ name: 'cell_id', referencedColumnName: 'id' }])
  cell: Cells;

  @ManyToOne(() => Locker, (locker) => locker.orders, { onDelete: 'CASCADE' })
  @JoinColumn([{ name: 'locker_id', referencedColumnName: 'id' }])
  locker: Locker;
}
