const file = require('fs');
const FILE = 'blog.json';

const check = ()=>{
    if(file.existsSync(FILE)){
        return JSON.parse(file.readFileSync(FILE, 'utf8'));
    }
    else{
        return [];
    }
}
const addPost = (post)=>{
    file.writeFileSync(FILE, JSON.stringify(post, null, 2));
}

module.exports = {check, addPost};