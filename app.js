const express = require('express');
const bodyParser = require('body-parser');
const mysql = require('mysql');
const { rootCertificates } = require('tls');

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));

var JsonRes = {
    code: '',
    data: [],
    message: '',
    pagination: {
        limit: '',
        page: '',
        total: ''
    },
    status: ''
};

var koneksi = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'itc'
});

koneksi.connect((err => {
    if(err) throw err;
    console.log("Database Connected");
}));

app.get('/', (req, res) => {
    res.send("Backend Server For ITC APP");
});

app.get('/api/prov', (req, res) => {
    koneksi.query('SELECT * FROM prov', (err, hasil)=> {
        if(err) throw err;
        res.json(hasil);
    })
});

app.get('/api/kabkota', (req, res) => {
    koneksi.query('SELECT * FROM kabkota', (err, hasil)=> {
        if(err) throw err;
        res.json(hasil);
    })
});

app.get('/api/kec', (req, res) => {
    koneksi.query('SELECT * FROM kec', (err, hasil)=> {
        if(err) throw err;
        res.json(hasil);
    })
});

app.get('/api/cp/page/:pagenumber', (req, res) => {
    var pagenumber = req.params.pagenumber;
    var pageend = 25 * pagenumber;
    var pagestart = pageend - 25;
    koneksi.query('SELECT * FROM cp LIMIT ?, ?', [pagestart, 25], (err, hasil)=> {
        if(err) throw err;
        res.json(hasil);
    })
});

app.get('/api/customer/page/:pagenumber', (req, res) => {
    var pagenumber = req.params.pagenumber;
    var pageend = 25 * pagenumber;
    var pagestart = pageend - 25;
    koneksi.query('SELECT * FROM customer LIMIT ?, ?', [pagestart, 25], (err, hasil)=> {
        if(err) throw err;
        res.json(hasil);
    });
});

app.get('/api/deal', (req, res) => {
    koneksi.query('SELECT * FROM deal', (err, hasil)=> {
        if(err) throw err;
        res.json(hasil);
    });
});

app.get('/api/finish/page/:pagenumber', (req, res) => {
    var pagenumber = req.params.pagenumber;
    var pageend = 25 * pagenumber;
    var pagestart = pageend - 25;
    koneksi.query('SELECT * FROM finish LIMIT ?, ?', [pagestart, 25], (err, hasil)=> {
        if(err) throw err;
        res.json(hasil);
    })
});

app.get('/api/ijin/page/:pagenumber', (req, res) => {
    var pagenumber = req.params.pagenumber;
    var pageend = 25 * pagenumber;
    var pagestart = pageend - 25;
    koneksi.query('SELECT * FROM ijin LIMIT ?, ?', [pagestart, 25], (err, hasil)=> {
        if(err) throw err;
        res.json(hasil);
    })
});

app.get('/api/kunjungan/page/:pagenumber', (req, res) => {
    var pagenumber = req.params.pagenumber;
    var pageend = 25 * pagenumber;
    var pagestart = pageend - 25;
    koneksi.query('SELECT * FROM kunjungan LIMIT ?, ?', [pagestart, 25], (err, hasil)=> {
        if(err) throw err;
        res.json(hasil);
    })
});

app.get('/api/marketting/page/:pagenumber', (req, res) => {
    var pagenumber = req.params.pagenumber;
    var pageend = 25 * pagenumber;
    var pagestart = pageend - 25;
    koneksi.query('SELECT * FROM marketting LIMIT ?, ?', [pagestart, 25], (err, hasil)=> {
        if(err) throw err;
        res.json(hasil);
    })
});

app.get('/api/omzet/page/:pagenumber', (req, res) => {
    var pagenumber = req.params.pagenumber;
    var pageend = 25 * pagenumber;
    var pagestart = pageend - 25;
    koneksi.query('SELECT * FROM omzet LIMIT ?, ?', [pagestart, 25], (err, hasil)=> {
        if(err) throw err;
        res.json(hasil);
    })
});

app.get('/api/planning/page/:pagenumber', (req, res) => {
    var pagenumber = req.params.pagenumber;
    var pageend = 25 * pagenumber;
    var pagestart = pageend - 25;
    koneksi.query('SELECT * FROM planning LIMIT ?, ?', [pagestart, 25], (err, hasil)=> {
        if(err) throw err;
        res.json(hasil);
    })
});

app.get('/api/team/page/:pagenumber', (req, res) => {
    var pagenumber = req.params.pagenumber;
    var pageend = 25 * pagenumber;
    var pagestart = pageend - 25;
    koneksi.query('SELECT * FROM team LIMIT ?, ?', [pagestart, 25], (err, hasil)=> {
        if(err) throw err;
        res.json(hasil);
    })
});

app.get('/api/user/page/:pagenumber', (req, res) => {
    var pagenumber = req.params.pagenumber;
    var pageend = 25 * pagenumber;
    var pagestart = pageend - 25;
    koneksi.query('SELECT * FROM user LIMIT ?, ?', [pagestart, 25], (err, hasil)=> {
        if(err) throw err;
        res.json(hasil);
    })
});


app.listen(3000, () => console.log(`App running on port 3000`));