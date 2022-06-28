import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from "typeorm"
import { TaskEntity } from "./task.entity"

@Entity()
export class UserEntity {
    @PrimaryGeneratedColumn()
    id: number

    @Column()
    name: string

    @OneToMany(() => TaskEntity, (task) => task.user)
    tasks: TaskEntity[];

}
