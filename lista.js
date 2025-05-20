 let contas = [];

    function salvarContas() {
      localStorage.setItem('contas', JSON.stringify(contas));
    }

    function carregarContas() {
      const dados = localStorage.getItem('contas');
      if (dados) {
        contas = JSON.parse(dados);
        contas.forEach(conta => {
          renderizarConta(conta.nome, conta.valor);
        });
        atualizarTotal();
      }
    }

    function atualizarTotal() {
      const total = contas.reduce((soma, conta) => soma + conta.valor, 0);
      document.getElementById('totalValor').textContent = total.toFixed(2);
    }

    function adicionarConta() {
      const nome = document.getElementById('nomeConta').value.trim();
      const valor = parseFloat(document.getElementById('valorConta').value);

      if (!nome || isNaN(valor)) {
        alert("Preencha o nome e um valor válido.");
        return;
      }

      const conta = { nome, valor };
      contas.push(conta);
      salvarContas();
      renderizarConta(nome, valor);
      atualizarTotal();

      document.getElementById('nomeConta').value = '';
      document.getElementById('valorConta').value = '';
      document.getElementById('nomeConta').focus();
    }

    function renderizarConta(nome, valor) {
      const lista = document.getElementById('listaContas');

      const item = document.createElement('li');
      const texto = document.createElement('span');
      texto.className = 'item-text';
      texto.textContent = `${nome} - R$ ${valor.toFixed(2)}`;

      const botaoExcluir = document.createElement('button');
      botaoExcluir.className = 'btn-excluir';
      botaoExcluir.textContent = 'Excluir';
      botaoExcluir.onclick = function () {
        lista.removeChild(item);
        contas = contas.filter(c => !(c.nome === nome && c.valor === valor));
        salvarContas();
        atualizarTotal();
      };

      item.appendChild(texto);
      item.appendChild(botaoExcluir);
      lista.appendChild(item);
    }

    // Carregar ao iniciar
    carregarContas();