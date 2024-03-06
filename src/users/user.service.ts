import { AppDataSource } from "../config/database.config";
import { User } from "../users/user.entity";
import { generateHashPassword } from "../utils/hashpassword";
import { UserCredential } from "./UserCredential.entities";
import { type Response } from "express";
import { Role } from "./roles.entity";
import { UserRole } from "../enum/user-role.enum";

export class UserService {
  constructor(
    private readonly userRepository = AppDataSource.getRepository(User),
    private readonly userCredentialRepository = AppDataSource.getRepository(
      UserCredential
    ),
    private readonly roleRepository = AppDataSource.getRepository(Role)
  ) {}

  async createAdmin({
    email,
    password,
    res,
  }: {
    email: string;
    password: string;
    res: Response;
  }): Promise<void> {
    try {
      // Find or create the admin role
      let adminRole = await this.roleRepository.findOne({
        where: { name: UserRole.ADMIN }, // Assuming UserRole.ADMIN exists
      });
      if (!adminRole) {
        adminRole = await this.roleRepository.save({ name: UserRole.ADMIN });
      }
      const checkIfEmailAlreadyExist: User | null =
        await this.userRepository.findOne({
          where: {
            email: email,
          },
        });
      if (checkIfEmailAlreadyExist != null) {
        res.status(401).json({
          message: "Admin Already Exists",
          status: 404,
        });
        return;
      }
      const hashedPassword: any = await generateHashPassword(password);
      const userCredentialId: UserCredential =
        await this.userCredentialRepository.save({
          password: hashedPassword,
        });
      await this.userRepository.save({
        email,
        userCredentialId: userCredentialId.id,
        roles: [adminRole],
      });
    } catch (err: any) {
      throw err.message;
    }
  }
}
