import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from "typeorm"
import { UserEntity } from "./user.entity"

@Entity()
export class TaskEntity {
    @PrimaryGeneratedColumn()
    id: number

    @Column()
    taskName: string

    @Column({ type: 'boolean', default: false})
    isDone: boolean

    @Column({default: 4})
    priority: number

    @ManyToOne(() => UserEntity, (user) => user.tasks)
    user: UserEntity

}
