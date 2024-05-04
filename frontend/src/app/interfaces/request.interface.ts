export interface registerStudentForms {
  nomeCompleto: string;
  apelido: string;
  email: string;
  cpf: string;
  telefone: string;
  senha: string;
  confirmarSenha: string;
  dataNascimento: string;
  genero: string;
  estadoCivil: string;
  termosUso: boolean;
  [key: string]: string | boolean;
};


export interface registerKidForms {
  nomeCompleto: string;
  cpf: string;
  grauPar: string;
  dataNascimento: string;
  genero: string;
  turma: string;
  escola: string;

}

export interface registerData {
  nome: string;
  nomePreferencia: string;
  cpf: string;
  celWhatsapp: string;
  email: string;
  sexo: string;
  estadoCivil: string;
  modalidade: string;
  senha: string;
  confirmarSenha: string;
}

export interface profileData {
  nome: string;
  email: string;
  genero: string;
  telefone: string;
  dataNascimento: string;
  cpf: string;
  estadoCivil: string;
  [key: string]: string;
}

export interface kidData {
  idAluno: string | null;
  idEscola: string;
  idTurma: string;
  nome: string;
  cpf: string;
  dataNascimento: string;
  sexo: string;
  grauParentesco: string;
}