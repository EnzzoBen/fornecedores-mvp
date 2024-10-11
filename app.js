// Funções de navegação
function irParaCadastro(tipo) {
    document.getElementById('identificacao').classList.add('oculto');
    if (tipo === 'cliente') {
        document.getElementById('formularioCliente').classList.remove('oculto');
    } else if (tipo === 'fornecedor') {
        document.getElementById('formularioFornecedor').classList.remove('oculto');
    }
}

// Cadastro Fornecedor
document.getElementById('cadastroFornecedorForm').addEventListener('submit', function(event) {
    event.preventDefault();
    const nome = document.getElementById('nomeFornecedor').value;
    const setor = document.getElementById('setorFornecedor').value;
    const contato = document.getElementById('contatoFornecedor').value;

    // Firebase Database - Cadastrar fornecedor
    firebase.database().ref('fornecedores').push({
        nome: nome,
        setor: setor,
        contato: contato
    });

    // Exibir sucesso e manter na tela
    document.getElementById('formularioFornecedor').classList.add('oculto');
    document.getElementById('formularioSucesso').classList.remove('oculto');
});

// Cadastro Cliente
document.getElementById('cadastroClienteForm').addEventListener('submit', function(event) {
    event.preventDefault();
    const nome = document.getElementById('nomeCliente').value;
    const email = document.getElementById('emailCliente').value;

    // Firebase Database - Cadastrar cliente
    firebase.database().ref('clientes').push({
        nome: nome,
        email: email
    });

    // Exibir sucesso e manter na tela
    document.getElementById('formularioCliente').classList.add('oculto');
    document.getElementById('formularioSucesso').classList.remove('oculto');
});
