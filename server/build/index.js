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
const prisma = new client_1.PrismaClient();
const questions_1 = require("./questions");
const corsOptions = {
    origin: '*',
    credentials: true,
    optionSuccessStatus: 200
};
const app = (0, express_1.default)();
const port = 3001;
var currentQuestion;
app.use((0, cors_1.default)(corsOptions));
const users = [];
function broadcast(users, question) {
    // broadcasting current question to all users
    currentQuestion = question;
    users.forEach(res => {
        res.write("data: " + `${JSON.stringify(question)}\n\n`);
    });
}
app.get("/questions", (req, res) => {
    // adding all users to stream
    console.log(currentQuestion);
    res.setHeader("Content-Type", "text/event-stream");
    if (currentQuestion)
        res.write("data: " + `${JSON.stringify(currentQuestion)}\n\n`);
    users.push(res);
});
app.get("/start", (req, resp) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const ind = typeof (req.query.ind) == "string" ? parseInt(req.query.ind) : 0;
        currentQuestion = questions_1.questions[ind];
        console.log("Users Length: ", users.length);
        console.log("Sending question");
        console.log(currentQuestion);
        broadcast(users, questions_1.questions[ind]);
        resp.send("Broadcast Started");
    }
    catch (error) {
        resp.send(`Error occured.\n${error}`);
    }
}));
app.get("/allowNavigation", (req, res) => {
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
app.get("/stopNavigation", (req, res) => {
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
app.get("/stop", (req, resp) => {
    try {
        users.forEach(res => {
            res.write("data: " + "close\n\n");
        });
        resp.send("Broadcast closed.");
        users.length = 0;
    }
    catch (error) {
        resp.send(`An error occured.\n${error}`);
    }
});
app.listen(port, () => {
    console.log(`listening on port ${port}`);
});
