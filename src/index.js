import express from "express";
import bcrypt from "bcrypt";

const app = express();
app.use(express.json());

let users = [];

//Fazer o registro do usuário no CRUD

app.post("/register", (req, res) => {
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
        notes: [],
      };

      users.push(newUser);
      console.log("newUser:", newUser);
      return res.status(200).send("Sua conta foi criada com sucesso!");
    } catch (error) {
      console.log(error);
    }
  }
});

app.listen(8080, () => console.log("Servidor iniciado"));
