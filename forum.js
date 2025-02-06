document.addEventListener("DOMContentLoaded", carregarPosts);

function publicarPost() {
    let autor = document.getElementById("autor").value.trim();
    let mensagem = document.getElementById("mensagem").value.trim();

    if (autor === "" || mensagem === "") {
        alert("Por favor, preencha todos os campos!");
        return;
    }

    let post = {
        id: Date.now(),
        autor,
        mensagem,
        data: new Date().toLocaleString(),
        curtidas: 0,
        respostas: []
    };

    let posts = JSON.parse(localStorage.getItem("posts")) || [];
    posts.unshift(post);
    localStorage.setItem("posts", JSON.stringify(posts));

    document.getElementById("autor").value = "";
    document.getElementById("mensagem").value = "";
    carregarPosts();
}

function carregarPosts() {
    let posts = JSON.parse(localStorage.getItem("posts")) || [];
    let listaPosts = document.getElementById("lista-posts");
    listaPosts.innerHTML = "";

    posts.forEach(post => {
        let div = document.createElement("div");
        div.classList.add("post");
        div.innerHTML = `
            <h3>${post.autor}</h3>
            <p>${post.mensagem}</p>
            <small>🕒 ${post.data}</small>
            <button onclick="curtirPost(${post.id})">👍 Curtir (${post.curtidas})</button>
            <button onclick="mostrarRespostas(${post.id})">💬 Responder</button>
            <button onclick="apagarPost(${post.id})">🗑️ Apagar</button>
            <div class="respostas" id="respostas-${post.id}" style="display: none;">
                <input type="text" id="autor-resposta-${post.id}" placeholder="Seu nome">
                <input type="text" id="resposta-${post.id}" placeholder="Digite sua resposta...">
                <button onclick="responderPost(${post.id})">Enviar</button>
                <div id="lista-respostas-${post.id}"></div>
            </div>
        `;
        listaPosts.appendChild(div);
        carregarRespostas(post.id);
    });
}

function apagarPost(id) {
    if (!confirm("Tem certeza que deseja apagar este post?")) {
        return;
    }

    let posts = JSON.parse(localStorage.getItem("posts")) || [];
    posts = posts.filter(post => post.id !== id);
    localStorage.setItem("posts", JSON.stringify(posts));
    carregarPosts();
}
