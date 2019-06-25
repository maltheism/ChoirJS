'use strict';

import express from 'express';

const router = express.Router();

import * as auth from '../libraries/user/userMiddleware';

/**
 * POST request so user can login.
 */
router.post('/login', auth.login);

/**
 * POST request so user can register.
 */
router.post('/register', auth.register);

/**
 * POST request so user can logout.
 */
router.post('/logout', auth.logout);

export default router;
