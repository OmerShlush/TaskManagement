import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from "typeorm"
import { User } from "./user.entity"

@Entity()
export class Task {
    @PrimaryGeneratedColumn()
    id: number

    @Column()
    TaskName: string

    @Column({ type: 'boolean', default: false})
    isDone: boolean

    @Column({default: 4})
    Priority: number

    @ManyToOne(() => User, (user) => user.tasks)
    user: User

}
