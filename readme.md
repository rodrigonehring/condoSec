Precisamos de um sistema web que permita que os nossos operadores realizem o cadastro de apartamento e os seus moradores.
Cada apartamento possui: um número, um bloco e um ou mais moradores.
O morador, possui as seguintes informações: nome, data de nascimento, telefone, cpf e email. Dos moradores do apartamento, um deverá ser o responsável - pois será com ele que as pendências serão tratadas.
O operador deve poder incluir, alterar e excluir livremente os registros de apartamento e moradores.
Deve existir um mecanismo de busca que permita encontrar todos os moradores de determinado apartamento, bem como a busca específica por informações do morador.
Para conseguir acesso ao sistema, é necessário uma área onde os operadores possam efetuar a autenticação.
Caso o operador não possua um cadastro, é necessário que o mesmo se cadastre para então efetuar a autenticação.

Building: {
name: String,
number: String,
block: String,
mainResident: Resident,
residentsCount: Int,
}

Resident {
name: String,
birthDate: Date,
phoneNumber: String,
cpf: String,
email: String,
liveIn: Bulding
}
