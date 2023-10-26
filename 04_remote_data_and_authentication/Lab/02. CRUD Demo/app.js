const list = document.getElementById('comments');

init();

function init() {
    document.getElementById('load').addEventListener('click', getComments);
    document.getElementById('comment-form').addEventListener('submit', onPost);
    list.addEventListener('click', onCommentClick);
    
    getComments();
}

async function onPost(event) {
    event.preventDefault();
    const formData = new FormData(event.target);
    
    const {name, content} = Object.fromEntries(formData.entries());
    
    const result = await postComment({ name, content });
    list.prepend(createCommentCard(result));
}

function displayComments(comments) {
    
    list.replaceChildren(...comments.map(createCommentCard));
}

function createCommentCard(comment) {
    const userId = sessionStorage.getItem('userId');
    
    const element = document.createElement('article');
    element.innerHTML = `<header><h3>${comment.author.username}</h3></header>
    <main><p>${comment.content}</p>`;
    
    if (comment._ownerId == userId) {
        element.innerHTML += '<button>Delete</button></main>';
    }
    
    element.id = comment._id;
    
    return element;
}

async function getComments() {
    
    const response = await fetch(
      "http://localhost:3030/data/comments?load=author%3D_ownerId%3Ausers"
    );
    const data = await response.json();
    
    // console.log(data);
    
    const comments = Object.values(data).reverse();
    displayComments(comments);
}

async function postComment(comment) {
    const token = sessionStorage.getItem('accessToken');
    
    const response = await fetch("http://localhost:3030/data/comments", {
        method: 'post',
        headers: {
            'Content-Type': 'application/json',
            'X-Authorization': token
        },
        body: JSON.stringify(comment)
    });
    
    const data = await response.json();
    
    return data;
    
}

function onCommentClick(ev) {
    if (ev.target.tagName == 'BUTTON') {
        const choice = confirm('Are you sure you want to delete this comment?');
        if (choice) {
            const commentId = ev.target.parentElement.parentElement.id;
            deleteComment(commentId);
        }
    }
}

async function deleteComment(id) {
    const token = sessionStorage.getItem('accessToken');
    

    await fetch('http://localhost:3030/data/comment/' + id, {
        method: 'delete',
        headers: {
            'X-Authorization': token
        }
    });
    document.getElementById(id).remove();
}

async function updateComment(id, comment) {
    const response = await fetch('http://localhost:3030/jsonstore/comment/' + id, {
        method: 'put',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(comment)
    });
    return response.json();
}