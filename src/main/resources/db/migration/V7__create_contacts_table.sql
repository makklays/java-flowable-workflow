
-- V7__create_contacts_table.sql
-- Migration #7: create table contacts

-- Creating table 'contacts' for saving main data of contacts
CREATE TABLE contacts
(
    id              bigint auto_increment primary key,

    client_id       bigint not null,

    firstname       varchar(255) not null,
    lastname        varchar(255) not null,

    email           varchar(200) not null,
    phone           varchar(255) null,
    `position`        varchar(255) null,

    created_at      datetime(6)  null,
    updated_at      datetime(6)  null
);

