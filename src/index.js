import express from "express";
import bcrypt from "bcrypt";

const app = express();
app.use(express.json());

let usuarios = [];

//Fazer o registro do usuário no CRUD

app.post("/registro", (req, res) => {
  const { nome, email, password } = req.body;
  const userExist = usuarios.find((newUser) => newUser.email === email);

  if (userExist) {
    return res
      .status(401)
      .send("Que pena! já existe um usuário com o mesmo email");
  } else {
    const rounds = 10;
    const id = usuarios.length + 1;
    try {
      const bcryptPassword = bcrypt.hashSync(password, rounds);
      const newUser = {
        id,
        nome,
        email,
        password: bcryptPassword,
        recados: [],
      };

      usuarios.push(newUser);
      console.log("newUser:", newUser);
      return res.status(200).send("Sua conta foi criada com sucesso!");
    } catch (error) {
      console.log(error);
    }
  }
});

// Fazer Login no CRUD
app.post("/login", (req, res) => {
  const { email, password } = req.body;
  const user = usuarios.find((user) => user.email === email);

  if (!user) {
    return res.status(401).send("Usuário não encontrado ou não existe");
  }
  const passwordMatch = bcrypt.compareSync(password, user.password);
  if (!passwordMatch || user.email !== email) {
    return res.status(401).send("Email ou senha incorretos!");
  }
  res.status(200).send("Seja bem-vindo ao seu CRUD de Recados");
});

// Listar Usuários Cadastrados
app.get("/usuarios", (req, res) => {
  res.status(200).send(usuarios);
});

// Criação de Recado

app.post("/usuarios/:id/recados", (req, res) => {
  const { titulo, mensagem } = req.body;
  const idRecados = usuarios.length + 1;
  const userId = parseInt(req.params.id);
  const buscarUsuario = usuarios.find((users) => users.id === userId);

  if (!buscarUsuario) {
    return res.status(401).send("Usuário não encontrado ou não existe");
  }

  const newRecado = { id: idRecados, titulo: titulo, mensagem: mensagem };

  buscarUsuario.recados.push(newRecado);

  res.status(200).send("Recado criado com sucesso!!");
});

// Edição de Recado
app.put("/usuarios/:id/recados/:idEditar", (req, res) => {
  const { titulo, mensagem } = req.body;
  const idUsuario = parseInt(req.params.id);
  const buscarUsuario = usuarios.find((users) => users.id === idUsuario);
  const idEditar = parseInt(req.params.idEditar);
  const recadoEditado = buscarUsuario.recados.findIndex(
    (recadosEditar) => recadosEditar.id === idEditar
  );

  if (!idUsuario || !idEditar) {
    return res
      .status(401)
      .send("Usuário ou Recado não encontrado ou não existe");
  }

  buscarUsuario.recados[recadoEditado].titulo = titulo;
  buscarUsuario.recados[recadoEditado].mensagem = mensagem;

  res.status(200).send("Recado editado com sucesso!!");
});

// Deletar Recados
app.delete("/usuarios/:id/recados/:idEditar/excluir", (req, res) => {
  const idUsuario = parseInt(req.params.id);
  const buscarUsuario = usuarios.find((users) => users.id === idUsuario);
  const idEditar = parseInt(req.params.idEditar);
  const indexRecado = buscarUsuario.recados.findIndex(
    (recadosEditar) => recadosEditar.id === idEditar
  );

  if (indexRecado > 0) {
    return res.status(401).send("Recado não encontrado ou não existe");
  }

  buscarUsuario.recados = buscarUsuario.recados.filter(
    (recado) => recado.id !== idEditar
  );
  res.status(200).send("Recado excluido com sucesso!!");
});

app.listen(8080, () => console.log("Servidor iniciado...."));
