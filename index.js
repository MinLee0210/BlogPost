const express = require('express')
const app = new express()
const path = require('path')
const ejs = require('ejs')
const moment = require('moment')
const fileUpload = require('express-fileupload')

app.set('view engine', 'ejs')

const bodyParser = require('body-parser')

app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json({ type: 'application/json' }))
app.use(bodyParser.raw())
app.use(fileUpload())

const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/my_database', { useNewUrlParser: true })

const BlogPost = require('./app/models/BlogPost.js')

app.use(express.static(__dirname + '/public'))
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended:true}))

app.set('view engine', 'ejs')

app.listen(8080, () => {
    console.log("App listening on port 8080")
})

app.get('/', (request, response) => {
    //response.sendFile(path.resolve(__dirname, 'index.html'))
    BlogPost.find({}, function (error, posts) {
        console.log(posts);
        response.render('index', {
            blogposts: posts, 
            moment: moment
        });
    })
})

app.get('/about', (request, response) => {
    //response.sendFile(path.resolve(__dirname, 'about.html'))
    response.render('about')
})

app.get('/contact', (request, response) => {
    //response.sendFile(path.resolve(__dirname, 'contact.html'))
    response.render('contact')
})

app.get('/post', (request, response) => {
    //response.sendFile(path.resolve(__dirname, 'post.html'))
    response.render('post')
})

app.get('/post/:id', (req, res) => {
    BlogPost.findById(req.params.id, function(error, detailPost){
        res.render('post', {
            detailPost
        })
    })
})

app.get('/posts/new', (req, res) => {
    res.render('create')
})

app.post('/posts/store', (req, res) => {
    // console.log(req.body)
    // res.redirect('/')
    let image = req.files.image
    image.mv(path.resolve(__dirname, 'public/upload', image.name), function(err){
        BlogPost.create({...req.body, 
            image: '/upload/' + image.name}, 
            function(err){
            res.redirect('/')
        })
    })
})

// app.get('/', (request, response) => {
//     BlogPost.find({}, function (error, posts) {
//         console.log(posts);
//         response.render('index', {
//             blogposts: posts
//         });
//     })
// })
