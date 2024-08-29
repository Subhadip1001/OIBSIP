import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import bcrypt from "bcrypt";
import dotenv from "dotenv";
import { UserModel } from "./module/index.js";
import session from "express-session";
import MongoStore from "connect-mongo";

dotenv.config()
const app = express();
const port = process.env.PORT

app.use(express.json());
app.use(cors(
    {
        origin: process.env.FRONTEND_URI,
        credentials: true
    }
));

mongoose.connect(process.env.MONGODB_URI)
.then(()=>console.log(`Connected to database`))
.catch((err)=>console.log(`Faild to connect to the database`, err))

app.use(session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitializes: true,
    store: MongoStore.create({
        mongoUrl: process.env.MONGODB_URI
    }),
    cookie: { maxAge: 24 * 60 * 60 * 1000}
}))


app.post("/signup", async(req, res)=>{
    try{
        const {name, number, email, password} = req.body;
        console.log(`${name} ${number} ${email} ${password}`);
        const existingUser = await UserModel.findOne({ email });
        if(existingUser){
            return res.status(400).json({ error: "Email already exists" });
        }
        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = new UserModel({ name, email, password: hashedPassword });
        const saveUser = await newUser.save();
        res.status(201).json(saveUser);
    }catch(error){
        res.status(500).json({err: error.message});
    }
});

app.post("/login", async(req, res) =>{
    try{
        const { email, password } = req.body;
        const user = await UserModel.findOne({email})
        if(user){
            const passwordMatch = await bcrypt.compare(password, user.password);
            if(passwordMatch){
                req.session.user = {id:user._id, name:user.name, number:user.number, email:user.email}
                res.status(200).json("Success");
            }else{
                res.status(401).json("Password does not match");
            }
        }else{
            res.status(401).json("No records found");
        } 
    }catch(error){
        res.status(500).json({error: error.message})
    }
    
});

app.listen(port, ()=>{
    console.log(`server is running at port ${port}`);
    console.log(`http://localhost:${port}`);
});

app.get('/user', (req,res) =>{
    if(req.session.user){
        res.json({user: req.session.user});
    }else{
        res.status(401).json("Not authenticated")
    }
});