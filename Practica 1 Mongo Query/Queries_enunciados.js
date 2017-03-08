//Buscar los estudiantes de género masculino
db.students.find({"gender": "H"})
db.students.find({"gender": "H"}).count()
db.students.count({"gender": "H"})
//-->2895

//Buscar los estudiantes de género femenino
db.students.find({"gender": "M"})
db.students.find({"gender": "M"}).count()
db.students.count({"gender": "M"})
//-->348

//Buscar los estudiantes nacidos en el año 1993
db.students.find({"birth_year" : 1993})

//Buscar los libros cuyo precio esté expresado en USD
db.books.find({"price.currency": "USD"})
//-->333

//Buscar los estudiantes de género masculino y nacidos en el año 1993
db.students.find({"gender": "H", "birth_year": 1993})

//Buscar los estudiantes nacidos en la década de los 90
db.students.find({"birth_year": {$gte: 1990, $lt: 2000}})


//Buscar los estudiantes de género masculino nacidos en la década de los 90
db.students.find({$and: [{gender: "H"}, {"birth_year": {$gte: 1980, $lt: 1990}}]})

//Buscar los estudiantes de género femenino nacidos en la década de los 90
db.students.find({$and: [{gender: "M"}, {"birth_year": {$gte: 1980, $lt: 1990}}]})

//Buscar los estudiantes nacidos en la década de los 80
db.students.find({"birth_Year": {$gte: 1980, $lt: 1990}})

//Buscar los estudiantes de género masculino nacidos en la década de los 80
db.students.find({$and: [{gender: "H"}, {"birth_year": {$gte: 1980, $lt: 1990}}]})


//Buscar los libros con el tag html5
db.books.find({"tags": {$in: ["html5"]}})


//Buscar los libros con el tag html
db.books.find({"tags": "html"})


//Buscar los libros con el tag html, html5, css o css3
db.books.find({"tags": {$in: ["html","html5","css","css3"]}})
db.books.find({$or: [{"tags": "html"},{"tags": "html5"},
                     {"tags": "css"},{"tags": "css3"}]})


//Buscar los libros que no tengan el tag html, html5, css o css3
db.books.find({"tags": {$nin: ["html","html5","css","css3"]}})


//Buscar los libros que tengan el tag 'programming' y 'agile'
db.books.find({ $and: [ {"tags":"programming"}, {"tags":"agile"}]})


//Buscar los estudiantes que no han nacido en el año 1985
db.students.find({"birth_year": {$nin : [1985]}})

//Buscar aquellos estudiantes que hayan nacido en el año 1970, 1980 o 1990
db.students.find({"birth_year": {$in : [1970,1980,1990]}})


//Buscar aquellos estudiantes que no hayan nacido en el año 1970, 1980 o 1990
db.students.find({"birth_year": {$nin : [1970,1980,1990]}})



//Buscar los estudiantes nacidos en año par
 db.students.find ( { "birth_year" : { "$mod" : [ 2, 0 ] } } )


//Buscar estudiantes nacidos en año par de la decada de los 70 que sean de genero masculino
db.students.find({$and: [{gender: "H"}, {"birth_Year": {$mod: [2, 0], $gte: 1970, $lt: 1980}}]})
db.students.find({gender: "H", "birthYear": {$mod: [2, 0], $gte: 1970, $lt: 1980}})
//-->403

//Buscar los estudiantes nacidos en año impar
db.students.find({"birthYear": {$mod: [2, 1]}})


//Buscar los estudiantes que tengan teléfono auxiliar
db.students.find({"phone_aux": {$exists: true}})


//Buscar los estudiantes que no tengan segundo apellido
db.students.find({"lastname2": {$exists: true}})


//Buscar los estudiantes que tengan teléfono auxiliar y solo un apellido
db.students.find({$and:[{"lastname2": {$exists: true}},{"phone_aux": {$exists: true}}]})


//Buscar los libros escritos por 2 autores
db.books.find( { author: {$size: 2} } )

//Buscar los estudiantes cuyo email termine en .net
db.students.find({"email": /\.net$/i})

