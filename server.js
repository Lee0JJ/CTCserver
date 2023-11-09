
import express from 'express';
import mysql from 'mysql';
import cors from 'cors';

const app = express();
const port = process.env.PORT || 8800;

const db = mysql.createConnection({
    user: "root",
    host: "localhost",
    password: "password",
    database: "ctc"
});

app.use(express.json());
app.use(cors({origin: "*"}))

app.get('/', (req, res) => {
    
    res.send('Hello World!');
});

app.get('/api', (req, res) => {
    res.send({ "user": ["user1", "user2", "user3"] });
});

// CREATE
app.post('/organizer', (req, res) => {
    const { name, email, account, documenturl, isverified, isarchived } = req.body;
    const query = `INSERT INTO organizer (organizerName, organizerEmail, accAddress, documentUrl, IsVerified, isArchived) VALUES ('${name}', '${email}', '${account}', '${documenturl}', ${isverified}, ${isarchived})`;
    db.query(query, (err, result) => {
        if (err) {
            console.error(err);
            res.status(500).send('Error creating organizer');
        } else {
            res.status(201).send('Organizer created successfully');
        }
    });
});

// READ ALL ORGANIZER
app.get('/organizer', (req, res) => {
    const query = `SELECT * FROM organizer`;
    db.query(query, (err, result) => {
        if (err) {
            console.error(err);
            res.json(err);
        } else {
            res.json(result);
        }
    });
});

// READ
app.get('/organizer/:id', (req, res) => {
    const { id } = req.params;
    const query = `SELECT * FROM organizer WHERE organizerid = ${id}`;
    db.query(query, (err, result) => {
        if (err) {
            console.error(err);
            res.status(500).send('Error fetching organizer');
        } else if (result.length === 0) {
            res.status(404).send('Organizer not found');
        } else {
            res.status(200).send(result[0]);
        }
    });
});

// UPDATE
app.put('/organizer/:id', (req, res) => {
    const { id } = req.params;
    const { organizerName, organizerEmail, accAddress, documentUrl, IsVerified, isArchived } = req.body;

    //If the value is null, it will not be updated
    let query = `UPDATE organizer SET `;
    if (organizerName) query += `organizerName = '${organizerName}', `;
    if (organizerEmail) query += `organizerEmail = '${organizerEmail}', `;
    if (accAddress) query += `accAddress = '${accAddress}', `;
    if (documentUrl) query += `documentUrl = '${documentUrl}', `;
    if (IsVerified) query += `IsVerified = ${IsVerified}, `;
    if (isArchived) query += `isArchived = ${isArchived}, `;
    query = query.slice(0, -2);
    query += ` WHERE organizerid = ${id}`;


    // const query = `UPDATE organizer SET organizerName = '${organizerName}', organizerEmail = '${organizerEmail}', accAddress = '${accAddress}', documentUrl = '${documentUrl}', IsVerified = ${IsVerified}, isArchived = ${isArchived} WHERE organizerid = ${id}`;

    db.query(query, (err, result) => {
        if (err) {
            console.error(err);
            res.status(500).send('Error updating organizer');
        } else if (result.affectedRows === 0) {
            res.status(404).send('Organizer not found');
        } else {
            res.status(200).send('Organizer updated successfully');
        }
    });
});

// DELETE
app.delete('/organizer/:id', (req, res) => {
    const { id } = req.params;
    const query = `DELETE FROM organizer WHERE organizerid = ${id}`;
    db.query(query, (err, result) => {
        if (err) {
            console.error(err);
            res.status(500).send('Error deleting organizer');
        } else if (result.affectedRows === 0) {
            res.status(404).send('Organizer not found');
        } else {
            res.status(200).send('Organizer deleted successfully');
        }
    });
});

// CRUD for Concert table

// CREATE
app.post('/concert', (req, res) => {
     const { organizerid, name, owner, venue, category, description, createdDate, conductedDate, numZone, zoneinfo, totalSeat, imgurl } = req.body;

    // //initialize predefined data for testing
    // const organizerid = 1;
    // const name = "Concert 1";
    // const owner = "Owner 1";
    // const venue = "Venue 1";
    // const category = "Category 1";
    // const description = "Description 1";
    // const createdDate = "2021-01-01";
    // const conductedDate = "2021-01-01";
    // const numZone = 1;
    // const zoneinfo = "Zone 1";
    // const totalSeat = 100;
    // const imgurl = "https://www.google.com";




    const query = `INSERT INTO concert (organizerid, name, owner, venue, description, category, createdDate, conductedDate, numZone, zoneinfo, totalSeat, imgurl) VALUES (${organizerid}, '${name}', '${owner}', '${venue}', '${description}', '${category}', '${createdDate}', '${conductedDate}', ${numZone}, '${zoneinfo}', '${totalSeat}' , '${imgurl}')`;


    db.query(query, (err, result) => {
        if (err) {
            console.error(err);
            res.status(500).send('Error creating concert');
        } else {
            res.status(201).send('Concert created successfully');
        }
    });
});

// READ
app.get('/concert', (req, res) => {
    const query = `SELECT * FROM concert`;
    db.query(query, (err, result) => {
        if (err) {
            console.error(err);
            res.status(500).send('Error fetching concert');
        } else if (result.length === 0) {
            res.status(404).send('Concert not found');
        } else {
            res.status(200).send(result[0]);
        }
    });
});

// READ
app.get('/concert/:id', (req, res) => {
    const { id } = req.params;
    const query = `SELECT * FROM concert WHERE concertid = ${id}`;
    db.query(query, (err, result) => {
        if (err) {
            console.error(err);
            res.status(500).send('Error fetching concert');
        } else if (result.length === 0) {
            res.status(404).send('Concert not found');
        } else {
            res.status(200).send(result[0]);
        }
    });
});

