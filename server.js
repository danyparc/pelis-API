const express = require('express');
const bodyParser = require('body-parser');
const { Pelicula } = require('./models/Pelicula');
const cors = require('cors');
const PORT = process.env.PORT || 3000;

const app = express();

app.use(cors({
    'allowedHeaders': ['sessionId', 'Content-Type'],
    'exposedHeaders': ['sessionId'],
    'origin': '*',
    'methods': 'GET,HEAD,PUT,PATCH,POST,DELETE',
    'preflightContinue': false
  }));
app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());

app.get('/',(req, res)=>{
    res.status(200)
    .send({message: 'Hola desde desde el puerto 300'});
});

app.post('/pelicula',(req,res)=>{
    const pelicula = req.body;
    console.log('Este es el body\n',pelicula);
    const newPelicula = Pelicula(pelicula);
    newPelicula.save((err, pelicula)=>{
        err ? res.status(409).send(err) :
        res.status(201).send(pelicula);
    })
});

//Obtener una sola pelicula
app.get('/pelicula/:id',(req,res)=>{
    const {id} = req.params;
    Pelicula.findById(id, (err, peli)=>{
        err ? res.status(500).send(err) : res.send(peli);
    });
});

//Obtener peliculas
app.get('/pelicula',(req,res)=>{
    Pelicula.find((err, pelis)=>{
        err ? res.status(500).send(err) 
            : res.status(200).send(pelis);
    });
});

//Modificar Pelicula (PUT)
app.put('/pelicula/:id',(req, res)=>{
    const {id} = req.params;
    
    // VALIDACIONES DE DATOS

    Pelicula.findByIdAndUpdate(id,{$set: req.body},(err, pelicula)=>{
        err ? res.status(500).send(err) : res.send(pelicula)
    })
})

//Busqueda
app.get('/buscar',(req, res)=>{
    const {titulo, anio, genero} = req.query;
    console.log(req.query, titulo);
    
    if(titulo){
        Pelicula.findOne({titulo: titulo},(err, peli)=>{
            err ? res.status(500).send(err) : res.send(peli);
        });
    }
})


app.listen(PORT,()=>{
    console.log('Servidor iniciado en puerto ', PORT);
})