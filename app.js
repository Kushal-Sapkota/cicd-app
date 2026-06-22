const express = require('express');
const app = express();

app.get('/', (req, res) => {
    res.send('CI/CD Pipeline with Jenkins and Docker! and i made an edit to test the pipeline');
});

app.listen(3000, () => {
    console.log('Server running on port 3000');
});
