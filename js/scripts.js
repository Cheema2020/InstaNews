document.getElementById('new-news').addEventListener('change', function () {
    const newsGrid = document.getElementById('newsgrid')
    console.log('change')
    const selectedCategory = this.value;

    //  make call to nyt 
    $.ajax({
        method: 'GET',
        url: `https://api.nytimes.com/svc/topstories/v2/${selectedCategory}.json?api-key=hWGg3WoqqktQszTelrmzz2nbkvre4mH9`
    })
        .done(function (data) {
            //console.log(data)

            //filter out articals without images  
            //limit articals to 12 
            const articalsWithImage = data.results
                .filter(
                    function (item) {
                        if (item.multimedia && item.multimedia.length > 0 && item.multimedia[2].url) {
                            return true;
                        } else {
                            return false;
                        }
                    }
                )
                .slice(0, 12);

            //console.log(articalsWithImage)


            //create artical images articalbox
            for (let i = 0; i < articalsWithImage.length; i++) {
                console.log(articalsWithImage[i].abstract), (articalsWithImage[i].url), (articalsWithImage[i].multimedia[2].url);
                console.log(articalsWithImage);

                const articleImage = document.createElement('div');
                articleImage.classList.add('articalimage');
                articleImage.style = 'background-image:url(' + articalsWithImage[i].multimedia[2].url + ')';


                const abstract = document.createElement('p');
                abstract.classList.add('abstractstyle');
                abstract.innerHTML = articalsWithImage[i].abstract;

                const articleLink = document.createElement('a');
                articleLink.classList.add('urllink');
                articleLink.href = articalsWithImage[i].url;

                articleLink.appendChild(articleImage);
                articleLink.appendChild(abstract);

                const articalBox = document.createElement('li');
                articalBox.classList.add('articalbox');

                articalBox.appendChild(articleLink);

                newsGrid.appendChild(articalBox);
            }
            //create paragraph element for article abstract\
            // create A element for url
            //create li with a background image 










            // function myFunction('display-grid') {
            //     var x = document.createElement('IMG');
            //     x.setAttribute('url');
            //     x.setAttribute('image');
            //     x.setAttribute('articals');
            //     document.body.appendChild(x);
            //}







        });


    /*
    if (data.results.length > 0) {
        const articleWithImagesArray = data.results.filter(item => item.multimedia && item.)
    };
    */


});

 // $('display-grid').append('div');

        //results.innerHTML = (event.target.value);

//"section":"arts",


