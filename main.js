
let i = 0
let error = false

let preciPropiedad = 0
let pagoInicial = 0
let ciudad = 0
let anios = 0

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
    .then((data) => console.log(data))

function calcularPrecio(){

    if(i == 1){
        Swal.fire({
            icon: 'error',
            title: "Ya se calculo la hipoteca"
        })
       }

    if(i == 0){

        error = false
        const intereses = 1.08;

        preciPropiedad = document.getElementById("precioCasa").value;
        pagoInicial = document.getElementById("pagoInicial").value;
        ciudad = document.getElementById("ciudad").value;
        anios = document.getElementById("anios").value;
        let ciud = localStorage.setItem("Ciudad", ciudad);



        let datos = [
            {id:1, PrecioVivienda: preciPropiedad},
            {id:2, AhorroAportado: pagoInicial},
            {id:3, Ciudad: ciudad},
            {id:4, AniosDeHipoteca: anios}
        ];

        const  guardarLocal = (NombreCiudad, ciudad) => {localStorage.setItem(NombreCiudad, ciudad)};

        for (const ciudad of datos) {
        guardarLocal(ciudad.id, JSON.stringify(ciudad))
        }


        function calPrecio(){
        if(preciPropiedad == 0){
            error = true
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: 'Esta Vacio Precio!',
              })
        }
        else if(isNaN(preciPropiedad)){
            error = true
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: 'Hay letras Precio!',
              })
        }
        else if(!isNaN(preciPropiedad)){
            error = false
            console.log("Correcto Precio");
        }
        }

        function calAhorro(){
        if(pagoInicial == 0){
            error = true
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: 'Esta Vacio Ahorro!',
              })
        }
        else if(isNaN(pagoInicial)){
            error = true
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: 'Hay letras Ahorro!',
              })
        }
        else if(pagoInicial < preciPropiedad*0.10){
            error = true
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: 'Ahorro no suficiente!',
              })
        }
        else if(!isNaN(pagoInicial)){
            error = false
            console.log("Correcto Ahorro");
        }
        }

        function calCiudad(){
        if(ciudad == 0){
            error = true
            console.log("Ciudad esta vacio");
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: 'Ciudad esta vacio!',
              })
        }
        else if(!isNaN(ciudad)){
            error = true
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: 'No puede haber números en ciudad!',
              })
        }
        else if(isNaN(ciudad)){
            error = false
            console.log("Ciudad correcto!");
        }
        }

        function calAnios(){
        if(anios == 0){
            error = true
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: 'Años esta vacio',
              })
        }
        else if(isNaN(anios)){
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: 'No puede haber letras en años!',
              })
        }
        else if(anios > 30){
            error = true
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: 'La hipoteca no puede durar más de 30 años!',
              })
        }
        else if(anios < 5){
            error = true
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: 'El plazo mínimo para una hipoteca es de 5 años!',
              })
        }
        else if(anios < 30 && anios > 5){
            error = false
            console.log("Años correcto");
        }
        }

            if(error == false){
            calPrecio();
                if(error == false){
                    calAhorro();
                    if(error == false){
                        calCiudad();
                        if(error == false){
                            calAnios();
                        }
                    }
                }
                else if(error == true)
                    console.log("Si funciona");
                }
            


     

        //if(!isNaN(preciPropiedad) && !isNaN(pagoInicial) && isNaN(ciudad) && !isNaN(anios) && anios < 30 && pagoInicial < preciPropiedad && pagoInicial < preciPropiedad*0.10){

        if (error == false){
        let cuota = preciPropiedad*intereses / (12 * anios);
        let hipoTotal = preciPropiedad * intereses - pagoInicial;
    
        let node = document.createElement("td");
        let textnode = document.createTextNode("Hipoteca Fija a "+ anios +" Años");
        node.appendChild(textnode);
        document.getElementById("table2").appendChild(node);

        let node1 = document.createElement("td");
        let textnode1 = document.createTextNode(intereses);
        node1.appendChild(textnode1);
        document.getElementById("table2").appendChild(node1);

        let node2 = document.createElement("td");
        let textnode2 = document.createTextNode(hipoTotal.toFixed(2));
        node2.appendChild(textnode2);
        document.getElementById("table2").appendChild(node2);

        let node3 = document.createElement("td");
        let textnode3 = document.createTextNode(cuota.toFixed(2))
        node3.appendChild(textnode3);
        document.getElementById("table2").appendChild(node3);
        
        Swal.fire({
            icon: 'success',
            title: "Se calculo el monto de la hipoteca"
        
        })
        i++
       }
    }
}