//Buscar los estudiantes cuyo email termine en .org
db.students.find({"email": /\.org$/i})
//-->16

//Buscar los estudiantes cuyo nombre empiece por vocal
db.students.find({"firstname": /^[aeiouàáèéíòóúù]{1}/i})

//Buscar los estudiantes con nombre más largo de 13 caracteres
db.students.find({"firstname": /^.{13,}$/}).count()

//Buscar los estudiantes con 3 o más vocales en su nombre
db.students.find({"firstname": /^.*[aeiouàáèéíòóúù]{1}.*[aeiouàáèéíòóúù]{1}.*[aeiouàáèéíòóúù]{1}.*$/i})

//Buscar los estudiantes cuyo dni empiece por letra
db.students.find({"dni": {$regex: /^[A-Z]{1}/i}})

//Buscar los estudiantes cuyo dni empiece y termine por letra
db.students.find({"dni": /^[A-Z]{1}.*[A-Z]{1}$/i})

//Buscar los estudiantes cuyo teléfono empiece por 622.
db.students.find({$or: [{"phone": /^6{1}2{1}2{1}/}, {"phone_aux": /^6{1}2{1}2{1}/}]})

//Eliminar los estudiantes con dni asignado a "NULL"
db.students.update({"dni": "NULL"}, 
                   {$unset:{"dni": ""}},
				   {"multi": true})

//Buscar los estudiantes que no tienen dni
db.students.find({"dni": {$exists: false}})				   
			
/*			
########################################################################
->Collection: bios (university)
*/

//Buscar aquellos desarrolladores que sigan vivos
db.bios.find(
    {
        death:{$exists:false}
    }
);

//Buscar aquellos desarrolladores que hayan obtenido un premio en el año 2002
db.bios.find({
    awards:{$elemMatch:{year:2002}}
});

//Buscar aquellos desarrolladores que hayan obtenido algun premio entre el año 1995 y 2000
db.bios.find(
    {
        awards:{$elemMatch:{year:{$gte:1995,$lte:2000}}}
    }
);

//Buscar aquellos desarrolladores que hayan obtenido exactamente 3 premios
db.bios.find(
    {
        awards:{$size:3}
    }
);

//Buscar aquellos desarrolladores que hayan realizado contribuciones en OOP
db.bios.find(
    {
        contribs:"OOP"
    }
);

//Buscar aquellos desarrolladores que hayan realizado contribuciones en OOP o Java
db.bios.find(
    {
        $or:
        [
            {contribs:"OOP"},
            {contribs:"Java"}
        ]
    }
);

//Buscar aquellos desarrolladores que hayan realizado contribuciones en OOP y Simula
db.bios.find(
    {
        $and:
        [
            {contribs:"OOP"},
            {contribs:"Simula"}
        ]
    }
);

/*
->Collection: tweets (twitter)
*/
//Mostrar todos los tweets publicados usuarios con más de 100 followers
db.tweets.find({$where: function() { return ( this.user.followers_count > 100) }})

//Mostrar todos los tweets publicados por el usuario 'behcolin'
db.tweets.find({$where: function() { return ( this.user.screen_name == "behcolin") }})

/*
-->Collection: countries (geography)
*/
//Mostrar aquellos paises cuya moneda es el euro
db.countries.find({
    currency:"EUR"
});

//Mostrar aquellos paises donde el español es el idioma nativo
db.countries.find({
    nativeLanguage:"spa"
});

//Mostrar aquellos paises donde el español es lengua oficial
db.countries.find({
    languages:{spa:"Spanish"}
});



//Mostrar los tweets publicados por usuarios con el mismo numero de seguidores y amigos
db.tweets.find({$where: function() { return ( this.user.friends_count == this.user.followers_count ) }})
db.tweets.find({$where: "this.user.friends_count == this.user.followers_count " })
/*
---> Aggregation Framework (MongoDB 2.2)
*/
//Mostrar el número de tweets publicados por cada usuario
db.tweets.aggregate([{$group:{_id:"$user",numTweets:{$sum:1}}},{$sort:{numTweets:-1}}],{allowDiskUse:true});