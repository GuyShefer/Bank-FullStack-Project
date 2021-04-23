const app = require('./server');
const port = 8000;

app.get('/',(req,res)=>{
    res.json({success : 'Bank API'})
})

app.listen(process.env.PORT || port, () => {
    console.log(`application start at ${port}`);
})