// UPDATE
app.put('/concert/:id', (req, res) => {
    const { id } = req.params;
    const { organizerid, name, owner, venue, category, description, createdDate, conductedDate, numZone, zoneinfo, totalSeat, imgurl } = req.body;
    const query = `UPDATE concert SET organizerid = ${organizerid}, name = '${name}', owner = '${owner}', venue = '${venue}', category = '${category}', description = '${description}', createdDate = '${createdDate}', conductedDate = '${conductedDate}', numZone = ${numZone}, zoneinfo = '${zoneinfo}', totalSeat = '${totalSeat}', imgurl = '${imgurl}' WHERE concertid = ${id}`;
    db.query(query, (err, result) => {
        if (err) {
            console.error(err);
            res.status(500).send('Error updating concert');
        } else if (result.affectedRows === 0) {
            res.status(404).send('Concert not found');
        } else {
            res.status(200).send('Concert updated successfully');
        }
    });
});

// DELETE
app.delete('/concert/:id', (req, res) => {
    const { id } = req.params;
    const query = `DELETE FROM concert WHERE concertid = ${id}`;
    db.query(query, (err, result) => {
        if (err) {
            console.error(err);
            res.status(500).send('Error deleting concert');
        } else if (result.affectedRows === 0) {
            res.status(404).send('Concert not found');
        } else {
            res.status(200).send('Concert deleted successfully');
        }
    });
});

// CRUD for Customer table

// CREATE
app.post('/customer', (req, res) => {
    const { uniqueld, registerDate, picUrl } = req.body;
    const query = `INSERT INTO customer (uniqueld, registerDate, picUrl) VALUES ('${uniqueld}', '${registerDate}', '${picUrl}')`;
    db.query(query, (err, result) => {
        if (err) {
            console.error(err);
            res.status(500).send('Error creating customer');
        } else {
            res.status(201).send('Customer created successfully');
        }
    });
});

// READ
app.get('/customer/:id', (req, res) => {
    const { id } = req.params;
    const query = `SELECT * FROM customer WHERE customerid = ${id}`;
    db.query(query, (err, result) => {
        if (err) {
            console.error(err);
            res.status(500).send('Error fetching customer');
        } else if (result.length === 0) {
            res.status(404).send('Customer not found');
        } else {
            res.status(200).send(result[0]);
        }
    });
});

// UPDATE
app.put('/customer/:id', (req, res) => {
    const { id } = req.params;
    const { uniqueld, registerDate, picUrl } = req.body;
    const query = `UPDATE customer SET uniqueld = '${uniqueld}', registerDate = '${registerDate}', picUrl = '${picUrl}' WHERE customerid = ${id}`;
    db.query(query, (err, result) => {
        if (err) {
            console.error(err);
            res.status(500).send('Error updating customer');
        } else if (result.affectedRows === 0) {
            res.status(404).send('Customer not found');
        } else {
            res.status(200).send('Customer updated successfully');
        }
    });
});

// DELETE
app.delete('/customer/:id', (req, res) => {
    const { id } = req.params;
    const query = `DELETE FROM customer WHERE customerid = ${id}`;
    db.query(query, (err, result) => {
        if (err) {
            console.error(err);
            res.status(500).send('Error deleting customer');
        } else if (result.affectedRows === 0) {
            res.status(404).send('Customer not found');
        } else {
            res.status(200).send('Customer deleted successfully');
        }
    });
});

// CRUD for Ticket table

// CREATE
app.post('/ticket', (req, res) => {
    const { concertid, customerid, receipt, zone, purchaseDate, used } = req.body;
    const query = `INSERT INTO ticket (concertid, customerid, receipt, zone, purchaseDate, used) VALUES (${concertid}, ${customerid}, '${receipt}', '${zone}', '${purchaseDate}', ${used})`;
    db.query(query, (err, result) => {
        if (err) {
            console.error(err);
            res.status(500).send('Error creating ticket');
        } else {
            res.status(201).send('Ticket created successfully');
        }
    });
});

// READ
app.get('/ticket/:id', (req, res) => {
    const { id } = req.params;
    const query = `SELECT * FROM ticket WHERE ticketid = ${id}`;
    db.query(query, (err, result) => {
        if (err) {
            console.error(err);
            res.status(500).send('Error fetching ticket');
        } else if (result.length === 0) {
            res.status(404).send('Ticket not found');
        } else {
            res.status(200).send(result[0]);
        }
    });
});

// UPDATE
app.put('/ticket/:id', (req, res) => {
    const { id } = req.params;
    const { concertid, customerid, receipt, zone, purchaseDate, used } = req.body;
    const query = `UPDATE ticket SET concertid = ${concertid}, customerid = ${customerid}, receipt = '${receipt}', zone = '${zone}', purchaseDate = '${purchaseDate}', used = ${used} WHERE ticketid = ${id}`;
    db.query(query, (err, result) => {
        if (err) {
            console.error(err);
            res.status(500).send('Error updating ticket');
        } else if (result.affectedRows === 0) {
            res.status(404).send('Ticket not found');
        } else {
            res.status(200).send('Ticket updated successfully');
        }
    });
});

// DELETE
app.delete('/ticket/:id', (req, res) => {
    const { id } = req.params;
    const query = `DELETE FROM ticket WHERE ticketid = ${id}`;
    db.query(query, (err, result) => {
        if (err) {
            console.error(err);
            res.status(500).send('Error deleting ticket');
        } else if (result.affectedRows === 0) {
            res.status(404).send('Ticket not found');
        } else {
            res.status(200).send('Ticket deleted successfully');
        }
    });
});

app.listen(port, () => {
    console.log(`Server listening on port ${port}`);
    console.log(`URL : http://localhost:${port}`);
});
