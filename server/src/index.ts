import express, {Request, Response} from "express";
import cors from "cors";
import { PrismaClient, Question } from "@prisma/client";

const prisma = new PrismaClient();

import { questions } from "./questions";

const corsOptions = {
    origin: '*',
    credentials: true,
    optionSuccessStatus: 200
}

const app = express();
const port = 3001;

app.use(cors(corsOptions));

const users:Response[] = [];
let quizPaused:boolean = false;

function broadcast(users:Response[], questions: Question[], ctr:number){
    // let ctr=0;
    const interval = setInterval(()=>{
        if(ctr>=questions.length || quizPaused){
            clearInterval(interval);
            return;
        }
        const questionData = JSON.stringify(questions[ctr]);
        users.forEach(res=>{
            res.write("data: "+`${questionData}\n\n`);
        })
        ++ctr;
    },3000)
}

app.get('/', (req:Request,res:Response) => {
   res.send("Hello!");
})

app.get("/questions", (req:Request, res:Response)=>{
    res.setHeader("Content-Type","text/event-stream");

    users.push(res);
})

app.get("/start", async (req:Request, resp:Response)=>{
    try {
        // const questions = await prisma.question.findMany();

        console.log("Users Length: ",users.length);
        console.log("starting broadcast");

        broadcast(users,questions,0);
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

app.get("/pause",(req:Request, res:Response)=>{
    try {
        quizPaused = false;
        res.send("Pausing quiz.");
    } catch (error) {
        console.log(error);
        res.send(`Error occured.\n${error}`);
    }
})

app.get("/resume",async (req:Request, res:Response)=>{
    try {
        let ind;
        if(typeof(req.query.id)==="string")
            ind = parseInt(req.query.id);
        else
            ind=0;

        // const questions = await prisma.question.findMany({
        //     where: {
        //         questionId: {
        //             gte: ind
        //         }
        //     }
        // });

        broadcast(users,questions,ind);
    } catch (error) {
        console.log(error);
        res.send(`Error occured.\n${error}`)
    }
})

app.listen(port, ()=> {
console.log(`listening on port ${port}`);
})