
export default displayModal= (year) => {
    switch (year) {
        case '1977' :
            return({
                selectedText: 'Title of the movie is \'Star Wars\' and  its release year is \'1977\'. Star Wars is an American epic space opera media franchise, centered on a film series created by George Lucas. It depicts the adventures of various characters "a long time ago in a galaxy far, far away".\n'
                , address: 'https://lumiere-a.akamaihd.net/v1/images/the-last-jedi-theatrical-poster-film-page_bca06283.jpeg?region=0%2C0%2C480%2C711'
            });

        case '1985':
            return({
                selectedText: 'Title of the movie is \'Back to the Future\' and  its release year is \'1985\'. Back to the Future is a 1985 American science-fiction adventure comedy film[6] directed by Robert Zemeckis and written by Zemeckis and Bob Gale. It stars Michael J. Fox as teenager Marty McFly, who is sent back in time to 1955, where he meets his future parents in high school and accidentally becomes his mother\'s romantic interest.'
                , address: 'https://upload.wikimedia.org/wikipedia/en/d/d2/Back_to_the_Future.jpg'
            });

        case '1999':
            return({
                selectedText: 'Title of the movie is \'The Marix\' and  its release year is \'1999\'. Thomas, a computer programmer, is led to fight an underground war against powerful computers who now rule the world with a system called \'The Matrix\'.'
                , address: 'https://upload.wikimedia.org/wikipedia/en/thumb/c/c1/The_Matrix_Poster.jpg/220px-The_Matrix_Poster.jpg'
            });

        case '2010':
            return({
                selectedText: 'Title of the movie is \'Inception\' and  its release year is \'2010\'. Cobb steals information from his targets by entering their dreams. He is wanted for his alleged role in his wife\'s murder and his only chance at redemption is to perform the impossible, an inception.'
                , address: 'https://www.warnerbros.com/sites/default/files/styles/key_art_270x400/public/inception_keyart.jpg?itok=7jXiglyb'
            });

        case '2014':
            return({
                selectedText: 'Title of the movie is \'Interstellar\' and  its release year is \'2014\'. In the future, Earth is slowly becoming uninhabitable. Ex-NASA pilot Cooper, along with a team of researchers, is sent on a planet exploration mission to report which planet can sustain life.'
                , address: 'https://upload.wikimedia.org/wikipedia/en/b/bc/Interstellar_film_poster.jpg'
            });
            
    }
}