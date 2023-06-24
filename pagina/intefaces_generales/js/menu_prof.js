window.onload = init;
var headers = {};
var url = "http://localhost:3000";

function init(){
    // if(localStorage.getItem("token")){
    //     let token = localStorage.getItem("token");
    //     headers={
    //         'Authorization': "bearer " + localStorage.getItem("token")
    //     }
        document.querySelector('.entrar').addEventListener('click', openModal);
        // genera_tabla();
        iniciar();
    // }else{
    //     window.location.href = "login.html"
    // }
}
// function ver_materia(){

//     window.location.href = "../intefaces_generales/tareas_pen_profe.html";
// }
function ver(){
    var selec =document.querySelectorAll('.entrar')
    console.log(selec.length);
    for(var i=0;i<selec.length;i++)
    {
        selec[i].addEventListener("click", function()
        {
            let asd = document.getElementById(this.id);
            console.log(asd.id);
            sessionStorage.setItem("id_clase", asd.id)
            window.location.href = "../intefaces_generales/tareas_pen_profe.html";
        }); 
    }
}

function openModal() {

    document.getElementById('n1').style.display = 'block';
}
function closeModal() {
    var id_prof = sessionStorage.getItem("id");
    var id_materia = document.getElementById("materia").value;
    axios({
        method: 'post',
        url: url+'/user/signin/c',
        data:{
            id_prof: id_prof, 
            id_materia: id_materia
        }
    }).then(function(res){
        document.getElementById('n1').style.display = 'none';
        alert("Registro exitoso");
    }).catch(function(err){ 
        console.log(err);
    });
}
function cerrarModal() {
    document.getElementById('n1').style.display = 'none';
}



function iniciar(){
    var id = sessionStorage.getItem("id");
    // console.log(id);
    axios({
        method: 'post',
        url: url+'/user/c/'+id,
        data:{
            id: id
        }
    }).then(function(res){
        const {data} = res;
        const {message} = data;
        var body = document.getElementsByTagName("section")[0];
        var h2   = document.createElement("h2");
        // var h2 = document.createElement("h2");
        var textoCelda = document.createTextNode(message[0]["name_profe"]);
        h2.appendChild(textoCelda);
        body.appendChild(h2);
        h2.setAttribute("class", "nombusu");
    }).catch(function(err){ 
        console.log(err);
    });



    axios({
        method: 'post',
        url: url+'/user/e/'+id,
        data:{
            id: id
        }
    }).then(function(res){
        const {data} = res;
        const {message} = data;
        console.log(message);
        var body = document.getElementsByTagName("section")[1];
        for(var i = 0; i < message.length; i++){
            // var id = message[i]["id_materia"]
            
            var li = document.createElement("li");
            var h4 = document.createElement("h4");
            var textoCelda = document.createTextNode(message[i]["name_materia"]);
            h4.appendChild(textoCelda);
            // <button class="btn entrar">Alumnos</button>
            li.appendChild(h4);


            var button = document.createElement("button");
            button.setAttribute("class", "entrar");
            var textoCelda = document.createTextNode("Entrar");
            button.setAttribute("onclick", "ver()");
            button.setAttribute("id", message[i]["id_materia"]);
            button.appendChild(textoCelda);

            li.appendChild(button);
            // h4.setAttribute("class", "inter");
            li.setAttribute("class", "inter");
            body.setAttribute("class", "container");

            body.appendChild(li);
        }
        
        
        
        
        // var h2   = document.createElement("h2");
        // // var h2 = document.createElement("h2");
        // var textoCelda = document.createTextNode(message[0]["name_materia"]);
        // h2.appendChild(textoCelda);
        // body.appendChild(h2);
        // h2.setAttribute("class", "nombusu");

    }).catch(function(err){ 
        console.log(err);
    });
}