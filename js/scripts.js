document.getElementById('new-news').addEventListener('change', function () {
    const newsGrid = document.getElementById('grid')
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
                        if (item.multimedia && item.multimedia.length > 0 && item.multimedia[0].url) {
                            return true;
                        } else {
                            return false;
                        }

                    }
                )
                .slice(0, 12);

            //console.log(articalsWithImage)


            //create artical images 
            for (let i = 0; i < articalsWithImage.length; i++) {
                console.log(articalsWithImage[i].abstract, articalsWithImage[i].url, articalsWithImage[i].multimedia[0].url);


                const abstract = document.createElement('p').classList.add('abstractstyle');
                abstract.innerHTML = articalsWithImage[i].abstract;

                const url = document.createElement('a').classList.add('urllink');
                url.innerHTML = articalsWithImage[i].url;

                const articalBox = document.createElement('li').classList.add('box');
                articalBox.innerHTML = articalsWithImage[i].multimedia[0].url;
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


