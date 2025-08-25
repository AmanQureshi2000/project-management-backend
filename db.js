const { Pool } = require("pg");

const pool = new Pool({
  host: process.env.DB_HOST,
  port: process.env.DB_PORT || 5432,
  user: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.DB_NAME,
  ssl: { rejectUnauthorized: false },
});

// Log successful connection
pool.connect()
  .then(() => console.log("✅ DB connected"))
  .catch(err => console.error("❌ DB connection failed:", err.message));

// Handle runtime errors so Node doesn’t crash
pool.on("error", (err) => {
  console.error("💥 Unexpected DB error:", err.message);
  // optionally reconnect logic here
});

module.exports = pool;
