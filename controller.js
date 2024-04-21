const fs = require('fs');

const votes = {
  JavaScript: 0,
  Python: 0,
  Java: 0,
};

function serveFile(response, fileName, contentType) {
  const fileContents = fs.readFileSync('./public/' + fileName, 'utf-8');
  if (fileName === 'result.html') {
    const resultHtml = fileContents
      .replace(/{JavaScriptVotes}/g, votes.JavaScript)
      .replace(/{PythonVotes}/g, votes.Python)
      .replace(/{JavaVotes}/g, votes.Java)
    response.writeHead(200, { 'Content-Type': contentType });
    response.end(resultHtml);
  } else {
    response.writeHead(200, { 'Content-Type': contentType });
    response.end(fileContents);
  }
}

function handleRequest(request, response) {
  if (request.method === 'GET' && request.url === '/') {
    serveFile(response, 'index.html', 'text/html');
  } else if (request.method === 'GET' && request.url === '/result') {
    serveFile(response, 'result.html', 'text/html');
  } else if (request.method === 'POST' && request.url === '/vote') {
    let body = '';
    request.on('data', (chunk) => {
      body += chunk;
    });
    request.on('end', () => {
      const formData = new URLSearchParams(body);
      const selectedLanguage = formData.get('language');
      if (votes[selectedLanguage] !== undefined) {
        votes[selectedLanguage]++;
      }
      response.writeHead(302, { 'Location': '/result' });
      response.end();
    });
  } else {
    response.writeHead(404, { 'Content-Type': 'text/plain' });
    response.end('Not Found');
  }
}

module.exports = handleRequest;
