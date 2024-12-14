function botaoCadastrar() {
  document.getElementById("companyForm").addEventListener("submit", function (e) {
    e.preventDefault(); // Evita o comportamento padrão do formulário
  
    const formData = new FormData(this);
    const data = Object.fromEntries(formData);
  
    fetch("http://localhost:3000/cadastrarEmpresas/index.html", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    })
      .then((response) => {
        if (response.ok) {
          alert("Cadastro realizado com sucesso!");
          this.reset(); // Limpa o formulário
          window.location.href = "/loginEmpresas/login.html";
        } else {
          response.text().then((text) => alert("Erro: " + text));
        }
      })
      .catch((error) => {
        console.error("Erro ao enviar os dados:", error);
        alert("Erro ao processar a solicitação. Tente novamente.");
      });
  });
}


