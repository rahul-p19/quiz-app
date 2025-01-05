"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const client_1 = require("@prisma/client");
const middleware_1 = require("./middleware");
const prisma = new client_1.PrismaClient();
var questions;
prisma.question.findMany({
    select: {
        questionId: true,
        statement: true,
        optiona: true,
        optionb: true,
        optionc: true,
        optiond: true,
        marks: true
    }
}).then(res => questions = res);
const corsOptions = {
    origin: ['http://localhost:3000', 'https://quiz-app-sable-ten.vercel.app', 'hello.ieee-jaduniv.in'],
    credentials: true,
    optionSuccessStatus: 200
};
const app = (0, express_1.default)();
const port = 3001;
var currentQuestion;
var questionLive = false;
var allowNav = false;
var users = [];
app.use((0, cors_1.default)(corsOptions));
app.use(middleware_1.checkOrigin);
function broadcast(users, question) {
    // broadcasting current question to all users
    currentQuestion = question;
    questionLive = true;
    users.forEach(res => {
        res.write("data: " + `${JSON.stringify(question)}\n\n`);
    });
}
app.get("/questions", (req, res) => {
    console.log("User connected.");
    console.log(currentQuestion);
    console.log("Nav allowed: ", allowNav);
    console.log("Question live: ", questionLive);
    // adding all users to stream
    res.setHeader("Content-Type", "text/event-stream");
    if (currentQuestion && questionLive) {
        if (!allowNav)
            res.write("data: " + `${JSON.stringify(currentQuestion)}\n\n`);
        else
            res.write("data: " + "allowQuestions\n\n");
    }
    if (allowNav)
        res.write("data: allowNavigation\n\n");
    users.push(res);
    req.on('close', () => {
        users = users.filter(userResp => userResp !== res);
    });
});
app.get("/start", (req, resp) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const ind = typeof (req.query.ind) == "string" ? parseInt(req.query.ind) : 0;
        currentQuestion = questions.find(question => question.questionId === ind);
        questionLive = true;
        console.log("Users Length: ", users.length);
        console.log("Sending question");
        //console.log(currentQuestion);
        broadcast(users, currentQuestion);
        resp.send("Broadcast Started");
    }
    catch (error) {
        resp.send(`Error occured.\n${error}`);
    }
}));
app.get("/allowNavigation", (_req, res) => {
    allowNav = true;
    try {
        users.forEach(resp => {
            resp.write("data: " + "allowNavigation\n\n");
        });
        res.send("Navigation allowed");
    }
    catch (error) {
        console.log(error);
        res.send(`Error occured.\n${error}`);
    }
});
app.get("/stopNavigation", (_req, res) => {
    allowNav = false;
    try {
        users.forEach(resp => {
            resp.write("data: " + "stopNavigation\n\n");
        });
    }
    catch (error) {
        console.log(error);
        res.send(`Error occured.\n${error}`);
    }
});
app.get("/allowQuestions", (_req, res) => {
    questionLive = true;
    console.log("allow questions request");
    try {
        users.forEach(resp => {
            resp.write("data: " + "allowQuestions\n\n");
        });
    }
    catch (err) {
        console.log(err);
        res.send(`Error occured\n${err}`);
    }
});
app.get("/stopQuestions", (_req, res) => {
    questionLive = false;
    console.log("Stopping questions.");
    try {
        users.forEach(resp => {
            resp.write("data: " + "stopQuestions\n\n");
        });
    }
    catch (err) {
        console.log(err);
        res.send(`Error occured\n${err}`);
    }
});
app.get("/stop", (_req, resp) => {
    questionLive = false;
    allowNav = false;
    currentQuestion = {
        statement: "",
        questionId: 0,
        optiona: "",
        optionb: "",
        optionc: "",
        optiond: "",
        marks: 0
    };
    try {
        users.forEach(res => {
            res.write("data: " + "close\n\n"); // will also disable questionLive on frontend
        });
        resp.send("Broadcast closed.");
        users.length = 0;
    }
    catch (error) {
        resp.send(`An error occured.\n${error}`);
    }
});
app.listen(port, () => {
    console.log(`Listening on port ${port}`);
});
