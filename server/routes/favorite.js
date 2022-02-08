const express = require('express');
const router = express.Router();
//import 
const {Favorite } = require('../models/Favorite');


router.post('/favoriteNumber', (req, res) => {

    //req.body.movieId 
    //mongodb에서 favorite 숫자를 가져오기
    Favorite.find({ "movieId" : req.body.movieId})
        .exec((err, info) => {
            if(err) return res.status(400).send(err)
            res.status(200).json({ success: true, favoriteNumber: info.length })
        })
    //그다음에 프론트에 다시 숫자 정보를 보내주기

})



router.post('/favorited', (req, res) => {

    //내가  이 영화를 favorite리스트에 넣었는지 정보를 db에서 가져왐
    Favorite.find({ "movieId" : req.body.movieId, "userFrom": req.body.userFrom}) 
        .exec((err, info) => {
            if(err) return res.status(400).send(err)

            let result = false;
            if(info.length !== 0) {
                result=true
            }

            res.status(200).json({ success: true, favorited : result })
        })
    //그다음에 프론트에 다시 숫자 정보를 보내주기

})





router.post('/removeFromFavorite', (req, res) => {

    Favorite.findOneAndDelete({ movieId: req.body.movieId, userFrom: req.body.userFrom })
        .exec((err, doc) => {
            if (err) return res.status(400).send(err)
            res.status(200).json({ success: true, doc })
        })

})

router.post('/addToFavorite', (req, res) => {

    const favorite = new Favorite(req.body)

    favorite.save((err, doc) => {
        if (err) return res.status(400).send(err)
        return res.status(200).json({ success: true })
    })

})
module.exports = router;