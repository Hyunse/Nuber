import bcrypt from 'bcrypt';
import { IsEmail } from 'class-validator';
import {
  BaseEntity,
  Column,
  Entity,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  BeforeInsert,
  BeforeUpdate,
  ManyToOne,
  OneToMany
} from 'typeorm';

import Chat from './Chat';
import Message from './Message';
import Ride from './Ride';
import Verification from './Verification';

const BCRYPT_ROUNS = 10;

@Entity()
class User extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'text', nullable: true })
  @IsEmail()
  email: string | null;

  @Column({ type: 'boolean', default: false })
  verifiedEmail: boolean;

  @Column({ type: 'text' })
  firstName: string;

  @Column({ type: 'text' })
  lastName: string;

  @Column({ type: 'int', nullable: true })
  age: number;

  @Column({ type: 'text', nullable: true })
  password: string;

  @Column({ type: 'text', nullable: true })
  phoneNumber: string;

  @Column({ type: 'boolean', default: false })
  verifiedPhoneNumber: string;

  @Column({ type: 'text' })
  profilePhoto: string;

  @Column({ type: 'text', nullable: true })
  fbId: string;

  @CreateDateColumn()
  createdAt: string;

  @UpdateDateColumn()
  updatedAt: string;

  get fullName(): string {
    return `${this.firstName} ${this.lastName}`;
  }

  @Column({ type: 'boolean', default: false })
  isDriving: boolean;

  @Column({ type: 'boolean', default: false })!
  isRiding: boolean;

  @Column({ type: 'boolean', default: false })
  isTaken: boolean;

  @Column({ type: 'double precision', default: 0 })
  lastLng: number;

  @Column({ type: 'double precision', default: 0 })
  lastLat: number;

  @Column({ type: 'double precision', default: 0 })
  lastOrientation: number;

  @ManyToOne((type) => Chat, (chat) => chat.participants)
  chat: Chat;

  @OneToMany((type) => Message, (message) => message.user)
  messages: Message[];

  @OneToMany((type) => Verification, (verification) => verification.user)
  verifications: Verification[];

  @OneToMany((type) => Ride, (ride) => ride.passenger)
  ridesAsPassenger: Ride[];

  @OneToMany((type) => Ride, (ride) => ride.driver)
  ridesAsDriver: Ride[];

  @BeforeInsert()
  @BeforeUpdate()
  async savePassword(): Promise<void> {
    if (this.password) {
      // Get Hash Password
      const hashedPassword = await this.hashPassword(this.password);
      this.password = hashedPassword;
    }
  }

  private hashPassword(password: string): Promise<string> {
    return bcrypt.hash(password, BCRYPT_ROUNS);
  }

  public comparePassword(password: string): Promise<boolean> {
    return bcrypt.compare(password, this.password);
  }
}

export default User;
