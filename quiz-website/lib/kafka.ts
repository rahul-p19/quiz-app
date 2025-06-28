import {Kafka} from "kafkajs";

const KAFKA_CERT = Buffer.from(process.env.KAFKA_CA_CERT??"", 'base64').toString('utf-8')

const kafka = new Kafka({
    clientId: "quiz-app",
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

export const producer = kafka.producer();