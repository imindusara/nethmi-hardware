import { run, saveDb } from '../db/database.js';

async function update() {
  await run("UPDATE settings SET value = '+94 78 999 1624' WHERE key = 'phone'");
  await run("UPDATE settings SET value = '94789991624' WHERE key = 'whatsapp'");
  saveDb();
  console.log('✅ SQLite settings successfully updated to +94 78 999 1624 / 94789991624');
  process.exit(0);
}

update();
