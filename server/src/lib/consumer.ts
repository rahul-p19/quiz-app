import { Kafka } from "kafkajs";
import { db } from "./client";
import dotenv from "dotenv";

dotenv.config();

const KAFKA_CERT = Buffer.from(process.env.KAFKA_CA_CERT??"",'base64').toString('utf-8')

const kafka = new Kafka({
    clientId: "quiz-consumer",
    brokers: [KAFKA_CERT],
    ssl:{
        ca: process.env.KAFKA_CA_CERT
    },
    sasl: {
        username: "avnadmin",
        password: process.env.KAFKA_PASSWORD!,
        mechanism: "plain"
    }
})

const consumer = kafka.consumer({groupId: "submission-workers"});

async function runConsumer(){
    await consumer.connect();
    await consumer.subscribe({topic: "quiz-submissions", fromBeginning: false});

    await consumer.run({
        eachMessage: async ({message}) => {
            try{
                if(!message.value) return;

                const data = JSON.parse(message.value.toString());
                const {userId, answers, points} = data;

                const user = await db.user.findUnique({
                    where: {id: userId},
                    select: {quizSubmitted: true}
                });

                if(!user || user.quizSubmitted){
                    console.log(`Skipping duplicate or missing user: ${userId}`);
                    return;
                }

                await db.answer.createMany({
                    data: answers
                });

                await db.user.update({
                    where: {id: userId},
                    data: {
                        quizSubmitted: true,
                        score: points
                    }
                })

                console.log(`Processed submission for user ${userId}`);
            }catch(err){
                console.error(`Failed to process submission. Error: ${err}`);
            }
        }
    })
}

runConsumer().catch(err=>console.error(err));