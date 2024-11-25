import express, {Request, Response} from "express";
import cors from "cors";
import { PrismaClient, Question } from "@prisma/client";

import { questions } from "./questions"; // REMOVE THIS

const prisma = new PrismaClient();

const corsOptions = {
    origin: '*',
    credentials: true,
    optionSuccessStatus: 200
}

const app = express();
const port = 3001;

app.use(cors(corsOptions));

const users:Response[] = [];

function broadcast(users:Response[], questions: Question[]){
    let ctr=0;
    const interval = setInterval(()=>{
        if(ctr>=questions.length){
            clearInterval(interval);
            return;
        }
        const questionData = JSON.stringify(questions[ctr]);
        users.forEach(res=>{
            res.write("data: "+`${questionData}\n\n`);
        })
        ++ctr;
    },10000)
}

app.get('/', (req:Request,res:Response) => {
   res.send("Hello!");
})

app.get("/questions", (req:Request, res:Response)=>{
    res.setHeader("Content-Type","text/event-stream");

    users.push(res);
})

app.get("/start",async (req:Request, resp:Response)=>{
    try {
        //const questions = await prisma.question.findMany();

        // UPDATE THIS
        console.log("Users Length: ",users.length);
        console.log("starting broadcast");
        broadcast(users,questions);
        resp.send("Broadcast Started");
    } catch (error) {
        resp.send(`Error occured.\n${error}`);
    }
})

app.get("/allowNavigation",(req:Request, res:Response)=>{
    try {
        users.forEach(resp=>{
            resp.write("data: "+"allowNavigation\n\n");
        })
        res.send("Navigation allowed")
    } catch (error) {
        console.log(error);
        res.send(`Error occured.\n${error}`)
    }
})

app.get("/stopNavigation",(req:Request, res:Response)=>{
    try {
        users.forEach(resp=>{
            resp.write("data: "+"stopNavigation\n\n");
        })
    } catch (error) {
        console.log(error);
        res.send(`Error occured.\n${error}`)
    }
})

app.get("/stop",(req:Request, resp:Response)=>{
    try {
        users.forEach(res=>{
            res.write("data: "+"close\n\n");
        })
        resp.send("Broadcast closed.");
        users.length = 0;
    } catch (error) {
        resp.send(`An error occured.\n${error}`);
    }
})

app.listen(port, ()=> {
console.log(`listening on port ${port}`);
})