import {Kafka} from "kafkajs";

const kafka = new Kafka({
    clientId: "quiz-app",
    brokers: [`${process.env.NEXT_PUBLIC_KAFKA_URL}`],
    ssl:{
        ca: process.env.KAFKA_CA_CERT
    },
    sasl: {
        username: "avnadmin",
        password: process.env.KAFKA_PASSWORD!,
        mechanism: "plain"
    }
})

export const producer = kafka.producer();