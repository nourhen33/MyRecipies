const {check, validationResult}=require("express-validator");


exports.registerRules=()=>
    [
     check("name","name is required").notEmpty(),
     check("lastname","lastname is required").notEmpty(),
    check("email","email is required").notEmpty(),
    check("email","check email again").isEmail(),
    check("password","password is required").isLength({
        min: 6,
        max:20,
    })
];

exports.loginRules = () => [
  check("email", "name is required").notEmpty(),
  check("email", "check email again").isEmail(),
  check(
    "password",
    "password must be between 6 character and 20 character"
  ).isLength({
    min: 6,
    max: 20,
  }),
];
// Validation recettes 
exports.recetteRules = () => [
  check("titre", "Le titre est obligatoire").notEmpty(),
  check("description", "La description est obligatoire").notEmpty(),
];

// Validation commentaires 
exports.commentRules = () => [
  check("text", "Le commentaire est obligatoire").notEmpty(),
];
exports.isAdmin = (req, res, next) => {
  if (!req.user || req.user.role !== "admin") {
    return res.status(403).json({ message: "Accès refusé : admin uniquement" });
  }
  next();
};


//  Middleware pour gérer les erreurs 
exports.validation = (req, res, next) => {
  const errors = validationResult(req);
  
  if (!errors.isEmpty()) {
    return res.status(400).send({
      errors: errors.array().map((el) => ({
        msg: el.msg,
      })),
    });
  }
  next();
};