Precisamos de um sistema web que permita que os nossos operadores realizem o cadastro de apartamento e os seus moradores.
Cada apartamento possui: um número, um bloco e um ou mais moradores.
O morador, possui as seguintes informações: nome, data de nascimento, telefone, cpf e email. Dos moradores do apartamento, um deverá ser o responsável - pois será com ele que as pendências serão tratadas.
O operador deve poder incluir, alterar e excluir livremente os registros de apartamento e moradores.
Deve existir um mecanismo de busca que permita encontrar todos os moradores de determinado apartamento, bem como a busca específica por informações do morador.
Para conseguir acesso ao sistema, é necessário uma área onde os operadores possam efetuar a autenticação.
Caso o operador não possua um cadastro, é necessário que o mesmo se cadastre para então efetuar a autenticação.

```
Building: {
  name: String,
  number: String,
  block: String,
  mainResident: Resident,
  residentCount: Int
}

Resident {
  name: String,
  birthdate: Date,
  phoneNumber: String,
  cpf: String,
  email: String,
  liveIn: Building
}
```

### to run:

- install mongodb and run service on default port
- clone repository
- yarn install inside /app and /server
- yarn start on /app to run frontend code
- yarn dev on /server to run graphql server

### TODO:

- [x] editar morador
- [x] ao editar morador, se ele for o principal, atualizar o cache do condominio
- [x] adicionar um count no condominio de moradores. Ao criar/excluir um morador, deve atualizar o count. Assim
      da pra mostrar quantas pessoas moram sem precisar fazer uma query no outro model.
- [x] datepicker no form do morador.
- [ ] ao criar um condominio, redirecionar para a url dele, assim já pode adicionar um morador
- [ ] excluir condominio. Deletar todos os moradores junto?
- [ ] adicionar busca. Talvez no /app, um input + select do tipo (building | resident)
- [ ] melhorar a fake home page institucional.

- [ ] jest nos resolvers do server
- [ ] react-testing-library em alguns components do front
- [ ] docker-compose.yml
