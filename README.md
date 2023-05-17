# Página de Recados - CRUD em Node.js

Este projeto é um Backend de uma página de recados que permite criar, visualizar, atualizar e excluir recados e também criar, visulizar, editar e excluir usuários

# Tecnologias Utilizadas

<ul>
  <li>Node.js</li>
  <li>Express</li>
</ul>

# Contribuição

Contribuições são bem-vindas! Se você tiver sugestões, melhorias ou correções, sinta-se à vontade para abrir uma issue ou enviar um pull request.

# Licença

Este projeto está licenciado sob a licença MIT. Para mais informações, consulte o arquivo LICENSE.

# Nessa API tem como rotas:

**POST /registro:**
Cria um novo usuário no sistema. Você deve fornecer o nome, email e senha no corpo da requisição.

**POST /login:**
Realiza o login de um usuário. Você deve fornecer o email e a senha no corpo da requisição.

**GET /usuarios:**
Lista todos os usuários com suas notas

**POST /usuarios/:id/recados:**
Cria um novo recado para o usuário com o ID específico. Você deve fornecer o título e a descrição do recado no corpo da requisição.

**PUT /usuarios/:id/recados/:idEditar:**
Atualiza uma nota com ID específico para um usuário com ID específico. Você deve fornecer o título e a descrição para atualizar o recado no corpo da requisição.

**DELETE /usuarios/:id/recados/:idEditar/excluir:**
Excluir uma nota com ID específico para um usuário com ID específico
