import jwt from "jsonwebtoken";
import User from "@models/user";

const auth = async (req: any, res: any, next: any) => {
  try {
    const token = req.header("Authorization").replace("Bearer ", "");
    const decoded = jwt.verify(token, process.env.SESSION_SECRET ?? "") as any;

    const user = await User.findOne({ _id: decoded._id, "tokens.token": token });

    if (user === null) throw new Error();

    req.token = token;
    req.user = user;
    next();
  } catch (err) {
    res.status(401).send({ error: "Please authenticate." });
  }
};

export default auth;
