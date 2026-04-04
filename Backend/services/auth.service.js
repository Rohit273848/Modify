import bcrypt from "bcrypt";
import userModel from "../models/auth.models.js";
import blacklistModel from "../models/token.model.js";

export const registerUser = async ({ username, email, password }) => {

  const isAlreadyExist = await userModel.findOne({
    $or: [{ email }, { username }],
  });

  if(isAlreadyExist){
    throw new Error("User with this email or username already exists");
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  const user = await userModel.create({
    username,
    email,
    password: hashedPassword,
  });

  return user;
};

export const loginUser = async (identifier, password) => {
  const isEmail = identifier.includes("@");

  const user = await userModel.findOne(
    isEmail
      ? { email: identifier }
      : { username: identifier }
  ).select("+password");

  if (!user) {
    throw new Error("Invalid credentials");
  }

  const isMatch = await bcrypt.compare(password, user.password);

  if (!isMatch) {
    throw new Error("Invalid credentials");
  }

  return user;
};


export const getMeService = async (id)=>{
  const user = await userModel.findById(id);
  if(!user){
    throw new Error("User not found");
  }
  return user;
}

export const logoutService = async (token)=>{
 if(!token){
  throw new Error("No token provided");
 }

 await blacklistModel.create({ token });

 return true;

}
