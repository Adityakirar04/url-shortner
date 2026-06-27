 const User = require("../models/user");

const { setUser } = require("../service/auth");

// -------------------- Signup --------------------

async function handleUserSignup(req, res) {
    try {

        const { name, email, password } = req.body;

        if (!name || !email || !password) {
            return res.status(400).render("signup", {
                error: "All fields are required",
            });
        }

        const existingUser = await User.findOne({ email });

        if (existingUser) {
            return res.status(400).render("signup", {
                error: "Email already exists",
            });
        }

        await User.create({
            name,
            email,
            password,
        });

        return res.redirect("/login");

    } catch (error) {

        console.error("Signup Error:", error);

        return res.status(500).render("signup", {
            error: "Something went wrong",
        });

    }
}

// -------------------- Login --------------------

async function handleUserLogin(req, res) {
    try {

        const { email, password } = req.body;

        const user = await User.findOne({
            email,
            password,
        });

        if (!user) {
            return res.status(401).render("login", {
                error: "Invalid Email or Password",
            });
        }

        // Generate JWT Token
        const token = setUser(user);

        // Store JWT in Cookie
        res.cookie("uid", token, {
            httpOnly: true,
        });

        return res.redirect("/");

    } catch (error) {

        console.error("Login Error:", error);

        return res.status(500).render("login", {
            error: "Something went wrong",
        });

    }
}

module.exports = {
    handleUserSignup,
    handleUserLogin,
};