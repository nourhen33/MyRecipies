const express =require("express");
const app = express();
const cors=require("cors");



const connectDB =require("./connectdb");

require("dotenv").config();
connectDB();







const recetteRouter = require('./routes/recette');
const userRouter = require('./routes/user');


app.use(express.json());
app.use(cors());
app.use('/recette', recetteRouter);
app.use('/user',userRouter)
app.listen(process.env.PORT, (err)=>err?console.log(err):console.log("server is runing"));