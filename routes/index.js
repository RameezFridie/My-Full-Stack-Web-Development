// Calling required modules
const express = require('express');
const router = express.Router();
const fs = require('fs')
const bodyParser = require('body-parser')
const helmet = require('helmet')
const fetch = require('node-fetch')

// Calling or writing to required json files
var favMusic = require(__dirname + '/favoritesMusic.json')
var favBooks = require(__dirname + '/favoritesBooks.json')

// Implementing modules
const app = express()
app.use(bodyParser.json())
app.use(express.json())
app.use(helmet())


// GET request that uses search parameters to get required info
router.get('/music', (req, res) => {
    // res.send('Hello World')
    fetch(`https://itunes.apple.com/search?term=${encodeURIComponent(req.query.search)}&limit=10&entity=song`)
        .then(function(res) {
            return res.json()
        })
        .then(function(data) {
            // console.log(JSON.stringify(data))
            res.send(JSON.stringify(data.results))
        })
    console.log(res)
})

// Post request to write data that is displayed to a favorites page as well as to corresponding json files
router.post('/favoritesMusic', (req, res) => {
    console.log('access')
    favMusic.push(req.body)
    fs.writeFile(__dirname + 'favoritesMusic.json', JSON.stringify(favMusic), (err) => {
        if (err) {
            console.log("not working", err)
        } else {
            console.log("yeah")
        }
    })
})

// GET request to display favored items
router.get('/favoritesMusic', (req, res) => {
    fs.readFile(__dirname + '/favoritesBooks.json', (err, data) => {
        if (err) {
            console.log('cant read')
        } else {
            res.send(favMusic)
        }
    })
})

// Delete request to remove items from item list and from json file
router.delete('/favoritesMusic', (req, res) => {
    console.log('access')
    favMusic = favMusic.filter((i) => {
        return i.id != req.body.deleted
    })
    fs.writeFile(__dirname + 'favoritesMusic.json', JSON.stringify(favMusic), (err) => {
        if (err) {
            console.log("not working", err)
        } else {
            console.log("yeah")
        }
    })
})



// GET request that uses search parameters to get required info
router.get('/book', (req, res) => {
    // res.send('Hello World')
    fetch(`https://itunes.apple.com/search?term=${encodeURIComponent(req.query.search)}&limit=10&entity=ebook`)
        .then(function(res) {
            return res.json()
        })
        .then(function(data) {
            // console.log(JSON.stringify(data))
            res.send(JSON.stringify(data.results))
        })
})

// Post request to write data that is displayed to a favorites page as well as to corresponding json files
router.post('/favoritesBooks', (req, res) => {

        favBooks.push(req.body)
        fs.writeFile(__dirname + 'favoritesBooks.json', JSON.stringify(favBooks), (err) => {
            if (err) {
                console.log("not working", err)
            } else {
                console.log("yeah")
            }
        })
    })
    // GET request to display favored items
router.get('/favoritesBooks', (req, res) => {
        fs.readFile(__dirname + '/favoritesBooks.json', (err, data) => {
            if (err) {
                console.log('cant read')
            } else {
                res.send(favBooks)
            }
        })
    })
    // Delete request to remove items from item list and from json file
router.delete('/favoritesBooks', (req, res) => {
        console.log('access')
        favBooks = favBooks.filter((i) => {
            return i.id != req.body.deleted
        })
        fs.writeFile(__dirname + 'favoritesBooks.json', JSON.stringify(favBooks), (err) => {
            if (err) {
                console.log("not working", err)
            } else {
                console.log("yeah")
            }
        })
    })
    // export results via express
module.exports = router;