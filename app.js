// Armazena os fornecedores
let fornecedores = [];

// Captura o formulário de cadastro de fornecedores
document.getElementById('cadastroForm').addEventListener('submit', function(event) {
    event.preventDefault();

    // Captura os valores do formulário de fornecedores
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

// Captura o formulário de cadastro de clientes
document.getElementById('cadastroClienteForm').addEventListener('submit', function(event) {
    event.preventDefault();

    // Libera a busca de fornecedores
    liberarBusca();

    // Captura os valores do formulário de clientes
    const nomeCliente = document.getElementById('nomeCliente').value;
    const emailCliente = document.getElementById('emailCliente').value;
    const empresaCliente = document.getElementById('empresaCliente').value;
    const contatoCliente = document.getElementById('contatoCliente').value;

    // Envia os dados para o Formspree (exemplo de integração simples com POST)
    fetch('https://formspree.io/f/xrbgzjov', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            nome: nomeCliente,
            email: emailCliente,
            empresa: empresaCliente,
            contato: contatoCliente
        })
    }).then(response => {
        if (response.ok) {
            alert('Cadastro enviado com sucesso!');
        } else {
            alert('Erro ao enviar o cadastro.');
        }
    });

    // Limpa o formulário de cliente
    document.getElementById('cadastroClienteForm').reset();
});

// Função para liberar a busca de fornecedores após cadastro do cliente
function liberarBusca() {
    document.getElementById('buscaDesabilitada').style.display = 'none';
    document.getElementById('busca').style.display = 'block';
}

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

// Função para filtrar fornecedores por setor ao clicar em um dos quadrados de setor
function filtrarSetor(setor) {
    const resultadosFiltrados = fornecedores.filter(fornecedor => fornecedor.setor === setor);

    const lista = document.getElementById('listaFornecedores');
    lista.innerHTML = ''; // Limpa a lista

    resultadosFiltrados.forEach(fornecedor => {
        const li = document.createElement('li');
        li.innerHTML = `<strong>Nome:</strong> ${fornecedor.nome} <br>
                        <strong>Setor:</strong> ${fornecedor.setor} <br>
                        <strong>Contato:</strong> ${fornecedor.contato}`;
        lista.appendChild(li);
    });

    // Opcional: atualiza o campo de busca com o setor selecionado
    document.getElementById('buscaInput').value = setor;
}
