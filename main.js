/* Algoritmo para nota final de estudiantes ingresados */


let estudiantesArray = [];
        let tabla = document.querySelector('#tabla');
        let promNota = document.querySelector('#promNota');
        let promEdad = document.querySelector('#promEdad');
        let maxNota = document.querySelector('#maxNota');
        let minNota = document.querySelector('#minNota');
        let formulario = document.querySelector('#cargar');

        document.addEventListener('DOMContentLoaded', function() {
            const estudiantesAlmacenados = localStorage.getItem('Estudiantes');

            if(estudiantesAlmacenados) {
                let estudiantes = JSON.parse(estudiantesAlmacenados);
                //estudiantesArray.push(JSON.parse(estudiantesAlmacenados));
                for(let i = 0; i < estudiantes.length; i++){
                    estudiantesArray.push(estudiantes[i]);
                    tabla.innerHTML += `
                                    <tr>
                                        <td>${estudiantes[i].id}</td>
                                        <td>${estudiantes[i].nombre}</td>
                                        <td>${estudiantes[i].apellido}</td>
                                        <td>${estudiantes[i].edad}</td>
                                        <td>${estudiantes[i].nota}</td>
                                        <td>${estudiantes[i].mencion}</td>
                                    </tr>
                                ` ;
                }
                promNota.innerHTML = `${Math.round(promedio(estudiantesArray,'nota'))}`;
                promEdad.innerHTML = `${Math.round(promedio(estudiantesArray,'edad'))}`;
                maxNota.innerHTML = `${notaMax()}`;
                minNota.innerHTML = `${notaMin()}`;
            }
  
        });
        
        class Estudiante {
            constructor(id, nombre, apellido, edad, nota) {
                this.id = id;
                this.nombre = nombre;
                this.apellido = apellido;
                this.edad = edad;
                this.nota = nota;
                this.mencion = mencion;
            }
        }

        formulario.addEventListener('submit', function(event) {
            event.preventDefault();
            cargaEstudiante();
        });
        
        function cargaEstudiante(){
            let contador = counter();
            let id = contador++,
                nombre = document.querySelector('#nombre').value,
                apellido = document.querySelector('#apellido').value,
                edad = parseInt(document.querySelector('#edad').value),
                nota = parseFloat(document.querySelector('#nota').value);
                mencion = mencionTipo(nota);

                if(isNaN(nota) || nota < 1 || nota > 20 || isNaN(edad) || edad < 18){
                    if(isNaN(nota) || nota < 1 || nota > 20){
                        alert(`Por favor, ingresa un número válido entre 1 y 20 en el campo 'nota'.`);
                        document.querySelector('#nota').value = 0;
                        document.querySelector('#nota').classList.add('red-border');
                        return
                    } else if(isNaN(edad) || edad < 18) {
                        alert(`Por favor, ingresa una edad válida en el campo 'edad' (no menor a 18 años).`);
                        document.querySelector('#edad').value = 0;
                        document.querySelector('#edad').classList.add('red-border');
                        return
                    }
                } else {
                    estudiantesArray.push(new Estudiante(id,nombre,apellido,edad,nota,mencion));
                    let listaEstudiantes = JSON.stringify(estudiantesArray);
                    localStorage.setItem('Estudiantes', listaEstudiantes);
                    console.log(estudiantesArray);
                    tabla.innerHTML += `
                                <tr>
                                    <td>${id}</td>
                                    <td>${nombre}</td>
                                    <td>${apellido}</td>
                                    <td>${edad}</td>
                                    <td>${nota}</td>
                                    <td>${mencion}</td>
                                </tr>
                            ` ;

                    document.querySelector('#nombre').value = '';
                    document.querySelector('#apellido').value = '';
                    document.querySelector('#edad').value = 0;
                    document.querySelector('#edad').classList.remove('red-border');
                    document.querySelector('#nota').value = 0;
                    document.querySelector('#nota').classList.remove('red-border');

                    promNota.innerHTML = `${Math.round(promedio(estudiantesArray,'nota'))}`;
                    promEdad.innerHTML = `${Math.round(promedio(estudiantesArray,'edad'))}`;
                    maxNota.innerHTML = `${notaMax()}`;
                    minNota.innerHTML = `${notaMin()}`;
                }           
        }

        function promedio(array,dato) {
            if (array.length === 0) {
                return 0; // Si no hay estudiantes, el promedio es 0.
            }

            let notas = 0;
            let edades = 0;
            let cantidad = counter();

            array.forEach(estudiante => {
            dato == 'nota'? notas += estudiante.nota : edades += estudiante.edad;
            });            
            
            if(dato == 'nota'){
                return notas / cantidad;
            } else { 
                return edades / cantidad;
            }
        }

        function notaMax(){
            const maximoValor = estudiantesArray.reduce((max, estudiante) => {
                return (estudiante.nota > max) ? estudiante.nota : max;
            }, estudiantesArray[0].nota);
            return maximoValor;
        }

        function notaMin(){
            const minValor = estudiantesArray.reduce((min, estudiante) => {
                return (estudiante.nota < min) ? estudiante.nota : min;
            }, estudiantesArray[0].nota);
            return minValor;
        }

        function mencionTipo(nota){
            switch(true) {
                case (nota >= 18):
                    return 'Sobresaliente';
                case (nota >= 16):
                    return 'Excelente';
                case (nota >= 14):
                    return 'Correcto';
                case (nota < 14):
                    return '--';
            }
        }

        function counter() {
            let elementosNoVacios = estudiantesArray.filter(elemento => elemento !== undefined && elemento !== null);
            return elementosNoVacios.length;
        }
