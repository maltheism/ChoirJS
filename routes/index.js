'use strict';

import express from 'express';

const router = express.Router();

import * as auth from '../libraries/user/userMiddleware';

/**
 * POST request - User can login.
 */
router.post('/login', auth.login);

/**
 * POST request - User can register.
 */
router.post('/register', auth.register);

/**
 * POST request - User can logout.
 */
router.post('/logout', auth.logout);

export default router;
