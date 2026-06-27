 const User = require("../models/user");
const { setUser } = require("../service/auth");

// -------------------- Signup --------------------

async function handleUserSignup(req, res) {
    try {
        const { name, email, password } = req.body;

        if (!name || !email || !password) {
            return res.render("signup", {
                error: "All fields are required",
            });
        }

        const existingUser = await User.findOne({ email });

        if (existingUser) {
            return res.render("signup", {
                error: "Email already exists",
            });
        }

        await User.create({
            name,
            email,
            password,
        });

        return res.redirect("/login");

    } catch (err) {
        console.log(err);

        return res.render("signup", {
            error: "Something went wrong",
        });
    }
}

// -------------------- Login --------------------

async function handleUserLogin(req, res) {
    try {

        const { email, password } = req.body;

        console.log("Email :", email);
        console.log("Password :", password);

        const user = await User.findOne({ email });

        console.log("User :", user);

        if (!user) {
            return res.render("login", {
                error: "Invalid Email or Password",
            });
        }

        if (user.password !== password) {
            return res.render("login", {
                error: "Invalid Email or Password",
            });
        }

        const token = setUser(user);

        res.cookie("uid", token, {
            httpOnly: true,
        });

        return res.redirect("/");

    } catch (err) {

        console.log(err);

        return res.render("login", {
            error: "Something went wrong",
        });
    }
}

module.exports = {
    handleUserSignup,
    handleUserLogin,
};