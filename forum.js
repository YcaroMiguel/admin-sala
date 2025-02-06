document.addEventListener("DOMContentLoaded", carregarPosts);

function publicarPost() {
    let autor = document.getElementById("autor").value.trim();
    let mensagem = document.getElementById("mensagem").value.trim();

    if (autor === "" || mensagem === "") {
        alert("Por favor, preencha todos os campos!");
        return;
    }

    let post = { autor, mensagem, data: new Date().toLocaleString() };
    let posts = JSON.parse(localStorage.getItem("posts")) || [];
    
    posts.unshift(post); // Adiciona o novo post no topo
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
        `;
        listaPosts.appendChild(div);
    });
}
