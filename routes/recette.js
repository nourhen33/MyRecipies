
const express=require("express");
const Recette = require("../models/recette");
const isAuth = require("../middleware/passport");
const recetteRouter = express.Router();
const {  isAdmin,recetteRules, validation } = require("../middleware/validator");

//get recette
recetteRouter.get("/",async(req,res)=>{
    try {
        
        let result=await Recette.find();
        res.send({recette:result, msg:" recette recuperées"})   
    } catch (error) {
        console.log(error);
        
    }
})


//add  recette
recetteRouter.post("/add", isAuth(),recetteRules(),validation, async(req,res)=>{

    try {
          let newrecette = new Recette({
             ...req.body,    
             chefId: req.user.id, 
             isApproved: false    
         });
         let result=await newrecette.save();
         res.send({recette:result,msg:"recette is added"})

        
    } catch (error) {
        console.log(error);
        
    }
})

//delet  recette
recetteRouter.delete("/:id",isAuth(), async(req,res)=>{
    try {
        
        let result=await Recette.findByIdAndDelete(req.params.id);
        res.send({ msg:"recette is deleted"})   
    } catch (error) {
        console.log(error);
        
    }
})


//  Approuver une recette (uniquement admin)
recetteRouter.put("/approve/:id", isAuth(), isAdmin, async (req, res) => {
    try {
        const recette = await Recette.findByIdAndUpdate(
            req.params.id,
            { isApproved: true },
            { new: true }
        );
        res.send({ recette, msg: "Recette approuvée" });
    }catch (error) {
        console.log(error);
        
    }
});

//update  recette
recetteRouter.put("/:id", isAuth(),async(req,res)=>{
    try {
        
        let result=await Recette.findByIdAndUpdate({_id:req.params.id},{$set:{...req.body}});
        res.send({recette:result, msg:"recette is updated"})   
    } catch (error) {
        console.log(error)
        ;
    }
})






module.exports=recetteRouter;

