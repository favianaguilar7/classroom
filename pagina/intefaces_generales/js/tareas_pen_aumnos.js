window.onload = init;
var headers = {};
var url = "http://localhost:3000";

function init(){
    // if(localStorage.getItem("token")){
    //     let token = localStorage.getItem("token");
    //     headers={
    //         'Authorization': "bearer " + localStorage.getItem("token")
    //     }
        document.querySelector('.NuevClass').addEventListener('click', ver_materia);
        // genera_tabla();
        iniciar();
    // }else{
    //     window.location.href = "login.html"
    // }
}
function ver_materia(){
    
    window.location.href = "../intefaces_generales/tareas_alumnos.html";
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
            window.location.href = "../intefaces_generales/tareas_alumnos.html";
        }); 
    }
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
            
            axios({
                method: 'post',
                url: url+'/user/c/'+id,
                data:{
                    id: id
                }
            }).then(function(res){
                const {data} = res;
                const {message} = data;
            }).catch(function(err){ 
                console.log(err);
            });

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
            
            var body = document.getElementsByTagName("tbody")[0];
            for(var i = 0; i < message.length; i++){
                // console.log(message[i]);
                var tr = document.createElement("tr");
                var td = document.createElement("td");
                // var a = document.createElement("a");
                var textoCelda = document.createTextNode(message[i]["title_actividad"]);
                // console.log(message[i]["title_actividad"]);
                td.appendChild(textoCelda);
                tr.appendChild(td);
                var td = document.createElement("td");
                var textoCelda = document.createTextNode(message[i]["fecha_actividad"].split("T")[0]);
                td.appendChild(textoCelda);
                tr.appendChild(td);
                var td = document.createElement("td");
                var input = document.createElement("input");
                input.setAttribute("class", "btn entrar");
                input.setAttribute("type", "submit");
                input.setAttribute("value", "Ingresar");
                input.setAttribute("onclick", "ingresar()");
                input.setAttribute("id", message[i]["id_actividad"]);

                // <td><input class="btn entrar" type="submit" value="Ingresar"></td>
                td.appendChild(input);
                tr.appendChild(td);
                body.appendChild(tr);
            }


            
            // // var 
            
            // // var h2 = document.createElement("h2");
            
            
            
            // // var body = document.getElementsByTagName("section")[3];
            // var a = document.createElement("a");
            // // var h2 = document.createElement("h2");
           
            // a.appendChil-d(textoCelda);
            // body.appendChild(a);
        }).catch(function(err){ 
            console.log(err);
        });
    }).catch(function(err){ 
        console.log(err);
    });
}