let nanoid;
import("nanoid").then(module => {
    nanoid = module.nanoid;
});
const URL = require('../models/url')

async function handleGenerateShortURL(req,res){
    const body = req.body;
    if(!body.URL) return res.status(400).json({error : 'URL is required'});
    const shortID = nanoid(8);
    await URL.create({
        shortId:shortID,
        redirectURL:body.URL,
        visitHistory : [],
    })

    return res.json({id:shortID});
}

module.exports = {
    handleGenerateShortURL,
}