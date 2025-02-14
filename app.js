const express = require('express');
const bodyParser = require('body-parser');
const mysql = require('mysql');
const { rootCertificates } = require('tls');
const { stat } = require('fs');
const { time } = require('console');

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


// API GET
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


// API POST
app.post('/api/planning/add', (req, res) => {
    var id_marketting = req.body.id_marketting;
    var id_customer = req.body.id_customer;
    var tgl = req.body.tgl;
    var bertemu = req.body.bertemu;
    var ket = req.body.ket;
    koneksi.query('INSERT INTO planning(id_marketting, id_customer, tgl, bertemu, ket) VALUES(?, ?, ?, ?, ?)'), [id_marketting, id_customer, tgl, bertemu, ket], (err, hasil) => {
        if(err) throw err;
        res.send("Add data success");
    }
});

app.post('/api/omzet/add', (req, res) => {
    var id_marketting = req.body.id_marketting;
    var tgl = req.body.tgl;
    var omzet = req.body.omzet;
    var nm_customer = req.body.nm_customer;
    koneksi.query('INSERT INTO omzet(id_marketting, tgl, omzet, nm_customer) VALUES(?, ?, ?, ?)', [id_marketting, tgl, omzet, nm_customer], (err, hasil)=> {
        if(err) throw err;
        res.send("Add data success");
    })
});

app.post('/api/marketting/add', (req, res) => {
    var m_username = req.body.username;
    var m_password = req.body.password;
    var nama = req.body.nama;
    var alamat = req.body.alamat;
    var nohp = req.body.nohp;
    var fotopp = req.body.fotopp;
    var target = req.body.target;
    var mstatus = req.body.status;
    koneksi.query('INSERT INTO user(user, password) VALUES(?, ?)'), [m_username, m_password], (err, hasil) => {
        if(err) throw err;
        res.send("Add data successfull");
    };
});

app.post('/api/planning/add', (req, res) => {
    var id_marketting = req.body.id_marketting;
    var id_customer = req.body.id_customer;
    var tgl = req.body.tgl;
    var bertemu = req.body.bertemu;
    var ket = req.body.ket;
    koneksi.query('INSERT INTO planning(id_marketting, id_customer, tgl, bertemu, ket) VALUES(?, ?, ?, ?, ?)'), [id_marketting, id_customer, tgl, bertemu, ket], (err, hasil) => {
        if(err) throw err;
        res.send("add data success")
    }
});

app.post('/api/reports/nonplan/add', (req, res) => {
    var id_marketting = req.body.id_marketting;
    var id_plan = 0;
    var id_customer = req.body.id_customer;
    var tgl_kunjungan = req.body.tgl_kunjungan;
    var info_dpt = req.body.info_dpt;
    var action = req.body.action;
    var tujuan = req.body.tujuan;
    var cp = req.body.cp;
    var peluang = req.body.peluang;
    var visit = req.body.visit;
    var n_visit = req.body.n_visit;
    var deal = req.body.deal;
    var pembayaran = req.body.pembayaran;
    var waktu_pengadaan = req.body.waktu_pengadaan;
    var tgl_deal = req.body.tgl_deal;
    var foto = req.body.foto;
    var timestamp = req.body.timestamp;
    var lokasi_lat = req.body.lokasi_lat;
    var lokasi_lon = req.body.lokasi_lon;
    var service_tt = req.body.service_tt;
    koneksi.query('INSERT INTO kunjungan(id_marketting, id_plan, id_customer, tgl_kunjungan, info_dpt, action, cp, peluang, visit, n_visit, deal, pembayaran, waktu_pengadaan, tgl_deal, foto, timestamp, lokasi_lat, lokasi_lon, service_tt) VALUES(?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)'), [
        id_marketting, id_plan, id_customer, tgl_kunjungan, info_dpt, action, tujuan, cp, peluang, visit, n_visit, deal, pembayaran, waktu_pengadaan, tgl_deal, foto, timestamp, lokasi_lat, lokasi_lon, service_tt
    ], (err,hasil) => {
        if(err) throw err;
        res.send("add data successfull");
    }
});

app.listen(3000, () => console.log(`App running on port 3000`));