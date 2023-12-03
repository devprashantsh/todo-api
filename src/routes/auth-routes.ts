import { Elysia } from "elysia";
import AuthController from "../controllers/auth-controller";
import authorize from "../middlewares/auth-handler";

class AuthRoutes {
  private authRoutes: Elysia;
  private authController: AuthController;
  constructor() {
    this.authController = new AuthController();
    this.authRoutes = new Elysia({ prefix: "/auth" } as any);
  }
  private defineRoutes() {
    this.authRoutes.post("/sign-in",(options) => this.authController.signin(options));
    this.authRoutes.post("/sign-up",(options) => this.authController.signup(options));
    this.authRoutes.post("/sign-out",(options) => this.authController.signout(options));
    this.authRoutes.post("/profile",(options) => this.authController.profile(options), {
        beforeHandle: [authorize]
    });
  }

  public getRoutes() {
    this.defineRoutes()
    return this.authRoutes;
  }
}

export default new AuthRoutes().getRoutes();;