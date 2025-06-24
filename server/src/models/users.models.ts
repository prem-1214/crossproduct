import mongoose, { Schema, Document } from "mongoose";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { config } from "../config/config";

export interface Iuser extends Document {
  _id: string;
  username?: string;
  email: string;
  password: string;
  role: "user" | "seller" | "admin";
  isVarifiedSeller: boolean;
  refreshToken?: string;
  // method to compare input password while loging in
  comparePassword(inputPassword: string): Promise<boolean>;
  generateAccessToken(): string;
  generateRefreshToken(): string;
}

const userSchema = new Schema<Iuser>(
  {
    username: {
      type: String,
      unique: true,
      trim: true,
    },
    email: {
      type: String,
      unique: true,
      required: true,
      trim: true,
    },
    password: {
      type: String,
      required: [true, "Password is required"],
      minlength: 8,
      select: false, // prevent sending password in response until explicitly selected
    },
    role: {
      type: String,
      enum: ["user", "seller", "admin"],
      default: "user",
    },
    isVarifiedSeller: {
      type: Boolean,
      default: false,
    },
    refreshToken: {
      type: String,
      select: false,
      default: undefined,
    },
  },
  {
    timestamps: true,
    toJSON: {
      transform: function (doc, ret) {
        delete ret.password;
        delete ret.__v;
        return ret;
      },
    },
    toObject: {
      // delete password from response and convert response to plainobject
      transform: function (doc, ret) {
        delete ret.password;
        delete ret.__v;
        return ret;
      },
    },
  }
);

// pre save hook to hash modified password before saving to db. if modified it will hash
userSchema.pre("save", async function (this: Iuser, next) {
  if (!this.isModified("password")) return next();
  this.password = await bcrypt.hash(this.password, 10);
  next();
});

// add comparePassword method to userschema
userSchema.methods.comparePassword = async function (
  this: Iuser,
  inputPassword: string
): Promise<boolean> {
  return await bcrypt.compare(inputPassword, this.password);
};

userSchema.methods.generateAccessToken = function (this: Iuser): string {
  return jwt.sign(
    {
      _id: this._id.toString(),
      username: this.username as string,
      email: this.email as string,
      role: this.role as string,
      isVarifiedSeller: this.isVarifiedSeller as boolean,
    },
    config.ACCESS_TOKEN_SECRET as string,
    { expiresIn: "1h" }
  );
};

userSchema.methods.generateRefreshToken = function (this: Iuser): string {
  return jwt.sign(
    {
      _id: this._id,
    },
    config.REFRESH_TOKEN_SECRET as string,
    {
      expiresIn: "1d",
    }
  );
};

const User = mongoose.model<Iuser>("User", userSchema);

export { User };
