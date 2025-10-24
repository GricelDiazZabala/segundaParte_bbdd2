/*
================================================================
EJERCICIO 3: Insertar libros
Dada una colección llamada libros que almacena información de libros en
una biblioteca, cada documento contiene:
titulo: título del libro
autor: autor del libro
genero: género del libro (ficción, no ficción, ciencia, etc.)
paginas: cantidad de páginas
Consignas:
Encontrar el número mínimo de páginas entre todos los libros.
Calcular el número promedio de páginas.
Mostrar los libros ordenados por número de páginas de mayor a menor.
Mostrar el libro con más páginas por cada género.
Resolver usando .toArray()
================================================================
*/

//load("JavaScriptEnMongoShell\insertLibros.js")

//use LIBROS

print("--- Número Mínimo de Páginas ---");
let arrayMin = db.libros.find().sort({ paginas: 1 }).limit(1).toArray();
if (arrayMin.length > 0) {
  print("El número mínimo de páginas es: " + arrayMin[0].paginas);
}

print("\n--- Número Promedio de Páginas ---");
let librosArray = db.libros.find().toArray();
let totalPaginas = 0;

if (librosArray.length > 0) {
  for (let i = 0; i < librosArray.length; i++) {
    totalPaginas += librosArray[i].paginas;
  }
  print("El número promedio de páginas es: " + (totalPaginas / librosArray.length));
} else {
  print("No hay libros para calcular el promedio.");
}


print("\n--- Libros Ordenados (mayor a menor) ---");
let librosOrdenados = db.libros.find().sort({ paginas: -1 }).toArray();
for (let i = 0; i < librosOrdenados.length; i++) {
  printjson(librosOrdenados[i]);
}

print("\n--- Libro con más páginas por género ---");
let genero = db.libros.aggregate([{$group : {_id : "$genero"}}]);
let masPaginasArray = db.libros.aggregate([{$match : {genero : genero._id}},{$project : {titulo: 1,autor:1, paginas:1, genero:1,_id:0}},{$sort : {paginas : -1}},{$limit : 1}]).toArray();
for (let i = 0; i < masPaginasArray.length; i++) {
  let item = masPaginasArray[i];
  print("Género: " + item._id);
  printjson(item.libro);
}
