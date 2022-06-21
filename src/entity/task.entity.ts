import { Entity, Column, PrimaryGeneratedColumn } from "typeorm"

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
}
