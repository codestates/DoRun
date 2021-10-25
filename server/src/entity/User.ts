import {BaseEntity,Entity, PrimaryGeneratedColumn, Column,CreateDateColumn,UpdateDateColumn,ManyToOne} from "typeorm";
import {Crew} from "./Crew"

@Entity()
export class User extends BaseEntity {

    @PrimaryGeneratedColumn({ type: 'int' })
    id: number;

    @Column({ type: 'varchar'})
    nickname: string;

    @Column({ type: 'varchar'})
    password: string;

    @Column({ type: 'varchar' })
    email: string;

    @Column({ type: 'varchar' ,nullable:true})
    image: string;

    @Column({ type: 'simple-array' ,nullable:true})
    medal: string[];

    @Column({ type: 'simple-array' ,nullable:true})
    log: string[];

    @Column({ type: 'varchar' ,nullable:true})
    token: number;

    @CreateDateColumn()
    createdAt: Date;

    @UpdateDateColumn()
    updatedAt: Date;

    @ManyToOne(type => Crew, crew => crew.users)
    crew: Crew;

}
