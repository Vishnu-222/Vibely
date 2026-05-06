const mongoose = require('mongoose');

// Force Node.js to use Google DNS
const dns = require("dns");
dns.setDefaultResultOrder("ipv4first");
dns.setServers(["8.8.8.8", "8.8.4.4"]);


function connectToDB() {
    mongoose.connect(process.env.MONGO_URI)
    .then(()=>{
        console.log("Connected to database successfully");
    })
}


module.exports = connectToDB;