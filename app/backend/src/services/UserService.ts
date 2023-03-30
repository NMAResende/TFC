import * as bcrypt from 'bcryptjs';
import { ModelStatic } from 'sequelize';
import Users from '../database/models/UsersModel';
import { IUsers } from '../interfaces/IUser';
import { IUserLogin } from '../interfaces/IUserLogin';
import { createJWT } from '../utils/JWTAuth';

export default class UserService {
  constructor(protected model: ModelStatic<Users> = Users) { }

  public async login(userData: IUserLogin): Promise<string | boolean> {
    const user = await this.model.findOne({ where: { email: userData.email } });
    if (!user) return false;
    // referencia: https://github.com/dcodeIO/bcrypt.js
    const passwordDecrypting = bcrypt.compareSync(userData.password, user.password);
    if (!passwordDecrypting) return false;

    const { id, username, role, email } = user;

    return createJWT({ id, username, role, email });
  }

  public async role(userRole: IUsers) {
    const roleUser = await this.model.findOne({ where: { role: userRole.role } });

    if (!roleUser) return false;

    return roleUser;
  }
}
