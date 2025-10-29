//insert libros
db = db.getSiblingDB("LIBROS"); 
db.libros.drop();

db.libros.insertMany([
  {
    titulo: "Cien Años de Soledad",
    autor: "Gabriel García Márquez",
    genero: "Ficción",
    paginas: 417
  },
  {
    titulo: "Sapiens",
    autor: "Yuval Noah Harari",
    genero: "Historia",
    paginas: 498
  }, 
  {
    titulo: "El Principito",
    autor: "Antoine de Saint-Exupéry",
    genero: "Ficción",
    paginas: 96
  }, 
  {
    titulo: "Breves Respuestas a Grandes Preguntas",
    autor: "Stephen Hawking",
    genero: "Ciencia",
    paginas: 256
  }, 
  {
    titulo: "El Universo en una Cáscara de Nuez",
    autor: "Stephen Hawking",
    genero: "Ciencia",
    paginas: 224
  } 
]);

//insert productos
db = db.getSiblingDB("PRODUCTOS"); 
db.productos.drop();
db.productos.insertMany([
  {
    nombre: "Laptop",
    categoria: "Tecnología",
    precio: 1200
  },
  {
    nombre: "Teléfono",
    categoria: "Tecnología",
    precio: 800
  },
  {
    nombre: "Audífonos",
    categoria: "Tecnología",
    precio: 100
  }, 
  {
    nombre: "Mesa",
    categoria: "Muebles",
    precio: 300
  }, 
  {
    nombre: "Silla",
    categoria: "Muebles",
    precio: 150
  }
]);
//insert empleados
db = db.getSiblingDB("PRODUCTOS"); 
db.productos.drop();
db.productos.insertMany([
  {
    nombre: "Laptop",
    categoria: "Tecnología",
    precio: 1200
  },
  {
    nombre: "Teléfono",
    categoria: "Tecnología",
    precio: 800
  },
  {
    nombre: "Audífonos",
    categoria: "Tecnología",
    precio: 100
  }, 
  {
    nombre: "Mesa",
    categoria: "Muebles",
    precio: 300
  }, 
  {
    nombre: "Silla",
    categoria: "Muebles",
    precio: 150
  }
]);
//query libros
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

//este no anda
print("\n--- Libro con más páginas por género ---");
let genero = db.libros.aggregate([{$group : {_id : "$genero"}}]);
let masPaginasArray = db.libros.aggregate([{$match : {genero : genero._id}},{$project : {titulo: 1,autor:1, paginas:1, genero:1,_id:0}},{$sort : {paginas : -1}},{$limit : 1}]).toArray();
for (let i = 0; i < masPaginasArray.length; i++) {
  let item = masPaginasArray[i];
  print("Género: " + item._id);
  printjson(item.libro);
}

//query productos
/*
================================================================
 EJERCICIO 1: Insertar 5 productos
Dada una colección llamada productos, que contiene:
nombre: nombre del producto
categoria: categoría a la que pertenece
precio: precio del producto
Consignas:
Encontrar el precio mínimo de todos los productos
Calcular el precio promedio de todos los productos
Mostrar los productos ordenados por precio (mayor a menor)
Mostrar el producto más caro por cada categoría
Resolver utilizando forEach()
================================================================
*/

//load("JavaScriptEnMongoShell/insertProductos.js")

//use PRODUCTOS

print("--- Precio Mínimo ---");
let precioMin = db.productos.aggregate([{$project : {nombre: 1,precio:1,_id:0}}, {$sort : {precio : 1}},{$limit : 1}]);
precioMin.forEach(function(producto) {
  print("El precio mínimo es: " + producto.precio);
});

print("\n--- Precio Promedio ---");
let totalPrecio = 0;
db.productos.find().forEach(function(producto) {
  totalPrecio += producto.precio;
  count++;
});

if (count > 0) {
  print("El precio promedio es: " + (totalPrecio / count));
} else {
  print("No hay productos para calcular el promedio.");
}

print("\n--- Productos Ordenados (mayor a menor) ---");
let prodsOrdenados = db.productos.aggregate([{$project : {nombre: 1,precio:1,categoria:1,_id:0}}, {$sort : {precio : -1}}]);
prodsOrdenados.forEach(function(producto) {
  printjson(producto);
});


print("\n--- Producto Más Caro por Categoría ---");
let categorias = db.productos.aggregate([{$group : {_id : "$categoria"}}]);
categorias.forEach(function(categoria) {
  let productoCaro = db.productos.aggregate([{$match : {categoria : categoria._id}},{$project : {nombre: 1,precio:1,categoria:1,_id:0}},{$sort : {precio : -1}},{$limit : 1}]); 
  productoCaro.forEach(function(producto) {
    printjson(producto);
  });
});
//query empleados
/*
================================================================
EJERCICIO 2: Insertar empleados
Dada una colección llamada empleados que almacena la siguiente
información:
nombre: nombre del empleado
departamento: nombre del departamento
salario: salario mensual del empleado
Consignas:
Encontrar el salario mínimo de todos los empleados.
Calcular el salario promedio.
Mostrar los empleados ordenados por salario de mayor a menor.
Mostrar el empleado con mayor salario por cada departamento.
Resolver utilizando .hasNext() y .next()
================================================================
*/

//load("JavaScriptEnMongoShell/queryEmpleados.js")

//use EMPLEADOS

print("--- Salario Mínimo ---");
let salarioMin = db.empleados.find().sort({ salario: 1 }).limit(1);
if (salarioMin.hasNext()) {
  let empleadoMin = salarioMin.next();
  print("El salario mínimo es: " + empleadoMin.salario);
}

print("\n--- Salario Promedio ---");
let salarioPromedio = db.empleados.find();
let totalSalario = 0;
let count = 0;

while (salarioPromedio.hasNext()) {
  let empleado = salarioPromedio.next();
  totalSalario += empleado.salario;
  count++;
}

if (count > 0) {
  print("El salario promedio es: " + (totalSalario / count));
} else {
  print("No hay empleados para calcular el promedio.");
}

print("\n--- Empleados Ordenados (mayor a menor) ---");
let empleadosOrdenados = db.empleados.find().sort({ salario: -1 });
while (empleadosOrdenados.hasNext()) {
  printjson(empleadosOrdenados.next());
}

print("\n--- Empleado con mayor salario por departamento ---");
let departamento = db.empleados.aggregate([{$group : {_id : "$departamento"}}]);
let mayorSalario = db.empleados.aggregate([{$match : {departamento : departamento._id}},{$project : {nombre: 1, departamento:1, salario:1,_id:0}},{$sort : {salario : -1}},{$limit : 1}]);

while (mayorSalario.hasNext()) {
  let item = mayorSalario.next();
  print("Departamento: " + item._id);
  printjson(item.empleado);
}
// practica libros en las biblotecas

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
