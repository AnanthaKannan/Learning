const { Kafka } = require('kafkajs');

const kafka = new Kafka({
  clientId: 'my-consumer',
  brokers: ['localhost:9092']
});

const delay = (ms = 1000) => new Promise(resolve => setTimeout(resolve, ms));


const consumer = kafka.consumer({ groupId: 'test-group' });

const run = async () => {
  await consumer.connect();
  await consumer.subscribe({ topic: 'test-topic', fromBeginning: true });

  await consumer.run({
    eachMessage: async ({ topic, partition, message }) => {
      await delay()
      console.log(`Received message: ${message.value.toString()}`);
    },
  });
};

run().catch(console.error);
