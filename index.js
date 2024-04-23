const express   = require("express");
const app       = express();
const http      = require("http").createServer(app);
const cors      = require("cors");
const mongoose  = require("mongoose")

// controlllers
const UsrController     = require('./controllers/user')
const PelucheController = require('./controllers/peluches')
const AuthController    = require('./controllers/auth')

// Middleware
const Middleware = require('./middleware/auth-middleware');

app.use(express.json())

require('dotenv').config();
const PORT = process.env.PORT || 8050;

// conectar mongodb
const { MongoClient, ServerApiVersion } = require('mongodb');
const uri = process.env.URI


mongoose
  .connect(uri, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log("connected");
  })
  .catch((err) => console.log(err));

app.use(cors());
app.use(express.json());

/*
  Login de usuario
*/

app.post("/auth/login", async (req,res) => {

  const email = req.body.email;
  const password = req.body.password;
  try{
    const result = await AuthController.login(email,password);
    if(result){
      res.status(200).json(result);
    }else{
      res.status(401).send("No puede estar aqui")
    }
  }catch(error){
      res.status(500).send("Error");
  }  
})

// crear usuarios
app.post('/usuarios', async (req, res) => {
    let name        = req.body.name;
    let lastname    = req.body.lastname;
    let email       = req.body.email;
    let password    = req.body.password;

    try{
      const result = await UsrController.addUser(name, lastname, email, password);
      
      if(result){
        res.status(201).send("Usuario creado correctamente"); // 201
      }else{
        res.status(409).send("El usuario ya existe"); // 409
      }  
    }catch(error){
      res.status(500).send("Error al crear el usuario."); //500
    }    
})


// crear peluches
app.post('/peluches', Middleware.verify, async (req, res) =>{
  let color             = req.body.color;
  let tipo              = req.body.tipo;
  let accesorio         = req.body.accesorio;
  let email_propietario = req.body.email_propietario;

  try{
    const result = await PelucheController.addPeluche(color, tipo, accesorio, email_propietario);

    if(result){
      res.status(201).send("Peluche creado correctamente"); // 201
    }else{
      res.status(409).send("El usuario no existe"); // 409
    }  
  }catch(error){
    res.status(500).send("Error al crear el peluche."); //500
  }    
})

//obtener los peluches del usuario
app.get('/peluches/:email', Middleware.verify, async(req, res) =>{
  
  try{
    const results = await PelucheController.getPeluchesPropietario(req.params.email);
    res.status(200).json(results);

  }catch(error){
    res.status(500).send("Error. Intente mas tarde.")
  }
}) 

// Borrar peluche
app.delete('/peluches/:id', Middleware.verify, async(req, res) =>{

  try{
    const result = await PelucheController.deletePeluche(req.params.id);
    if(result){
      res.status(200).send("Peluche borrado.")
    }else{
      res.status(404).send("No se ha podido eliminar el peluche.")
    }  

  }catch(error){
    res.status(500).send("Error")
  }

});

// Actualizar peluche
app.put('/peluches/:id', Middleware.verify, async (req, res) => {
  const peluche = {_id: req.params.id, ...req.body};
  try{
      
    const result = await PelucheController.updatePeluche(peluche);
    if(result){
      res.status(200).json(result);
    }else{
      res.status(404).send("El peluche no existe.");
    }  
  }catch(error){  
     res.status(500).send("Error"); 
  } 

})


// top de los 3 peluches mas elegidos
app.get('/peluches', async(req, res) => {

  const results = await PelucheController.getTopPeluches();
  res.status(200).json(results);

})


http.listen(PORT, ()=>{
    console.log(`server corriendo ${PORT}`)
})