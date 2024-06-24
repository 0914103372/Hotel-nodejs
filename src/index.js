import express from 'express'
import user_route from './routes/user-routes.js'
import { engine } from 'express-handlebars';
import path from 'path'

const app = express()
const port = 3000

app.use(express.static('../src/public'));

app.engine('.hbs', engine({extname: '.hbs'}));
app.set('view engine', '.hbs');
app.set('views', '../src/resource/views');

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/user",user_route)

app.get("/",(req,res)=>{
    res.render('home');
})

app.listen(port,()=>{
    console.log(`Example app listening on http://localhost:${port}`)
})
