const express = require("express");
const router = express.Router();
const fs = require('fs');
const { v4: uuidv4 } = require('uuid');
const path = require("path")
// const datauser = require("../UserData.json")
const filePath = path.join(__dirname, '../BlogData.json');
router.post("/CreateData", (req, res) => {
    const filePath = 'BlogData.json'; // Use .json extension for JSON files
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
            "title": req.body.title,
            "description": req.body.description,
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

router.get("/GetUserData", (req, res) => {
    // Read existing data from file
    fs.readFile(filePath, 'utf8', (readErr, data) => {
        if (readErr) {
            console.error('Error reading file:', readErr);
            res.status(500).send('Internal Server Error');
            return;
        }

        const userData = JSON.parse(data);
        res.status(200).json(userData);
    });
});

// Delete user data from file
router.delete("/DeleteUserData/:id", (req, res) => {
    const userId = req.params.id;

    // Read existing data from file
    fs.readFile(filePath, 'utf8', (readErr, data) => {
        if (readErr) {
            console.error('Error reading file:', readErr);
            res.status(500).send('Internal Server Error');
            return;
        }

        // Parse existing data
        const existingData = JSON.parse(data);

        // Find the index of the user with the specified id
        const userIndex = existingData.findIndex(user => user.id === userId);

        // If user not found, return 404 Not Found
        if (userIndex === -1) {
            res.status(404).send('User not found');
            return;
        }

        // Remove the user from the array
        existingData.splice(userIndex, 1);

        // Convert the updated data to JSON format
        const updatedFileContent = JSON.stringify(existingData, null, 2);

        // Write the updated data back to the file
        fs.writeFile(filePath, updatedFileContent, (writeErr) => {
            if (writeErr) {
                console.error('Error writing file:', writeErr);
                res.status(500).send('Internal Server Error');
            } else {
                console.log('User deleted successfully.');
                res.status(204).send(); // 204 No Content
            }
        });
    });
})

module.exports = router;
