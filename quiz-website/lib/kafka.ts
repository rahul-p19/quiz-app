import {Kafka, Producer} from "kafkajs";

const getKafkaProducer = () => {
    const KAFKA_CERT = Buffer.from(process.env.KAFKA_CA_CERT??"", 'base64').toString('utf-8')
    console.log(KAFKA_CERT);
    const kafka = new Kafka({
        clientId: "quiz-app",
        brokers: [process.env.NEXT_PUBLIC_KAFKA_URL??""],
        ssl:{
            ca: KAFKA_CERT
        },
        sasl: {
            username: "avnadmin",
            password: process.env.KAFKA_PASSWORD!,
            mechanism: "scram-sha-256"
        }
    })
    
    const kafkaProducer = kafka.producer();
    return kafkaProducer;
}

declare global {
    // eslint-disable-next-line no-var
    var kafkaProducer: Producer | undefined;
}

export const producer = globalThis.kafkaProducer || getKafkaProducer();

if(process.env.NODE_ENV !== "production") globalThis.kafkaProducer = producer;