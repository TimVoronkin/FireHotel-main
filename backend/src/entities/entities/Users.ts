import { Column, Entity, Index, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Cells } from './Cells';

@Index('users_email_key', ['email'], { unique: true })
@Index('users_pkey', ['id'], { unique: true })
@Index('users_phone_key', ['phone'], { unique: true })
@Index('users_username_key', ['username'], { unique: true })
@Index('users_uuid_key', ['uuid'], { unique: true })
@Entity('users', { schema: 'public' })
export class Users {
  @PrimaryGeneratedColumn({ type: 'integer', name: 'id' })
  id: number;

  @Column('text', { name: 'uuid', nullable: true, unique: true })
  uuid: string | null;

  @Column('text', { name: 'name', nullable: true })
  name: string | null;

  @Column('text', { name: 'last_name', nullable: true })
  last_name: string | null;

  @Column('text', { name: 'email', nullable: true, unique: true })
  email: string | null;

  @Column('text', { name: 'phone', nullable: true, unique: true })
  phone: string | null;

  @Column('text', { name: 'username', nullable: true, unique: true })
  username: string | null;

  @Column('enum', { name: 'role', enum: ['worker', 'admin'], default: 'worker' })
  role: 'worker' | 'admin';

  @Column('text', { name: 'password', nullable: true })
  password: string | null;

  @OneToMany(() => Cells, (cells) => cells.worker)
  cells: Cells[];
}
