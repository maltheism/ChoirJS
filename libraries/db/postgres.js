'use strict';

import config from '../../config';

const pgp = require('pg-promise')();

export const Database = pgp(config.database.postgres.use === 'deployment' ?
    config.database.postgres.deployment :
    config.database.postgres.development
);

// (setup) initialize tables if not exists.
try {
    Database.none('CREATE TABLE IF NOT EXISTS session(session varchar NOT NULL COLLATE "default", sess json NOT NULL, expire timestamp(6) NOT NULL) WITH (OIDS=FALSE)');
    Database.none('ALTER TABLE "session" DROP CONSTRAINT IF EXISTS "session_pkey"');
    Database.none('ALTER TABLE "session" ADD CONSTRAINT "session_pkey" PRIMARY KEY ("sid") NOT DEFERRABLE INITIALLY IMMEDIATE');
    Database.none('CREATE TABLE IF NOT EXISTS "public"."users" (uuid uuid NOT NULL DEFAULT uuid_generate_v4(), email varchar NOT NULL, password varchar NOT NULL, language varchar, permission varchar)');
} catch (e) {
    console.log('Exception: ' + e);
}
// todo make universal db functions (here) if necessary.

export function shutdown() {
    pgp.end();
}