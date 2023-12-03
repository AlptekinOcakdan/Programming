const express = require('express');

const app = express();

app.use('/users', (req, res, next) => {
    console.log('In the users middleware');
    res.send('<h1>Users</h1>')
})

app.use('/', (req, res, next) => {
    console.log('In the middleware');
    res.send('<h1>Home</h1>')
})

app.listen(3000, () => {
    console.log('Server is running on port 3000');
})