import {
  BaseEntity,
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  OneToOne,
  JoinColumn,
  ManyToOne,
} from "typeorm";
import { Crew } from "./Crew";

@Entity("chat")
export class Chat extends BaseEntity {
  @PrimaryGeneratedColumn({ type: "int" })
  id: number;

  @Column({ type: "varchar", nullable: true })
  message: string;

  @Column({ type: "varchar", nullable: true })
  nickname: string;

  @Column({ type: "boolean", nullable: true, default: false })
  serverMsg: boolean;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @Column({ type: "int", nullable: true })
  crewId: number;

  @Column({ type: "int", nullable: true })
  userId: number;

  // @OneToOne(() => Crew)
  // @JoinColumn()
  // crew: Crew;
  @ManyToOne((type) => Crew, (crew) => crew.chat)
  crew: Crew;
}
