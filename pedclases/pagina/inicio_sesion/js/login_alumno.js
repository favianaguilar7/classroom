window.onload = init;
var url = "http://localhost:3000";

function init(){
    // if(sessionStorage.getItem("token")){
    //     window.location.href = "index.html";
    // }
    document.querySelector('.entrar').addEventListener('click', login);
}
function login() {
    var mail = document.getElementById('mail').value;
    var pass = document.getElementById('pass').value;
    // var acc = 1;
    axios({
        method: 'post',
        url: url+'/user/login/b',
        data:{
            name_alumnos: mail,
            pass_alumnos: pass,
            // emp_acc: acc
        }
    }).then(function(res){
        if(res.data.code === 200){
            // console.log(res.data.message[0]['id_alumnos']);
            // sessionStorage.setItem("token", res.data.message);
            window.location.href = "/Users/favianaguilar/Downloads/pedclases/pagina/intefaces_generales/menualum.html";
            sessionStorage.setItem("id",res.data.message[0]['id_alumnos'])
        }
        else{
            var ms = document.getElementById("ms").innerHTML="Correo / contraseña incorrectos";
        }
    }).catch(function(err){ 
    })
}