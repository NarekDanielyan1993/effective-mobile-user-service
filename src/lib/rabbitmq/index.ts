import amqplib from 'amqplib';
import { USER_ASSERT } from 'constant/message';

import Config from 'utils/config';

class RabbitMQ {
    private connection: amqplib.Connection | null = null;
    private channel: amqplib.Channel | null = null;

    async connect() {
        this.connection = await amqplib.connect(Config.getEnv('RABBIT_MQ_URL'));
        this.channel = await this.connection.createChannel();
        await this.channel.assertQueue(USER_ASSERT);
    }

    async sendMessage(message: string) {
        if (this.channel) {
            this.channel.sendToQueue(USER_ASSERT, Buffer.from(message));
        }
    }
}

export default new RabbitMQ();
