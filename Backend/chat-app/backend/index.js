const express = require('express');
const cors = require('cors');
const axios = require("axios");

const app = express();

app.use(express.json());
app.use(cors({origin:true}));

app.post("/authenticate", async (req, res) => {
    const { username } = req.body;

    try {
        const response = await axios.put("https://api.chatengine.io/users/", {
            username: username,
            first_name: "Adam",   // Example first name
            last_name: "La Morre", // Example last name
            secret: "pass1234",    // Example secret
        }, {
            headers: {
                "private-key": "01365322-fd6e-45f6-a312-f22c124219f8"
            }
        });

        return res.status(response.status).json(response.data);
    } catch (error) {
        return res.status(error.response?.status || 500).json({ error: error.response?.data || "Internal Server Error" });
    }
});

app.listen(3001);