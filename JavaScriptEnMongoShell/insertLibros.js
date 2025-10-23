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