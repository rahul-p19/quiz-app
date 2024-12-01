import express, { Request, Response } from "express";
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

var currentQuestion: Question;

app.use(cors(corsOptions));

const users: Response[] = [];

function broadcast(users: Response[], question: Question) {

  // broadcasting current question to all users
  currentQuestion = question;
  users.forEach(res => {
    res.write("data: " + `${JSON.stringify(question)}\n\n`);
  })
}

app.get("/questions", (_req: Request, res: Response) => {

  // adding all users to stream
  //console.log(currentQuestion);
  res.setHeader("Content-Type", "text/event-stream");

  if (currentQuestion)
    res.write("data: " + `${JSON.stringify(currentQuestion)}\n\n`);

  users.push(res);
})

app.get("/start", async (req: Request, resp: Response) => {
  try {
    const ind = typeof (req.query.ind) == "string" ? parseInt(req.query.ind) : 0;
    currentQuestion = questions[ind];
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

app.get("/stopNavigation", (req: Request, res: Response) => {
  try {
    users.forEach(resp => {
      resp.write("data: " + "stopNavigation\n\n");
    })
  } catch (error) {
    console.log(error);
    res.send(`Error occured.\n${error}`)
  }
})

app.get("/stop", (req: Request, resp: Response) => {
  try {
    users.forEach(res => {
      res.write("data: " + "close\n\n");
    })
    resp.send("Broadcast closed.");
    users.length = 0;
  } catch (error) {
    resp.send(`An error occured.\n${error}`);
  }
})

app.listen(port, () => {
  console.log(`listening on port ${port}`);
})
