-- SCRIPT DE BANCO DE DADOS PARA AWS
create table adress (
	id_adress integer not null auto_increment,
	cep varchar(55),
	city varchar(55),
	complement varchar(55),
	district varchar(55),
	logradouro varchar(55),
	number integer,
	state varchar(55),
	primary key (id_adress),
    fk_user integer,
    foreign key (fk_user) references user (id)
);
    
create table certification (
	id_certification integer not null auto_increment,
	name varchar(55),
	primary key (id_certification)
);
    
create table user (
	id integer not null auto_increment,
	cpf varchar(55),
	email varchar(55),
	is_seller bit,
	name_user varchar(55),
	password_user varchar(55),
	sur_name varchar(55),
	primary key (id)
);

create table seller(
	id_seller integer not null auto_increment,
	cnpj varchar(55),
	description_seller varchar(55),
	fk_user integer,
    foreign key (fk_user) references user (id), 
	name_seller varchar(55),
    primary key (id_seller)
);

create table certification_seller (
	id_certification_seller integer not null auto_increment,
	fk_certification integer, 
	fk_seller integer, 
	foreign key (fk_certification) references certification (id_certification),
	foreign key (fk_seller) references seller (id_seller)
);