CREATE DATABASE EDF;

use EDF;

-- area cargos

CREATE TABLE Cargos (
    idCargos INT PRIMARY KEY,
    nomeCargo VARCHAR(20)
);

INSERT INTO Cargos(idCargos, nomeCargo)
VALUES (1, 'admin'), (2, 'facilitador'), (3, 'aluno');


-- area Aluno

CREATE TABLE Alunos(
id int not null auto_increment primary key,
idCargo INT,
nome varchar(155),
nomePreferencia varchar(30),
cpf BIGINT,
celWhatsapp BIGINT,
email varchar(90) UNIQUE,
senha varchar(150),
sexo varchar(20),
estadoCivil varchar(20),
modalidade varchar(20),
FOREIGN KEY (idCargo) REFERENCES Cargos(idCargos)
);

-- inserir exemplo de aluno
INSERT INTO Alunos(idCargo, nome, nomePreferencia, cpf, celWhatsapp, email, senha, sexo, estadoCivil, modalidade)
VALUES(3, 'Felipe Cavalcante', 'Felipe', '42828831255', 1499551234, 'felipemainyasuo@gmail.com', "senhalegal", 'M', 'solteiro', 'online');

-- area escola
CREATE TABLE Escola(
id int not null auto_increment primary key,
nomeEscola varchar(155),
diretor varchar(155),
endereço varchar(155),
numero INT,
bairroDistrito varchar(80),
cidade varchar(40),
uf char(2),
cep INT,
telefone BIGINT
);

-- inserir exemplo de escola

INSERT INTO Escola(nomeEscola, diretor, endereço, numero, bairroDistrito, cidade, uf, cep, telefone)
VALUES('EE Escola muito bacana', 'Luis Felipe Santos', 'Rua Hilario da Silva', 1128, 'Santos jurados', 'Pompeia', 'SP', 12345678, 149912345678);

-- area modulos
CREATE TABLE Modulos(
id int not null auto_increment primary key,
idModulo varchar(12),
modulo varchar(120),
sigla varchar(8),
sequencia INT
);
-- inserir exemplo de modulos

INSERT INTO Modulos(idModulo, modulo, sigla, sequencia)
VALUES ('1DBV1', 'Desenvolvendo Bebês Virtuosos 2', 'DBV2', 2);


-- area turma

CREATE TABLE Turma(
id int not null auto_increment primary key,
idEscola INT,
idModulo INT,
modalidade varchar(160),
cidade varchar(60),
uf char(2),
foreign key (idEscola) references Escola(id),
foreign key (idModulo) references Modulos(id)
);

-- inserir exemplo de turma

INSERT INTO Turma(idEscola, idModulo, modalidade, cidade, uf)
Values(1, 1, 'online', 'Pompeia', 'SP');

select * from Turma;

-- area crianças

CREATE TABLE Criancas (
    id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    idAluno INT,
    idEscola INT,
    idTurma INT,
    nome VARCHAR(155),
    cpf BIGINT,
    dataNascimento DATE,
    sexo CHAR(1),
    grauParentesco VARCHAR(25),
    celWhatsapp BIGINT,
    FOREIGN KEY (idAluno) REFERENCES Alunos(id),
    FOREIGN KEY (idEscola) REFERENCES Escola(id),
    FOREIGN KEY (idTurma) REFERENCES Turma(id)
);


-- inserir exemplo de criança

INSERT INTO Criancas(idAluno, idEscola, idTurma,nome, cpf, dataNascimento, sexo, grauParentesco, celWhatsapp) 
VALUES (1, 1, 1,"Fatima benez", 50652838855,"2005-1-11", "F", "filho", 14991463513);




-- area facilitador

CREATE TABLE Facilitador(
id int not null auto_increment primary key,
idCargo INT,
nome varchar(155),
nomePreferencia varchar(30),
dataNascimento DATE,
estadoCivil varchar(20),
cpf BIGINT,
celWhatsapp BIGINT,
cep INT,
endereço varchar(155),
numero INT,
email varchar(90) UNIQUE,
emailEdf varchar(90) UNIQUE,
senha varchar(150),
ocupacao varchar(40),
uf char(2),
cidade varchar(40),
nomesFilhos varchar(155),
idadefilhos INT,
FOREIGN KEY (idCargo) REFERENCES Cargos(idCargos)
);

