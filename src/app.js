const app = require('koa')();
const router = require('koa-router')();

const Commit = require('./models/commit');
const House = require('./models/house');

const json = require('koa-json');
const bodyParser = require('koa-bodyparser');

const mongoose = require('mongoose');
mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost/HouseDB', err => {
    if (err) {
        console.log('connect database error -->', err);
        process.exit(10601);
    }
    console.log('connect database success');
});

app.use(json());

router.get('/', function* (next) {
    let commits = yield Commit.find().select('time').sort({ time: -1 });
    let res = yield Commit.findById(commits[0]._id).populate('data');

    this.body = res;
    this.response.status = 200;
})


app.use(router.routes());
app.use(router.allowedMethods());

app.listen(4567);