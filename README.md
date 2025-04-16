
# 🛒 API de E-commerce de Camisetas

API RESTful construída com **Node.js**, **Express** e **MySQL**, que permite o cadastro de usuários, login com autenticação JWT e gerenciamento de produtos.

---

## 📁 Estrutura do Projeto

```
├── controllers/
│   ├── produtoController.js
│   └── usuarioControllers.js
├── middleware/
│   └── auth.js
├── models/
│   └── db.js
├── routes/
│   ├── produtos.js
│   └── usuarios.js
├── .env
├── index.js
├── package.json
```

---

## 🚀 Tecnologias Utilizadas

- Node.js
- Express
- MySQL
- JWT (jsonwebtoken)
- bcryptjs
- dotenv
- cors

---

## ⚙️ Instalação

1. **Clone o repositório:**
   ```bash
   git clone https://github.com/Rod0002/GreatWorks-API.git
   cd GreatWorks-API
   ```

2. **Instale as dependências:**
   ```bash
   npm install
   ```

3. **Configure o ambiente criando um `.env`:**
   ```env
   DB_HOST=localhost
   DB_USER=root
   DB_PASSWORD=sua_senha
   DB_NAME=greatworks
   PORT=3000
   JWT_SECRET=segredo123
   ```

4. **Crie o banco de dados e as tabelas no MySQL:**
   ```sql
   CREATE TABLE tb_usuario (
     id_usuario INT AUTO_INCREMENT PRIMARY KEY,
     nome VARCHAR(100),
     email VARCHAR(100) UNIQUE,
     senha VARCHAR(255)
   );

   CREATE TABLE tb_produto (
     id_produto INT AUTO_INCREMENT PRIMARY KEY,
     ds_categoria VARCHAR(100),
     nm_produto VARCHAR(100),
     ds_marca VARCHAR(100),
     vl_preco DECIMAL(10,2),
     qtd_disponivel INT,
     ds_medida VARCHAR(20),
     img_produto TEXT
   );
   ```

5. **Inicie o servidor:**
   ```bash
   npm start
   ```

---

## 🔐 Autenticação

A autenticação é feita com JWT. Após o login, o usuário recebe um token que deve ser enviado no header das requisições protegidas:

```
Authorization: Bearer SEU_TOKEN_AQUI
```

---

## 📌 Rotas

### 🧑‍💻 Usuários

- **POST** `/usuarios/register`  
  Registra um novo usuário.  
  **Body:**
  ```json
  {
    "nome": "João",
    "email": "joao@email.com",
    "senha": "123456"
  }
  ```

- **POST** `/usuarios/login`  
  Realiza o login e retorna um token JWT.  
  **Body:**
  ```json
  {
    "email": "joao@email.com",
    "senha": "123456"
  }
  ```

---

### 📦 Produtos

- **GET** `/produtos`  
  Lista todos os produtos.

- **POST** `/produtos`  
  Cria um novo produto. *(Futuramente essa rota poderá exigir autenticação)*  
  **Body:**
  ```json
  {
    "ds_categoria": "Camiseta",
    "nm_produto": "Camiseta Preta",
    "ds_marca": "Marca X",
    "vl_preco": 49.90,
    "qtd_disponivel": 10,
    "ds_medida": "M",
    "img_produto": "http://imagem.com/produto.jpg"
  }
  ```

---

## 📝 Licença

Este projeto está licenciado sob a [MIT License](LICENSE).
