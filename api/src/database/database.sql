CREATE DATABASE IF NOT EXISTS alertasos
CHARACTER SET utf8mb4
COLLATE utf8mb4_unicode_ci;

USE alertasos;


CREATE TABLE IF NOT EXISTS usuarios (
    id INT NOT NULL AUTO_INCREMENT,

    nome VARCHAR(150) NOT NULL,
    nome_preferido VARCHAR(80),

    email VARCHAR(150) NOT NULL UNIQUE,
    senha VARCHAR(255) NOT NULL,

    foto VARCHAR(255),

    data_nascimento DATE NOT NULL,

    sexo ENUM(
        'Feminino',
        'Masculino',
        'Outro',
        'Prefiro não informar'
    ),

    altura DECIMAL(5,2),
    peso DECIMAL(5,2),

    ativo BOOLEAN NOT NULL DEFAULT TRUE,

    criado_em TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,

    atualizado_em TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
        ON UPDATE CURRENT_TIMESTAMP,

    PRIMARY KEY (id)
);