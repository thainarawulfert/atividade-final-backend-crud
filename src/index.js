import express from "express";
import bcrypt from "bcrypt";
import cors from "cors";

const app = express();
app.use(express.json());
app.use(cors());

app.use(
  cors({
    origin: "*",
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);

let usuarios = [];

const validarUsuario = (req, res, next) => {
  const id = Number(req.params.id);
  const buscarId = usuarios.findIndex(
    (buscarUsuario) => buscarUsuario.id === id
  );
  if (buscarId === -1) {
    return res.status(400).json("Usuário não localizado!");
  } else {
    next();
  }
};

const validarRecado = (req, res, next) => {
  const idRecado = Number(req.params.idRecados);
  const idPessoa = Number(req.params.id);

  const indexPessoa = usuarios.findIndex((p) => p.id === idPessoa);

  const indexRecado = usuarios[indexPessoa].recados.findIndex(
    (r) => r.idRecados === idRecado
  );

  if (indexRecado === -1) {
    return res.status(400).json("Recado não encontrado");
  }

  res.status(207).json("Recado alterado");
  next();
};

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
    const id = Math.floor(Math.random() * 1000000);
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

app.post("/usuarios/:id/recados", validarUsuario, (req, res) => {
  const { titulo, mensagem } = req.body;
  const idRecados = Math.floor(Math.random() * 1000000);
  const userId = parseInt(req.params.id);
  const buscarUsuario = usuarios.find((users) => users.id === userId);

  const newRecado = {
    idRecados: idRecados,
    titulo: titulo,
    mensagem: mensagem,
  };

  buscarUsuario.recados.push(newRecado);

  res.status(200).send("Recado criado com sucesso!!");
});

// Edição de Recado
app.put(
  "/usuarios/:id/recados/:idRecados",
  validarUsuario,
  validarRecado,
  (req, res) => {
    const id = Number(req.params.id);
    const idRecado = Number(req.params.idRecados);
    const indexPessoa = usuarios.findIndex((p) => p.id === id);

    const indexRecado = usuarios[indexPessoa].recados.findIndex(
      (r) => r.idRecados === idRecado
    );

    const recados = req.body;

    usuarios[indexPessoa].recados[indexRecado] = {
      idRecados: (recados.idRecados = idRecado),
      titulo: recados.titulo,
      descricao: recados.descricao,
    };
  }
);

// Deletar Recados
app.delete(
  "/usuarios/:id/recados/:idRecados/excluir",
  validarUsuario,
  validarRecado,
  (req, res) => {
    const id = Number(req.params.id);
    const idRecado = Number(req.params.idRecados);
    const indexPessoa = usuarios.findIndex((p) => p.id === id);

    const indexRecado = usuarios[indexPessoa].recados.findIndex(
      (r) => r.idRecados === idRecado
    );

    usuarios[indexPessoa].recados.splice(indexRecado, 1);
  }
);

app.listen(8080, () => console.log("Servidor iniciado...."));
