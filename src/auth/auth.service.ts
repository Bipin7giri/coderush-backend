import { ApiSuccessStatus } from "../constant/message.constant";
import { UserRole } from "../enum/user-role.enum";
import { Role } from "../roles/roles.entity";
import { User } from "../users/user.entity";
import { comparePassword, generateHashPassword } from "../utils/hashpassword";
import { generateToken } from "../utils/jwt";
import { Request, Response } from "express";
interface RegisterUserIF {
  email: string;
  password: string;
  position: string;
  address: string;
  links: string[];
}

export class AuthService {
  constructor(
    private readonly userModel = User,
    private readonly roleModel = Role,
  ) {}
  async registerUser(data: RegisterUserIF): Promise<string> {
    try {
      const hashedPassword: any = await generateHashPassword(data.password);
      const user = await this.userModel.create({
        email: data.email,
        password: hashedPassword,
        position: data.position,
        address: data.address,
        links: data.links,
      });
      await this.roleModel.findOneAndUpdate(
        {
          name: UserRole.USER,
        },
        {
          $push: { users: user },
        },
      );
      return ApiSuccessStatus.SUCCESS;
    } catch (error) {
      console.log(error);
      throw new Error("Something went wrong");
    }
  }
  async login({
    email,
    password,
    res,
  }: {
    email: string;
    password: string;
    res: Response;
  }): Promise<void> {
    try {
      try {
        const user: any = await this.userModel
          .findOne({
            email: email,
          })
          .populate("roles");
        if (user) {
          const checkPassword: boolean = await comparePassword(
            user.password,
            password,
          );
          if (checkPassword) {
            const accessToken: any = await generateToken(user);

            res.json({
              access_token: accessToken,
              message: "Login successful !!",
              status: 200,
            });
          } else {
            res.status(401).json({
              message: "Invalid password !!",
              status: 404,
            });
          }
        } else {
          res.status(401).json({
            message: "No email found or Blocked",
            status: 404,
          });
        }
      } catch (err: any) {
        res.status(422).send({ error: true, message: err.message });
      }
    } catch (err: any) {
      res.status(422).send({ error: true, message: err.message, status: 422 });
    }
  }
}
