var errorDiv;
var dataDiv;
var cep = document.getElementById('cepInput');

function formatCep(value) {
  return (value = String(value)
    .replace(/\D/g, '')
    .slice(0, 8)
    .replace(/(\d{5})(\d)/, '$1 - $2')); // (\d{5}) = $1 / (\d) = $2
}

cep.oninput = () => {
  checkSize(cep);
  cep.value = formatCep(cep.value);
};

cep.onchange = () => {
  checkSize(cep);
  cep.value = formatCep(cep.value);
};

clean();

function searchCep() {
  var cepInput = cep.value.replace(' - ', '');
  if (cepInput.length === 8) {
    var loader = `<img src="./src/assets/img/loader.svg" alt="loader" />`;
    errorDiv = document.getElementById('error');
    errorDiv.innerHTML = '';
    dataDiv = document.getElementById('data-retrived');
    dataDiv.innerHTML = '';
    document.getElementById('loader').innerHTML = loader;
    setTimeout(function () {
      fetchCep(cepInput);
    }, 2000);
  }
}

function fetchCep(cep) {
  fetch(`https://viacep.com.br/ws/${cep}/json/`)
    .then((response) => response.json())
    .then((data) => {
      document.getElementById('loader').innerHTML = '';
      if (data.erro) {
        error.innerHTML = `<p class="col">
        Parece que esse cep não existe, tente novamente...
      </p>`;
      } else {
        dataDiv.innerHTML = '';
        dataDiv.appendChild(
          createNode('p', ['col-12'], `Logradouro: <b>${data.logradouro}</b>`)
        );
        dataDiv.appendChild(
          createNode('p', ['col-12'], `Bairro: <b>${data.bairro}</b></b>`)
        );
        dataDiv.appendChild(
          createNode(
            'div',
            ['col-12', 'row'],
            ` <p class="col-6">UF: <b>${data.uf}</b></p>
          <p class="col-6">Cidade: <b>${data.localidade}</b></p>`
          )
        );
      }
    });
}

function checkSize(t) {
  var btn = document.getElementById('searchBtn');
  if (t.value.length === 11) {
    btn.removeAttribute('disabled');
  } else {
    btn.setAttribute('disabled', true);
  }
}

function createNode(tag, css, innerHTML) {
  var element = document.createElement(tag);
  css.forEach((cssClass) => {
    element.classList.add(cssClass);
  });
  element.innerHTML = innerHTML;
  return element;
}

function clean() {
  cep.value = '';
  errorDiv = document.getElementById('error');
  errorDiv.innerHTML = '';
  dataDiv = document.getElementById('data-retrived');
  dataDiv.innerHTML = '';
  checkSize(cep);
}