select * from Facilitador;

-- inserir exemplo de facilitador
INSERT INTO Facilitador(idCargo ,nome, nomePreferencia, dataNascimento, 
estadoCivil, cpf, celWhatsapp, cep, endereço, numero, 
email, emailEdf, ocupacao, uf, cidade, nomesFilhos, idadeFilhos)
VALUES(2 ,'Marcos Cvalcante', 'Paula', '1995-01-07', 'casada', 25737818834, 14991461215, 17123345
, 'rua dias', 1234, 'marcoscavalcante123@gmail.com', 'marcos.cavalcanteEDF@edf.com', 'facilitador', 'SP', 'Pompeia', 'Felipe Cavalcante', 12);


-- area admin

CREATE TABLE Admins (
    id INT AUTO_INCREMENT PRIMARY KEY,
    idCargo INT,
    email VARCHAR(90) UNIQUE,
    senha VARCHAR(150),
    FOREIGN KEY (idCargo) REFERENCES Cargos(idCargos)
);

-- inserir exemplo de admin

INSERT INTO Admins(idCargo, email, senha) VALUES (1, 'adminEDF123@gmail.com', 'senhadeADM');



-- area Aluno por tuma

CREATE TABLE Aluno_turma(
idAluno int,
idTurma int,
descricao varchar(70),
foreign key (idAluno) references Alunos(id),
foreign key (idTurma) references Turma(id)
);

INSERT INTO Aluno_turma(idAluno, idTurma, descricao) VALUES (1, 1,'descrição teste'); 



SELECT Aluno_turma.idTurma AS idTurma, Escola.nomeEscola AS nomeEscola, Modulos.modulo AS nomeModulo, Aluno_turma.descricao AS descricao FROM Aluno_turma JOIN Turma ON Aluno_turma.idTurma = Turma.id JOIN Modulos ON Turma.idModulo = Modulos.id JOIN Escola ON Turma.idEscola = Escola.id WHERE Aluno_turma.idAluno = 1;

SELECT * FROM Aluno_turma WHERE Aluno_turma.idAluno = 1;


CREATE TABLE Facilitador_turma(
idTurma int,
idFacilitador int,
foreign key (idFacilitador) references Facilitador(id),
foreign key (idTurma) references Turma(id)
);


-- exemplo de facilitador na turma
insert into Facilitador_turma(idTurma, idFacilitador) values (1,1);

SELECT Facilitador_turma.idTurma, Facilitador.nome as nomeFacilitador FROM Facilitador_turma JOIN Turma ON Facilitador_turma.idTurma = Turma.id JOIN Facilitador ON Facilitador_turma.idFacilitador = Facilitador.id WHERE Facilitador_turma.idTurma = 1;

-- area visitas da turma
CREATE TABLE Visitas(
id int not null auto_increment primary key,
idTurma INT,
idFacilitador INT,
idModulo INT,
data_visita DATE,
horario TIME,
modalidade varchar(150),
Foreign Key (idTurma) REFERENCES Turma(id),
Foreign Key (idFacilitador) REFERENCES Facilitador(id),
Foreign Key (idModulo) REFERENCES Modulos(id)
);

INSERT INTO Visitas (idTurma, idFacilitador, idModulo, data_visita, horario, modalidade) VALUES (1, 1, 1,'2023-11-29' ,'15:30:00' ,'Sala no Meet');

SELECT data_visita, horario, modalidade FROM Visitas WHERE idTurma = 1;
-- area Visitas por turma

CREATE TABLE Turma_visitas(
idVisita int,
idTurma int,
Foreign Key (idTurma) REFERENCES Turma(id),
Foreign Key (idVisita) REFERENCES Visitas(id)

);

INSERT INTO Turma_visitas(idTurma, idVisita) VALUES (1,1); 

SELECT Turma_visitas.idTurma, Visitas.data_visita AS Dia_da_visita, Visitas.horario AS Horario_da_visita, Visitas.modalidade AS Modalidade_da_visita FROM Turma_visitas JOIN Turma ON Turma_visitas.idTurma = Turma.id JOIN Visitas ON Turma_visitas.idVisita = Visitas.id where Turma_visitas.idTurma = 1;

-- SELECT Turma.*,Escola.nomeEscola FROM Turma Inner join Escola ON Turma.idEscola = Escola.ID;