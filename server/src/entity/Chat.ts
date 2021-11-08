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

@Entity()
export class Chat extends BaseEntity {
  @PrimaryGeneratedColumn({ type: "int" })
  id: number;

  @Column({ type: "varchar", nullable: true })
  message: string;

  @Column({ type: "varchar", nullable: true })
  nickname: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @Column({ type: "int", nullable: true })
  crewId: number;

  // @OneToOne(() => Crew)
  // @JoinColumn()
  // crew: Crew;
  @ManyToOne((type) => Crew, (crew) => crew.chat)
  crew: Crew;
}
