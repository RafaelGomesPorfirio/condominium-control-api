import app from "./src/app";
import { PrismaClient } from "./src/generated/prisma";

const prisma = new PrismaClient();

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Serve rodando:  http://localhost:${PORT}`);
  console.log(` http://localhost:${PORT}/docs`);
});
