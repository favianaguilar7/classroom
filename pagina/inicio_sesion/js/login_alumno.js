window.onload = init;
var url = "http://localhost:3000";

/////////// esta funcion lo que haces que que cuando le da clic al boton con la clase "entrar" va a llamar a la funcion "login()"
function init(){
    document.querySelector('.entrar').addEventListener('click', login);
}

//////////// esta funcion vamos a llamar a la appi con la direccion url+'/user/login/b' la cual va a veririficar si existe el usuario 
/////////// con la contraseña indicada

function login() {
    var mail = document.getElementById('mail').value; // trae los valores del html a una variable 
    var pass = document.getElementById('pass').value;
    axios({
        method: 'post',///// metodo por el cual se va a hacer la peticion 
        url: url+'/user/login/b', //// url en la realizara la peticion
        data:{
            name_alumnos: mail, ////// datos que va a enviar
            pass_alumnos: pass,
        }
    }).then(function(res){ 
        if(res.data.code === 200){ ///// si la peticion sale bien va a regresar un code: 200 y continuara con el codigo
            window.location.href = "../intefaces_generales/menualum.html"; //// lo manda a otra ventana 
            sessionStorage.setItem("id",res.data.message[0]['id_alumnos']) ///// agrega al sesion storage un atributo el cual funciona para ams adelante
        }
        else{
            var ms = document.getElementById("ms").innerHTML="Correo / contraseña incorrectos";/// mensaje de error
        }
    }).catch(function(err){ 
    })
}