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