const express = require('express');
const user = express.Router();
const bd = require('../config/database');
const multer = require('multer')
const upload = multer({ dest: '/Applications/XAMPP/xamppfiles/htdocs/pagina/intefaces_generales/tarea' })

user.post('/kk/a', upload.single('image'), (req, res) => {
    console.log(req.body);
    // upload.single('image');
    // console.log("asd");
    // console.log(req.file);
    // console.log(req.body.username);
    // SET STORAGE
var storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, 'uploads')
    },
    filename: function (req, file, cb) {
      cb(null, file.fieldname + '-' + Date.now())
    }
  })
  var upload = multer({ storage: storage })
    return res.status(200);
    
});

user.post("/signin/a", async (req, res, next)=>{ /// Agregar un nuevo profesor a la base de datos
    const {name_profe, pass_profe}= req.body;

    // if(ame_profe && pass_profe){
        let query =`INSERT INTO profe(name_profe, pass_profe) `;
        query += `VALUES ('${name_profe}','${pass_profe}')`;
        const rows = await bd.query(query);
        if(rows.affectedRows == 1){
            return res.status(200).json({code:200, message: "Profesor registrado correctamente"})
        }
        return res.status(500).json({code:500, message: "Ocurrio un problema"});
    // }
    return res.status(500).json({code:500, message: "Campos incompletos"});
});
user.post("/signin/b", async (req, res, next)=>{ /// Agregar un nuevo alumno a la base de datos
    const { name_alumnos, pass_alumnos}= req.body;

    // if(name_alumnos && pass_alumnos){
        let query =`INSERT INTO alumnos(name_alumnos, pass_alumnos) `;
        query += `VALUES ('${name_alumnos}','${pass_alumnos}')`;
        const rows = await bd.query(query);
        if(rows.affectedRows == 1){
            return res.status(200).json({code:200, message: "Alumno registrado correctamente"})
        }
        return res.status(500).json({code:500, message: "Ocurrio un problema"});
    // }
    return res.status(500).json({code:500, message: "Campos incompletos"});
});
user.post("/signin/c", async (req, res, next)=>{ /// Agregar una nueva materia a la base de datos
    const {id_materia, id_prof}= req.body;

    // if(id_materia && name_materia && id_profe){
        let query =`INSERT INTO materias(name_materia, id_profe) `;
        query += `VALUES ('${id_materia}','${id_prof}')`;
        const rows = await bd.query(query);
        if(rows.affectedRows == 1){
            return res.status(200).json({code:200, message: "Materia registrado correctamente"})
        }
        return res.status(500).json({code:500, message: "Ocurrio un problema"});
    // }
    // return res.status(500).json({code:500, message: "Campos incompletos"});
});
user.post("/signin/d", async (req, res, next)=>{ /// Agregar una nueva actividad a la base de datos
    const {title_actividad, desc_actividad, fecha_actividad, id_materia}= req.body;

    // if(id_materia && name_materia && id_profe){
        let query =`INSERT INTO actividades( title_actividad, desc_actividad, fecha_actividad, id_materia) `;
        query += `VALUES ('${title_actividad}','${desc_actividad}','${fecha_actividad}','${id_materia}')`;
        const rows = await bd.query(query);
        if(rows.affectedRows == 1){
            return res.status(200).json({code:200, message: "Actividad registrado correctamente"})
        }
        return res.status(500).json({code:500, message: "Ocurrio un problema"});
    // }
    // return res.status(500).json({code:500, message: "Campos incompletos"});
});
user.post("/signin/e", async (req, res, next)=>{ /// Enlazar un alumno con una materia
    // console.log("asd");
    const {id_alumnos, id_materia}= req.body;

    // if(id_alumnos && id_materia){
        let query =`INSERT INTO alumnos_materias( id_alumnos, id_materia) `;
        query += `VALUES (${id_alumnos},${id_materia})`;
        console.log(query);
        const rows = await bd.query(query);
        if(rows.affectedRows == 1){
            return res.status(200).json({code:200, message: "Enlace registrado correctamente"})
        }
        return res.status(500).json({code:500, message: "Ocurrio un problema"});
    // }
    // return res.status(500).json({code:500, message: "Campos incompletos"});
});
user.post("/signin/f", async (req, res, next)=>{ /// Subida de archivos correcta
    const {id_alumnos, id_actividad, url_actividad}= req.body;

    if(id_alumnos && id_actividad && url_actividad){
        let query =`INSERT INTO alumnos_materias( id_alumnos, id_actividad, url_actividad) `;
        query += `VALUES ('${id_alumnos}','${id_actividad}','${url_actividad}')`;
        const rows = await bd.query(query);
        if(rows.affectedRows == 1){
            return res.status(200).json({code:201, message: "Archivo guardado correctamente"})
        }
        return res.status(500).json({code:500, message: "Ocurrio un problema"});
    }
    return res.status(500).json({code:500, message: "Campos incompletos"});
});

