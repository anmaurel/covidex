const express = require('express');
const path = require('path');
const bodysParser = require('body-parser');
const cors = require('cors');
const clientRoutes = require('./routes/clients');

const sequelize = require('./utils/database');

const Variant = require('./models/variant');

const app = express();

app.use(bodysParser.json());
app.use(express.static(path.join(__dirname, 'public')));
app.use(cors());
app.use(clientRoutes);

sequelize
    // .sync({
    //     force: true
    // })
    //   .query(
    //       "DELETE FROM `variants`"
    //   )
    .query("INSERT INTO variants (name, text, onset_date) VALUES ('Variant Nigérian', 'desc', 'aout 2020'), ('Variant Britannique', 'desc', 'octobre 2020'), ('Variant Danois', 'desc', 'novembre 2020'), ('Variant Sud-Africain', 'desc', 'décembre 2020'), ('Variant Brésilien', 'desc', 'janvier 2021'), ('Variant P1', 'desc', 'décembre 2020'), ('Variant 20A EU.1', 'desc', 'octobre 2020'), ('Variant Californien', 'desc', 'juillet 2020'), ('Variant New-Yorkais', 'desc', 'novembre 2020'), ('Variant Breton', 'desc', 'mars 2021'), ('Variant Philippin', 'desc', 'mars 2021'), ('Variant Henri-Mondor', 'desc', 'février 2021'), ('Variant Indien', 'desc', 'octobre 2020')")
    .then(() => {
        app.listen(9000, () => {
            console.log('server up');
        });
    })
    .catch((err) => {
        console.log(err);
    });

module.exports = app;
