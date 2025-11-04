import fs from 'fs';
import path from 'path';

const logFile = path.join(__dirname, '../mail-log.txt');

export function logMessage(message: string) {
  const timestamp = new Date().toISOString();
  const formatted = `[${timestamp}] ${message}\n`;
  fs.appendFileSync(logFile, formatted);
  console.log(formatted);
}
