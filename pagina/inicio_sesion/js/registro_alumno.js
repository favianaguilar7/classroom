window.onload = init;
var url = "http://localhost:3000";
/// es el mismo porceso que login_alumno pero en este caso se va a realizar un registro en la base de datos 
function init(){
    document.querySelector('.entrar').addEventListener('click', login);
}
function login() {
    var mail = document.getElementById('mail').value;
    var pass = document.getElementById('pass').value;
    axios({
        method: 'post',
        url: url+'/user/signin/b',
        data:{
            name_alumnos: mail,
            pass_alumnos: pass
        }
    }).then(function(res){
        if(res.data.code === 200){
            console.log(res);
            window.location.href = "../inicio_sesion/inicio_sesion_alumno.html";
        }
        else{
            var ms = document.getElementById("ms").innerHTML="Correo / contraseña incorrectos";
        }
    }).catch(function(err){ 
    })
}