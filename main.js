let i = 0;
let error = false;

let preciPropiedad;
let pagoInicial;
let ciudad;
let anios;

fetch('https://jsonplaceholder.typicode.com/posts', {
    method: 'POST',
    body: JSON.stringify({
        title: 'Calculadora de Hipotecas',
        userId: 1,
    }),
    headers: {
        'Content-type': 'application/json; charset=UTF-8',
    },
})
    .then((response) => response.json())

function calcularHipoteca() {
    return new Promise((resolve, reject) => {
        let timerInterval
        Swal.fire({
            title: 'Cargando Hipoteca',
            html: '<b></b> milliseconds.',
            timer: 2000,
            timerProgressBar: true,
            didOpen: () => {
                Swal.showLoading()
                const b = Swal.getHtmlContainer().querySelector('b')
                timerInterval = setInterval(() => {
                    b.textContent = Swal.getTimerLeft()
                }, 100)
            },
            willClose: () => {
                clearInterval(timerInterval)
            }
        })

        setTimeout(() => {
            resolve(calcularPrecio())
        }, 3000);
    })
}

async function getHipoteca() {
    let miHipoteca = await calcularHipoteca();
}


function calcularPrecio() {

    if (i == 1) {
        Swal.fire({
            icon: 'error',
            title: "Ya se calculo la hipoteca"
        })
    }

    if (i == 0) {

        error = false
        const intereses = 1.08;

        preciPropiedad = parseFloat(document.getElementById("precioCasa").value);
        pagoInicial = parseFloat(document.getElementById("pagoInicial").value);
        ciudad = document.getElementById("ciudad").value;
        anios = parseFloat(document.getElementById("anios").value);



        let datos = [
            { id: 1, PrecioVivienda: preciPropiedad },
            { id: 2, AhorroAportado: pagoInicial },
            { id: 3, Ciudad: ciudad },
            { id: 4, AniosDeHipoteca: anios }
        ];

        const guardarLocal = (NombreCiudad, ciudad) => { localStorage.setItem(NombreCiudad, ciudad) };

        for (const ciudad of datos) {
            guardarLocal(ciudad.id, JSON.stringify(ciudad))
        }


        function calPrecio() {
            if (!preciPropiedad) {
                error = true;
                Swal.fire({
                    icon: 'error',
                    title: 'Error',
                    text: 'El precio de la propiedad está vacío.',
                });
                return;
            }

            if (isNaN(preciPropiedad)) {
                error = true;
                Swal.fire({
                    icon: 'error',
                    title: 'Error',
                    text: 'El precio de la propiedad no es un número.',
                });
                return;
            }
            error = false;
        }

        function calAhorro() {
            if (pagoInicial === '' || isNaN(pagoInicial)) {
                error = true;
                Swal.fire({
                    icon: 'error',
                    title: 'Oops...',
                    text: 'El valor del ahorro no es válido!',
                });
            } else if (pagoInicial < preciPropiedad * 0.10) {
                error = true;
                Swal.fire({
                    icon: 'error',
                    title: 'Oops...',
                    text: 'El ahorro debe ser al menos el 10% del precio de la propiedad.',
                });
            } else if (pagoInicial >= preciPropiedad) {
                error = true;
                Swal.fire({
                    icon: 'error',
                    title: 'Oops...',
                    text: 'El ahorro no puede ser mayor o igual al precio de la propiedad.',
                });
            } else {
                error = false;
            }
        }

        function calCiudad() {
            if (!ciudad || ciudad.trim().length === 0) {
                error = true
                Swal.fire({
                    icon: 'error',
                    title: 'Oops...',
                    text: 'El campo de ciudad está vacío!',
                })
            } else if (!isNaN(ciudad)) {
                error = true
                Swal.fire({
                    icon: 'error',
                    title: 'Oops...',
                    text: 'No se permiten números en el campo de ciudad!',
                })
            } else {
                error = false
            }
        }

        function calAnios() {
            if (!anios) {
                Swal.fire({
                    icon: 'error',
                    title: 'Oops...',
                    text: 'Años esta vacio',
                });
                return error = true;
            }
            if (isNaN(anios)) {
                Swal.fire({
                    icon: 'error',
                    title: 'Oops...',
                    text: 'No puede haber letras en años!',
                });
                return error = true;
            }
            if (anios < 5 || anios > 30) {
                Swal.fire({
                    icon: 'error',
                    title: 'Oops...',
                    text: `La hipoteca debe durar entre 5 y 30 años.`,
                });
                return error = true;
            }
            return error = false;
        }

        calPrecio();
        if (error) return;
        calAhorro();
        if (error) return;
        calCiudad();
        if (error) return;
        calAnios();


        if (!error) {
            let cuota = preciPropiedad * intereses / (12 * anios);
            let hipoTotal = preciPropiedad * intereses - pagoInicial;

            let table = document.getElementById("table2");
            let row = table.insertRow(-1);

            let cell1 = row.insertCell(0);
            cell1.textContent = "Hipoteca Fija a " + anios + " Años";

            let cell2 = row.insertCell(1);
            cell2.textContent = intereses;

            let cell3 = row.insertCell(2);
            cell3.textContent = hipoTotal.toFixed(2);

            let cell4 = row.insertCell(3);
            cell4.textContent = cuota.toFixed(2);

            Swal.fire({
                icon: "success",
                title: "Se calculó el monto de la hipoteca",
            });
            i++;
        }
    }
}


