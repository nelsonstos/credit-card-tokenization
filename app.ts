import  express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import router from './src/routes/routes'
import authMiddleware from './src/midlewares/auth.middleware';

const app = express();

dotenv.config();

var corsOptions =  {
    origin: 'http://localhost:3000'
}

app.use(cors(corsOptions));

app.use(express.json());

app.get('/', (req, res) => {
    res.send('Welcome to CreditCardTokenization API');
});

// Aplica la proteccion a todas las rutas
app.use(authMiddleware);

// Routes
app.use(router)

app.listen(process.env.PORT || 3000, () => {
    console.log('Server running on port 3000');
});
