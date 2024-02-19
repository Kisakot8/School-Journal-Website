require('dotenv').config();
const EleventyFetch = require('@11ty/eleventy-fetch');

async function getIssues () {
    const PROJECT_ID = process.env.SANITY_ID;
    const DATASET = process.env.SANITY_DATASET;

    const QUERY = encodeURIComponent(`
*[_type == "issue"] {
    "number": number,
    "articles": *[_type == "article"] {
        "slug": slug.current,
        title,
        author->{
        name,
        nickname
        },
        "imageUrl": thumbnail.asset->url,
        "pdfUrl": articlePDF.asset->url,
        "tags": tags[]->name
    }
}
`
    );

    const URL = `https://${PROJECT_ID}.api.sanity.io/v2022-03-07/data/query/${DATASET}?query=${QUERY}`;

    const response = EleventyFetch(URL, {
        duration: "1d",
        type: "json"
    });

    const issues = response;
    return issues;
}

module.exports = getIssues;
