require("dotenv").config();

const mongoose = require("mongoose");

(async () => {
    try {
        console.log(process.env.MONGO_URL);

        await mongoose.connect(process.env.MONGO_URL);

        console.log("✅ MongoDB Connected Successfully");

        process.exit(0);
    } catch (err) {
        console.error(err);

        process.exit(1);
    }
})();