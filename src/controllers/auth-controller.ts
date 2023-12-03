interface IUser {
  name: string;
  email: string;
  password: string;
}

import Database from "../config/db";

class AuthController {
  public getUsers = async () => {
    return await Database.prisma.user.findMany();
  };

  public signin = async ({ jwt, cookie, setCookie, body }: any) => {
    let userFound = await Database.prisma.user.findUnique({
      where: {
        email: body.email,
        password: body.password,
      },
    });
    if (!userFound) {
      return { success: false, message: "User not found" };
    }
    delete userFound.password;
    setCookie("auth", await jwt.sign(userFound), {
      httpOnly: true,
      maxAge: 7 * 86400,
    });
    return { success: true, user: userFound };
  };
  public signup = async ({ jwt, cookie, set, setCookie, body }: any) => {
    const userFound = await Database.prisma.user.findUnique({
      where: {
        email: body.email,
      },
    });
    if (userFound) {
      return { success: false, message: "User already signed up" };
    }
    const payload = {
      name: body.name,
      email: body.email,
      password: body.password,
    };
    const user = await Database.prisma.user.create({ data: payload });
    delete user.password;
    setCookie("auth", await jwt.sign(user), {
      httpOnly: true,
      maxAge: 7 * 86400,
    });
    set.status = 201;
    return { success: true };
  };
  public signout = async ({ jwt, cookie: { auth }, setCookie, body }: any) => {
    setCookie("auth", null, {});
    return { success: true, message: "User signed out" };
  };
  public profile = async ({ jwt, cookie: { auth }, setCookie, body }: any) => {
    const profile = await jwt.verify(auth);
    return { success: true, data: profile };
  };
}

export default AuthController;
