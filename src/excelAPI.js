const express = require("express");
const { auth } = require("google-auth-library");
const {google} =  require("googleapis");

const app = express();

app.get("/", async (req,res) =>{

    const auth = new google.auth.GoogleAuth({
        keyFile: "credentials.json",
        scopes: "https://www.googleapis.com/auth/spreadsheets",

    });

    const client = await auth.getClient();

    const googleSheets = google.sheets({version:"v4", auth:client});

    const spreadsheetId = "1NuwtImqfSSXduf_52o6_Z9JkOaicplfLdHl9l3Aj6OM";

    const metaData = await googleSheets.spreadsheets.get({
        auth,
        spreadsheetId,

    });
    const getRows = await googleSheets.spreadsheets.values.get({
        auth,
        spreadsheetId,
        range:"Página1",
    });

    await 
    res.send(getRows.data);
});


app.listen(1337, (req, res) => {
    
});
