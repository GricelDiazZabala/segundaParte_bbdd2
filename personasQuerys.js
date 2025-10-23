/*
Find con query y projection
Buscar a todas las personas mayores a 50 años y exponer los campos
nombre y edad de la consulta
*/

print('find query projection ')
var cursor = db.personas.find(
{ edad: {$gt:50} }, // filtro query
{ nombre: 1, edad: 1, _id:0 } // projection -> 1: sale, 0: no sale
)
// Imprimir la información devuelta por el cursor
while(cursor.hasNext())
{
print(cursor.next())
}

/*
Método sort
A partir del cursor que retorna el método find, se llama al método sort
de la clase Cursor y, como condición, se indica el campo por el que se
desea ordenar (si se pasa un 1 se ordena en forma ascendente y si se
pasa un -1 se ordena en forma descendente):
*/

print('find query projection')
var cursor = db.personas.find(
{ edad: {$gt:50} }, // filtro query
{ nombre: 1, edad: 1, _id:0 } // projection -> 1: sale, 0: no sale
).sort({edad: -1, nombre: 1})
// Imprimir la información devuelta por el cursor
while(cursor.hasNext())
{
print(cursor.next())
}