user.post("/login/a", async (req, res, next)=>{ ///// entrar como profesor 
    const {name_profe, pass_profe} = req.body;
    const query = `SELECT * FROM profe WHERE name_profe='${name_profe}'AND pass_profe = '${pass_profe}';`;
    const rows = await bd.query(query);
    // if(user_mail && user_password){
        if(rows.length == 1){
            return res.status(200).json({code: 200, message: rows});
        }
        else{
            return res.status(200).json({code: 401, message: "Usuario y/o constraseña incorrectos"});
        }
    // }
    // return res.status(500).json({code: 500, message: "Campos incompletos"});
});
user.post("/login/b", async (req, res, next)=>{  ///// entrar como usuario 
    const {name_alumnos, pass_alumnos} = req.body;
    const query = `SELECT * FROM alumnos WHERE name_alumnos='${name_alumnos}'AND pass_alumnos = '${pass_alumnos}';`;
    const rows = await bd.query(query);
    // if(user_mail && user_password){
        if(rows.length == 1){
            return res.status(200).json({code: 200, message: rows});
        }
        else{
            return res.status(200).json({code: 401, message: "Usuario y/o constraseña incorrectos"});
        }
    // }
    // return res.status(500).json({code: 500, message: "Campos incompletos"});
});

user.post("/:id", async (req, res, next) => {
    const id = req.params.id;
    const query = `SELECT * FROM alumnos WHERE id_alumnos = ${id} ;`;
    console.log(query);
    const rows = await bd.query(query);
    
    return rows.length > 0 ? res.status(200).json({code:200, message: rows}) : res.status(404).send({code: 404, message: "empleado no encontrado"});
});
user.post("/nn/:id", async (req, res, next) => {
    const id = req.params.id;
    const query = `SELECT * FROM alumnos WHERE id_alumnos = ${id} ;`;
    console.log(query);
    const rows = await bd.query(query);
    
    return rows.length > 0 ? res.status(200).json({code:200, messages: rows}) : res.status(404).send({code: 404, message: "empleado no encontrado"});
});
user.post("/a/:id", async (req, res, next) => {
    const id = req.params.id;
    const query = `SELECT * FROM alumnos_materias WHERE id_alumnos = ${id} ;`;
    console.log(query);
    const rows = await bd.query(query);
    
    return rows.length > 0 ? res.status(200).json({code:200, message: rows}) : res.status(404).send({code: 404, message: "empleado no encontrado"});
});
user.post("/b/:id", async (req, res, next) => {
    const id = req.params.id;
    const query = `SELECT * FROM materias WHERE id_materia = ${id} ;`;
    console.log(query);
    const rows = await bd.query(query);
    
    return rows.length > 0 ? res.status(200).json({code:200, message: rows}) : res.status(404).send({code: 404, message: "empleado no encontrado"});
});
user.post("/c/:id", async (req, res, next) => {
    const id = req.params.id;
    const query = `SELECT * FROM profe WHERE id_profe = ${id} ;`;
    console.log(query);
    const rows = await bd.query(query);
    
    return rows.length > 0 ? res.status(200).json({code:200, message: rows}) : res.status(404).send({code: 404, message: "empleado no encontrado"});
});
user.post("/d/:id", async (req, res, next) => {
    const id = req.params.id;
    const query = `SELECT * FROM actividades WHERE id_materia = ${id} ;`;
    console.log(query);
    const rows = await bd.query(query);
    
    return rows.length > 0 ? res.status(200).json({code:200, message: rows}) : res.status(404).send({code: 404, message: "empleado no encontrado"});
});
user.post("/e/:id", async (req, res, next) => {
    const id = req.params.id;
    const query = `SELECT * FROM materias WHERE id_profe = ${id} ;`;
    console.log(query);
    const rows = await bd.query(query);
    
    return rows.length > 0 ? res.status(200).json({code:200, message: rows}) : res.status(404).send({code: 404, message: "empleado no encontrado"});
});
user.post("/f/:id", async (req, res, next) => {
    const id = req.params.id;
    const query = `SELECT * FROM actividades WHERE id_actividad = ${id} ;`;
    console.log(query);
    const rows = await bd.query(query);
    
    return rows.length > 0 ? res.status(200).json({code:200, message: rows}) : res.status(404).send({code: 404, message: "empleado no encontrado"});
});
user.post("/g/:id/:id2", async (req, res, next) => {
    const id = req.params.id;
    const id2 = req.params.id2;
    const query = `SELECT * FROM actividad_entregada WHERE id_alumnos = ${id} && id_actividad = ${id2};`;
    console.log(query);
    const rows = await bd.query(query);
    
    return rows.length > 0 ? res.status(200).json({code:200, message: rows}) : res.status(404).send({code: 404, message: "empleado no encontrado"});
});
user.post("/h/:id", async (req, res, next) => {
    const id = req.params.id;
    // const id2 = req.params.id2;
    const query = `SELECT * FROM actividad_entregada WHERE id_actividad = ${id};`;
    console.log(query);
    const rows = await bd.query(query);
    
    return rows.length > 0 ? res.status(200).json({code:200, message: rows}) : res.status(404).send({code: 404, message: "empleado no encontrado"});
});
user.post("/i/:id", async (req, res, next) => {
    const id = req.params.id;
    const query = `SELECT * FROM alumnos WHERE id_alumnos = ${id} ;`;
    console.log(query);
    const rows = await bd.query(query);
    
    return rows.length > 0 ? res.status(200).json({code:200, messagef: rows}) : res.status(404).send({code: 404, message: "empleado no encontrado"});
});
user.put("/j/:id/:ids", async (req, res, next) => {
    const {retro, calif}= req.body;
    // console.log(retro);
    const id = req.params.id;
    const ids = req.params.ids;
    const query = `UPDATE actividad_entregada SET retro_actividad = '${retro}', calificacion_actividad = ${calif} WHERE id_alumnos = ${id} && id_actividad = ${ids};`
    // console.log(query);
    const rows = await bd.query(query);
    return rows.affectedRows ==1 > 0 ? res.status(200).json({code:200, message: "sis"}) : res.status(404).send({code: 404, message: "empleado no encontrado"});
});
user.post("/l/:id", async (req, res, next) => {
    const id = req.params.id;
    const query = `SELECT * FROM alumnos_materias WHERE id_materia = ${id} ;`;
    console.log(query);
    const rows = await bd.query(query);
    
    return rows.length > 0 ? res.status(200).json({code:200, message: rows}) : res.status(404).send({code: 404, message: "empleado no encontrado"});
});
user.post("/m/:id", async (req, res, next) => {
    const id = req.params.id;
    const query = `SELECT * FROM materias WHERE name_materia = ${id} ;`;
    console.log(query);
    const rows = await bd.query(query);
    
    return rows.length > 0 ? res.status(200).json({code:200, message: rows}) : res.status(404).send({code: 404, message: "empleado no encontrado"});
});



//UPDATE `actividad_entregada` SET `retro_actividad`='aaaaa',`calificacion_actividad`= 10 WHERE `id_alumnos` = 1 && `id_actividad` = 1;

//SELECT * FROM `actividad_entregada` WHERE `id_alumnos` = 1 && `id_actividad` = 3;

module.exports = user;