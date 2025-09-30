
-- V8__create_deals_table.sql
-- Migration #8: create table deals

-- Creating table 'deals' for saving main data of deals
CREATE TABLE deals
(
    id              bigint auto_increment primary key,

    client_id       bigint not null,

    name            varchar(255) not null,
    amount          DECIMAL(15,2) NOT NULL,
    currency        varchar(5) not null,

    stage           varchar(50) null,

    start_date      datetime(6)  not null,
    close_date      datetime(6)  null,  -- not required

    owner_id        bigint not null,

    created_at      datetime(6)  null,
    updated_at      datetime(6)  null
);

