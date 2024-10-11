// Configuração Firebase
const firebaseConfig = {
    apiKey: "SUA_API_KEY_AQUI",
    authDomain: "SEU_DOMINIO.firebaseapp.com",
    databaseURL: "https://SEU_BANCO.firebaseio.com",
    projectId: "SEU_ID_DO_PROJETO",
    storageBucket: "SEU_BUCKET.appspot.com",
    messagingSenderId: "SEU_ID_MENSAGEM",
    appId: "SEU_ID_DO_APP"
};

// Inicializando o Firebase
firebase.initializeApp(firebaseConfig);

// Referência ao banco de dados
const db = firebase.database();

// Função para cadastrar fornecedor no Realtime Database
document.getElementById('cadastroForm').addEventListener('submit', function(event) {
    event.preventDefault();

    const nome = document.getElementById('nome').value;
    const setor = document.getElementById('setor').value;
    const contato = document.getElementById('contato').value;

    const novoFornecedorRef = db.ref('fornecedores').push();

    novoFornecedorRef.set({
        nome: nome,
        setor: setor,
        contato: contato
    })
    .then(() => {
        alert('Fornecedor cadastrado com sucesso!');
        document.getElementById('cadastroForm').reset();
    })
    .catch(error => {
        console.error('Erro ao cadastrar fornecedor: ', error);
    });
});

// Função para carregar fornecedores
function carregarFornecedores() {
    db.ref('fornecedores').on('value', (snapshot) => {
        const fornecedores = snapshot.val();
        const lista = document.getElementById('listaFornecedores');
        lista.innerHTML = ''; // Limpa a lista

        for (const id in fornecedores) {
            const fornecedor = fornecedores[id];
            const li = document.createElement('li');
            li.innerHTML = `<strong>Nome:</strong> ${fornecedor.nome} <br>
                            <strong>Setor:</strong> ${fornecedor.setor} <br>
                            <strong>Contato:</strong> ${fornecedor.contato}`;
            lista.appendChild(li);
        }
    });
}

// Carrega os fornecedores ao abrir a página
carregarFornecedores();
