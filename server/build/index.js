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
const corsOptions = {
    origin: '*',
    credentials: true,
    optionSuccessStatus: 200
};
const app = (0, express_1.default)();
const port = 3001;
app.use((0, cors_1.default)(corsOptions));
const users = [];
let quizPaused = false;
function broadcast(users, questions, ctr) {
    // let ctr=0;
    const interval = setInterval(() => {
        if (ctr >= questions.length || quizPaused) {
            clearInterval(interval);
            return;
        }
        const questionData = JSON.stringify(questions[ctr]);
        users.forEach(res => {
            res.write("data: " + `${questionData}\n\n`);
        });
        ++ctr;
    }, 10000);
}
app.get('/', (req, res) => {
    res.send("Hello!");
});
app.get("/questions", (req, res) => {
    res.setHeader("Content-Type", "text/event-stream");
    users.push(res);
});
app.get("/start", (req, resp) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const questions = yield prisma.question.findMany();
        console.log("Users Length: ", users.length);
        console.log("starting broadcast");
        broadcast(users, questions, 0);
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
app.get("/pause", (req, res) => {
    try {
        quizPaused = false;
        res.send("Pausing quiz.");
    }
    catch (error) {
        console.log(error);
        res.send(`Error occured.\n${error}`);
    }
});
app.get("/resume", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        let ind;
        if (typeof (req.query.id) === "string")
            ind = parseInt(req.query.id);
        else
            ind = 0;
        const questions = yield prisma.question.findMany({
            where: {
                questionId: {
                    gte: ind
                }
            }
        });
        broadcast(users, questions, ind);
    }
    catch (error) {
        console.log(error);
        res.send(`Error occured.\n${error}`);
    }
}));
app.listen(port, () => {
    console.log(`listening on port ${port}`);
});
