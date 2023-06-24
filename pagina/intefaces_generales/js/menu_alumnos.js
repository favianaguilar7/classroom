window.onload = init;
var headers = {};
var url = "http://localhost:3000";

function init(){
        iniciar();
}

function openModal() { // hace visible el apartado con el id n1 en el html
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
        document.getElementById('n1').style.display = 'none'; // hace invisitble el apartado don el id n1
        alert("Registro exitoso");
    }).catch(function(err){ 
        console.log(err);
    });
}

function cerrarModal() {
    document.getElementById('n1').style.display = 'none';
}


////// la funcion de acontinuaacion detecta el boton que precionaste para identificar su id y subirlo al sesion storage 
function ver_materia(){
    var selec =document.querySelectorAll('.entrar')
    // console.log(selec.length);
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
// al iniciar la pagina have una consulta a diferentes url para extraer el nombre del alumno  y las materias con los profesores
function iniciar(){
    var id = sessionStorage.getItem("id");
    axios({
        method: 'post',
        url: url+'/user/'+id,
        data:{
            id: id
        }
    }).then(function(res){

        /// con los datos extraidos crea una nueva etiqueta en section con el nombre del alumno
        const {data} = res;
        const {message} = data;
        var body = document.getElementsByTagName("section")[0];
        var h2   = document.createElement("h2");
        var textoCelda = document.createTextNode(message[0]["name_alumnos"]);
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
        

        //// aqui extrae los datos del profesor
        const {data} = res;
        const {message} = data;
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
                var h4   = document.createElement("h4");
                var textoCelda = document.createTextNode(message[0]["name_materia"]);
                h4.appendChild(textoCelda);
                li.appendChild(h4);
                var input = document.createElement("input");
                input.setAttribute("id", message[0]["id_materia"]);
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
                    h4   = document.createElement("h4");
                    var textoCelda = document.createTextNode("Profe: "+profe);
                    h4.appendChild(textoCelda);
                    li.appendChild(h4);
                    h4.setAttribute("class", "nombprof");
                    input.setAttribute("class", "btn entrar");
                    input.setAttribute("onclick", "ver_materia()");
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