const DB_URI =
  "mongodb+srv://admin:admin@cluster0.nxbdj.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";

const API =
  process.env.NODE_ENV === "production" ? "/api" : "http://localhost:3000/api";

module.exports = { DB_URI, API };
