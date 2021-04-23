const app = require('./server');
const port = 8000;

app.listen(process.env.PORT || port, () => {
    console.log(`application start at ${port}`);
})
