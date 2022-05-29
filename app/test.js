const mongoose = require('mongoose')
const BlogPost = require('./models/BlogPost')

mongoose.connect('mongodb://localhost:27017/my_database', {useNewUrlParser: true})

BlogPost.create({
    title:'Đây là sách dạy học lập trình Node.js từ cơ bản', 
    body:'Nếu bạn đam mê với Javascript và muốn khám phá cách xây dựng ứng dụng với Node.js thì đây là cuốn sách dành cho bạn.'
}, (err, blogpost) => {
    console.log(err, blogpost)
})

BlogPost.find({}, (err, blogpost) => {
    console.log(err, blogpost)
})