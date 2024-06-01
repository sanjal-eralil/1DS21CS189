
const express = require('express');
const path = require('path');
const axios = require('axios');

const bodyParser = require('body-parser');
const app = express();

app.use(express.static(path.join(__dirname, 'public')));

const PORT = process.env.PORT || 3000;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));



app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});


app.post('/submit', async (req, res) => {
    try {
        
        const { input1, input2 } = req.body;

        const apiResponse = await axios.get(`http://20.244.56.144/test/companies/${input1}/categories/${input2}/products/top-naminPri ce-pamaxPrice-q`);

        
        res.json(apiResponse.data);
    } catch (error) {
        console.error('Error:', error);
        res.status(500).json({ error: 'An error occurred' });
    }
});

app.get('/api/products', async (req, res) => {
    try {
       const token='eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJNYXBDbGFpbXMiOnsiZXhwIjoxNzE3MjI2Mzc5LCJpYXQiOjE3MTcyMjYwNzksImlzcyI6IkFmZm9yZG1lZCIsImp0aSI6ImQ2YTAwODU1LTNhOWYtNDIzNi1hMTkyLTM1ZjNmMDBhYmI5OCIsInN1YiI6InNhbmphbGVyYWxpbEBnbWFpbC5jb20ifSwiY29tcGFueU5hbWUiOiJhZmZvcmRNZWQiLCJjbGllbnRJRCI6ImQ2YTAwODU1LTNhOWYtNDIzNi1hMTkyLTM1ZjNmMDBhYmI5OCIsImNsaWVudFNlY3JldCI6IlVtZ2FIZ094WFFwZXBhRGYiLCJvd25lck5hbWUiOiJTYW5qYWwgUyBFcmFsaWwiLCJvd25lckVtYWlsIjoic2FuamFsZXJhbGlsQGdtYWlsLmNvbSIsInJvbGxObyI6IjFEUzIxQ1MxODkifQ.SCNQTSKHbesrG7o2s_l-4ikGo5W3eUQ7BnWsTEuxdlA'
        const response = await axios.get('http://20.244.56.144/test/companies/AMZ/categories/Laptop/products?top=10&minPrice=1&maxPrice=1000', {
           
        headers: {
            'Authorization': `Bearer ${token}`
        }
        });

        // Return the response from the API endpoint
        res.status(response.status).json(response.data);
    } catch (error) {
        // Handle errors
        console.error('Error:', error.message);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});


app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});

