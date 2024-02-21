// #region select-all

$('#issue-selector-all').click(function(event) {   
    if(this.checked) {
        $('.issue-checkbox').each(function() {
            this.checked = true;                        
        });
    } else {
        $('.issue-checkbox').each(function() {
            this.checked = false;                       
        });
    }
});


$('#author-selector-all').click(function(event) {   
    if(this.checked) {
        $('.author-checkbox').each(function() {
            this.checked = true;                        
        });
    } else {
        $('.author-checkbox').each(function() {
            this.checked = false;                       
        });
    }
});


$('#tag-selector-all').click(function(event) {   
    if(this.checked) {
        $('.tag-checkbox').each(function() {
            this.checked = true;                        
        });
    } else {
        $('.tag-checkbox').each(function() {
            this.checked = false;                       
        });
    }
});

// #endregion

// #region text-cycle

let cycleActive = true;

const shuffle = (array) => { 
    return array.sort(() => Math.random() - 0.5); 
}; 

const CYCLE_INTERVAL = 3000; // in ms

let cycleItems = shuffle(Array.from(document.getElementsByClassName('cycle-item')));
cycleIndex = 0;

let cycleItem = cycleItems[cycleIndex];

const cycle = setInterval(() => {
    cycleItem.classList.remove('cycle-item-appearing', 'cycle-item-disappearing');
    cycleItem = cycleItems[cycleIndex];

    // Assign random color to the item
    if (!cycleItem.style.color) {
    cycleItem.style.color = '#'+Math.floor(Math.random()*16777215).toString(16);
    }

    cycleItem.classList.add('cycle-item-appearing');

    setTimeout(() => {
        cycleItem.classList.add('cycle-item-disappearing');
    }, CYCLE_INTERVAL/2);

    if (cycleIndex === cycleItems.length-1) {
        cycleIndex = 0;
    } else {
        cycleIndex += 1;
    }
}, CYCLE_INTERVAL);

// #endregion

// #region search

function search (issues) {
    // Get issues using Eleventy's data cascade instead of import from getIssues module so
    // additional API calls aren't made, as data cascade fetches from cache.
    issues = JSON.parse(issues);

    // Clear the default text and cycling JS if currently active
    if (cycleActive) {
        document.getElementById('default-text').style.display = 'none';
        clearInterval(cycle);
    }

    // Create arrays of filters applied of issues, authors and tags selected
    let issueCheckboxes = document.getElementsByClassName('issue-checkbox');
    let authorCheckboxes = document.getElementsByClassName('author-checkbox');
    let tagCheckboxes = document.getElementsByClassName('tag-checkbox');

    let issueFilters = [];
    let authorFilters = [];
    let tagFilters = [];

    for (let index = 0; index < issueCheckboxes.length; index++) {
        const issue = issueCheckboxes[index];
        
        if (issue.checked) {
            issueFilters.push(parseInt(issue.dataset.issue));
        }
    }

    for (let index = 0; index < authorCheckboxes.length; index++) {
        const author = authorCheckboxes[index];
        
        if (author.checked) {
            authorFilters.push(author.dataset.author);
        }
    }

    for (let index = 0; index < tagCheckboxes.length; index++) {
        const tag = tagCheckboxes[index];
        
        if (tag.checked) {
            tagFilters.push(tag.dataset.tag);
        }
    }


    // Goes through every issue and checks if the issue number is selected, in which case the
    // articles in the issue are added to the selectedArticles list.
    let selectedArticles = [];

    for (let index = 0; index < issues.length; index++) {
        const issue = issues[index];

        if ( issueFilters.includes(issue.number) ) {
            selectedArticles.push(...issue.articles);
        }
    }


    // Goes through every article in selectedArticles and adds any matching filters to final array
    finalArticles = [];

    for (let index = 0; index < selectedArticles.length; index++) {
        const article = selectedArticles[index];
        
        // Sees if any tags are both in the article's tags and the selected tags
        let tagIntersection = article.tags.filter(x => tagFilters.includes(x));

        // Checks if intersection isn't empty and author is selected. If both are true, article is
        // added to finalArticles
        if (
            tagIntersection.length !== 0 &&
            authorFilters.includes(article.author.slug)
        ) {
            finalArticles.push(article);
        }
    }

    console.log(finalArticles)
}

//#endregion
