
require('dotenv').config();

const fs = require('fs');
const rfs = require('rotating-file-stream');
const path = require('path');


const logDirectory = path.join(__dirname, '../production_logs');
fs.existsSync(logDirectory) || fs.mkdirSync(logDirectory);

const accessLogStream = rfs.createStream('access.log', {
    interval: '1d',
    path: logDirectory
});
 
// import dotenv from 'dotenv';

const development = {
    name: 'development',
    asset_path: './assets',
    session_cookie_key: 'blahSomething',
    db: 'LearnDome_development',
    smtp: {
        service: 'gmail',
        host: 'smtp.gmail.com',
        port: 587,
        secure: false,
        auth: {
            user: 'domelearn@gmail.com',
            pass: '(h@a@p@y@s)5'
        }
    },
    google_client_id: "829064347152-1eoc8svt8e6fjgqpogitagvo3c0rf15v.apps.googleusercontent.com",
    google_client_secret: "JkUSTDqMT4WwMmH0MhQrmv5f",
    inst_google_callback_url: "http://localhost:8000/i-callback",
    stu_google_callback_url: "http://localhost:8000/s-callback",
    jwt_secret: 'LearnDome',
    morgan: {
        mode: 'dev',
        options: {stream: accessLogStream}
    }
}


const production = {
    name: 'production',
    asset_path: './assets',
    session_cookie_key: process.env.LD_SESSION_COOKIE_KEY,
    db: process.env.LD_DB,
    smtp: {
        service: 'gmail',
        host: 'smtp.gmail.com',
        port: 587,
        secure: false,
        auth: {
            user: process.env.LD_GMAIL_USERNAME,
            pass: process.env.LD_GMAIL_PASSWORD
        }
    },
    google_client_id: process.env.LD_GOOGLE_CLIENT_ID,
    google_client_secret: process.env.LD_GOOGLE_CLIENT_SECRET,
    inst_google_callback_url: process.env.LD_INST_GOOGLE_CALLBACK_URL,
    stu_google_callback_url: process.env.LD_STU_GOOGLE_CALLBACK_URL,
    jwt_secret: process.env.LD_JWT_SECRET,
    morgan: {
        mode: 'combined',
        options: {stream: accessLogStream}
    }
}

module.exports = eval(process.env.NODE_ENV) == undefined ? development : eval(process.env.NODE_ENV);
// module.exports = development;