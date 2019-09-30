const MongoClient = require('mongodb').MongoClient;
var ObjectID = require('mongodb').ObjectID;

class Mongo {
	constructor(){}
	
	leerPreNoticias (req) {
		const client = new MongoClient( this.obtenerUrl(), { useNewUrlParser: true, 
			useUnifiedTopology: true });
		
		client.connect(err => {
			var db = client.db( this.nombreDB() );
			db.collection( this.nombreColeccion() ).find({}).project( this.seleccionCamposPre() ).
				toArray().then(data => {
					if ( data === undefined || data == null) {
						req.send([]);	
					} else {
						req.send(data);
					}
					client.close();
			});
		});
	};

	leerNoticia (req, identificador) {
		const client = new MongoClient( this.obtenerUrl(), { useNewUrlParser: true, 
			useUnifiedTopology: true });
		
		client.connect(err => {
			var db = client.db( this.nombreDB() );
			db.collection( this.nombreColeccion() ).find({ _id: new ObjectID(identificador) }).
				toArray().then(data => {
					req.send(data);
					client.close();
			});
		});
	};	

	ingresarNoticas(stringJson) {
		const client = new MongoClient(this.obtenerUrl(), { useNewUrlParser: true, 
			useUnifiedTopology: true });
		
		const objeto = JSON.parse(stringJson); // convertir a objeto

		client.connect(err => {
			const collection = client.db( this.nombreDB() ).collection( this.nombreColeccion() ).
				insertOne( objeto );
			client.close();
		});
	}	
	// No utilizada
	modificarNoticia() {
		const client = new MongoClient(this.obtenerUrl(), { useNewUrlParser: true, 
			useUnifiedTopology: true });
		client.connect(err => {
			client.db( this.nombreDB() ).collection( "noticias" ).
				updateOne( { lugar: 'Manta' }, {
					$set: { "imagen": "basura-29-09-2019"}
				});
			client.close();
		});
	}

	obtenerUrl() { return "mongodb://localhost:27017/"; }
	nombreDB(){ return "noticieroToday"; }
	nombreColeccion(){ return 'noticias'; }
	seleccionCamposPre() { return { contenido: 0, etiquetas: 0 }; }
}

module.exports = Mongo;
 