drop table lucas.installment;
drop table lucas.transaction;
create table lucas.transaction (
	code text primary key,
	amount numeric,
	number_installments integer,
	payment_method text,
	date timestamp default now()
);
create table lucas.installment (
	code text references lucas.transaction (code),
	number integer,
	amount numeric,
	primary key (code, number)
);



