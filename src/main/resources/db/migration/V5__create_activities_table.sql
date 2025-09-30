
-- V5__create_activities_table.sql
-- Migration #5: create table activities

-- Creating table 'activities' for saving main data of activities
CREATE TABLE activities
(
    id            bigint auto_increment primary key,

    client_id     bigint not null,
    contact_id    bigint not null,

    type          varchar(50) not null,
    description   longtext null,

    date_time     datetime(6)  null,
    owner_id      bigint not null,

    status        varchar(50) not null,

    created_at    datetime(6)  null,
    updated_at    datetime(6)  null
);

