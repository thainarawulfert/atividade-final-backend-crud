import express from "express";
import bcrypt from "bcrypt";

const app = express();
app.use(express.json());

let users = [];

// Fazer a validação do usuário
function validId(req, res, next) {
  const userId = parseInt(req.params.id);
  console.log("userId:", userId);
  const validUser = users.find((user) => user.id === userId);

  if (validUser) {
    console.log("validUser:", validUser);
    next();
  } else {
    console.log("User not found");
    return res.status(400).send("Usuário não encontrado ou não existe");
  }
}

//Fazer o registro do usuário no CRUD

app.post("/registro", (req, res) => {
  const { nome, email, password } = req.body;
  const userExist = users.find((newUser) => newUser.email === email);

  if (userExist) {
    return res
      .status(401)
      .send("Que pena! já existe um usuário com o mesmo email");
  } else {
    const rounds = 10;
    const id = users.length + 1;
    try {
      const bcryptPassword = bcrypt.hashSync(password, rounds);
      const newUser = {
        id,
        nome,
        email,
        password: bcryptPassword,
        note: [],
      };

      users.push(newUser);
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
  const user = users.find((user) => user.email === email);

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
app.get("/users", (req, res) => {
  res.status(200).send(users);
});

app.listen(8080, () => console.log("Servidor iniciado"));
