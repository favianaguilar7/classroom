window.onload = init;
var headers = {};
var url = "http://localhost:3000";
function init(){
        iniciar();
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
            sessionStorage.setItem("id_alumno", asd.id)
            window.location.href = "../intefaces_generales/menu_uml_prof.html";
        }); 
    }
}
function agregar_alumnos(title_actividad){

    axios({
        method: 'post',
        url: url+'/user/m/'+title_actividad,
        data:{

        }
    }).then(function(res){
        const {data} = res;
        const {message} = data;
        const materia = message[0]["id_materia"];
        axios({
            method: 'post',
            url: url+'/user/l/'+ sessionStorage.getItem("id_materia"),
            data:{
            }
        }).then(function(res){
            const {data} = res;
            const {message} = data;
            for(var i = 0; i < message.length; i++){
                const alumno = message[i]["id_alumnos"]
                axios({
                    method: 'post',
                    url: url+'/user/signin/e',
                    data:{
                        id_alumnos: alumno,
                        id_materia: materia
                    }
                }).then(function(res){
                    document.getElementById('n1').style.display = 'none';
                    agregar_alumnos(title_actividad);
                    alert("Registro exitoso");
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
        url: url+'/user/a/'+id,
        data:{
            id: id
        }
    }).then(function(res){
        const {data} = res;
        const {message} = data;
        var id = sessionStorage.getItem("id_clase");
        axios({
            method: 'post',
            url: url+'/user/b/'+id,
            data:{
                id: id
            }
        }).then(function(res){
            const {data} = res;
            const {message} = data;
            var id = message[0]["id_materia"]
            var body = document.getElementsByTagName("section")[1];
            var h3   = document.createElement("h3");
            var textoCelda = document.createTextNode(message[0]["name_materia"]);
            h3.appendChild(textoCelda);
            body.appendChild(h3);
            axios({
                method: 'post',
                url: url+'/user/f/'+sessionStorage.getItem("id_act"),
                data:{
                    id: id
                }
            }).then(function(res){
                const {data} = res;
                const {message} = data;
                var body = document.getElementsByTagName("section")[2];
                var h3   = document.createElement("h3");
                var textoCelda = document.createTextNode(message[0]["title_actividad"]);
                h3.appendChild(textoCelda);
                body.appendChild(h3);
                var body = document.getElementsByTagName("section")[3];
                var a   = document.createElement("a");
                var textoCelda = document.createTextNode(message[0]["desc_actividad"]);
                a.appendChild(textoCelda);
                body.appendChild(a);
            }).catch(function(err){ 
                console.log(err);
            });

        }).catch(function(err){ 
            console.log(err);
        });
    }).catch(function(err){ 
        console.log(err);
    });

    axios({
        method: 'post',
        url: url+'/user/h/'+sessionStorage.getItem("id_act"),
        data:{
            id: id
        }
    }).then(function(res){
        const {data} = res;
        const {message} = data;
        var p =0 ;
        for(var i = 0; i < message.length; i++){
            axios({
                method: 'post',
                url: url+'/user/i/'+message[i]["id_alumnos"],
                data:{
                    id: id
                }
            }).then(function(res){
                const {data} = res;
                const {messagef} = data;
                var body = document.getElementsByTagName("tbody")[0];
                var tr = document.createElement("tr");
                var td = document.createElement("td");
                var textoCelda = document.createTextNode(messagef[0]["name_alumnos"]);
                td.appendChild(textoCelda);
                tr.appendChild(td);
                var td = document.createElement("td");
                if(message[p]["url_actividad"] != null){
                    var textoCelda = document.createTextNode("Entregado");
                    td.appendChild(textoCelda);
                    tr.appendChild(td);
                    var td = document.createElement("td");
                    var input = document.createElement("input");
                    input.setAttribute("class", "btn entrar");
                    input.setAttribute("type", "submit");
                    input.setAttribute("value", "Ingresar");
                    input.setAttribute("onclick", "ingresar()");
                    input.setAttribute("id", messagef[0]["id_alumnos"]);
                    td.appendChild(input);
                    tr.appendChild(td);
                }else{
                    var textoCelda = document.createTextNode("No entregado");
                    td.appendChild(textoCelda);
                    tr.appendChild(td);
                    var td = document.createElement("td");
                    var textoCelda = document.createTextNode("Pendiente...");
                    td.appendChild(textoCelda);
                    tr.appendChild(td);
                } 
                p++;
                body.appendChild(tr);
            }).catch(function(err){ 
                console.log(err);
            });
        }
    }).catch(function(err){ 
        console.log(err);
    });
}
