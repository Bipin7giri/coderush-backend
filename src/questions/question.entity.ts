import { Entity, Column, ManyToMany } from "typeorm";
import { User } from "../users/user.entity";
import { BaseEntity } from "../utils/databaseutils/base.entity";
import { Difficulty } from "../enum/difficulty.enum";

@Entity()
export class Questions extends BaseEntity {
  @Column({ type: "varchar", length: 255 })
  title: string;

  @Column({ type: "text" })
  description: string;

  @Column({
    type: "enum",
    enum: Difficulty,
    default: Difficulty.Easy,
  })
  difficulty: Difficulty;

  @Column({ type: "text" })
  solution: string;

  @ManyToMany(() => User, (user) => user.questions)
  users: User[];
}
