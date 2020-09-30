CREATE DATABASE pets_db;
USE pets_db;

CREATE TABLE dogs (
id INT NOT NULL AUTO_INCREMENT,
breed VARCHAR(100),
name VARCHAR(100),
PRIMARY KEY (id)
);

CREATE TABLE cats (
 id INT NOT NULL AUTO_INCREMENT,
 breed VARCHAR(100),
 name VARCHAR(100),
 PRIMARY KEY (id)
);


INSERT INTO dogs (breed, name) VALUES ('Poodle', 'Dylan');
INSERT INTO dogs (breed, name) VALUES ('Jack Russell Terrier', 'Bowser Bo');
INSERT INTO dogs (breed, name) VALUES ('Labrador Retriever', 'Noel');
INSERT INTO dogs (breed, name) VALUES ('Shepherd', 'Foxie');

INSERT INTO cats (breed, name) VALUES ('Domestic Short Hair', 'Gunnar');
INSERT INTO cats (breed, name) VALUES ('Siamese', 'Big Tom');
INSERT INTO cats (breed, name) VALUES ('Tabby', 'Penny');
INSERT INTO cats (breed, name) VALUES ('Tuxedo', 'Tex');