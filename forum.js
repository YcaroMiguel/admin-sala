document.addEventListener("DOMContentLoaded", function () {
    loadPosts();
});

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

    const postHTML = `
        <div class="card post-card" id="post-${postId}">
            <div class="card-body">
                <div class="post-header">
                    <h5 class="card-title">${userName}</h5>
                    <div class="post-actions">
                        <button onclick="editPost(${postId})"><i class="bi bi-pencil text-warning"></i></button>
                        <button onclick="likePost(${postId})" class="like-button"><i class="bi bi-heart"></i></button>
                        <button onclick="deletePost(${postId})"><i class="bi bi-trash text-danger"></i></button>
                        <button onclick="sharePost(${postId})"><i class="bi bi-share"></i></button>
                    </div>
                </div>
                <p class="card-text" id="content-${postId}">${postContent}</p>
                ${mediaElement}
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
    document.getElementById("media-upload").value = "";
}

// As funções de responder, curtir, editar, excluir e compartilhar continuam as mesmas do código anterior.
