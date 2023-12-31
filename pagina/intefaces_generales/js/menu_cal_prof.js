window.onload = init;
var headers = {};
var url = "http://localhost:3000";

function init(){
        iniciar();
}

function iniciar(){
    var id = sessionStorage.getItem("id");/// estrae del sesionstorage el id
    axios({
        method: 'post',
        url: url+'/user/c/'+id,
        data:{
            id: id
        }
    }).then(function(res){
        /// hce una peticion y coloca el nombre del porfesor correspondiente 
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

    /// aqui se hace una peticion para extraer el el nombre de la materia a calificar
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
            /// aqui se hace una peticion para extraer el titulo de la actividad a calificar
        axios({
            method: 'post',
            url: url+'/user/d/'+id,
            data:{
                id: id
            }
        }).then(function(res){
            const {data} = res;
            const {message} = data;
            var nn = 0;
            for(var i = 0; i < message.length; i++){
                var body = document.getElementsByTagName("tbody")[0];
                var tr = document.createElement("tr");
                var td = document.createElement("td");
                var textoCelda = document.createTextNode(message[i]["title_actividad"]);
                td.appendChild(textoCelda);
                tr.appendChild(td);
                console.log(message[i]["title_actividad"]);
                body.appendChild(tr);
                /// aqui se hace una peticion para extraer el id de la actividad
                axios({
                    method: 'post',
                    url: url+'/user/h/'+message[i]["id_actividad"],
                    data:{
                        id: id
                    }
                }).then(function(res){
                    const {data} = res;
                    const {message} = data;
                    /// aqui se hace una peticion para extraer el nombre del alumno a calificar y si tiene calificacion
                    axios({
                        method: 'post',
                        url: url+'/user/nn/'+message[i]["id_alumnos"],
                        data:{
                            id: id
                        }
                    }).then(function(res){
                        const {data} = res;
                        const {messages} = data;
                        var td = document.createElement("td");
                        var textoCelda = document.createTextNode(messages[0]["name_alumnos"]);
                        td.appendChild(textoCelda);
                        tr.appendChild(td);
                        body.appendChild(tr);
                        body.appendChild(tr);
                        nn++;
                        var td = document.createElement("td");
                        var textoCelda = document.createTextNode(message[i]["calificacion_actividad"]);
                        td.appendChild(textoCelda);
                        tr.appendChild(td);
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
    }).catch(function(err){ 
        console.log(err);
    });
}