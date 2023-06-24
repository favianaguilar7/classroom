window.onload = init;
var url = "http://localhost:3000";
///// es lo mismo que se realiza en login_alumnos pero en este caso la peticion se realizara a otra url 
function init(){
    document.querySelector('.entrar').addEventListener('click', login);
}
function login() {
    var mail = document.getElementById('mail').value;
    var pass = document.getElementById('pass').value;
    axios({
        method: 'post',
        url: url+'/user/login/a', /// url a la que se realizara la peticion
        data:{
            name_profe: mail,
            pass_profe: pass,
        }
    }).then(function(res){
        if(res.data.code === 200){
            console.log(res);
            window.location.href = "../intefaces_generales/menu_prof.html";
            sessionStorage.setItem("id",res.data.message[0]['id_profe'])
        }
        else{
            var ms = document.getElementById("ms").innerHTML="Correo / contraseña incorrectos";
        }
    }).catch(function(err){ 
    })
}