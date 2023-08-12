//@ts-check

import express from 'express';
import handlebars from 'express-handlebars';
import routerHtmlProducts from './routes/products.html.router.js';
import routerProducts from './routes/products.router.js';
import { config, connectMongo, __dirname } from './utils.js';
import path from 'path';
import session from 'express-session';
import MongoStore from 'connect-mongo';
import loginRouter from './routes/login.router.js';
import viewsRouter from './routes/views.routers.js';
import passport from 'passport';
import { iniPassport } from './config/passport.js';
import { routerCarts } from './routes/carts.router.js';

const app = express();

//MIDDLEWARE
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

//CONECT MONGO
connectMongo();

//IMPLEMENTACION SESSION
app.use(
  session({
    store: MongoStore.create({
      mongoUrl: process.env.DB_URI,
      ttl: 3600 * 24 * 7,
    }),
    secret: 'secretsession',
    resave: true,
    saveUninitialized: true,
  })
);

// PASSPORT
iniPassport();

app.use(passport.initialize());
app.use(passport.session());

//MOTOR HANDLEBARS
app.engine('handlebars', handlebars.engine());
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'handlebars');
app.use(express.static(path.join(__dirname, 'public')));

//RUTA PRODUCTOS
app.use('/api/products', routerProducts);

//RUTA CARTS
app.use('/api/carts', routerCarts);

//RENDER PRODUCTOS
app.use('/products', routerHtmlProducts);

//RUTA LOGIN
app.use('/api/session', loginRouter);

//VIEWSROUTER
app.use('/', viewsRouter);

//RUTA NO ENCONTRADA
app.get('*', (req, res) => {
  return res.status(404).json({
    status: 'Error',
    msg: 'Page not found',
    data: {},
  });
});

app.listen(config.app.port, () => console.log(`Server listening on port ${config.app.port}`));
