const express = require("express");
const router = express.Router();
const fs = require('fs');
const { v4: uuidv4 } = require('uuid');
const path = require("path");
const { route } = require("./Data");
// const datauser = require("../UserData.json")
const filePath = path.join(__dirname, '../UserData.json');
router.post("/CreateUser", (req, res) => {
    const filePath = 'UserData.json'; // Use .json extension for JSON files
    // Read existing data from file, if it exists
    fs.readFile(filePath, 'utf8', (readErr, data) => {
        if (readErr && readErr.code !== 'ENOENT') {
            console.error('Error reading file:', readErr);
            res.status(500).send('Internal Server Error');
            return;
        }
        const existingData = data ? JSON.parse(data) : [];
        // Add new user data to the existing data with a generated id
        const newUserData = {
            id: uuidv4(), // Generate a unique id
            "name": req.body.name,
            "email": req.body.email,
            "password": req.body.password
        };

        existingData.push(newUserData);

        // Convert the updated data to JSON format
        const fileContent = JSON.stringify(existingData, null, 2);

        // Write the updated data back to the file
        fs.writeFile(filePath, fileContent, (writeErr) => {
            if (writeErr) {
                console.error('Error writing file:', writeErr);
                res.status(500).send('Internal Server Error');
            } else {
                console.log('File updated successfully.');
                res.status(200).json(newUserData);
            }
        });
    });
});
router.post("/Login", (req, res) => {
    const { email, password } = req.body;
    // Read existing data from file
    fs.readFile(filePath, 'utf8', (readErr, data) => {
        if (readErr) {
            console.error('Error reading file:', readErr);
            res.status(500).send('Internal Server Error');
            return;
        }

        const existingData = data ? JSON.parse(data) : [];
        
        // Find the user with the provided email and password
        const user = existingData.find(u => u.email === email && u.password === password);

        if (user) {
            // User found, send success message
            res.status(200).json({ message: 'You are successfully logged in.' });
        } else {
            // User not found, send error message
            res.status(404).json({ message: 'Account not found you are not not Login.' });
        }
    });
});


router.get('/getUser/:id', (req, res) => {
    const userId = req.params.id;
    // Read existing data from file
    fs.readFile(filePath, 'utf8', (readErr, data) => {
        if (readErr) {
            console.error('Error reading file:', readErr);
            res.status(500).send('Internal Server Error');
            return;
        }

        const existingData = data ? JSON.parse(data) : [];

        // Find the user with the specified id
        const user = existingData.find(u => u.id === userId);

        if (user) {
            // User found, send user data
            res.status(200).json(user);
        } else {
            // User not found, send error message
            res.status(404).json({ message: 'User not found.' });
        }
    });
});

module.exports = router