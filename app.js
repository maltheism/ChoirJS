'use strict';

/**
 * Module dependencies.
 */
import express from 'express';
import config from './config';

import helmet from 'helmet';
import csp from 'helmet-csp';

const ip = require('ip');

import path from 'path';
import logger from 'morgan';
import createError from 'http-errors';

import cookieParser from 'cookie-parser';

import indexRouter from './routes/index';

import * as postgres from './libraries/db/postgres';

const cspWS = ip.address() === config.ip.server ?
    config.websocket.deployment :
    config.websocket.development;

const Session = require('express-session');
const pgSession = require('connect-pg-simple')(Session);

/**
 * Express.js server.
 */
const app = express();

/**
 * Security config.
 */
app.use(helmet());
app.use(csp({
    directives: {
        defaultSrc: [
            `'self'`
        ],
        connectSrc: [
            `'self'`,
            ...cspWS,
            'https://www.google-analytics.com/'
        ],
        scriptSrc: [
            `'self'`,
            `'unsafe-inline'`,
            `'unsafe-eval'`,
            'https://apis.google.com',
            'https://maps.gstatic.com/',
            'https://maps.googleapis.com/',
            'https://www.google-analytics.com/',
            'https://www.googletagmanager.com/',
            `https://www.google.com/recaptcha/`,
            `https://www.gstatic.com/recaptcha/`
        ],
        styleSrc: [
            `'self'`,
            `'unsafe-inline'`,
            'https://fonts.gstatic.com',
            'https://fonts.googleapis.com'
        ],
        fontSrc: [
            `'self'`,
            `data:`,
            'https://fonts.gstatic.com',
            'https://fonts.googleapis.com'
        ],
        imgSrc: [
            `'self'`,
            `data: *`,
            'https://maps.google.com',
            'https://maps.gstatic.com/',
            'https://maps.googleapis.com/'
        ],
        frameSrc: [
            `'self'`,
            `https://www.google.com/recaptcha/`
        ],
        upgradeInsecureRequests: false
    }
}));
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.set('trust proxy', ip.address() === config.ip.deployment);

/**
 * Session
 */
const session = Session({
    secret: config.security.cookie.secret,
    clear_interval: 3600,
    proxy: ip.address() === config.ip.server,
    cookie: { // cookie stuff.
        maxAge: config.security.cookie.maxAge,
        secure: ip.address() === config.ip.server,
        httpOnly: false,
    },
    key: 'choirjs',
    resave: true,
    saveUninitialized: false,
    store: new pgSession({
        conString: config.database.postgres.use === 'deployment'
            ? config.database.postgres.deployment
            : config.database.postgres.development,
        ttl: 7 * 24 * 60 * 60 // 7 days.
    })
});
app.use(session);

/**
 * Routes
 */
app.use('/', indexRouter);

/**
 * Error handler
 */
app.use((req, res, next) => {
    next(createError(404));
});
app.use((err, req, res, next) => {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};
    // render the error page
    // res.status(err.status || 500);
    res.redirect('/');
});

/**
 * Initialize Server
 */
const server = require('http').Server(app);

/**
 * Server Shutdown handler
 */
process.on('SIGINT', () => {
    server.close(() => {
        postgres.shutdown();
        process.exit(0);
    });
});

export default app;