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

print("--- Precio Mínimo ---");
let precioMin = db.productos.aggregate([{$project : {nombre: 1,precio:1,_id:0}}, {$sort : {precio : 1}},{$limit : 1}]);
precioMin.forEach(function(producto) {
  print("El precio mínimo es: " + producto.precio);
});

print("\n--- Precio Promedio ---");
let totalPrecio = 0;
let count = 0;
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

//no supe hacer "Mostrar el producto más caro por cada categoría"