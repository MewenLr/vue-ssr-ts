module.exports = {
  client: process.argv.includes('--client'),
  server: process.argv.includes('--server'),
  analyze: process.argv.includes('--analyze'),
  dev: process.argv.includes('--mode=development'),
  prod: process.argv.includes('--mode=production'),
}
