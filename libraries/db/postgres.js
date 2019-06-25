'use strict';

import config from '../../config';

const pgp = require('pg-promise')();

export const Database = pgp(config.database.postgres.use === 'deployment' ?
    config.database.postgres.deployment :
    config.database.postgres.development
);

// todo make universal db functions (here) if necessary.

export function shutdown() {
    pgp.end();
}