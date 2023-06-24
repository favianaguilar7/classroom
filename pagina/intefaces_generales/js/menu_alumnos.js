window.onload = init;
var headers = {};
var url = "http://localhost:3000";

function init(){
    // if(localStorage.getItem("token")){
    //     let token = localStorage.getItem("token");
    //     headers={
    //         'Authorization': "bearer " + localStorage.getItem("token")
    //     }
        // document.querySelector('.NuevClass').addEventListener('click', openModal());
        // genera_tabla();
        iniciar();
    // }else{
    //     window.location.href = "login.html"
    // }
}
// function new_class(){
//     openModal();
//     // window.location.href = "../tareas_pen_alumnos.html";
// }
function openModal() {

    document.getElementById('n1').style.display = 'block';
}
function closeModal() {
    var id_alumnos = sessionStorage.getItem("id");
    var id_materia = document.getElementById("clase").value;
    axios({
        method: 'post',
        url: url+'/user/signin/e',
        data:{
            id_alumnos: id_alumnos, 
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
function ver_materia(){
    var selec =document.querySelectorAll('.entrar')
    console.log(selec.length);
    for(var i=0;i<selec.length;i++)
    {
        selec[i].addEventListener("click", function()
        {
            let asd = document.getElementById(this.id);
            console.log(asd.id);
            sessionStorage.setItem("id_clase", asd.id)
            window.location.href = "../intefaces_generales/tareas_pen_alumnos.html";
        }); 
    }
}
function iniciar(){
    // closeModal();
    var id = sessionStorage.getItem("id");
    // console.log(id);

    //////////Aqui va el nombre del alumno
    axios({
        method: 'post',
        url: url+'/user/'+id,
        data:{
            id: id
        }
    }).then(function(res){
        const {data} = res;
        const {message} = data;
        var body = document.getElementsByTagName("section")[0];
        var h2   = document.createElement("h2");
        // var h2 = document.createElement("h2");
        var textoCelda = document.createTextNode(message[0]["name_alumnos"]);
        h2.appendChild(textoCelda);
        body.appendChild(h2);
        h2.setAttribute("class", "nombusu");
    }).catch(function(err){ 
        console.log(err);
    });

    //////// aqui va el codigo de los alumnos



    axios({
        method: 'post',
        url: url+'/user/a/'+id,
        data:{
            id: id
        }
    }).then(function(res){
        
        const {data} = res;
        const {message} = data;
        
        // console.log(message.length);
        // console.log(data);
        var body = document.getElementsByTagName("section")[1];

        for(var i = 0; i < message.length; i++){
            var id = message[i]["id_materia"];
            
            
    
        

            axios({
                method: 'post',
                url: url+'/user/b/'+id,
                data:{
                    id: id
                }
            }).then(function(res){
                var li  = document.createElement("li");
            
                const {data} = res;
                const {message} = data;
                

                var id = message[0]["id_profe"]
                ////////
                
                var h4   = document.createElement("h4");
                // var h2 = document.createElement("h2");
                var textoCelda = document.createTextNode(message[0]["name_materia"]);
                h4.appendChild(textoCelda);
                li.appendChild(h4);
                var input = document.createElement("input");
                input.setAttribute("id", message[0]["id_materia"]);
                // h2.setAttribute("class", "nombusu");
                    /////
                
                axios({
                    method: 'post',
                    url: url+'/user/c/'+id,
                    data:{
                        id: id
                    }
                }).then(function(res){
                    const {data} = res;
                    const {message} = data;
                    var profe = message[0]["name_profe"]
                    ////
                    // var body = document.getElementsByTagName("section")[2];
                    h4   = document.createElement("h4");
                    // var h2 = document.createElement("h2");
                    var textoCelda = document.createTextNode("Profe: "+profe);
                    h4.appendChild(textoCelda);
                    li.appendChild(h4);
                    h4.setAttribute("class", "nombprof");

                    
                    input.setAttribute("class", "btn entrar");
                    input.setAttribute("onclick", "ver_materia()");
                    // console.log(i);
                    
                    // i++;
                    input.setAttribute("type", "submit");
                    input.setAttribute("value", "Ingresar");
                    li.setAttribute("class", "inter");

                    li.appendChild(input); 
                    
                    body.appendChild(li);
                    
                }).catch(function(err){ 
                    console.log(err);
                });
                
            }).catch(function(err){ 
                console.log(err);
            });
            
            
        }
    }).catch(function(err){ 
        console.log(err);
    });

}