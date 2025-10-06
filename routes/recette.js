
const express=require("express");
const Recette = require("../models/recette");
const recetteRouter = express.Router();

//get recette
recetteRouter.get("/",async(req,res)=>{
    try {
        
        let result=await Recette.find();
        res.send({recette:result, msg:"get a recette"})   
    } catch (error) {
        console.log(error);
        
    }
})


//add  recette
recetteRouter.post("/add", async(req,res)=>{

    try {
         let newrecette = new Recette(req.body);
         let result=await newrecette.save();
         res.send({recette:result,msg:"recette is added"})

        
    } catch (error) {
        console.log(error);
        
    }
})

//delet  recette
recetteRouter.delete("/:id",async(req,res)=>{
    try {
        
        let result=await Recette.findByIdAndDelete(req.params.id);
        res.send({ msg:"recette is deleted"})   
    } catch (error) {
        console.log(error);
        
    }
})




//update  recette
recetteRouter.put("/:id",async(req,res)=>{
    try {
        
        let result=await Recette.findByIdAndUpdate({_id:req.params.id},{$set:{...req.body}});
        res.send({recette:result, msg:"recette is updated"})   
    } catch (error) {
        console.log(error)
        ;
    }
})





module.exports=recetteRouter;

