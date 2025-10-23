db = db.getSiblingDB("EMPLEADOS"); 
db.empleados.drop();

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