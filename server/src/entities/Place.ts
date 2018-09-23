import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
  ManyToOne
} from 'typeorm';
import User from './User';

/**
 * Place
 * @class
 */
@Entity()
class Place extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'text' })
  name: string;

  @Column({ type: 'double precision', default: 0 })
  lat: number;

  @Column({ type: 'double precision', default: 0 })
  lng: number;

  @Column({ type: 'text' })
  address: string;

  @Column({ type: 'boolean', default: false })
  isFav: boolean;

  /**
   * Get User Id from User
   */
  @Column({ nullable: true })
  userId: number;

  @ManyToOne((type) => User, (user) => user.places)
  user: User;

  @CreateDateColumn()
  createdAt: string;

  @UpdateDateColumn()
  updateAt: string;
}

export default Place;
