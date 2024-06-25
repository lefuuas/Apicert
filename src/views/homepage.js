import fetch from 'node-fetch';

export async function renderHomePage(req, res) {
    try {
        const response = await fetch('http://localhost:3000/home');
        const names = await response.json();

        // Gerar HTML dinâmico
        const htmlContent = `
        <!DOCTYPE html>
        <html>
        <head>
            <title>Home Page</title>
        </head>
        <body>
            <h1>Welcome to the Home Page!</h1>
            <ul>
                ${names.map(name => `<li>${name}</li>`).join('')}
            </ul>
        </body>
        </html>
        `;

        res.send(htmlContent);
    } catch (error) {
        res.status(500).send('Error fetching data from /home');
    }
}
