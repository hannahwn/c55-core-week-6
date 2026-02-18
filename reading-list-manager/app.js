// This is the entrypoint for your application.
// node app.js

// TODO: Implement the main application logic here
const readingList = require('./readingList');
const chalk = require('chalk');

function main() {
  console.log(chalk.blue('=== MY READING LIST ==='));

  // 1. Load books on startup
  let myBooks = readingList.loadBooks();
  // 2. Display all books
  readingList.showAllBooks(myBooks);
  // 3. Show summary statistics
  readingList.printSummary(myBooks);
  // 4. Add example of filtering by genre or read/unread status
  readingList.getBooksByGenre(myBooks);
  // 5. Add example of marking a book as read
  console.log(chalk.blue('/n === Marking a book as read ==='));
  myBooks = readingList.markAsRead(myBooks);
}

main();

console.log('📚 MY READING LIST 📚\n');

// Your implementation here
