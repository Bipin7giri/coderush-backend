import { Entity, Column, ManyToMany, JoinTable } from "typeorm";
import { User } from "./user.entity";
import { BaseEntity } from "../utils/databaseutils/base.entity";
import { UserRole } from "../enum/user-role.enum";
@Entity()
export class Role extends BaseEntity {
  @Column({
    type: "enum",
    enum: UserRole,
    default: UserRole.USER,
  })
  name: UserRole;
  @ManyToMany(() => User, (user) => user.roles)
  @JoinTable()
  users: User[];
}
