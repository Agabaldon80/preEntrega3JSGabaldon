/* Algoritmo para nota final de estudiantes ingresados */

class Estudiante {
    constructor(id, nombre, nota) {
      this.id = id;
      this.nombre = nombre;
      this.nota = nota;
    }
  }
  
  const estudiantesArray = [];
  
  /** Mensajes para el usuario */
  
  function mensaje(texto) {
    switch (texto) {
      case "bienvenida":
        alert(
          "Bienvenido al calculador de notas Eleusis, el cual le permite determinar el promedio de los estudiantes en su curso y si el mismo ha obtenido una mención. Para conocer el sistema de notación y las posibles menciones, haga por favor click en 'aceptar'"
        );
        break;
  
      case "instruccion":
        alert(
          "El sistema de notación es de 1 hasta 20 puntos. Si el promedio es de 18, 19 o 20 puntos, el curso logra la mención 'Sobresaliente'; de 16 0 17 puntos, logra la mención 'Excelente'; de 14 o 15 puntos logra la mención 'Correcto'. Una nota menor a 14 no obtiene mención. Haga click en 'aceptar' para continuar y siga las instrucciones"
        );
        break;
  
      case "despedida":
        alert("Gracias por usar el calculador de notas Eleusis. Vuelva pronto");
        break;
    }
  }
  
  function mencion(texto, curso, promedioNota) {
    let string = "";
    estudiantesArray.forEach((alumnos) => {
      string += `${alumnos.id}.- ${alumnos.nombre} tiene una nota de: ${alumnos.nota} puntos.\n`;
    });
  
    switch (texto) {
      case "sobresaliente":
        alert(
          `El promedio del curso ${curso} es ${promedioNota} puntos y logra la mención 'Sobresaliente'\n${string}`
        );
        break;
  
      case "excelente":
        alert(
          `El promedio del curso ${curso} es ${promedioNota} puntos y logra la mención 'Excelente'\n${string}`
        );
        break;
      case "correcto":
        alert(
          `El promedio del curso ${curso} es ${promedioNota} puntos y logra la mención 'Correcto'\n${string}`
        );
        break;
  
      case "sin mencion":
        alert(
          `El promedio del curso ${curso} es ${promedioNota} puntos y no obtiene mención\n${string}`
        );
        break;
    }
  }
  
  function Notas() {
    mensaje("bienvenida");
    mensaje("instruccion");
  
    let curso = prompt(
      "Ingrese el nombre del curso cuyo promedio desea calcular"
    );
  
    let estudiantes = parseInt(
      prompt(
        `Ingrese la cantidad de estudiantes en el curso ${curso} y haremos el promedio de sus notas. Atención: se espera un numero entero superior a 0`
      )
    );
  
    let sumaNotas = 0;
  
    while (estudiantes < 1 || isNaN(estudiantes)) {
      estudiantes = parseInt(
        prompt(
          `Ingrese la cantidad de estudiantes en el curso ${curso} y haremos el promedio de sus notas. Atención: se espera un numero entero superior a 0`
        )
      );
    }
  
    for (let i = 1; i <= estudiantes; i++) {
      let nota = parseInt(
        prompt(
          `Ingrese la nota del estudiante número ${i}. Recuerde que ésta debe ser un número entero entre 1 y 20`
        )
      );
  
      while (nota < 1 || nota > 20 || isNaN(nota)) {
        nota = parseInt(
          prompt(
            `Ingrese la nota del estudiante número ${i}. Recuerde que ésta debe ser un número entero entre 1 y 20`
          )
        );
      }
  
      sumaNotas += nota;
  
      estudiantesArray.push(new Estudiante(i, `El estudiante ${i}`, nota));
    }
  
    const promedioNota = sumaNotas / estudiantes;
  
    if (promedioNota <= 20 && promedioNota >= 18) {
      mencion("sobresaliente", curso, promedioNota);
    } else if (promedioNota < 18 && promedioNota >= 16) {
      mencion("excelente", curso, promedioNota);
    } else if (promedioNota < 16 && promedioNota >= 14) {
      mencion("correcto", curso, promedioNota);
    } else {
      mencion("sin mencion", curso, promedioNota);
    }
    mensaje("despedida");
    return Notas;
  }
  
  Notas();
  
  
  