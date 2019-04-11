const mongoose = require('mongoose'); //ORM - Object Relational Mapping
const URL_MONGO = "mongodb+srv://dany:perrito123@cluster0-ijbr8.mongodb.net/test?retryWrites=true";

mongoose.connect(URL_MONGO,(err)=>{
    err ? console.log('Algo falló:',err) : console.log('Conexión a Mongo exitosa');
});

const Schema = mongoose.Schema;

const peliSchema = new Schema({
    titulo: String,
    anio: String,
    sinopsis: {
        type: String
    },
    duracion: {
        type: Number,
        default: 90
    },
    genero: {
        type: String,
        enum: ['TERROR','DRAMA','SCIFI'],
        required: true
    },
    portadas:[String],
    directores:{
        type:[{
            name: String,
            edad: Number,
            nacionalidad: {
                type: String, 
                enum: ['MX','US','OT'],
                required: true
            }
        }]
    }
},{timestamps: true});

const Pelicula = mongoose.model('Pelicula', peliSchema);

module.exports = {Pelicula};