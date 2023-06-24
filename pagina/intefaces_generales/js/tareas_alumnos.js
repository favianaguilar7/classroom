window.onload = init;
var headers = {};
var url = "http://localhost:3000";

function init(){
    // document.querySelector('.entrar').addEventListener('click', ver_materia);
    iniciar();
}



function iniciar(){
    var id = sessionStorage.getItem("id");
    // console.log(id);
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


    axios({
        method: 'post',
        url: url+'/user/a/'+id,
        data:{
            id: id
        }
    }).then(function(res){
        const {data} = res;
        const {message} = data;
        var id = sessionStorage.getItem("id_clase")
        axios({
            method: 'post',
            url: url+'/user/b/'+id,
            data:{
                id: id
            }
        }).then(function(res){
            const {data} = res;
            const {message} = data;
            var id = sessionStorage.getItem("id_act");
            ////////
            var body = document.getElementsByTagName("section")[1];
            var h3   = document.createElement("h3");
            var textoCelda = document.createTextNode(message[0]["name_materia"]);
            h3.appendChild(textoCelda);
            body.appendChild(h3);
            /////
            
            axios({
                method: 'post',
                url: url+'/user/f/'+id,
                data:{
                    id: id
                }
            }).then(function(res){
                const {data} = res;
                const {message} = data;
                var body = document.getElementsByTagName("section")[3];
                var h3   = document.createElement("h3");
                // var h2 = document.createElement("h2");
                var textoCelda = document.createTextNode(message[0]["title_actividad"]);
                h3.appendChild(textoCelda);
                body.appendChild(h3);
                var body = document.getElementsByTagName("section")[4];
                var a   = document.createElement("a");
                // var h2 = document.createElement("h2");
                var textoCelda = document.createTextNode(message[0]["desc_actividad"]);
                a.appendChild(textoCelda);
                body.appendChild(a);
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
                    // console.log(message);
                    if(message[0]["retro_actividad"] != null && message[0]["calificacion_actividad"] != null){
                        var body = document.getElementsByTagName("section")[5];
                       
                        var a   = document.createElement("a");
                        var textoCelda = document.createTextNode("Retroalimentacion: "+ message[0]["retro_actividad"]);
                        a.appendChild(textoCelda);
                        // class="barra"
                        body.appendChild(a);
                        var h3   = document.createElement("h3");
                        var textoCelda = document.createTextNode("Calificacion: "+ message[0]["calificacion_actividad"]);
                        h3.appendChild(textoCelda);
                        // body.setAttribute("class", "barra");
                        body.appendChild(h3);
                        body.setAttribute("class", "barra");
                    }else{
                        const button = dropArea.querySelector(".entrar");
                        button.addEventListener("click", (e) => {
                            console.log("asd");
                        });
                    }
                }).catch(function(err){ 
                    console.log(err);
                });
            }).catch(function(err){ 
                console.log(err);
            });
        }).catch(function(err){ 
            console.log(err);
        });
    }).catch(function(err){ 
        console.log(err);
    });
}
var $form = document.querySelector('#form');
    $form.addEventListener('submit', (event) => {
      event.preventDefault()
      const formData = new FormData(event.currentTarget)
      // renderUsername(formData)
    //   console.log(formData.append);
      axios({
        method: 'post',
        url: url+'/user/kk/a',
        data: formData
        
      }).then(function(res){
        console.log("si");
      }).catch(function(err){
        console.log(err);
      });
    });