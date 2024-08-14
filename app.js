// // Gather information about the database
// const mongoose =require('mongoose');
// const USER_NAME='mit-user';
// const PASSWORD='mituser';
// const DB_NAME='merndb';

// const dbURI=`mongodb+srv:// ${USER_NAME}:${PASSWORD}@cluster0.7jkg4.mongodb.net/merndb?retryWrites=true&w=majority&appName=Cluster0`

// const promiseObj= mongoose.connect(dbURI);
// console.log("Post connecting to the DB");

// promiseObj
//    .then((result) =>{
//     console.log("Connected to the DB");
//    })
//    .catch((err) =>{
//     console.log(err)
//    });

//    mongoose.connection.close();    //connection band krta h

// Gather information about the database
// const mongoose = require("mongoose");
// const Schema = mongoose.Schema;      //used to make schema   
// const USER_NAME = "mit-user";
// const PASSWORD = "mituser";
// const DB_NAME = "merndb";

// Corrected connection string without whitespace
// const dbURI = `mongodb+srv://${USER_NAME}:${PASSWORD}@cluster0.7jkg4.mongodb.net/${DB_NAME}?retryWrites=true&w=majority&appName=Cluster0`;

// Connect to the database
// mongoose
//   .connect(dbURI)
//   .then(() => {
//     console.log("Connected to the DB");

    // Place your database operations here

    //    // Close the connection after the operations are done
    //    mongoose.connection.close(() => {
    //        console.log("Connection closed");
    //    });
//   })
//   .catch((err) => {
//     console.error("Error connecting to the database:", err);
//   });

// const blogPostSchema = new Schema(           // This is Schema
//   {
//     title: { type: String, required: true },
//     summary: { type: String, required: true },
//     content: { type: String, required: true },
//     author: { type: String, required: true },
//   },
//   { timestamps: true }    // jis samay create hua h schema
// );

// 2. Create a model for the  blog post
// 2


// const Blogpost = mongoose.model("blog", blogPostSchema, "blogposts");  

// 3 . CRUD operations

// const newBlog = new Blogpost(
//     {
//       title: 'First Post',
//       summary: 'Summary',
//       content: 'Content',
//       author: 'Arin',
//     });
//     newBlog.save()       // save method used to save in the database
//     .then((result)=>{
//         console.log("Saving the blog post");
//         console.log(result);

//     })
//     .catch((err) =>{
//         console.log("Error saving the blog post");
//         console.log(err);
//     });
// async function createBlog() {
//     try {
//         const newBlog = await Blogpost.create({    database m entry create 
//             title: "sdsd",
//             summary: "ssd",
//             content: "sadsad",
//             author: "asddsaf"
//         })
//         console.log(newBlog);
//     } catch (err) {
//         console.log(err);
//     }

// }
// createBlog()
//     console.log("Post saving the blog post");



    // Q. return

    // blogPostSchema.findByIdAndDelete('66bb28bb665ed18469bf6bb2' , {title:"updated title"})
    // .then((result) =>{
    //     console.log("updated blog post");
    //     console.log(result);
    // })
    // .catch((err) =>{
    //     console.log(err);
    // })

// async function deleete(){
//   await Blogpost.findByIdAndDelete({
//     _id:"66bb8fac5fddd21b03e72bd3"
//   })
// }
// deleete();


// async function updat(){
//   await Blogpost.findByIdAndUpdate({ 
//     _id:"66bb8ed7931fb6d1780d26e7"
//   },{title:"updated title",summary:"summary updated",},);
// }
// updat();


// async function fetchBlogs() {
//     try {
//         const allBlog = await Blogpost.find({})
//         return allBlog
//     } catch (err) {
//         console.log(err);
//     }

// }














const express = require('express');

const morgan = require('morgan');
const bodyParser = require('body-parser');

// express app

const app = express();


const blogs = [
    { id: 1, title: 'Blog Title 1', summary: 'Summary of blog 1', content: 'Content of blog 1', author: 'Author 1', time: 'Time 1' },
    { id: 2, title: 'Blog Title 2', summary: 'Summary of blog 2', content: 'Content of blog 2', author: 'Author 2', time: 'Time 2' },
    { id: 3, title: 'Blog Title 3', summary: 'Summary of blog 3', content: 'Content of blog 3', author: 'Author 3', time: 'Time 3' }
];

const port = 3041;
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});

// register view engine
app.set('view engine', 'ejs');

// middleware & static files
app.use(express.static('public'));
app.use(morgan('dev'));

app.use((req, res, next) => {
    res.locals.path = req.path;
    next();
});

app.get('/', (req, res) => {
    res.render('index', { title: 'Home' });
});

app.get('/about', (req, res) => {
    res.render('about', { title: 'About' });
});

// blog routes
app.get('/blogs', async (req, res) => {
    // let blogs=await fetchBlogs()
    res.render('blogs', { title: 'All blogs', blogs });
});

app.get('/newblog', (req, res) => {
    res.render('newblog', { title: 'New blog' });
});

// write a function to get the blog by id
function getBlogById(id) {
    return blogs.find(blog => blog.id === id);
}

// New route to view a single blog post
app.get('/blogs/id/:id', (req, res) => {
    const blogId = parseInt(req.params.id, 10);
    const blog = getBlogById(blogId);
    if (blog) {
        res.render('single-blog', { title: blog.title, blog });
    } else {
        res.status(404).render('error', { title: 'Blog Not Found' });
    }
});

// write a function to add a new blog
function addBlog(blog) {
    blogs.push(blog);
}

// Middleware to parse form data
app.use(bodyParser.json());


// POST request to add a new blog

app.use(bodyParser.urlencoded({ extended: true })); // urlencoded data ko parse krha h ye middleware
app.post('/blogs', (req, res) => {
    const blog = req.body;
    blog.id = blogs.length + 1;
    blog.time = new Date().toLocaleString();
    console.log(`New blog added: ${blog.title}`);
    addBlog(blog);
    res.redirect('/success');
});

app.use(bodyParser.urlencoded({ extended: true }));

// DELETE request to delete a blog
app.post('/blogs/id/:id/', (req, res) => {
    console.log("")
    
    const blogId = parseInt(req.params.id);
    console.log(blogId)
    
    deleteBlog(blogId);
    res.redirect('/blogs');
}
);

// write a function to delete a blog by id
function deleteBlog(id) {
    const index = blogs.findIndex(blog => blog.id === id);
    if (index !== -1) {
        blogs.splice(index, 1);
    }
}

app.get('/success', (req, res) => {
    res.render('success', { title: 'Success' });
}
);

app.get('/fail', (req, res) => {
    res.render('fail', { title: 'Failed' });
});


// 1. Let's submit a form
// Q: What is the default method of the form?
// Q: What is the default path of the form?
// Q: What is the content type of the form? 
// Q: What is url encoding?
// Do we need to convert this url encoded data to JSON?
// How to do that?
// -> Use body-parser middleware
// app.use(bodyParser.urlencoded({ extended: true }));
// What is the difference between body-parser.urlencoded and body-parser.json?


// 404 page
app.use((req, res) => {
    res.status(404).render('error', { title: 'Error' });
});

