// Olá, eu sou um teste
import express , {json} from "express"
import cors from "cors"
import joi from "joi"
import {MongoClient} from "mongodb" //importanto o módulo do mongo. O objeto MongoClient permite a conexão com o banco de dados

const app = express();
app.use(cors());
app.use(json());

app.get("/", (req, res) => {
    
    res.send('Servidor no ar');
});

const mongoClient = new MongoClient("mongodb://localhost:27017"); /* Criando a configuração de uma nova conexão com o mongo
    A URL passada como parâmetro em new MongoClient() é o endereço do banco de dados. Nesse caso, um banco local.*/
let bancoDeDados = null; //Criando uma variável de banco de dados

const promise = mongoClient.connect();//connect é uma função assíncrona, por isso retorna uma promise

promise.then(() => { 
    bancoDeDados = mongoClient.db("bate-papo_uol"); /* Utilizando a variável "bancoDeDados" para estabelecer a conexão com o banco de dados
        O parâmetro que está sendo passado na função db é o banco de dados específico que quero acessar dentro da ferramenta mongo*/

    bancoDeDados.collection("usuarios");
});

promise.catch(() => {
    console.log("Erro ao tentar se conectar ao banco de dados");
})

app.get("/participants", (req, res) => {
    //retornar a lista de todos os participantes
    
    console.log(req.headers.user)
    bancoDeDados.collection("usuarios").find().toArray().then(usuarios => {
        console.log(`usuarios = ${usuarios}`)
    });
    res.send("app get está funcionando");
});

app.post("/participants", (req, res) => {
    const usuario = {...req.body , lastStatus: Date.now()};
    //fazer validações
    // Se estiver tudo ok, cadastrar usuário no banco de dados
    res.status(201)
});

app.listen(5000);
