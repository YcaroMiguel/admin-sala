document.addEventListener("DOMContentLoaded", function () {
    loadPosts();
});

// Array para armazenar posts
let posts = JSON.parse(localStorage.getItem("posts")) || [];

// Criar um post
function submitPost() {
    const userName = document.getElementById("user-name").value.trim();
    const postContent = document.getElementById("new-post").value.trim();
    const mediaUpload = document.getElementById("media-upload").files[0];

    if (userName === "" || (postContent === "" && !mediaUpload)) {
        alert("Preencha o texto ou envie uma mídia!");
        return;
    }

    const postId = Date.now();
    let mediaElement = "";

    if (mediaUpload) {
        const mediaURL = URL.createObjectURL(mediaUpload);
        if (mediaUpload.type.startsWith("image")) {
            mediaElement = `<img src="${mediaURL}" class="media-content img-fluid rounded">`;
        } else if (mediaUpload.type.startsWith("video")) {
            mediaElement = `<video controls class="media-content" width="100%"><source src="${mediaURL}" type="${mediaUpload.type}"></video>`;
        } else if (mediaUpload.type.startsWith("audio")) {
            mediaElement = `<audio controls class="media-content"><source src="${mediaURL}" type="${mediaUpload.type}"></audio>`;
        }
    }

    const newPost = {
        id: postId,
        user: userName,
        content: postContent,
        media: mediaElement,
        likes: 0
    };

    posts.push(newPost);
    localStorage.setItem("posts", JSON.stringify(posts));

    renderPosts();
    
    document.getElementById("new-post").value = "";
    document.getElementById("user-name").value = "";
    document.getElementById("media-upload").value = "";
}

// Carregar posts salvos
function loadPosts() {
    renderPosts();
}

// Renderizar posts na tela
function renderPosts() {
    const postsSection = document.getElementById("posts-section");
    postsSection.innerHTML = "";

    posts.forEach(post => {
        const postHTML = `
            <div class="card post-card" id="post-${post.id}">
                <div class="card-body">
                    <div class="post-header">
                        <h5 class="card-title">${post.user}</h5>
                        <div class="post-actions">
                            <button onclick="editPost(${post.id})"><i class="bi bi-pencil text-warning"></i></button>
                            <button onclick="likePost(${post.id})" class="like-button"><i class="bi bi-heart"></i> ${post.likes}</button>
                            <button onclick="deletePost(${post.id})"><i class="bi bi-trash text-danger"></i></button>
                            <button onclick="sharePost(${post.id})"><i class="bi bi-share"></i></button>
                        </div>
                    </div>
                    <p class="card-text" id="content-${post.id}">${post.content}</p>
                    ${post.media}
                    <button onclick="showReplyForm(${post.id})" class="btn btn-link">Responder</button>
                    <div class="replies" id="replies-${post.id}"></div>
                    <div id="reply-form-${post.id}" style="display: none;">
                        <input type="text" id="reply-user-${post.id}" class="form-control mt-2" placeholder="Seu nome">
                        <textarea id="reply-text-${post.id}" class="form-control mt-2" placeholder="Escreva sua resposta..."></textarea>
                        <button onclick="submitReply(${post.id})" class="btn btn-primary btn-sm mt-2">Enviar</button>
                    </div>
                </div>
            </div>
        `;
        postsSection.innerHTML += postHTML;
    });
}

// Excluir post
function deletePost(postId) {
    posts = posts.filter(post => post.id !== postId);
    localStorage.setItem("posts", JSON.stringify(posts));
    renderPosts();
}

// Curtir post
function likePost(postId) {
    posts = posts.map(post => {
        if (post.id === postId) {
            post.likes += 1;
        }
        return post;
    });
    localStorage.setItem("posts", JSON.stringify(posts));
    renderPosts();
}

// Editar post
function editPost(postId) {
    const newContent = prompt("Edite seu post:");
    if (newContent) {
        posts = posts.map(post => {
            if (post.id === postId) {
                post.content = newContent;
            }
            return post;
        });
        localStorage.setItem("posts", JSON.stringify(posts));
        renderPosts();
    }
}

// Compartilhar post (apenas exibe um alerta por enquanto)
function sharePost(postId) {
    alert("Post compartilhado!");
}