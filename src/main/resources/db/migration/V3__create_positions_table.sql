
-- V3__create_positions_table.sql
-- Migration #3: create table positions

-- Creating table 'positions' for saving main data of positions
CREATE TABLE positions
(
    id            bigint auto_increment primary key,

    title         varchar(255) not null,

    created_at    datetime(6)  null,
    updated_at    datetime(6)  null,

    constraint    UK_title unique  (title)
);

-- Adding index for fast searching by title
CREATE INDEX idx_positions_email ON positions(title);

