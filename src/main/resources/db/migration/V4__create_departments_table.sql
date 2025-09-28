
-- V4__create_departments_table.sql
-- Migration #4: create table departments

-- Creating table 'departments' for saving main data of departments
CREATE TABLE departments
(
    id            bigint auto_increment primary key,

    title         varchar(255) not null,
    description   longtext null,

    created_at    datetime(6)  null,
    updated_at    datetime(6)  null,

    constraint    UK_title unique  (title)
);

-- Adding index for fast searching by title
CREATE INDEX idx_departments_email ON departments(title);

