function abrirModal() {
  overlay.classList.add("active");
  criarTarefa.classList.add("active");
}

function fecharModal() {
  overlay.classList.remove("active");
  criarTarefa.classList.remove("active");
}
function buscarTarefa() {
  fetch("http://localhost:3000/tarefas")
    .then((res) => res.json())
    .then((res) => {
      buscarTarefas(res);
    });
}
buscarTarefa();

function buscarTarefas(listaDeTarefas) {
  if (listaDeTarefas.length > 0) {
    listaDeTarefas.map((tarefa) => {
      lista.innerHTML += `
        <li>
            <h5>${tarefa.titulo}</h5>
            <p>${tarefa.descricao}</p>
            <div class="actions">
                <box-icon name='trash' type='solid' size='sm' onClick="excluirTarefa(${tarefa.id})"></box-icon>
            </div>
        </li>
        `;
    });
  }
}

function adicionarTarefa() {
  event.preventDefault();
  const titulo = document.getElementById("titulo").value;
  const descricao = document.getElementById("descricao").value;
  fetch("http://localhost:3000/tarefas", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      titulo,
      descricao,
    }),
  })
    .then((res) => res.json())
    .then((res) => {
      buscarTarefa();
      fecharModal();
      let form = document.querySelector("#criarTarefa form")
      form.reset();
    });

}

function excluirTarefa(id) {
  fetch(`http://localhost:3000/tarefas/${id}`, {
    method: "DELETE",
  })
    .then((res) => res.json())
    .then((res) => {
      buscarTarefa();
    });
}

function buscarTarefaPorFiltro() {
  let lis = document.querySelectorAll("ul li");
  let termoBusca = document.getElementById("busca").value.toLowerCase();
  
  if (termoBusca.length > 0) {
    lis.forEach((li) => {
      let titulo = li.children[0].innerText.toLowerCase();
      let descricao = li.children[1].innerText.toLowerCase();
      
      if (titulo.includes(termoBusca) || descricao.includes(termoBusca)) {
        li.classList.remove("oculto");
      } else {
        li.classList.add("oculto");
      }
    });
  } else {
    lis.forEach((li) => {
      li.classList.remove("oculto");
    });
  }
}
