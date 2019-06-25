'use strict';

import * as User from './userModal';

/**
 * @function login
 * @param req object
 * @param res object
 * @param next object
 * @description handles the login process.
 */
export function login(req, res, next) {
    if (req.session.user) {
        res.cookie('session', JSON.stringify({
            user: req.session.user
        }));
        return res.redirect('/');
    }

    const user = {
        email : req.body.email,
        password : req.body.password
    };

    User.authenticate(user).then( (authenticate) => {
        if (authenticate.error) {
            return res.send({
                error: 'login',
                description: 'incorrect details'
            });
        } else { // details correct - login user.
            req.session.user = {
                id: authenticate.id,
                uuid: authenticate.uuid,
                email: authenticate.email
            };
            res.cookie('session', JSON.stringify({
                user: req.session.user,
            }));
            return res.send({
                status: 'success',
                description: 'login'
            });
        }
    });
}

/**
 * @function register
 * @param req object
 * @param res object
 * @param next object
 * @description handles the register process.
 */
export function register(req, res, next) {
    if (req.session.user) {
        res.cookie('session', JSON.stringify({
            user: req.session.user
        }));
        return res.redirect('/');
    }

    const user = {
        email: req.body.email,
        password: req.body.password,
        captcha: req.body.captcha
    };

    User.register(user).then((register) => {
        if (register.error) {
            return res.send(register);
        } else {
            User.authenticate(user).then((authenticate) => {
                if (authenticate.error) {
                    return res.send({
                        error: 'register',
                        description: authenticate.description
                    });
                }
                else if (user && authenticate.uuid) {
                    req.session.user = {
                        uuid: authenticate.uuid,
                        email: authenticate.email
                    };
                    res.cookie('session', JSON.stringify({
                        user: req.session.user
                    }));
                    return res.send({
                        status: 'success',
                        description: 'register'
                    });
                } else {
                    res.redirect('/');
                }
            }).catch((error) => {
                console.log('error:');
                console.log(error);
            });
        }
    }).catch((error) => {
        console.log('error:');
        console.log(error);
    });
}

/**
 * @function logout
 * @param req object
 * @param res object
 * @param next object
 * @description handles the logout process.
 */
export function logout(req, res, next) {
    if (req.session.user) {
        req.session.destroy(function (err) {
            if (err) return next(err);
            res.clearCookie('choirjs');
            res.redirect('/');
        });
    } else {
        res.clearCookie('choirjs');
        res.redirect('/');
    }
}
