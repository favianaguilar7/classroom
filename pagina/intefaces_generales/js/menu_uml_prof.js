
window.onload = init;
var headers = {};
var url = "http://localhost:3000";

function init(){
  iniciar();
}

function ver_materia(){
    
  window.location.href = "../intefaces_generales/tareas_profe.html";
}

function enviar(){
    var retro = document.getElementById("retro").value;
    var calif = document.getElementById("calif").value;
    /// se envia la retroalimentacion y calificacion que se le va a dar al alumno
    axios({
        method: 'put',
        url: url+'/user/j/'+sessionStorage.getItem("id_alumno")+"/"+sessionStorage.getItem("id_act"),
        data:{
            retro: retro,
            calif: calif
        }
    }).then(function(res){
        alert("Se envio la respuesta exitosamente");
        window.location.href = "../intefaces_generales/tareas_pen_profe.html";
    }).catch(function(err){ 
        console.log(err);
    });
}


function ingresar(){
    var selec =document.querySelectorAll('.entrar')
    console.log(selec.length);
    for(var i=0;i<selec.length;i++)
    {
        selec[i].addEventListener("click", function()
        {
            let asd = document.getElementById(this.id);
            console.log(asd.id);
            sessionStorage.setItem("id_act", asd.id)
            window.location.href = "../intefaces_generales/tareas_profe.html";
        }); 
    }
}
function iniciar(){
    
    var id = sessionStorage.getItem("id");
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
        var textoCelda = document.createTextNode(message[0]["name_profe"]);
        h2.appendChild(textoCelda);
        body.appendChild(h2);
        h2.setAttribute("class", "nombusu");
    }).catch(function(err){ 
        console.log(err);
    });

    axios({
        method: 'post',
        url: url+'/user/b/'+sessionStorage.getItem("id_clase"),
        data:{
            id: id
        }
    }).then(function(res){
        const {data} = res;
        const {message} = data;
        var body = document.getElementsByTagName("section")[1];
        var h3   = document.createElement("h3");
        var textoCelda = document.createTextNode("Materia: "+message[0]["name_materia"]);
        h3.appendChild(textoCelda);
        body.appendChild(h3);
    }).catch(function(err){ 
        console.log(err);
    });

    axios({
        method: 'post',
        url: url+'/user/f/'+sessionStorage.getItem("id_act"),
        data:{
            id: id
        }
    }).then(function(res){
        const {data} = res;
        const {message} = data;
        var body = document.getElementsByTagName("section")[1];
        var h3   = document.createElement("h3");
        var textoCelda = document.createTextNode("Actividad: "+message[0]["title_actividad"]);
        h3.appendChild(textoCelda);
        body.appendChild(h3);
    }).catch(function(err){ 
        console.log(err);
    });

    axios({
        method: 'post',
        url: url+'/user/i/'+sessionStorage.getItem("id_alumno"),
        data:{
            id: id
        }
    }).then(function(res){
        const {data} = res;
        const {messagef} = data;
        var body = document.getElementsByTagName("section")[1];
        var h3   = document.createElement("h3");
        var textoCelda = document.createTextNode("Alumno: "+messagef[0]["name_alumnos"]);
        h3.appendChild(textoCelda);
        body.appendChild(h3);
    }).catch(function(err){ 
        console.log(err);
    });


    var id_alumnos = sessionStorage.getItem("id");
    var id_act = sessionStorage.getItem("id_act");
    axios({
      method: 'post',
      url: url+'/user/g/'+id_alumnos+'/'+ id_act,
      data:{
          id: id
      }
    }).then(function(res){
      const {data} = res;
      const {message} = data;
      console.log(message);
      if(message[0]["calificacion_actividad"] != null){
        var body = document.getElementsByTagName("section")[1];
        var h3   = document.createElement("h3");
        var textoCelda = document.createTextNode("calif: "+message[0]["calificacion_actividad"]);
        h3.appendChild(textoCelda);
        body.appendChild(h3);
      }
    }).catch(function(err){ 
        console.log(err);
    });


  // en la seccion de codigo a continuacion 151-207 en la captera /tarea extrae todos los documentos .java que esten ahi
  // y de todos ellos va a sacar las clases que inicien con public o private

  const xhttp = new XMLHttpRequest();
  xhttp.open('GET', 'tarea', true);
  xhttp.send();
  xhttp.onreadystatechange = function(){

    // en esta parte de aqui 158 - 167 saca los nombres de de los archivos 
    if(this.readyState == 4 && this.status == 200) {
      var texto = this.responseText.split('"');
      for(var i = 0; i < texto.length; i++){
        var iter = texto[i].split('.');
        for(var j = 0; j < iter.length; j++){
          if(iter[j] == "java" ){
            var control = 0;
            var junto = iter[0]+".java";

            // en esta parte de aqui 168 - 213 imprime las lineas donde se encuentre las palabras de public y privado

            const xhttp2 = new XMLHttpRequest();
            xhttp2.open('GET', "./tarea/"+junto , true);
            xhttp2.send();
            var body = document.getElementsByTagName("section")[2];
            xhttp2.onreadystatechange = function(){
              var texto = this.responseText.split("\n");
              control++;
                for(var k = 0; k < texto.length; k++){
                  var iter = texto[k].split(" ");
                  for(var l = 0; l < iter.length; l++){
                    if(iter[l] == "public" || iter[l] == "private"){
                      if(l === 0){
                        var br = document.createElement("br");
                        body.appendChild(br);
                        var br = document.createElement("br");
                        body.appendChild(br);
                        var a = document.createElement("a");
                        var textoCelda = document.createTextNode(texto[k].split("{")[0]);
                        a.appendChild(textoCelda);
                        body.appendChild(a);
                        var br = document.createElement("br");
                        body.appendChild(br);
                        
                      }else{
                        var a = document.createElement("a");
                        var textoCelda = document.createTextNode(texto[k].split("{")[0]);
                        a.appendChild(textoCelda);
                        body.appendChild(a);
                        var br = document.createElement("br");
                        body.appendChild(br);
                      }
                    }
                  }
                }
              // }
            }
          }
        }
      }
    }
  }
// }
}