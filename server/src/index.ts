import express, { Request, Response } from "express";
import cors from "cors";
import { PrismaClient, Question } from "@prisma/client";
import { checkOrigin } from "./middleware";

const prisma = new PrismaClient();

//import { questions } from "./questions";

var questions: Question[];

prisma.question.findMany({
  select: {
    questionId: true,
    statement: true,
    optiona: true,
    optionb: true,
    optionc: true,
    optiond: true
  }
}).then(res => questions = res);

const corsOptions = {
  origin: ['http://localhost:3000', 'https://quiz-app-sable-ten.vercel.app', 'hello.ieee-jaduniv.in'],
  credentials: true,
  optionSuccessStatus: 200
}

const app = express();
const port = 3001;

var currentQuestion: Question;
var questionLive: boolean = false;
var allowNav: boolean = false;
var users: Response[] = [];

app.use(cors(corsOptions));
app.use(checkOrigin);

function broadcast(users: Response[], question: Question) {

  // broadcasting current question to all users
  currentQuestion = question;
  questionLive = true;
  users.forEach(res => {
    res.write("data: " + `${JSON.stringify(question)}\n\n`);
  })
}

app.get("/questions", (req: Request, res: Response) => {

  console.log("User connected.");
  console.log(currentQuestion);

  // adding all users to stream
  res.setHeader("Content-Type", "text/event-stream");

  if (currentQuestion && questionLive)
    res.write("data: " + `${JSON.stringify(currentQuestion)}\n\n`);

  if (allowNav) res.write("data: allowNavigation\n\n");

  users.push(res);

  req.on('close', () => {
    users = users.filter(userResp => userResp !== res);
  })

})

app.get("/start", async (req: Request, resp: Response) => {
  try {
    const ind = typeof (req.query.ind) == "string" ? parseInt(req.query.ind) : 0;
    currentQuestion = questions[ind];
    questionLive = true;
    console.log("Users Length: ", users.length);
    console.log("Sending question");

    //console.log(currentQuestion);
    broadcast(users, questions[ind]);
    resp.send("Broadcast Started");
  } catch (error) {
    resp.send(`Error occured.\n${error}`);
  }
})

app.get("/allowNavigation", (_req: Request, res: Response) => {
  allowNav = true;
  try {
    users.forEach(resp => {
      resp.write("data: " + "allowNavigation\n\n");
    })
    res.send("Navigation allowed")
  } catch (error) {
    console.log(error);
    res.send(`Error occured.\n${error}`)
  }
})

app.get("/stopNavigation", (_req: Request, res: Response) => {
  allowNav = false;
  try {
    users.forEach(resp => {
      resp.write("data: " + "stopNavigation\n\n");
    })
  } catch (error) {
    console.log(error);
    res.send(`Error occured.\n${error}`)
  }
})

app.get("/allowQuestions", (_req: Request, res: Response) => {
  questionLive = true;
  try {
    users.forEach(resp => {
      resp.write("data: " + "allowQuestions\n\n");
    })
  } catch (err) {
    console.log(err);
    res.send(`Error occured\n${err}`);
  }
})

app.get("/stopQuestions", (_req: Request, res: Response) => {
  questionLive = false;
  try {
    users.forEach(resp => {
      resp.write("data: " + "stopQuestions\n\n");
    })
  } catch (err) {
    console.log(err);
    res.send(`Error occured\n${err}`);
  }
})

app.get("/stop", (_req: Request, resp: Response) => {
  questionLive = false;
  allowNav = false;
  try {
    users.forEach(res => {
      res.write("data: " + "close\n\n"); // will also disable questionLive on frontend
    })
    resp.send("Broadcast closed.");
    users.length = 0;
  } catch (error) {
    resp.send(`An error occured.\n${error}`);
  }
})

app.listen(port, () => {
  console.log(`Listening on port ${port}`);
})
