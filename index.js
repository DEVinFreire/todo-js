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
    .then(res => res.json())
    .then(res => {
      buscarTarefas(res)
    })
} buscarTarefa();

function buscarTarefas(listaDeTarefas) {
    if(listaDeTarefas.length > 0) {
     listaDeTarefas.map(tarefa => {
        lista.innerHTML += `
        <li>
            <h5>${tarefa.titulo}</h5>
            <p>${tarefa.descricao}</p>
            <div class="actions">
                <box-icon name='trash' type='solid' size='sm' ></box-icon>
            </div>
        </li>
        `
     })   
    }
}

function adicionarTarefa() {
    event.preventDefault();
    const titulo = document.getElementById("titulo").value;
    const descricao = document.getElementById("descricao").value;
    fetch("http://localhost:3000/tarefas",{
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            titulo,
            descricao
        })
    })
    .then(res => res.json())
    .then(res => {
        buscarTarefa();
    })
    fecharModal();
  
}
