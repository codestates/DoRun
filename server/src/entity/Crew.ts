import {
  BaseEntity,
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  OneToMany,
} from "typeorm";
import { User } from "./User";

@Entity()
export class Crew extends BaseEntity {
  @PrimaryGeneratedColumn({ type: "int" })
  id: number;

  @Column({ type: "varchar" })
  title: string;

  @Column({ type: "varchar" })
  desc: string;

  @Column({ type: "varchar" })
  personnel: string;

  @Column({ type: "varchar" })
  level: string;

  @Column({ type: "varchar" })
  time: string;

  @Column({ type: "varchar" })
  date: string;

  @Column({ type: "varchar" })
  location: string;

  @Column({ type: "varchar" })
  departure: string;

  @Column({ type: "varchar" })
  distance: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @OneToMany((type) => User, (user) => user.crew)
  users: User[];
}
