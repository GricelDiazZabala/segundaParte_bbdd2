/*
Se tienen dos colecciones en MongoDB: bibliotecas y libros.
La colección bibliotecas contiene documentos con información sobre
bibliotecas, cada una con un _id y un nombre de la biblioteca.
La colección libros contiene documentos con información sobre libros,
cada uno con un _id, titulo, autor y idBiblioteca que referencia a la
biblioteca a la que pertenece el libro.
Objetivo:
Dado el título de un libro, determinar el nombre de la biblioteca donde
se encuentra ese libro
*/

db.bibliotecas.drop();
db.libros.drop();

db.bibliotecas.insertMany([
  { _id: 1, nombre: "Biblioteca Central" },
  { _id: 2, nombre: "Biblioteca Norte" },
  { _id: 3, nombre: "Biblioteca Sur" },
]);
db.libros.insertMany([
  { _id: 101, titulo: "El Quijote", autor: "Cervantes", idBiblioteca: 1 },
  {_id: 102,titulo: "Cien Años de Soledad",autor: "Gabriel García Márquez",idBiblioteca: 2},
  { _id: 103, titulo: "1984", autor: "George Orwell", idBiblioteca: 3 },
]);

print("Buscador de libros en bibliotecas: ");
let librosConBiblioteca = db.libros.aggregate([
    {$lookup: {from: "bibliotecas", localField: "idBiblioteca", foreignField: "_id", as: "infoBiblioteca"}},
    {$unwind: "$infoBiblioteca"},
    {$project: {_id: 0,titulo: 1,nombreBiblioteca: "$infoBiblioteca.nombre" }}
]);

librosConBiblioteca.forEach(function(libro) {
  print(`El libro "${libro.titulo}" está en la biblioteca: ${libro.nombreBiblioteca}`);
});
