import {BaseEntity,Entity, PrimaryGeneratedColumn, Column,CreateDateColumn,UpdateDateColumn,OneToMany} from "typeorm";
import {User} from "./User"

@Entity()
export class Crew extends BaseEntity {

    @PrimaryGeneratedColumn({ type: 'int' })
    id: number;

    @Column({ type: 'varchar'})
    title: string;

    @Column({ type: 'int'})
    desc: number;

    @Column({ type: 'varchar' })
    recruit: number;

    @Column({ type: 'varchar' })
    level: number;

    @Column({ type: 'varchar' })
    time: number;

    @Column({ type: 'varchar' })
    location: number;

    @CreateDateColumn()
    createdAt: Date;

    @UpdateDateColumn()
    updatedAt: Date;

    @OneToMany(type=> User, (user) => user.crew)
    users: User[];
}