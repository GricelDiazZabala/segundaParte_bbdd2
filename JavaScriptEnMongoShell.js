//================================================================
// Ejemplo 1: verColeccion.js (Método forEach)
//================================================================

// 1-Ver las Base de Datos (show dbs - adminCommand('listDatabases'))
printjson(db.adminCommand('listDatabases'));

// 2-Posicionarse en una Base de datos (use - getSiblingDB)
db = db.getSiblingDB('ARTICULOS'); 

// 3-Ver las colecciones para esa Base de Datos (show collections - getCollectionNames())
print(db.getCollectionNames()); 

// 4-Cargar un find a un cursor para recorrer y mostrar
cursor = db.articulos.find(); 

/* Cada vez que se llama al método find de una colección, retorna un objeto de la clase Cursor.
   Mediante el método forEach del Cursor es posible recorrer todo el contenido del
   cursor en forma secuencial hasta agotarlo
   function(d) { printjson(d) }: Esta es una función de callback que se ejecuta para cada documento 
   en el cursor.
   Aquí, d representa cada documento individualmente a medida que se itera sobre el 
   cursor.*/
cursor.forEach(function(d) {
  printjson(d)
});


//================================================================
// Ejemplo 2: verColeccion.js (Método hasNext() / next())
//================================================================

printjson(db.adminCommand('listDatabases')); 
db = db.getSiblingDB('ARTICULOS'); 
print(db.getCollectionNames()); 
cursor = db.articulos.find();

/*Mediante los métodos hasNext y Next de un cursor en forma secuencial hasta agotarlo.*/
while (cursor.hasNext()) {
  print(cursor.next())
} 


//================================================================
// Ejemplo 3: verColeccion.js (Método toArray())
//================================================================

printjson(db.adminCommand('listDatabases')); 
db = db.getSiblingDB('ARTICULOS');
print(db.getCollectionNames()); 
cursor = db.articulos.find();

/*Acceder en forma aleatoria al contenido de un cursor, a través del método toArray() de los cursores.*/ 
var documentArray = cursor.toArray();
var count = documentArray.length; 
var document = documentArray[1]; 
print("Muestro el elemento en la posicion 1");
printjson(document);
print("Recorro el array");
for (i = 0; i < count; i++) {

  document = documentArray[i]; 
  printjson(document);
} 


//================================================================
// Ejercicio de Aplicación: Método forEach()
//================================================================

db.empleados.find().forEach(function(empleado) { 
  print("Empleado: " + empleado.nombre); 
  var totalHoras = 0;
  empleado.proyectos.forEach(function(proyecto) {
    print(" Proyecto: " + proyecto.nombre + " Horas: " + proyecto.horas); 
    totalHoras += proyecto.horas;
  }); 
  print(" Total de horas trabajadas: " + totalHoras);
  if (totalHoras > 100) {
    print(" Este empleado ha trabajado más de 100 horas."); 
  } 
  print("-----------------"); 
});


//================================================================
// Ejercicio de Aplicación: Inserción para hasNext() / next()
//================================================================

db.empleados.insertMany([ 
  {
    nombre: "Laura",
    departamento: "Diseño", 
    proyectos: [ 
      {
        nombre: "Catálogo",
        horas: 45
      }, 
      {
        nombre: "Rediseño Web",
        horas: 30
      } 
    ] 
  }, 
  {
    nombre: "Diego",
    departamento: "Desarrollo",
    proyectos: [
      {
        nombre: "App Móvil",
        horas: 60
      },
      {
        nombre: "Sistema Interno",
        horas: 50
      } 
    ]
  }
]);

//================================================================
// Ejercicio de Aplicación: Método hasNext() / next()
//================================================================

var cursor = db.empleados.find(); 
while (cursor.hasNext()) { 
  var empleado = cursor.next();
  print("Empleado: " + empleado.nombre); 
  var totalHoras = 0; 

  // Bucle 'for' anidado
  for (var i = 0; i < empleado.proyectos.length; i++) {
    var proyecto = empleado.proyectos[i]; 
    print("Proyecto: " + proyecto.nombre + " | Horas: " + proyecto.horas); 
  }

  print("Total de horas trabajadas: " + totalHoras);

  // Condición 'if' 
  if (totalHoras > 100) {
    print(" ¡Este empleado trabajó más de 100 horas!"); 
  } 
  print("-----------------------");
}


//================================================================
// Ejercicio de Aplicación: Método toArray()
//================================================================

// Convertimos la colección a un array
var empleados = db.empleados.find().toArray();
// Recorremos con un for tradicional
for (var i = 0; i < empleados.length; i++) {
  var empleado = empleados[i];
  print("Empleado: " + empleado.nombre);
  var totalHoras = 0;

  // Recorremos los proyectos
  for (var j = 0; j < empleado.proyectos.length; j++) {
    var proyecto = empleado.proyectos[j];
    print(" Proyecto: " + proyecto.nombre + " | Horas: " + proyecto.horas);
    totalHoras += proyecto.horas; 

  // Mostramos total de horas
  print(" Total de horas trabajadas: " + totalHoras);
  // Aviso si pasa las 100 horas
  if (totalHoras > 100) { 
    print(" ¡Este empleado trabajó más de 100 horas!");
  } 
  print("-----------------");
}}


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

db.empleados.insertMany([
  {
    nombre: "Lucía",
    departamento: "Ventas",
    salario: 3000
  }, 
  {
    nombre: "Carlos",
    departamento: "Ventas",
    salario: 2500
  }, 
  {
    nombre: "Sofía",
    departamento: "Marketing",
    salario: 2800
  }, 
  {
    nombre: "Miguel",
    departamento: "Marketing",
    salario: 3200
  }, 
  {
    nombre: "Ana",
    departamento: "Finanzas",
    salario: 4000
  } 
]);

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