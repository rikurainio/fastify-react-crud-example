import { db, initializeDatabase } from "./src/db"
import { books } from "./src/db/schema"
import { logger } from "./src/utils";

async function clearBooks(){
  await db.delete(books);
  logger.info("DB HELPER", "Deleted all rows in books table")
}

async function main (){
  await initializeDatabase()
  await clearBooks()
  process.exit(0)
}

main()