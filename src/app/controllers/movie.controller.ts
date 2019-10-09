var Movie = require('../models/movie.model');

exports.movie_create = function (req, res) {

    if (!req.query.title) {
        return res.status(500).json({ success: false, error: 'Title is mandatory.' });
    }

    var movie = new Movie(
        {
            title: req.query.title,
            description: req.query.description,
            shortDescription: req.query.shortDescription,
            duration: req.query.duration,
            releaseDate: req.query.releaseDate,
            imageCover: req.query.imageCover,
            imagePoster: req.query.imagePoster,
            genre: req.query.genre
        }
    );


    movie.save(function (err, movie) {

        if (err) {
            return res.status(500).json({ success: false, error: 'something error' });
        }

        res.send({ success: true, id: movie._id });
    })
};


exports.movie_details = function (req, res) {
    Movie.findById(req.params.id, function (err, movie) {

        if (!movie) {
            return res.status(503).json({ success: false, error: 'record not found' });
        }
        else if (err) {
            return res.status(500).json({ success: false, error: 'something error' });
        }

        res.send({ success: true, item: movie });
    })
};

exports.movies_page = (req,res) => {
    var pageno = parseInt(req.params.pageno)
    var size = parseInt(req.params.size)
    //console.log(req);

    if (pageno < 0 || pageno === 0) {
        return res.status(500).json({ success: false, error: 'invalid page number' });
    }

    var query = { sort: '_id:1' ,skip: size * (pageno - 1), limit: size };
   
    Movie.count({}, function(err,totalCount) {
       
        if (err) {
            return res.status(500).json({ success: false, error: 'count error' });
        }

        Movie.find({}, {}, query, function(err,data) {
            
            if (err) {
                return res.status(500).json({ success: false, error: 'error on retrieve' });
            }

            var totalPages = Math.ceil(totalCount / size);

            res.send({ success: true, pages: totalPages, items: data});
        });
    })

};

exports.movie_update = function (req, res) {
    Movie.findByIdAndUpdate(req.params.id, { $set: req.query }, function (err, movie) {

        if (!movie) {
            return res.status(503).json({ success: false, error: 'record not found' });
        }
        else if (err) {
            return res.status(500).json({ success: false, error: 'something error' });
        }

        res.send({ success: true, message: 'movie updated' });
    });
};

exports.movie_delete = function (req, res) {
    Movie.findByIdAndRemove(req.params.id, function (err, movie) {

        if (!movie) {
            return res.status(503).json({ success: false, error: 'record not found' });
        }
        else if (err) {
            return res.status(500).json({ success: false, error: 'something error' });
        }

        res.send({ success: true, message: 'deleted successfully' });
    })
};
