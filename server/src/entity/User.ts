import {
  BaseEntity,
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
} from "typeorm";
import { Crew } from "./Crew";

@Entity("user")
export class User extends BaseEntity {
  @PrimaryGeneratedColumn({ type: "int" })
  id: number;

  @Column({ type: "varchar" })
  nickname: string;

  @Column({ type: "varchar", nullable: true })
  password: string;

  @Column({ type: "varchar" })
  email: string;

  @Column({ type: "varchar", nullable: true })
  image: string;

  @Column({ type: "simple-array", nullable: true })
  medal: string[];

  @Column({ type: "simple-array", nullable: true })
  log: string[];

  // @Column({ type: "varchar", nullable: true })
  // token: number;

  @Column({ type: "varchar", nullable: true })
  oauth: string;

  // @Column({ type: "boolean", nullable: true })
  // isauth: boolean;

  @Column({ type: "int", nullable: true })
  crewId: number;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @ManyToOne((type) => Crew, (crew) => crew.users)
  crew: Crew;
}
