import express from "express";
import path from 'path';
const __dirname = path.resolve();
console.log(__dirname)
// import { fileURLToPath } from "url";
// import {dirname} from "path";
import upload from "express-fileupload"
const app = express();
const port = 3000;
// const __dirname =  dirname(fileURLToPath(import.meta.url)); //gets the path dynamically till the parent directory in which the our files are present

//middleware
app.use(express.urlencoded({extended :true}))
app.use(express.static(__dirname))
app.use(upload())
app.use(printFiledata)

//request handlers
app.get('/',(req,res)=>{
    console.log(__dirname);
    res.render(__dirname+"/index.html");
})

app.post('/',(req,res)=>{
    console.log(req.body)
    let file = req.files.filedata;
    // let filename  = req.files.filedata.name;
    let filename = req.body.nameOftheFile
    if(req.files){
        file.mv(__dirname+"/Uploads/"+filename,(err)=>{
            if(err){
                console.log(err)
                res.send(`ERROR :404`);
            }
            else{
                res.redirect('/')
                console.log(`${filename} uploaded successfully`);
            }
        });
    }
})

app.listen(port,()=>{
    console.log(`Listening to ${port} `)
})

function printFiledata(req,res,next){
    console.log(req.files.filedata)
    next();             /*this inclusion of next method is crucial for the flow,or else the control'll remain there itself in the call stack
      ignoring the following route handlers/middleware.*/
}
