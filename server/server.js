const express = require('express');
const app = express();
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
require('dotenv').config();

const users = require('./routes/api/users');
const { checkToken } = require('./middleware/auth');

const mongoUri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@${process.env.DB_HOST}?retryWrites=true&w=majority`;

main().catch(err => console.log(err));

async function main() {
    await mongoose.connect(mongoUri, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        // useCreateIndex: true,
        // useFindAndModify: false 
        // UnhandledPromiseRejectionWarning: MongoParseError: options usecreateindex, usefindandmodify are not supported
    })
}

app.use(bodyParser.json())
app.use(checkToken)
app.use("/api/users", users)

const port = process.env.PORT || 3001;
app.listen(port, () => {
    console.log(`Server running on port ${port}`)
})