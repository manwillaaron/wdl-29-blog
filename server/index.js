require('dotenv').config()
const express = require('express')
const pc = require('./postController')


const app = express()



app.use(express.json())
const SERVER_PORT = 4321
app.get('/api/posts', pc.allPosts)
app.get('/api/search', pc.searchPosts)
app.post('/api/posts',pc.createPost)
app.put('/api/posts/:id', pc.updatePost)
app.delete('/api/posts/:id', pc.deletePost)


app.listen(SERVER_PORT, () => {
    console.log(`listening on ${SERVER_PORT}`);
  });