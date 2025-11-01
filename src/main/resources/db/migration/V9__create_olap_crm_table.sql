
-- V8__create_olap_crm_table.sql
-- Migration #9: create table olap_crm

-- Creating table 'olap_crm' for saving main data of olap_crm
CREATE TABLE olap_crm
(
    id              bigint auto_increment primary key,

    owner_id        bigint not null,

    activities      int not null default 0,
    contacts        int not null default 0,
    clients         int not null default 0,
    deals           int not null default 0,

    sum_amount      DECIMAL(15,2) NULL,

    first_deal_date datetime(6)  null,
    last_deal_date  datetime(6)  null,

    created_at      datetime(6)  null,
    updated_at      datetime(6)  null
);

-- Creating index for owner_id to optimize queries
CREATE INDEX idx_olap_crm_owner_id ON olap_crm (owner_id);
-- Creating index for first_deal_date to optimize queries
CREATE INDEX idx_olap_crm_first_deal_date ON olap_crm (first_deal_date);
-- Creating index for last_deal_date to optimize queries
CREATE INDEX idx_olap_crm_last_deal_date ON olap_crm (last_deal_date);

