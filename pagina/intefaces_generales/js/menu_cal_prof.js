window.onload = init;
var headers = {};
var url = "http://localhost:3000";

function init(){
        // document.querySelector('.entrar').addEventListener('click', ver_materia);
        iniciar();
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
        axios({
            method: 'post',
            url: url+'/user/d/'+id,
            data:{
                id: id
            }
        }).then(function(res){
            const {data} = res;
            const {message} = data;
            // console.log(message);
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
                // var name_act = message[i]["title_actividad"]
                // var nnn = 0;
                axios({
                    method: 'post',
                    url: url+'/user/h/'+message[i]["id_actividad"],
                    data:{
                        id: id
                    }
                }).then(function(res){
                    const {data} = res;
                    const {message} = data;
                    // var nnn = 0;
                    
                    axios({
                        method: 'post',
                        url: url+'/user/nn/'+message[i]["id_alumnos"],
                        data:{
                            id: id
                        }
                        
                    }).then(function(res){
                        
                        const {data} = res;
                        const {messages} = data;
                        // console.log(message[0]["name_alumnos"]);
                        // var td = document.createElement("td");
                        // const asd = messages[0]["name_alumnos"];
                        // console.log(messages[0]["name_alumnos"]);
                        // td.appendChild(textoCelda);
                        // tr.appendChild(td);
                        
                        // nnn++;
                        // var tr = document.createElement("tr");

                        var td = document.createElement("td");
        
                        var textoCelda = document.createTextNode(messages[0]["name_alumnos"]);
                        td.appendChild(textoCelda);
                        tr.appendChild(td);
                            body.appendChild(tr);
                            // nnn++;
                         
                        body.appendChild(tr);

                        nn++;

                        var td = document.createElement("td");
                        var textoCelda = document.createTextNode(message[i]["calificacion_actividad"]);
                        
                        td.appendChild(textoCelda);
                        // tr.appendChild(td);
                        // var td = document.createElement("td");
                        tr.appendChild(td);
                    }).catch(function(err){ 
                        console.log(err);
                    });
               
                
                }).catch(function(err){ 
                    console.log(err);
                });
                // nnn++;
                
            }
        }).catch(function(err){ 
            console.log(err);
        });
    }).catch(function(err){ 
        console.log(err);
    });

}