
-- V6__create_clients_table.sql
-- Migration #6: create table clients

-- Creating table 'clients' for saving main data of clients
CREATE TABLE clients
(
    id              bigint auto_increment primary key,

    firstname       varchar(255) not null,
    lastname        varchar(255) not null,

    email           varchar(200) not null,
    phone           varchar(255) null,
    company         varchar(255) null,

    type            varchar(100) not null,
    registered_at   datetime(6)  null,
    source          varchar(255) null,
    tags            varchar(255) null,

    owner_id        bigint not null,

    created_at      datetime(6)  null,
    updated_at      datetime(6)  null
);

