document.addEventListener("DOMContentLoaded", carregarPosts);

function publicarPost() {
    let autor = document.getElementById("autor").value.trim();
    let mensagem = document.getElementById("mensagem").value.trim();

    if (autor === "" || mensagem === "") {
        alert("Por favor, preencha todos os campos!");
        return;
    }

    let post = {
        id: Date.now(), // Identificador único
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
            <div class="respostas" id="respostas-${post.id}" style="display: none;">
                <input type="text" id="resposta-${post.id}" placeholder="Digite sua resposta...">
                <button onclick="responderPost(${post.id})">Enviar</button>
                <div id="lista-respostas-${post.id}"></div>
            </div>
        `;
        listaPosts.appendChild(div);
        carregarRespostas(post.id);
    });
}

function curtirPost(id) {
    let posts = JSON.parse(localStorage.getItem("posts")) || [];
    let post = posts.find(p => p.id === id);
    if (post) {
        post.curtidas++;
        localStorage.setItem("posts", JSON.stringify(posts));
        carregarPosts();
    }
}

function mostrarRespostas(id) {
    let respostaDiv = document.getElementById(`respostas-${id}`);
    respostaDiv.style.display = respostaDiv.style.display === "none" ? "block" : "none";
}

function responderPost(id) {
    let respostaInput = document.getElementById(`resposta-${id}`);
    let respostaTexto = respostaInput.value.trim();

    if (respostaTexto === "") {
        alert("Digite uma resposta válida!");
        return;
    }

    let posts = JSON.parse(localStorage.getItem("posts")) || [];
    let post = posts.find(p => p.id === id);

    if (post) {
        post.respostas.push({
            autor: "Anônimo",
            mensagem: respostaTexto,
            data: new Date().toLocaleString()
        });

        localStorage.setItem("posts", JSON.stringify(posts));
        respostaInput.value = "";
        carregarRespostas(id);
    }
}

function carregarRespostas(id) {
    let posts = JSON.parse(localStorage.getItem("posts")) || [];
    let post = posts.find(p => p.id === id);

    if (post) {
        let listaRespostas = document.getElementById(`lista-respostas-${id}`);
        listaRespostas.innerHTML = "";

        post.respostas.forEach(resp => {
            let div = document.createElement("div");
            div.classList.add("resposta");
            div.innerHTML = `<strong>${resp.autor}:</strong> ${resp.mensagem} <small>(${resp.data})</small>`;
            listaRespostas.appendChild(div);
        });
    }
}

function exportarPosts() {
    let posts = JSON.parse(localStorage.getItem("posts")) || [];
    let blob = new Blob([JSON.stringify(posts, null, 2)], { type: "application/json" });
    let a = document.createElement("a");
    a.href = URL.createObjectURL(blob);
    a.download = "forum_posts.json";
    a.click();
}
