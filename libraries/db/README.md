## pg-promise APIs:
https://github.com/vitaly-t/pg-promise

### Postgres table create setup:

Note: used for cookie session storage.
```
CREATE TABLE "session" (
  "sid" varchar NOT NULL COLLATE "default",
	"sess" json NOT NULL,
	"expire" timestamp(6) NOT NULL
)
WITH (OIDS=FALSE);
ALTER TABLE "session" ADD CONSTRAINT "session_pkey" PRIMARY KEY ("sid") NOT DEFERRABLE INITIALLY IMMEDIATE;
```

Used for users storage.
```
CREATE TABLE "public"."users" (
    "uuid" uuid NOT NULL DEFAULT uuid_generate_v4(),
    "email" varchar NOT NULL,
    "password" varchar NOT NULL,
    "language" varchar,
    "permission" varchar
);
```