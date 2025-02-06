document.addEventListener("DOMContentLoaded", function () {
    loadPosts();
});

// Função para criar um novo post
function submitPost() {
    const userName = document.getElementById("user-name").value.trim();
    const postContent = document.getElementById("new-post").value.trim();
    
    if (userName === "" || postContent === "") {
        alert("Por favor, preencha todos os campos!");
        return;
    }

    const postId = Date.now();
    const postHTML = `
        <div class="card post-card" id="post-${postId}">
            <div class="card-body">
                <div class="post-header">
                    <h5 class="card-title">${userName}</h5>
                    <div class="post-actions">
                        <button onclick="likePost(${postId})" class="like-button"><i class="bi bi-heart"></i></button>
                        <button onclick="deletePost(${postId})"><i class="bi bi-trash text-danger"></i></button>
                    </div>
                </div>
                <p class="card-text">${postContent}</p>
                <button onclick="showReplyForm(${postId})" class="btn btn-link">Responder</button>
                <div class="replies" id="replies-${postId}"></div>
                <div id="reply-form-${postId}" style="display: none;">
                    <input type="text" id="reply-user-${postId}" class="form-control mt-2" placeholder="Seu nome">
                    <textarea id="reply-text-${postId}" class="form-control mt-2" placeholder="Escreva sua resposta..."></textarea>
                    <button onclick="submitReply(${postId})" class="btn btn-primary btn-sm mt-2">Enviar</button>
                </div>
            </div>
        </div>
    `;

    document.getElementById("posts-section").innerHTML += postHTML;
    document.getElementById("new-post").value = "";
    document.getElementById("user-name").value = "";
}

// Função para exibir o formulário de resposta
function showReplyForm(postId) {
    document.getElementById(`reply-form-${postId}`).style.display = "block";
}

// Função para responder a um post
function submitReply(postId) {
    const userName = document.getElementById(`reply-user-${postId}`).value.trim();
    const replyText = document.getElementById(`reply-text-${postId}`).value.trim();

    if (userName === "" || replyText === "") {
        alert("Preencha todos os campos para responder!");
        return;
    }

    const replyHTML = `
        <div class="card reply-card">
            <div class="card-body">
                <h6 class="card-title">${userName}</h6>
                <p class="card-text">${replyText}</p>
            </div>
        </div>
    `;

    document.getElementById(`replies-${postId}`).innerHTML += replyHTML;
    document.getElementById(`reply-form-${postId}`).style.display = "none";
}

// Função para curtir um post
function likePost(postId) {
    const likeButton = document.querySelector(`#post-${postId} .like-button`);
    likeButton.classList.toggle("liked");
}

// Função para deletar um post
function deletePost(postId) {
    document.getElementById(`post-${postId}`).remove();
}
