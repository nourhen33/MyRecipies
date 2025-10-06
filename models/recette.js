const mongoose = require("mongoose");
const schema=mongoose.Schema;


const recetteSchemma = new schema({
  titre: { type: String, required: true }  ,     
  description: String,    
  country: String, 
  imageUrl: String,      
  ingredients:[String],
  steps:[String], 
  materiels: [String], 
  chefId: { type: mongoose.Schema.Types.ObjectId, ref: "User" }, 
  isApproved: { type: Boolean, default: false }     
});


const Recette = mongoose.model("recette",recetteSchemma);
module.exports =  Recette;
