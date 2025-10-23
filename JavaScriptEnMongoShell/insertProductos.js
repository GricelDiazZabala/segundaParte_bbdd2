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