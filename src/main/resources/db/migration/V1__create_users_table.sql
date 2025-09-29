
-- V1__create_users_table.sql
-- Migration #1: create table users

-- Creating table 'users' for saving main data of users
CREATE TABLE users
(
    id              bigint auto_increment primary key,

    role_id         bigint not null,
    department_id   bigint not null,
    position_id     bigint not null,
    tenant_id       bigint not null,

    username        varchar(255) not null,
    firstname       varchar(255) null,
    lastname        varchar(255) null,
    display_name    varchar(255) null,

    email           varchar(200) not null,
    phone           varchar(255) null,
    age             varchar(255) null,

    is_man          TINYINT(1) NOT NULL DEFAULT 0,
    is_picture_set  TINYINT(1) NOT NULL DEFAULT 0,

    address         varchar(255) null,
    password        varchar(255) null,

    start_work_at   datetime(6)  null,
    created_at      datetime(6)  null,
    updated_at      datetime(6)  null,

    constraint      UK_email unique (email),
    constraint      UK_username unique (username)
);

-- Adding index for fast searching by email
CREATE INDEX idx_users_email ON users(email);

-- Adding index for fast searching by mobile
CREATE INDEX idx_users_phone ON users(phone);

