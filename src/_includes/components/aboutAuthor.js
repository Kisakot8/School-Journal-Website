const {html} = require('common-tags');

function aboutAuthor(name, bio, displayed) {
    displayed = displayed.flatMap(item=>
        item.members.map(member=>member.name)
    );

    if (displayed.includes(name)) {
        return '';
    }

    return html`
    <li class="about-author">
        <span class="author-name"> ${name} - </span>
        <span class="author-bio"> ${bio} </span>
    </li>
    `
}

module.exports = aboutAuthor;
