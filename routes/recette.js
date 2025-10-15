
const express=require("express");
const Recette = require("../models/recette");
const isAuth = require("../middleware/passport");
const recetteRouter = express.Router();
const {  isAdmin,recetteRules, commentRules, validation } = require("../middleware/validator");

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


// Ajouter un commentaire
recetteRouter.post("/:id/comment", isAuth(), commentRules(), validation,  async (req, res) => {
  try {
    const recette = await Recette.findById(req.params.id);
    if (!recette) return res.status(404).send({ msg: "Recette non trouvée" });

    // Ajouter le commentaire
    recette.comments.push({
      user: req.user.id,// req.user est fourni par Passport
      text: req.body.text,
    });

    await recette.save();

    // Retourner la recette mise à jour
    const updatedRecette = await Recette.findById(req.params.id).populate("comments.user", "name email");
    res.send({ recipe: updatedRecette, msg: "Commentaire ajouté !" });
  } catch (error) {
    res.status(500).send({ msg: "Erreur serveur" });
  }
});



module.exports=recetteRouter;

