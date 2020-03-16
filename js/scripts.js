const loader = document.getElementById('loader');

document.getElementById('new-news').addEventListener('change', function () {
    const newsGrid = document.getElementById('newsgrid')
    console.log('change');
    const selectedCategory = this.value;
    loader.classList.toggle('show');

    //  make call to nyt 
    $.ajax({
        method: 'GET',
        url: `https://api.nytimes.com/svc/topstories/v2/${selectedCategory}.json?api-key=hWGg3WoqqktQszTelrmzz2nbkvre4mH9`
    })
        .done(function (data) {
            //console.log(data)

            //filter out articals without images  
            //limit articals to 12 
            const articalsFromNyt = data.results
                .filter(
                    function (item) {
                        if (item.multimedia && item.multimedia.length > 0 && item.multimedia[3].url) {
                            return true;
                        } else {
                            return false;
                        }
                    }
                )
                .slice(0, 12);

            //console.log(articalsFromNyt)

            console.log(articalsFromNyt);

            while (newsGrid.lastChild) {
                newsGrid.removeChild(newsGrid.lastChild);
            }
            //create artical images articalbox
            for (let i = 0; i < articalsFromNyt.length; i++) {
                console.log(articalsFromNyt[i].abstract), (articalsFromNyt[i].url), (articalsFromNyt[i].multimedia[3].url);


                const articleImage = document.createElement('div');
                articleImage.classList.add('articalimage');
                articleImage.style = 'background-image:url(' + articalsFromNyt[i].multimedia[3].url + ')';


                const abstract = document.createElement('p');
                abstract.classList.add('abstractstyle');
                abstract.innerHTML = articalsFromNyt[i].abstract;

                articleImage.appendChild(abstract);

                const articleLink = document.createElement('a');
                articleLink.classList.add('urllink');
                articleLink.href = articalsFromNyt[i].url;

                articleLink.appendChild(articleImage);

                const articalBox = document.createElement('li');
                articalBox.classList.add('articalbox');

                articalBox.appendChild(articleLink);

                newsGrid.appendChild(articalBox);
            }
            //create paragraph element for article abstract\
            // create A element for url
            //create li with a background image 
            loader.classList.toggle('show');






        });


});




