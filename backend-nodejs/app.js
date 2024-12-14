const express = require("express");
const bodyParser = require("body-parser");
const mysql = require("mysql2");
const cors = require("cors");
const crypto = require("crypto");


// Configuração do Servidor
const app = express();
const PORT = 3000;

// Middleware para processar dados do formulário
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cors());

// Conexão com o banco de dados MySQL
const db = mysql.createConnection({
  host: "https://aquaflameweb.online",
  user: "root",
  password: "Ba4+9NGV!I#",
  database: "db_aquaflame"
  
});

db.connect((error) => {
  if (error) {
    console.error("Erro ao conectar ao banco de dados:", error);
    process.exit(1); // Encerra o processo caso haja erro de conexão
  }
  console.log("Conectado ao Banco de Dados com Sucesso!");
});

// Endpoint para cadastro
app.post("/cadastrarEmpresas/index.html", (req, res) => {
  const { name, email, senha, cnpj, phone } = req.body;

  // Validação básica dos dados
  if (!name || !email || !senha || !cnpj || !phone) {
    return res.status(400).send("Todos os campos são obrigatórios.");
  }

  const query = "INSERT INTO empresa_distribuidora (s_nome_empresa, s_email_empresa, s_senha_empresa, s_cnpj_empresa, s_phone_empresa) VALUES (?, ?, ?, ?, ?)";

  db.query(query, [name, email, senha, cnpj, phone], (error, result) => {
    if (error) {
      console.error("Erro ao inserir os dados no banco:", error);
      return res.status(500).send("Erro ao processar a solicitação.");
    }
    res.status(201).send("Cadastro realizado com sucesso!");

  });
});

//Endpoint para autenticação de login 
app.post("/loginEmpresas/login.html", (req, res) => {
  const { email, senha } = req.body;

  //Verificar se os campos foram preenchidos
  if(!email || !senha) {
    return res.status(400).send("E-mail e Senha são Obrigatórios!");

  }

  //Consultar o Banco para verificar se o usuário exixte
  const query = "SELECT * FROM empresa_distribuidora WHERE s_email_empresa = ? AND s_senha_empresa = ?";
  db.query(query, [email, senha], (error, results) => {
    if(error) {
      console.error("Erro ao Autenticar os Dados: ", error);
      return res.status(500).send("Erro no Servidor!");
    }

    if(results.length > 0) {
      // Usuário autenticado com sucesso
      res.status(200).send("Logins Efetuado com Sucesso! Bem Vindo ao AquaFlame");

    } else {
      // Credenciais inválidas
      res.status(401).send("E-mail ou Senha Inválidos! Tente Novamente");
    }
  });
});

//Endpoint para cadastrar um novo produto
app.post("/cadastro-produtos/index.html", (req, res) => {
  const { codigo_produto, nome_produto, quantidade_estoque, preco_produto } = req.body;

  if(!codigo_produto, !nome_produto, !quantidade_estoque, !preco_produto) {
    return res.status(400).send("Todos os Campos São Obrigatórios!");

  }

  const query = "INSERT INTO estoque_empresa (i_codigo_estoque, s_nome_estoque, i_quantidade_estoque, f_preco_estoque) VALUES (?, ?, ?, ?)";

  db.query(query, [codigo_produto, nome_produto, quantidade_estoque, preco_produto], (error, result) => {

    if(error) {
      console.error("Erro ao Adicionar os Produtos no Banco de Dados: ", error)
      ;
      return res.status(500).send("Erro ao Processar a Solicitação!")
    }
    res.status(201).send("Produto Cadastrado com Sucesso!");
  });
});

//Endpoint para listar os produtos
app.get("/", (req, res) => {
  const query = "SELECT * FROM estoque_empresa";

  db.query(query, (error, results) => {
    if(error) {
      console.error("Erro ao Buscar os Produtos no Banco de Dados: ", error);
      return res.status(500).send("Erro ao Processar a Solicitação!");

    }
    res.status(200).json(results);

  });
});

//Endpoint para Atualizar o Estoque pelo ID
app.put("/cadastro-produtos/index.html/:id", (req, res) => {
  const { id } = req.params;
  const { codigo_produto, nome_produto, quantidade_estoque, preco_produto } = req.body;

  if(!codigo_produto || !nome_produto || !quantidade_estoque || !preco_produto) {
    return res.status(400).send("Os Campos São Obrigatórios!");

  }

  const query = "UPDATE estoque_empresa SET s_nome_estoque = ?, i_quantidade_estoque = ?, f_preco_estoque = ? WHERE i_codigo_estoque = ?";

  db.query(query, [nome_produto, quantidade_estoque, preco_produto, id], (error, result) => {
    if(error) {
    console.error("Erro ao Atualizar o Produto no Banco de Dados: ", error);
    return res.status(500).send("Erro ao Processar a Solicitação!");
    
    }
    if(result.affectedRows === 0) {
      return res.status(404).send("Estoque não encontrado!");

    }
    res.status(200).send("Estoque Atualizado com Sucesso!");

  });
});

//Endpoint para Deleterar um Produto do Banco de Dados pelo ID
app.delete("/cadastro-produtos/index.html/:id", (req, res) => {
  const { id } = req.params;

  const query = "DELETE FROM estoque_empresa WHERE i_codigo_estoque = ?";

  db.query(query, [id], (error, result) => {
    if(error) {
      console.error("Erro ao Deletar o Produto do Banco de Dados: ", error);
      return res.status(500).send("Erro ao Processar a Solicitação!");

    }
    if(result.affectedRows === 0) {
      return res.status(404).send("Estoque Não Encontrado!");

    }
    res.status(200).send("Produto Deletado com Sucesso do Banco de Dados!");

  });
});

// Iniciar o servidor
app.listen(PORT, () => {
  console.log(`Servidor rodando em http://localhost:${PORT}`);
});

