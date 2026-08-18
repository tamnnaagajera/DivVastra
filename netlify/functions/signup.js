const bcrypt = require("bcrypt");

exports.handler = async (event) => {
    try {

        // Only POST allowed
        if (event.httpMethod !== "POST") {
            return {
                statusCode: 405,
                body: "Method Not Allowed"
            };
        }

        // Read form data
        const { fullName, email, phone, password } =
            JSON.parse(event.body || "{}");

        // Validate fields
        if (!fullName || !email || !phone || !password) {
            return {
                statusCode: 400,
                body: "Please fill all fields."
            };
        }

        // Supabase settings
        const supabaseUrl = process.env.SUPABASE_URL;
        const supabaseKey = process.env.SUPABASE_KEY;

        if (!supabaseUrl || !supabaseKey) {
            console.error("Supabase environment variables are missing.");

            return {
                statusCode: 500,
                body: "Server configuration error."
            };
        }

        // =========================
        // CHECK EXISTING EMAIL
        // =========================

        const checkResponse = await fetch(
            `${supabaseUrl}/rest/v1/Users?Email=eq.${encodeURIComponent(email)}&select=UserID`,
            {
                method: "GET",
                headers: {
                    apikey: supabaseKey,
                    Authorization: `Bearer ${supabaseKey}`
                }
            }
        );

        if (!checkResponse.ok) {

            const errorText = await checkResponse.text();

            console.error("Check user error:", errorText);

            return {
                statusCode: 500,
                body: "Could not check existing account."
            };
        }

        const existingUsers = await checkResponse.json();

        if (existingUsers.length > 0) {
            return {
                statusCode: 400,
                body: "Email already registered."
            };
        }

        // =========================
        // HASH PASSWORD
        // =========================

        const passwordHash = await bcrypt.hash(password, 10);

        // =========================
        // CREATE USER
        // =========================

        const insertResponse = await fetch(
            `${supabaseUrl}/rest/v1/Users`,
            {
                method: "POST",

                headers: {
                    apikey: supabaseKey,
                    Authorization: `Bearer ${supabaseKey}`,
                    "Content-Type": "application/json",
                    Prefer: "return=minimal"
                },

                body: JSON.stringify({
                    FullName: fullName,
                    Email: email,
                    Phone: phone,
                    PasswordHash: passwordHash
                })
            }
        );

        if (!insertResponse.ok) {

            const errorText = await insertResponse.text();

            console.error("Supabase insert error:", errorText);

            return {
                statusCode: 500,
                body: "Could not create account."
            };
        }

        // =========================
        // SUCCESS
        // =========================

        return {
            statusCode: 200,
            body: "Account created successfully!"
        };

    } catch (error) {

        console.error("Signup error:", error);

        return {
            statusCode: 500,
            body: "Something went wrong."
        };
    }
};