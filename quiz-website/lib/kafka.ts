import {Kafka} from "kafkajs";

const kafka = new Kafka({
    clientId: "quiz-app",
    brokers: [`${process.env.NEXT_PUBLIC_KAFKA_URL}`]
})

export const producer = kafka.producer();