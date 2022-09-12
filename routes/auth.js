import  express  from "express";
import User from "../models/User.js"
import bcrypt from "bcrypt";
const router = express.Router();

//Register 
router.post("/register", async ( req, res) => {
    try {
        //Generate New Password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(req.body.password, salt);
        //Create New User
        const newUser = new User({
            username : req.body.username,
            email : req.body.email,
            password : hashedPassword
        });
        //Save User And Respond
        const user = await newUser.save();
        res.status(200).json(user);
    } catch (error) {
        console.log(error);
        res.status(400 ).json(error)
    }
        
});

//Login
router.post("/login", async (req,res) => {
    try {
        const user = await User.findOne({email : req.body.email});
        !user && res.status(404).json("Email Not Found");

        const validPassword = await bcrypt.compare(req.body.password, user.password);
        !validPassword && res.status(404).json("Wrong Password");

        res.status(200).json(user);
    } catch (error) {
        res.status(500).json(error);
    }
})

export default router