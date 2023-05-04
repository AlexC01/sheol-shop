/* eslint-disable @typescript-eslint/no-this-alias */
/* eslint-disable @typescript-eslint/strict-boolean-expressions */
import mongoose from "mongoose";
import validator from "validator";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

const userSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true },
    email: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      lowercase: true,
      validate(val: string) {
        if (!validator.isEmail(val)) {
          throw new Error("Email is invalid");
        }
      }
    },
    password: {
      type: String,
      required: true,
      trim: true,
      minlength: 6,
      validate(val: string) {
        if (val.toLowerCase().includes("password")) {
          throw new Error("Password cannot contain 'password'");
        }
      }
    },
    tokens: [{ token: { type: String, required: true } }],
    role: { type: String, required: false, default: "user" },
    avatar: { type: Buffer }
  },
  { toJSON: { virtuals: true }, timestamps: true }
);

userSchema.methods.toJSON = function () {
  const user = this;
  const userObject = user.toObject();

  delete userObject.password;
  delete userObject.tokens;

  return userObject;
};

userSchema.methods.generateAuthToken = async function () {
  const user = this;
  const token = jwt.sign({ _id: user._id.toString() }, "secret");
  user.tokens = [...user.tokens, { token }];
  await user.save();
  return token;
};

userSchema.statics.findByCredentials = async (email: string, password: string) => {
  const user = await User.findOne({ email });
  if (!user) throw new Error("Unable to login");
  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) throw new Error("Unable to login");
  return user;
};

userSchema.pre("save", async function (next) {
  const user = this;
  if (user.isModified("password")) {
    user.password = await bcrypt.hash(user.password, 8);
  }
  next();
});

const User = mongoose.model("User", userSchema);

export default User;
