const express = require("express");
const app = express();
const http = require("http").createServer(app);

app.use(express.json())

require('dotenv').config();
const PORT = process.env.PORT || 8050;

// crear usuarios
app.post('/usuarios', (req, res) => {
    console.log(req.body)
    res.send("Llamada post: crear usuario");
})

// crear peluches
app.post('/peluches', (req, res) =>{
    console.log(req.body)
    res.send('Llamada post: crear peluche')
})

// lista de peluches
app.get('/peluches', (req, res) => {
    let resultado = {
        0:
        {
        "_id": 0,
        "tipo": "oso", 
        "color": "rosa", 
        "accesorios": "notebook" },
        1:
        {
        "_id": 1,
        "tipo": "gato", 
        "color": "verde", 
        "accesorios": "notebook" }
    }

    res.json({'peluches':resultado})


})


// lista de tipos de peluches
app.get('/tipos', (req, res) => {
    let resultado = {
        1:'perro', 
        2:'conejo', 
        3:'oso', 
        4:'mapache',
        5:'gato'
    }
    res.json({'tipos':resultado})
})

// lista de colores de peluches
app.get('/colores', (req, res) =>{
    let resultado = {
        1:'rosa', 
        2:'amarillo', 
        3:'verde'
    }

    res.json({'colores':resultado})
})

// lista de accesorios de peluches
app.get('/accesorios', (req, res) =>{
    let resultado = {
        1:'camiseta y pelota futbol', 
        2:'guitarra electrica', 
        3:'notebook'
    }
    
    res.json({'accesorios':resultado})
})

// actualizar peluche
app.put('/usuarios/:peluche:_id', (req, res) => {
        


})

http.listen(PORT, ()=>{
    console.log(`server corriendo ${PORT}`)
})