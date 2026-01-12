const express = require('express');
const PORT = 5050;
const cors = require('cors');
const app = express();
app.use(cors());
app.use(express.json());

const {check, addPost } = require('./test');

app.post('/posts', (req, res)=>{
    const post_body = req.body; //types of posts

    const all_posts = check(); //reads all posts currently stored

    const rules = {
        publisher: post_body.publisher,
        id: post_body.id,
        date: post_body.date,
        message: post_body.message
    }
    const check_duplicates = all_posts.some((el)=> el.id === post_body.id);
        if(check_duplicates){
            res.status(404).json("A post with same ID already exists/");
        }
        else{
            all_posts.push(rules);
            addPost(all_posts);
            res.json(all_posts);
        }
})
app.get('/posts', (req, res)=>{
    //first get all posts saved
    const all = check();
    res.status(200).json(all);
})

app.delete('/delete/:a', (req, res)=>{
    const a = req.params.a;
    if(isNaN(a)){res.status(404).json({error:"Reference mismatch"})}
    const all = check(); //get all current posts
    const filtered = all.filter((el)=> el.id !== a);
    addPost(filtered);
    res.json(filtered);
})



app.patch('/update/:a/:withThis', (req, res)=>{
    const a = req.params.a; //helps up locate post with id
    const b = req.params.withThis; //parameters that will replace the message by that var
    const all = check();
    const index = all.findIndex((el)=> el.id === a); //find index of the post to update
    if(index === -1){
        res.status(404).json("No Post with that ID exists.");
    }
    else{
        all[index].message = b; 
        addPost(all);
        res.status(200).json(b);
    }
})

app.post("/register", (req, res)=>{
    const user = req.body; //data sent by client
    if(user.code === "Admintoko"){
        res.status(200).json({success: true, message: "Authenticated!"});
    }
    else{
        res.status(401).json({success: false, message: "Invalid Code, Cannot be Authenticated."});
    }
})


app.listen(PORT, '0.0.0.0', ()=>{
    console.log(`Server running on: http://localhost:${PORT}/`);
})


