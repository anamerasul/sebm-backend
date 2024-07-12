const express = require('express');
const mysql = require('mysql');
const cors = require('cors');

const app = express();
app.use(cors());

const db = mysql.createConnection({
    host: '49.12.80.144',
    user: 'sparkfi2_sebm',
    password: 'sparkfi2_sebm',
    database: 'sparkfi2_sebm',
    port: 3306
});


// Endpoint to get all bonuses
app.get('/bonuses', (req, res) => {
    const sql = `SELECT * FROM bonuses`;
    db.query(sql, (err, data) => {
        if (err) return res.status(500).json({ message: "Internal server error." });
        return res.status(200).json(data);
    });
});

// Endpoint to get top 10 users from leaderboard
app.get('/leaderboard', (req, res) => {
const sql = `SELECT * FROM leaderboard ORDER BY CAST(xp AS SIGNED) DESC LIMIT 10`;
db.query(sql, (err, data) => {
if (err) return res.status(500).json({ message: "Internal server error." });
return res.status(200).json(data);
});
});








/*
// Endpoint to add a new bonus with image upload
app.post('/bonuses', (req, res) => {
    const { color, headline, conditions, link, image } = req.body;

    // Decode base64 image data
    const base64Data = image.replace(/^data:image\/png;base64,/, "");
    const imageBuffer = Buffer.from(base64Data, 'base64');

    // Generate a unique filename
    const imageName = Date.now() + '.png';

    // Path to save the image
    const imagePath = '../sebm/src/assets/images' + imageName;

    // Write the image data to the file
    fs.writeFile(imagePath, imageBuffer, (err) => {
        if (err) {
            console.error(err);
            return res.status(500).json({ message: "Internal server error." });
        }

        // Insert the bonus into the database with the image filename
        const sql = `INSERT INTO bonuses (color, image, headline, conditions, link) VALUES (?, ?, ?, ?, ?)`;
        db.query(sql, [color, imageName, headline, conditions, link], (err, result) => {
            if (err) {
                console.error(err);
                return res.status(500).json({ message: "Internal server error." });
            }
            return res.status(201).json({ message: "Bonus added successfully." });
        });
    });
});

 Endpoint to delete a bonus
app.delete('/bonuses/:id', (req, res) => {
    const id = req.params.id;
    const sql = `DELETE FROM bonuses WHERE id = ?`;
    db.query(sql, [id], (err, result) => {
        if (err) return res.status(500).json({ message: "Internal server error." });
        return res.status(200).json({ message: "Bonus deleted successfully." });
    });
});

// Endpoint to update a bonus
app.put('/bonuses/:id', (req, res) => {
    const id = req.params.id;
    const { color, image, headline, conditions, link } = req.body;
    const sql = `UPDATE bonuses SET color = ?, image = ?, headline = ?, conditions = ?, link = ? WHERE id = ?`;
    db.query(sql, [color, image, headline, conditions, link, id], (err, result) => {
        if (err) return res.status(500).json({ message: "Internal server error." });
        return res.status(200).json({ message: "Bonus updated successfully." });
    });
});

*/








app.listen(8081, () => {
    console.log("Server is running on port 8081");
});