const router = require('express').Router();

router.route('/').post((req, res) => {
    let imageFile = req.files.file;

    imageFile.mv(`${__dirname}/public/${req.body.filename}.jpg`, err => {
        if (err) {
            return res.status(500).send(err);
        }

        res.json({ file: `public/${req.body.filename}.jpg` });
        console.log(res.json);
    });
});
/* app.post('/upload', (req, res, next) => {
    // console.log(req);
    let imageFile = req.files.file;
 
    imageFile.mv(`${__dirname}/public/${req.body.filename}.jpg`, err => {
        if (err) {
            return res.status(500).send(err);
        }
 
        res.json({ file: `public/${req.body.filename}.jpg` });
        console.log(res.json);
    });
});
 */

module.exports = router;