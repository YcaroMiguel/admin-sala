window.onload = function() {
    alert("Bem-vindo ao site de Administração da Sala!");
}
const tarefas = [
    { nome: "Matemática: Resolver página 10", prazo: "Sexta-feira" },
    { nome: "História: Estudo sobre a Revolução Francesa", prazo: "Segunda-feira" }
];

const tarefasSection = document.getElementById('tarefas');
let listaTarefas = "<ul>";

tarefas.forEach(tarefa => {
    listaTarefas += `<li><strong>${tarefa.nome}:</strong> Entregar até ${tarefa.prazo}.</li>`;
});

listaTarefas += "</ul>";
tarefasSection.innerHTML = listaTarefas;
