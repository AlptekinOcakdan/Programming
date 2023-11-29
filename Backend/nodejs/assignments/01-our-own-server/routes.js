const fs = require('fs');

const requestHandler = (req, res) => {
    const url = req.url;
    const method = req.method;
    if (url === '/') {
        res.write('<html>');
        res.write('<head><title>Greeting</title></head>');
        res.write('<h1>Greeting User</h1>');
        res.write('<form action="/create-user" method="POST">' +
            '<input type="text" name="username" placeholder="username">' +
            '<button type="submit">Send</button>' +
            '</form>');
        res.write('</html>');
        return res.end();
    }

    if (url === '/users') {
        res.write('<html>');
        res.write('<head><title>Users</title></head>');
        res.write('<ul><li>User 1</li><li>User 2</li><li>User 3</li></ul>');
        res.write('</html>');
        return res.end();
    }


    if (url === '/create-user' && method === 'POST') {
        const body = [];
        req.on('data', (chunk) => {
            console.log(chunk);
            body.push(chunk)
        });
        return req.on('end', () => {
            const parsedBody = Buffer.concat(body).toString();
            console.log(parsedBody.split('=')[1]);
            res.setHeader('Location', '/');
            return res.end();
        });
    }
    res.setHeader('Content-Type', 'text/html');
    res.write('<html>');
    res.write('<head><title>Create User</title></head>');
    res.write('<body><h1>User Created</h1></body>');
    res.write('</html>');
    res.end();
};

exports.handler = requestHandler;