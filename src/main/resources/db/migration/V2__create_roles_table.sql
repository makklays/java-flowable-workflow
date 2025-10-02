
-- V2__create_roles_table.sql
-- Migration #2: create table roles

-- Creating table 'roles' for saving main data of roles
CREATE TABLE roles
(
    id            bigint auto_increment primary key,

    title         varchar(255) not null,
    description   longtext null,

    created_at    datetime(6)  null,
    updated_at    datetime(6)  null,

    constraint    UK_roles_title unique  (title)
);

-- Adding index for fast searching by title
CREATE INDEX idx_roles_email ON roles(title);

