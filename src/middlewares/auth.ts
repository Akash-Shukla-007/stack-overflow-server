import jwt from "jsonwebtoken";
interface JwtPayload {
  id: string;
}
const secureAuth = (req: any, res: any, next: any) => {
  try {
    const token = req.headers.authorization.split(" ")[1];
    const { id } = jwt.verify(token, process.env.JWT_SECRET!) as JwtPayload;
    req.userId = id;
    next();
  } catch (error: any) {
    // console.log(error);
    res.status(400).json({ message: error.message });
  }
};

export { secureAuth };
