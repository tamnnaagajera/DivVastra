const express = require("express");
const session = require("express-session");

const bcrypt = require("bcrypt");

const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(express.static(__dirname));

app.use(
    session({
        secret: "div-vastra-secret-key",
        resave: false,
        saveUninitialized: false
    })
);

// =========================
// SQL SERVER CONNECTION
// =========================

const sql = require("mssql/msnodesqlv8");
const dbConfig = {
    connectionString:
        "Driver={ODBC Driver 18 for SQL Server};" +
        "Server=DESKTOP-NSHHQRR\\SQLEXPRESS;" +
        "Database=DIV_VASTRA;" +
        "Trusted_Connection=Yes;" +
        "Encrypt=No;"
};



// =========================
// SIGNUP
// =========================

app.post("/signup", async (req, res) => {

    

    try {

        const { fullName, email, phone, password } = req.body;

        if (!fullName || !email || !phone || !password) {
            return res.status(400).send("Please fill all fields.");
        }

        // Check if email already exists
        const existingUser = await sql.query`
            SELECT UserID
            FROM Users
            WHERE Email = ${email}
        `;

        if (existingUser.recordset.length > 0) {
            return res.status(400).send("Email already registered.");
        }

        // Hash password
        const passwordHash = await bcrypt.hash(password, 10);

        // Save user
        await sql.query`
            INSERT INTO Users
            (FullName, Email, Phone, PasswordHash)
            VALUES
            (${fullName}, ${email}, ${phone}, ${passwordHash})
        `;

        res.send("Account created successfully!");

    } catch (error) {

        console.error("Signup error:");
        console.error(error);

        res.status(500).send("Something went wrong.");

    }

});

// =========================
// LOGIN
// =========================

app.post("/login", async (req, res) => {

    try {

        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(400).send("Please enter email and password.");
        }

        // Find user by email
        const result = await sql.query`
            SELECT UserID, FullName, Email, Phone, PasswordHash
            FROM Users
            WHERE Email = ${email}
        `;

        if (result.recordset.length === 0) {
            return res.status(401).send("Invalid email or password.");
        }

        const user = result.recordset[0];

        // Compare password
        const passwordMatch = await bcrypt.compare(
            password,
            user.PasswordHash
        );

        if (!passwordMatch) {
            return res.status(401).send("Invalid email or password.");
        }

        // Create session
        req.session.user = {
            userId: user.UserID,
            fullName: user.FullName,
            email: user.Email,
            phone: user.Phone
        };

        console.log("User logged in:", user.Email);

       res.redirect("/index.html");

    } catch (error) {

        console.error("Login error:");
        console.error(error);

        res.status(500).send("Something went wrong.");

    }

});


/// =========================
// CHECK LOGIN STATUS
// =========================

app.get("/api/me", (req, res) => {

    if (req.session && req.session.user) {

        return res.json({
            loggedIn: true,
            user: req.session.user
        });

    }

    res.json({
        loggedIn: false
    });

});


// =========================
// LOGOUT
// =========================

app.get("/logout", (req, res) => {

    req.session.destroy((err) => {

        if (err) {
            console.error("Logout error:", err);
            return res.status(500).json({
                success: false
            });
        }

        res.clearCookie("connect.sid");

        res.json({
            success: true
        });

    });

});
// =========================
// TEST DATABASE CONNECTION
// =========================

async function connectDatabase() {

    try {

        await sql.connect(dbConfig);

        console.log("SQL Server connected successfully.");

    } catch (error) {

        console.error("Database connection failed:");
        console.error(error.message);

    }

}

connectDatabase();


// =========================
// HOME
// =========================

app.get("/test", (req, res) => {

    res.send("DIV VASTRA server is working!");

});


// =========================
// START SERVER
// =========================

const PORT = 3000;

const server = app.listen(PORT, () => {
    console.log(`DIV VASTRA server running at http://localhost:${PORT}`);
});

server.on("error", (error) => {
    console.error("SERVER ERROR:");
    console.error(error);
});

console.log("Node process is still running...");