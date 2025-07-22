/**
 * This is not a production server yet!
 * This is only a minimal backend to get started.
 */

import express from 'express';
import cors from 'cors';
import proxy from 'express-http-proxy';
import morgan from 'morgan';
import rateLimit from 'express-rate-limit';
import swaggerUi from 'swagger-ui-express';
import axios from 'axios';
import cookieParser from 'cookie-parser';
import initializeSiteConfig from './libs/initializeSiteConfig';



const app = express();

app.use(cors(
  {
    origin: 'http://localhost:3000',
    allowedHeaders: ['Content-Type', 'Authorization'],
    credentials: true,
  }
));

app.use(morgan('dev'));
app.use(express.json({limit: '100mb' }));
app.use(express.urlencoded({limit: "100mb", extended: true }));
app.use(cookieParser());
app.set('trust proxy', 1);

// Apply rate limiting to all requests
// This will limit each IP to 100 requests per 15 minutes
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: (req:any) => (req.users ? 1000 : 100), // Limit each IP to 1000 requests per windowMs
  message: {error: 'Too many requests, please try again later!'},
  standardHeaders: true, // Return rate limit info in the `RateLimit-*` headers
  legacyHeaders: true, // enable the `X-RateLimit-*` headers
  keyGenerator: (req:any) => req.ip, // Use the IP address as the key
});

app.use(limiter);



app.get('/gatewway-health', (req, res) => {
  res.send({ message: 'Welcome to api-gateway!' });
});

app.use('/product', proxy('http://localhost:6002'));
app.use('/', proxy('http://localhost:6001'));


const port = process.env.PORT || 8080;
const server = app.listen(port, () => {
  console.log(`Listening at http://localhost:${port}/api`);
try {
  initializeSiteConfig()
    console.log(`Site configuration initialized successfully!`)
  
} catch (error) {
    console.error('Failed to initialize site config:', error);
  }
});
server.on('error', console.error);
