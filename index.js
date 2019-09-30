const express = require('express');
const Mongo = require('./Mongo.js');

const MongoClient = require('mongodb').MongoClient;

const app = express();
const port = 3000;

const mongoDb = new Mongo();

crearCors(app);

// methods http
app.get('/leerPreNoticias', function (req, res) {
	mongoDb.leerPreNoticias(res);
});

app.get('/leerNoticia', function (req, res) {
	mongoDb.leerNoticia(res, req.query.id); 
});

app.post('/guardarNoticia', function (req, res) {
  	// FALTA
});

app.delete('/borrarNoticia', function (req, res) {
	// FALTA
});


app.listen(port, '192.168.100.33', () => console.log("OK"));

// Inicia el protocolo para conectar diferentes servidores
function crearCors(app) {
	// cors
	app.use((req, res, next) => {
		res.header('Access-Control-Allow-Origin', '*');
		res.header('Access-Control-Allow-Headers', 
			'Authorization, X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Allow-Request-Method');
		res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE');
		res.header('Allow', 'GET, POST, OPTIONS, PUT, DELETE');
		next();
	});
}


