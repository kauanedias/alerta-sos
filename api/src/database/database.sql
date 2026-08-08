DROP DATABASE IF EXISTS alertasos;

CREATE DATABASE alertasos
CHARACTER SET utf8mb4
COLLATE utf8mb4_unicode_ci;

USE alertasos;

CREATE TABLE usuarios (
    id INT NOT NULL AUTO_INCREMENT,
    email VARCHAR(150) NOT NULL UNIQUE,
    senha VARCHAR(255) NOT NULL,
    email_verificado BOOLEAN NOT NULL DEFAULT FALSE,
    codigo_verificacao VARCHAR(255),
    codigo_expira_em DATETIME,
    ativo BOOLEAN NOT NULL DEFAULT TRUE,
    configuracao_concluida BOOLEAN NOT NULL DEFAULT FALSE,
    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    PRIMARY KEY (id)
);

CREATE TABLE perfil_pessoal (
    id INT NOT NULL AUTO_INCREMENT,
    usuario_id INT NOT NULL UNIQUE,
    nome VARCHAR(150) NOT NULL,
    nome_preferido VARCHAR(80),
    foto VARCHAR(500),
    data_nascimento DATE NOT NULL,
    sexo ENUM(
        'Feminino',
        'Masculino',
        'Outro',
        'Prefiro não informar'
    ),
    altura DECIMAL(5,2),
    peso DECIMAL(5,2),
    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    PRIMARY KEY (id),
    CONSTRAINT fk_perfil_pessoal_usuario
        FOREIGN KEY (usuario_id)
        REFERENCES usuarios(id)
        ON DELETE CASCADE
);

CREATE TABLE perfil_saude (
    id INT NOT NULL AUTO_INCREMENT,
    usuario_id INT NOT NULL UNIQUE,
    tipo_sanguineo VARCHAR(5),
    alergias TEXT,
    condicoes_saude TEXT,
    medicamentos TEXT,
    outras_informacoes TEXT,
    mobilidade VARCHAR(100),
    comunicacao VARCHAR(100),
    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    PRIMARY KEY (id),
    CONSTRAINT fk_perfil_saude_usuario
        FOREIGN KEY (usuario_id)
        REFERENCES usuarios(id)
        ON DELETE CASCADE
);

CREATE TABLE contatos_emergencia (
    id INT NOT NULL AUTO_INCREMENT,
    usuario_id INT NOT NULL,
    nome VARCHAR(150) NOT NULL,
    telefone VARCHAR(30) NOT NULL,
    parentesco VARCHAR(80),
    primeiro BOOLEAN NOT NULL DEFAULT FALSE,
    mora_perto BOOLEAN NOT NULL DEFAULT FALSE,
    possui_chave BOOLEAN NOT NULL DEFAULT FALSE,
    motivo_importancia TEXT NOT NULL,
    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    PRIMARY KEY (id),
    CONSTRAINT fk_contato_usuario
        FOREIGN KEY (usuario_id)
        REFERENCES usuarios(id)
        ON DELETE CASCADE
);

CREATE TABLE alertas (
    id INT NOT NULL AUTO_INCREMENT,
    usuario_id INT NOT NULL,
    tipo VARCHAR(50) NOT NULL,
    latitude DECIMAL(10,8),
    longitude DECIMAL(11,8),
    status VARCHAR(30) NOT NULL DEFAULT 'acionado',
    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    PRIMARY KEY (id),
    CONSTRAINT fk_alerta_usuario
        FOREIGN KEY (usuario_id)
        REFERENCES usuarios(id)
        ON DELETE CASCADE
);

CREATE TABLE dispositivos (
    id INT NOT NULL AUTO_INCREMENT,
    usuario_id INT NOT NULL,
    nome VARCHAR(150),
    tipo VARCHAR(50),
    identificador VARCHAR(255),
    conectado BOOLEAN NOT NULL DEFAULT FALSE,
    ultimo_sincronismo DATETIME,
    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    PRIMARY KEY (id),
    CONSTRAINT fk_dispositivo_usuario
        FOREIGN KEY (usuario_id)
        REFERENCES usuarios(id)
        ON DELETE CASCADE
);