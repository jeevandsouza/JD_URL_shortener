const express = require('express');
const {connectToMongoDB} = require("./connect");
const app = express();
const PORT = 8001;
const urlRoutes = require('./routes/url');
const URL = require('./models/url');
//index->route->controller->model is the flow

connectToMongoDB('mongodb://localhost:27017/short-url').then(() => console.log("connected successfully")); 
// give any name for database here
app.use(express.json());//middleware to parse incoming requests
app.use("/url",urlRoutes);

app.get('/:shortId',async (req,res) => {
    const shortId = req.params.shortId;
   const entry =  await URL.findOneAndUpdate({
        shortId,
    }, {
        $push : {
        visitHistory:{timestamp: Date.now(),}
    }
    })
    res.redirect(entry.redirectURL);
})

app.listen(PORT,()=> console.log(`Server started at port: ${PORT}`));

