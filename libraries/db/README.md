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
CREATE TABLE users (
  uuid uuid DEFAULT uuid_generate_v4 (),
  email VARCHAR not NULL,
  password VARCHAR not NULL
);
```