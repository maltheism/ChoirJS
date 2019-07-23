'use strict';

import config from '../../config';

const pgp = require('pg-promise')();

export const Database = pgp(config.database.postgres.use === 'deployment' ?
    config.database.postgres.deployment :
    config.database.postgres.development
);

// (setup) initialize tables if not exists.
async function setupDatabase() {
    const createSession = Database.none('CREATE TABLE IF NOT EXISTS session(session varchar NOT NULL COLLATE "default", sess json NOT NULL, expire timestamp(6) NOT NULL) WITH (OIDS=FALSE)')
        .then(() => {
            return true;
        }).catch((error) => {
            return false;
        });
    const alterSessionDrop = Database.none('ALTER TABLE "session" DROP CONSTRAINT IF EXISTS "session_pkey"')
        .then(() => {
            return true;
        }).catch((error) => {
            return false;
        });
    const alterSessionAdd = Database.none('ALTER TABLE "session" ADD CONSTRAINT "session_pkey" PRIMARY KEY ("sid") NOT DEFERRABLE INITIALLY IMMEDIATE')
        .then(() => {
            return true;
        }).catch((error) => {
            return false;
        });
    const createPublicUsers = Database.none('CREATE TABLE IF NOT EXISTS "public"."users" (uuid uuid NOT NULL DEFAULT uuid_generate_v4(), email varchar NOT NULL, password varchar NOT NULL, language varchar, permission varchar)')
        .then(() => {
            return true;
        }).catch((error) => {
            return false;
        });
    await Promise.all([createSession, alterSessionDrop, alterSessionAdd, createPublicUsers]);
}
setupDatabase().then(() => {
    // setupDatabase commands finished.
});

// todo make universal db functions (here) if necessary.

export function shutdown() {
    pgp.end();
}