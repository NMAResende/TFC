// import { ModelStatic } from 'sequelize';
// import Users from '../database/models/UsersModel';
// import { IUserLogin } from '../interfaces/IUserLogin';
// import { createJWT } from '../utils/JWTAuth';

// export default class UserService {
//   protected model: ModelStatic<Users> = Users;

//   public async login(userData: IUserLogin): Promise<string | null> {
//     const users = this.model.findOne({ where: { email: userData.email } });
//     // referencia: https://github.com/dcodeIO/bcrypt.js
//     const passwordDecrypting = bcrypt.compareSync(userDatea.password, users.password)
//   }
// }
