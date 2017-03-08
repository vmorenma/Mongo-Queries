//Mostrar el número de libros publicados por año de publicación

db.books.aggregate(
    [
        {
            $group:
            {
                _id: '$publicationYear',
                totalBooks:{$sum:1},
            }
        },
        { $sort : { totalBooks : -1} }
    ]
);
/*
#################################################################################################################################
*/
//Mostrar una colección de las tags usadas y el número de libros que contiene cada tag

db.books.aggregate(
    [
        {
            $unwind:'$tags'
        },
        {
            $group:
            {
                _id:'$tags',
                books:{$sum:1}
            }
        },
        {
            $sort:{books:-1}
        }
    ]
);

/*
#################################################################################################################################
//Mostrar los tags usados junto al número de libros y listado de libros
*/

db.books.aggregate(
    [
        {
            $unwind:'$tags'
        },
        {
            $group:
            {
                _id:'$tags',
                books:{$sum:1},
                listBooks:{$push:'$title'}
            }
        },
        {
            $sort:{books:-1}
        }
    ]
);


/*
#################################################################################################################################
*/
//Mostrar los libros junto a su numero de tags

db.books.aggregate(
    [
        {
            $unwind:'$tags'
        },
        {
            $group:
            {
                _id:'$title',
                tags:{$sum:1}
            }
        },
        {
            $sort:{tags:-1}
        }
    ]
);

/*
#################################################################################################################################
*/
//Mostrar los libros junto a su numero de autores

db.books.aggregate(
    [
        {
            $unwind:'$author'
        },
        {
            $group:
            {
                _id:'$title',
                authors:{$sum:1}
            }
        },
        {
            $sort:{authors:-1}
        }
    ]
);

/*
#################################################################################################################################
*/
//Mostrar los autores junto al número de libros publicados y el correspondiente listado de libros

db.books.aggregate(
    [
        {
            $unwind:'$author'
        },
        {
            $group:
            {
                _id:'$author',
                books:{$sum:1},
                listBooks:{$push:'$title'}

            }
        },
        {
            $sort:{books:-1}
        }
    ]
);