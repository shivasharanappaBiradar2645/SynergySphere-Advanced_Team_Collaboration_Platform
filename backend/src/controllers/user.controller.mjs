import { db } from "../db/db.mjs";
import { users } from "../db/schema.mjs";
import { eq } from "drizzle-orm";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import config from "../config.mjs";



export const register = async(req,res)=>{
try{
    const {name,email, password} = req.body;
    const existing = await db.select().from(users).where(eq(users.email,email));
    if (existing.length > 0){
        return res.status(400).json({success: false, error:"Email already exists"});
    }
    const hashed = await bcrypt.hash(password,10);
    await db.insert(users).values({name,email,passwordHash: hashed});
    return res.json({success: true, message: "successful"});

}catch(err){
    res.status(500).json({success: false, error: err.message});
}
};


export const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const [user] = await db.select().from(users).where(eq(users.email, email));
    if (!user) return res.status(401).json({ success: false, error: "Invalid credentials" });

    const match = await bcrypt.compare(password, user.passwordHash);
    if (!match) return res.status(401).json({ success: false, error: "Invalid credentials" });

    const token = jwt.sign({ id: user.id, email: user.email }, config.JWT_SECRET_KEY, { expiresIn: "1d" });

    res.json({ success: true, data: { token, user: { id: user.id, name: user.name, email: user.email } } });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
};

export const getAllUsers = async (req, res) => {
    try {
        const allUsers = await db.select({id: users.id, name: users.name, email: users.email}).from(users);
        res.json({ success: true, data: allUsers });
    } catch (err) {
        res.status(500).json({ success: false, error: err.message });
    }
};

