// Selecionar elementos DOM
const modal = document.querySelector('.modal-container');
const tbody = document.querySelector('tbody');
const sCodigodeproduto = document.querySelector('#codigo_produto');
const sNome = document.querySelector('#nome_produto');
const sQuantidadedeestoque = document.querySelector('#quantidade_estoque');
const sPreco = document.querySelector('#preco_produto');
const btnSalvar = document.querySelector('#btnSalvar');

let id;

// Função para abrir o modal
function openModal(edit = false, item = {}) {
  modal.classList.add('active');

  modal.onclick = e => {
    if (e.target.className.indexOf('modal-container') !== -1) {
      modal.classList.remove('active');
    }
  };

  if (edit) {
    // Preenche o modal com os dados do item para edição
    sCodigodeproduto.value = item.i_codigo_estoque;
    sNome.value = item.s_nome_estoque;
    sQuantidadedeestoque.value = item.i_quantidade_estoque;
    sPreco.value = item.f_preco_estoque;
    id = item.i_codigo_estoque;
  } else {
    // Limpa os campos do modal para um novo item
    sCodigodeproduto.value = '';
    sNome.value = '';
    sQuantidadedeestoque.value = '';
    sPreco.value = '';
    id = undefined;
  }
}

// Função para carregar itens do backend e renderizar na tabela
async function loadItens() {
  try {
    const response = await fetch("http://localhost:3000/");
    const itens = await response.json();
    tbody.innerHTML = ''; // Limpa a tabela
    itens.forEach(item => insertItem(item)); // Adiciona cada item na tabela
  } catch (error) {
    console.error("Erro ao carregar itens:", error);
    alert("Erro ao carregar os produtos do servidor.");
  }
}

// Função para inserir uma linha na tabela
function insertItem(item) {
  const tr = document.createElement('tr');
  
  tr.innerHTML = `
    <td>${item.i_codigo_estoque}</td>
    <td>${item.s_nome_estoque}</td>
    <td>${item.i_quantidade_estoque}</td>
    <td>R$ ${item.f_preco_estoque.toFixed(2)}</td>
    <td class="acao">
      <button onclick='editItem(${JSON.stringify(item)})'><i class='bx bx-edit'></i></button>
    </td>
    <td class="acao">
      <button onclick='deleteItem(${item.i_codigo_estoque})'><i class='bx bx-trash'></i></button>
    </td>
  `;
  tbody.appendChild(tr);
}

// Função para salvar (criar ou editar) um item
btnSalvar.onclick = async e => {
  e.preventDefault();

  // Valida campos vazios
  if (!sCodigodeproduto.value || !sNome.value || !sQuantidadedeestoque.value || !sPreco.value) {
    alert('Por favor, preencha todos os campos!');
    return;
  }

  const data = {
    codigo_produto: sCodigodeproduto.value,
    nome_produto: sNome.value,
    quantidade_estoque: parseInt(sQuantidadedeestoque.value),
    preco_produto: parseFloat(sPreco.value).toFixed(2),
  };
  
  try {
    if (id) {
      // Atualizar um item existente
      const response = await fetch(`http://localhost:3000/cadastro-produtos/index.html/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        throw new Error(await response.text());
      }

      alert("Produto atualizado com sucesso!");
    } else {
      // Criar um novo item
      const response = await fetch("http://localhost:3000/cadastro-produtos/index.html", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        throw new Error(await response.text());
      }

      alert("Produto cadastrado com sucesso!");
    }

    modal.classList.remove('active');
    loadItens();
  } catch (error) {
    console.error("Erro ao salvar o produto:", error);
    alert("Erro ao salvar o produto.");
  }
};

// Função para editar um item
function editItem(item) {
  openModal(true, item);
}

// Função para excluir um item
async function deleteItem(itemId) {
  const confirmDelete = confirm("Tem certeza que deseja excluir este produto?");
  if (!confirmDelete) return;

  try {
    const response = await fetch(`http://localhost:3000/cadastro-produtos/index.html/${itemId}`, {
      method: "DELETE",
    });

    if (!response.ok) {
      throw new Error(await response.text());
    }

    alert("Produto excluído com sucesso!");
    loadItens();
  } catch (error) {
    console.error("Erro ao excluir o produto:", error);
    alert("Erro ao excluir o produto.");
  }
}

// Carrega os itens ao iniciar
loadItens();
