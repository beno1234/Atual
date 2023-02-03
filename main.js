document.getElementById("abrirPopup").addEventListener("click", function () {
    document.getElementById("popup").style.display = "block";
});

document.addEventListener('DOMContentLoaded', function () {
    fetch('http://127.0.0.1:9000/api/getArticle?id=1')
        .then(function (response) {
            return response.json();
        })
        .then(function (data) {
            const editor = document.querySelector('.editor');
            editor.innerHTML = data.content;
        });
});


function getArticle() {
    const xhr = new XMLHttpRequest();
    xhr.open("GET", "http://127.0.0.1:9000/api/getArticle?id=1", true);
    xhr.onreadystatechange = function () {
        if (xhr.readyState === XMLHttpRequest.DONE && xhr.status === 200) {
            const articles = JSON.parse(xhr.responseText);
            let paragraphContent;
            articles.forEach(function (article) {
                if (article.type === "paragraph") {
                    paragraphContent = article.content;
                }
            });
            document.getElementById("paragrafo").innerHTML = paragraphContent;
            let titleContent;
            articles.forEach(function (article) {
                if (article.type === "title") {
                    titleContent = article.content;
                }
            });
            document.getElementById('title').innerHTML = titleContent;
            let imgContent;
            articles.forEach(function (article) {
                if (article.type === "img") {
                    titleContent = article.content;
                }
            });
            document.getElementById('img').innerHTML = imgContent;
        }
    };
    xhr.send()
}




window.onload = function () {
    getArticle();
};


let changesMade = false;
let articleContent;

document.getElementById("edit-article").addEventListener("change", function () {
    changesMade = true;
    articleContent = this.value;
});

setInterval(function () {
    if (changesMade) {
        sendChangesToServer(articleContent);
        changesMade = false;
    }
}, 5000);

function sendChangesToServer(content) {
    const xhr = new XMLHttpRequest();
    xhr.open("PUT", "http://127.0.0.1:9000/api/getArticle?id=1", true);
    xhr.setRequestHeader("Content-Type", "application/json");
    xhr.onreadystatechange = function () {
        if (xhr.readyState === XMLHttpRequest.DONE && xhr.status === 200) {
            console.log("Alterações enviadas com sucesso para o servidor");
        }
    };
    xhr.send(JSON.stringify({ content: content }));
}




