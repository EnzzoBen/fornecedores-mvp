// Função para alternar entre login e cadastro
function toggleForm() {
    const loginSection = document.getElementById("loginSection");
    const cadastroSection = document.getElementById("cadastroSection");
    loginSection.style.display = loginSection.style.display === "none" ? "block" : "none";
    cadastroSection.style.display = cadastroSection.style.display === "none" ? "block" : "none";
}

// Função de Cadastro de Usuários
document.getElementById('cadastroForm').addEventListener('submit', function (event) {
    event.preventDefault();
    const email = document.getElementById('cadastroEmail').value;
    const senha = document.getElementById('cadastroSenha').value;

    firebase.auth().createUserWithEmailAndPassword(email, senha)
        .then((userCredential) => {
            document.getElementById('cadastroMessage').innerText = 'Cadastro realizado com sucesso!';
        })
        .catch((error) => {
            document.getElementById('cadastroMessage').innerText = 'Erro: ' + error.message;
        });
});

// Função de Login
document.getElementById('loginForm').addEventListener('submit', function (event) {
    event.preventDefault();
    const email = document.getElementById('loginEmail').value;
    const senha = document.getElementById('loginSenha').value;

    firebase.auth().signInWithEmailAndPassword(email, senha)
        .then((userCredential) => {
            document.getElementById('loginMessage').innerText = 'Login realizado com sucesso!';
            document.getElementById('loginSection').style.display = 'none';
            document.getElementById('formulario').style.display = 'block';
            document.getElementById('busca').style.display = 'block';
        })
        .catch((error) => {
            document.getElementById('loginMessage').innerText = 'Erro: ' + error.message;
        });
});

// Armazenar dados do fornecedor
document.getElementById('fornecedorForm').addEventListener('submit', function (event) {
    event.preventDefault();
    const nome = document.getElementById('nome').value;
    const setor = document.getElementById('setor').value;
    const contato = document.getElementById('contato').value;
    const userId = firebase.auth().currentUser.uid;

    firebase.database().ref('fornecedores/' + userId).set({
        nome: nome,
        setor: setor,
        contato: contato
    }).then(() => {
        document.getElementById('fornecedorForm').reset();
        alert('Fornecedor cadastrado com sucesso!');
    }).catch((error) => {
        console.error("Erro ao salvar fornecedor: ", error);
    });
});

// Função de busca de fornecedores
firebase.database().ref('fornecedores/').on('value', (snapshot) => {
    const fornecedores = snapshot.val();
    const listaFornecedores = document.getElementById('listaFornecedores');
    listaFornecedores.innerHTML = '';

    for (let id in fornecedores) {
        const fornecedor = fornecedores[id];
        const li = document.createElement('li');
        li.innerHTML = `<strong>Nome:</strong> ${fornecedor.nome} <br>
                        <strong>Setor:</strong> ${fornecedor.setor} <br>
                        <strong>Contato:</strong> ${fornecedor.contato}`;
        listaFornecedores.appendChild(li);
    }
});
