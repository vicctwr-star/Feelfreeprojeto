const { PrismaClient } = require("../generated/prisma");
const db = new PrismaClient();
module.exports = { db };