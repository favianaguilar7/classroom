window.onload = init;
var headers = {};
var url = "http://localhost:3000";

function init(){
    // if(localStorage.getItem("token")){
    //     let token = localStorage.getItem("token");
    //     headers={
    //         'Authorization': "bearer " + localStorage.getItem("token")
    //     }
        document.querySelector('.entrar').addEventListener('click', ver_materia);
        // genera_tabla();
        iniciar();
    // }else{
    //     window.location.href = "login.html"
    // }
}
function ver_materia(){
    
    window.location.href = "/Users/favianaguilar/Downloads/pedclases/pagina/intefaces_generales/tareas_profe.html";
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
        url: url+'/user/a/'+id,
        data:{
            id: id
        }
    }).then(function(res){
        const {data} = res;
        const {message} = data;
        var id = message[0]["id_materia"]
        axios({
            method: 'post',
            url: url+'/user/b/'+id,
            data:{
                id: id
            }
        }).then(function(res){
            const {data} = res;
            const {message} = data;
            var id = message[0]["id_profe"]
            ////////
            var body = document.getElementsByTagName("section")[1];
        var h4   = document.createElement("h4");
        // var h2 = document.createElement("h2");
        var textoCelda = document.createTextNode(message[0]["name_materia"]);
        h4.appendChild(textoCelda);
        body.appendChild(h4);
        // h2.setAttribute("class", "nombusu");
            /////
        }).catch(function(err){ 
            console.log(err);
        });
        axios({
            method: 'post',
            url: url+'/user/d/'+id,
            data:{
                id: id
            }
        }).then(function(res){
            const {data} = res;
        const {message} = data;
            var body = document.getElementsByTagName("section")[2];
            var a = document.createElement("a");
            // var h2 = document.createElement("h2");
            var textoCelda = document.createTextNode(message[0]["title_actividad"]);
            a.appendChild(textoCelda);
            body.appendChild(a);
        }).catch(function(err){ 
            console.log(err);
        });
    }).catch(function(err){ 
        console.log(err);
    });
}