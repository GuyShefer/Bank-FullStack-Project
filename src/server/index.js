const app = require('./server');
const port = 5000;

app.get('/',(req,res)=>{
    res.json({success : 'Bank API'})
})

app.listen(process.env.PORT || 5000, () => {
    console.log(`application start at ${port}`);
})
