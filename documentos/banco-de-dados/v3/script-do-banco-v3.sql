drop database bdvegan;
create database bdvegan;
use bdvegan;


CREATE TABLE user (
  iduser INT NOT NULL AUTO_INCREMENT, 
  first_name_user VARCHAR(30) NULL, 
  email_user VARCHAR(50) NULL, 
  password_user VARCHAR(30) NULL, 
  phone VARCHAR(20) NULL, 
  cpf CHAR(11) NULL, 
  is_seller CHAR(1) NULL, 
  sur_name_user VARCHAR(30) NULL, 
  PRIMARY KEY (iduser)
);


CREATE TABLE seller (
  idseller INT NOT NULL AUTO_INCREMENT, 
  fkuser INT NOT NULL, 
  commercial_name VARCHAR(50) NULL, 
  cnpj CHAR(14) NULL, 
  commercial_email VARCHAR(50) NULL, 
  whatsapp_number VARCHAR(20) NULL, 
  instagram_account VARCHAR(30) NULL, 
  facebook_account VARCHAR(30) NULL, 
  autentication CHAR(1) NULL, 
  PRIMARY KEY (idseller), 
  FOREIGN KEY (fkuser) REFERENCES user (iduser)
);


CREATE TABLE category (
  idcategory INT NOT NULL AUTO_INCREMENT, 
  name_category VARCHAR(25) NULL, 
  PRIMARY KEY (idcategory)
);


CREATE TABLE product (
  idproduct INT NOT NULL AUTO_INCREMENT, 
  name_product VARCHAR(50) NULL, 
  price_product DOUBLE NULL, 
  description VARCHAR(250) NULL, 
  fkcategory INT NOT NULL, 
  fkseller INT NOT NULL, 
  image_url1 VARCHAR(100),
  image_url2 VARCHAR(100),
  image_url3 VARCHAR(100),
  PRIMARY KEY (idproduct), 
  FOREIGN KEY (fkcategory) REFERENCES category (idcategory), 
  FOREIGN KEY (fkseller) REFERENCES seller (idseller)
);


CREATE TABLE evaluation (
  idevaluation INT NOT NULL AUTO_INCREMENT, 
  fkuser INT NOT NULL, 
  note INT NULL, 
  fkproduct INT NOT NULL, 
  PRIMARY KEY (idevaluation), 
  FOREIGN KEY (fkuser) REFERENCES user (iduser), 
  FOREIGN KEY (fkproduct) REFERENCES product (idproduct)
);


CREATE TABLE sub_category (
  idsub_category INT NOT NULL AUTO_INCREMENT, 
  name_sub_category VARCHAR(25) NULL, 
  fkcategory INT NOT NULL, 
  PRIMARY KEY (idsub_category), 
  FOREIGN KEY (fkcategory) REFERENCES category (idcategory)
);


CREATE TABLE certification (
  idcertification INT NOT NULL AUTO_INCREMENT, 
  name_certification VARCHAR(50) NULL, 
  image_url_certification VARCHAR(100),
  PRIMARY KEY (idcertification)
);


CREATE TABLE order_ (
  idorder INT NOT NULL AUTO_INCREMENT, 
  amount DOUBLE NULL, 
  date_order DATETIME NULL, 
  fkuser INT NOT NULL, 
  PRIMARY KEY (idorder), 
  FOREIGN KEY (fkuser) REFERENCES user (iduser)
);


CREATE TABLE order_item (
  fkorder INT NOT NULL, 
  fkproduct INT NOT NULL, 
  qtd_inventory INT NULL, 
  unitary_value DOUBLE NULL, 
  PRIMARY KEY (fkorder, fkproduct), 
  FOREIGN KEY (fkorder) REFERENCES order_ (idorder), 
  FOREIGN KEY (fkproduct) REFERENCES product (idproduct)
);


CREATE TABLE sellers_certified (
  fkcertification INT NOT NULL, 
  fkseller INT NOT NULL, 
  PRIMARY KEY (fkcertification, fkseller), 
  FOREIGN KEY (fkcertification) REFERENCES certification (idcertification), 
  FOREIGN KEY (fkseller) REFERENCES seller (idseller)
);


CREATE TABLE adress (
  idAdress INT NOT NULL AUTO_INCREMENT, 
  logradouro VARCHAR(60) NULL, 
  number VARCHAR(8) NULL, 
  state CHAR(2) NULL, 
  city VARCHAR(30) NULL, 
  complement VARCHAR(30) NULL, 
  cep CHAR(8) NULL, 
  district VARCHAR(30) NULL, 
  fkuser INT NOT NULL, 
  PRIMARY KEY (idAdress, fkuser), 
  FOREIGN KEY (fkuser) REFERENCES user (iduser)
);


