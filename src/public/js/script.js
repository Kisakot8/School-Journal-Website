const articlesContainer = document.querySelector('.articles-container');

document.addEventListener('DOMContentLoaded', init);


function init() {
    for (let i = 0; i < articleCount; i++) {
        articleConstructor(i);
    }
}


function articleConstructor(index) {
    const articleDiv = document.createElement('div');
    articleDiv.className = 'article-card';

    const thumbnailContainer = document.createElement('div');
    thumbnailContainer.className = 'article-thumbnail-container';

    const thumbnail = document.createElement('img');
    thumbnail.className = 'article-thumbnail';
    thumbnail.src = `./articles/${index+1}/thumbnail.webp`;

    const title = document.createElement('h2');
    title.className = 'article-title';
    title.textContent = titles[index];

    const author = document.createElement('h4');
    author.className = 'article-author';
    author.textContent = `By ${authors[index]}`;

    thumbnailContainer.appendChild(thumbnail);

    articleDiv.appendChild(thumbnailContainer);
    articleDiv.appendChild(title);
    articleDiv.appendChild(author);

    articlesContainer.appendChild(articleDiv);
}