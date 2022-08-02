const { auth } = require("google-auth-library");
const {google} =  require("googleapis");


const auth = new google.auth.GoogleAuth({
    keyFile: "credentials.json",
    scopes: "https://www.googleapis.com/auth/spreadsheets",

});

const client = await auth.getClient();

const googleSheets = google.sheets({version:"v4", auth:client});

const spreadsheetId = "1SlSyc4-JEI8RmnhcmaQZ412An9Dcp9kk8kWiChi1Qwo";



await googleSheets.spreadsheets.values.append({
    auth,
    spreadsheetId,
    range:"AC List A!B:C",
    valueInputOption: "RAW",
    resource:{
        values:["Make a tutorial", "test"]
    }
});
//await res.send(getRows.data);
