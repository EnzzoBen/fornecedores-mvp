// Armazena os fornecedores
let fornecedores = [];

// Captura o formulário de cadastro
document.getElementById('cadastroForm').addEventListener('submit', function(event) {
    event.preventDefault();

    // Captura os valores do formulário
    const nome = document.getElementById('nome').value;
    const setor = document.getElementById('setor').value;
    const contato = document.getElementById('contato').value;

    // Cria um objeto fornecedor
    const fornecedor = {
        nome: nome,
        setor: setor,
        contato: contato
    };

    // Adiciona o fornecedor à lista
    fornecedores.push(fornecedor);

    // Atualiza a lista de fornecedores
    atualizarLista();

    // Limpa o formulário
    document.getElementById('cadastroForm').reset();
});

// Função para atualizar a lista de fornecedores
function atualizarLista() {
    const lista = document.getElementById('listaFornecedores');
    lista.innerHTML = ''; // Limpa a lista

    fornecedores.forEach(fornecedor => {
        const li = document.createElement('li');
        li.innerHTML = `<strong>Nome:</strong> ${fornecedor.nome} <br>
                        <strong>Setor:</strong> ${fornecedor.setor} <br>
                        <strong>Contato:</strong> ${fornecedor.contato}`;
        lista.appendChild(li);
    });
}

// Função de busca
document.getElementById('buscaInput').addEventListener('input', function(event) {
    const buscaTermo = event.target.value.toLowerCase();

    const resultadosFiltrados = fornecedores.filter(fornecedor => {
        return fornecedor.nome.toLowerCase().includes(buscaTermo) || fornecedor.setor.toLowerCase().includes(buscaTermo);
    });

    const lista = document.getElementById('listaFornecedores');
    lista.innerHTML = ''; // Limpa a lista

    resultadosFiltrados.forEach(fornecedor => {
        const li = document.createElement('li');
        li.innerHTML = `<strong>Nome:</strong> ${fornecedor.nome} <br>
                        <strong>Setor:</strong> ${fornecedor.setor} <br>
                        <strong>Contato:</strong> ${fornecedor.contato}`;
        lista.appendChild(li);
    });
});
