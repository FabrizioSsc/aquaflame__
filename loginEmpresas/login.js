function botaoEntrar() {
    document.querySelector("form").addEventListener("submit", async(event) => {
        event.preventDefault();

        const email = document.querySelector('input[name="email"]').value;
        const senha = document.querySelector('input[name="senha"]').value;

        try {
            const response = await fetch("http://localhost:3000/loginEmpresas/login.html", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ email, senha})

            });

            if(response.ok) {
                window.alert("Login Bem-Sucedido! Redirecionando....");
                window.location.href = "/cadastro-produtos/index.html";

            } else {
                const message = await response.text();
                window.alert(message);
            }
        } catch(error) {
            window.alert("Erro ao Conectar com o Servidor! Tente Novamente mais Tarde!");
        }
    });
}