CREATE TABLE restock_notification (
  id_restock_notification INT NOT NULL, 
  fkuser INT NOT NULL, 
  fkproduct INT NOT NULL, 
  PRIMARY KEY (id_restock_notification, fkuser, fkproduct), 
  FOREIGN KEY (fkuser) REFERENCES user (iduser), 
  FOREIGN KEY (fkproduct) REFERENCES product (idproduct)
);



insert into user values 
(null, 'Rafael', 'rafa@gmail.com', '123',  '11 93214-7508', '64725453929', 1, 'Almeida'),
	(null, 'Maria', 'mari@gmail.com', '123',  '11 93562-6542', '63743035109', 1, 'Silva'), 
		(null, 'Pedro', 'pedro@gmail.com', '123',  '11 96345-6453', '73462374510', 0, 'Alves'),
			(null, 'Paula', 'paulinha@gmail.com', '123',  '11 95635-6345', '74538348421', 0, 'Gomes');


insert into category values 
  (null, 'vestuario'),
	(null, 'Alimenticio');
            
  
  insert into seller values 
  (null, 1, 'Lar Vegan', '12734209887624', 'lar_vegan@gmail.com', '11 96326-81267', '@larvegan', 'lar vegan', 1),
	(null, 2, 'Kerai Dino', '73444520915491', 'kerai_dino@gmail.com', '11 92132-8732', '@keraidino', 'kerai dino', 1);
    

insert into product values 
(null, 'Sapato', 122.10, 'Sapato de fibra de garrafa pet', 1, 1, 'https://veganhousestorageblobs.blob.core.windows.net/images/shoe1.jpg', 'https://veganhousestorageblobs.blob.core.windows.net/images/shoe2.jpg', 'https://veganhousestorageblobs.blob.core.windows.net/images/shoe2.jpg'),
	(null, 'Camisa', 141.99, 'Camisa de algodão', 1, 1, 'https://veganhousestorageblobs.blob.core.windows.net/images/shirt1.jpg', 'https://veganhousestorageblobs.blob.core.windows.net/images/shirt2.jpg', 'https://veganhousestorageblobs.blob.core.windows.net/images/shirt3.jpg'),
		(null, 'Barra de chocolate', 33.99, 'Chocolate brasileiro 100% de cacau', 2, 1, 'https://veganhousestorageblobs.blob.core.windows.net/images/chocolate1.jpg', 'https://veganhousestorageblobs.blob.core.windows.net/images/chocolate2.jpg', 'https://veganhousestorageblobs.blob.core.windows.net/images/chocolate3.jpg'), 
			(null, 'Leite de soa', 12.10, 'Leite de soja de 1L', 2, 2, 'https://veganhousestorageblobs.blob.core.windows.net/images/milk.jpg', 'https://veganhousestorageblobs.blob.core.windows.net/images/milk2.jpg', 'https://veganhousestorageblobs.blob.core.windows.net/images/milk3.jpg');   
    


insert into order_ values 
(null, 200.0, sysdate(), 3), 
	(null, 421.22, sysdate(), 4),
		(null, 122.1, sysdate(), 4);
  
  insert into order_item values 
  (1, 1, 1, 122.1),
	(1, 2, 1, 141.99),
		(2, 4, 2, 24.2),
			(1, 4, 1, 12.1),
				(3, 1, 1, 122.1);
                
                
                
-- selecionando todos os pedidos que tem um produto de um determinado seller 
select * from order_item as b inner join product as p on b.fkproduct = p.idproduct 
	join order_ as o on b.fkorder = idorder 
		inner join seller as s on idseller = p.fkseller 
			where idseller = 1; -- passe o id do seller que deseja usar como filtro para fazer a consulta dos produtos em cada pedido
            -- se não fez nenhuma alteração no script, somente os sellers com id 1 e 2 tem produtos cadastrados
           

-- selecionando todos os pedidos de um determinado usuario 
select * from order_item as b inner join product as p on b.fkproduct = p.idproduct 
	join order_ as o on b.fkorder = idorder 
		inner join user as s on iduser = o.fkuser
			where iduser = 4; -- passe o id do usuario que deseja usar como filtro para fazer a consulta dos pedidos e dos produtos que ele fez
            -- se não fez nenhuma alteração no script, somente os usuarios com id 3 e 4 fizeram compras 




