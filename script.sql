DROP SCHEMA if exists morpheus cascade;
CREATE SCHEMA morpheus;

ALTER SCHEMA morpheus OWNER TO postgres;
SET default_tablespace = '';
SET search_path = morpheus;

DROP TABLE if exists users cascade;
DROP TABLE IF EXISTS "users";
DROP SEQUENCE IF EXISTS users_id_seq;
CREATE SEQUENCE users_id_seq INCREMENT 1 MINVALUE 1 MAXVALUE 9223372036854775807 CACHE 1;

CREATE TABLE users (
    "id" bigint DEFAULT NEXTVAL('users_id_seq') NOT NULL,
    "email" text NOT NULL,
    "username" text NOT NULL,
    "password" text NOT NULL,
    "full_name" text NOT NULL,
    "created_at" timestamptz DEFAULT CURRENT_TIMESTAMP NOT NULL,
    CONSTRAINT "users_email_key" UNIQUE ("email"),
    CONSTRAINT "username" UNIQUE ("username"),
    CONSTRAINT "users_pkey" PRIMARY KEY ("id")
);

ALTER TABLE users OWNER TO postgres;

CREATE OR REPLACE FUNCTION add_user(
    user_email users.email%TYPE,
	username users.username%TYPE,
    user_password users.password%TYPE,
    user_full_name users.full_name%TYPE
)
RETURNS void AS
$$
BEGIN
    insert into users (id, email, username, password, full_name, created_at)
		values ("user_email", "username", "user_password", "user_full_name", CURRENT_TIMESTAMP);
END;
$$ language 'plpgsql';

select add_user('teste@g.com', 'testee', '123123', 'JOSE');
select * from users;
