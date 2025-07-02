import { Iuser } from "../../models/users.models";

// Augment the Express namespace
declare global {
  namespace Express {
    interface Request {
      user?: Iuser;
      token?: string;
    }
  }
}

// Export an empty object to make this a module
export {};
