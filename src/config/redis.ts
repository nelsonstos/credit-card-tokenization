import  Redis, { RedisOptions } from 'ioredis';
import 'dotenv/config';

const redisOptions: RedisOptions = {
    host: process.env.REDIS_HOST,
    port: Number(process.env.REDIS_PORT),
    password: process.env.REDIS_PASSWORD,
};

const redisClient = new Redis(redisOptions);

// Manejar eventos de error
redisClient.on('error', (err) => {
    console.error('Error connecting to Redis:', err);
});
// Manejar eventos de conexión exitosa
redisClient.on('connect', () => {
    console.log('Connected to Redis');
});

// Manejar eventos de desconexión
redisClient.on('close', () => {
    console.log('Redis connection closed');
});

// Manejar eventos de reconexión
redisClient.on('reconnecting', () => {
    console.log('Reconnecting to Redis');
});
  

export default redisClient;