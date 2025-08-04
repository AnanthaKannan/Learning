const { Kafka } = require('kafkajs');

const kafka = new Kafka({
  clientId: 'my-producer',
  brokers: ['localhost:9092']
});

const producer = kafka.producer();

let i = 10001
const run = async () => {
  await producer.connect();
  const message = `Hello Kafka from Node.js! ${i}`
  i++;
  console.log(message)
  await producer.send({
    topic: 'test-topic',
    messages: [
      { value: message },
    ],
  });

  console.log('Message sent');
  await producer.disconnect();
};

for (let index = 0; index < 3; index++) {
  run().catch(console.error);

}
