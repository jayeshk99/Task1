const app = require('./server');
const dotenv = require('dotenv');
dotenv.config();
const logger = require('./utils/logger');
const db = require('./config/dbconfig');



db.authenticate().then(() => {
    logger.info('Database connected...');
}).catch(err => {
    logger.error('Error: ' + err);
})

const port = process.env.PORT || 3000;

// app.listen(port, (req, res)=>{
//     logger.info(`Listening on port ${port}`);
// })

db.sync().then(() => {
    app.listen(port, console.log(`Server started on port ${port}`));
}).catch(err => console.log("Error: " + err));

