CREATE SCHEMA db_aquaflame;
CREATE TABLE IF NOT EXISTS empresa_distribuidora(
	i_id_empresa int primary key not null auto_increment,
    s_nome_empresa varchar(100) not null,
    s_email_empresa varchar(100) not null,
    s_senha_empresa varchar(50) not null,
    s_cnpj_empresa varchar(15) not null,
    s_phone_empresa varchar(12) not null,
    s_codigoVerificacao_empresa VARCHAR(9) not null
);

SELECT * FROM db_aquaflame.empresa_distribuidora;
/*ALTER TABLE empresa_distribuidora ADD s_phone_empresa varchar(12) not null;*/
/*ALTER TABLE empresa_distribuidora CHANGE COLUMN s_codigo_verificacao s_codigoVerificacao_empresa VARCHAR(9) not null;*/

CREATE TABLE IF NOT EXISTS estoque_empresa(
	i_codigo_estoque int primary key not null auto_increment,
    s_nome_estoque varchar(100) not null,
    i_quantidade_estoque int not null,
    f_preco_estoque float(10,2) not null
    
);

SELECT * FROM db_aquaflame.estoque_empresa;
/*ALTER TABLE estoque_empresa CHANGE COLUMN f_precofardo_estoque f_preco_estoque float(10,2) not null; 
ALTER TABLE estoque_empresa CHANGE COLUMN i_quantidadefardo_estoque i_quantidade_estoque int not null;*/