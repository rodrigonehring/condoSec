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

- install docker
- docker-compose up

Some tests on frontend:

- cd /app && yarn && yarn test

### TODO:

- [x] editar morador
- [x] ao editar morador, se ele for o principal, atualizar o cache do condominio
- [x] adicionar um count no condominio de moradores. Ao criar/excluir um morador, deve atualizar o count. Assim
      da pra mostrar quantas pessoas moram sem precisar fazer uma query no outro model.
- [x] datepicker no form do morador.
- [x] ao criar um condominio, redirecionar para a url dele, assim já pode adicionar um morador
- [x] excluir condominio. Deletar todos os moradores junto?
- [x] adicionar busca. Talvez no /app, um input + select do tipo resident
- [x] melhorar a fake home page institucional.

- [y] react-testing-library em alguns components do front (só alguns pra ter mesmo :/)
- [x] docker-compose.yml

### demo

![sample apng](/demo.png?raw=true 'sample apng')
