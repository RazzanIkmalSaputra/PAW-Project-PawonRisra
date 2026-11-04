const path = require('path');

module.exports = {
  appName: 'Pawon Risra',
  port: process.env.PORT || 3000,
  logDir: path.join(__dirname, '..', 'logs'),
  logFile: 'logger.md',
};  