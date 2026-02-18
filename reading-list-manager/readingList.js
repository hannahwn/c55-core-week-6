// Place here the file operation functions for loading and saving books
const fs = require('fs');
const chalk = require('chalk');

const FILE_NAME = 'books.json';

function loadBooks() {
  // TODO: Implement this function
   // Read from books.json
  try{
    const data = fs.readdirSync(FILE_NAME,'utf8');
    return JSON.parse(data);
  }
  // Handle missing file (create empty array)
  catch (error){
    if (error.code === 'ENOENT'){
      console.log(chalk.yellow('No books file found.Starting again'));
      return[];
    }
      // Handle invalid JSON (notify user, use empty array)
      if (error instanceof SyntaxError){
        console.log(chalk.red('Book file is broken. Starting fresh!'));
        return[];
      }
      //Use try-catch for error handling
      console.log(chalk.red('Error loading books:'),error.message);
      return[];
  }
  
}

function saveBooks(books) {
  // TODO: Implement this function
  // Write books array to books.json
  // Use try-catch for error handling
  try{
    const data =JSON.stringify(books,null,2);
    fs.writeFileSync(FILE_NAME,data);
    console.log(chalk.green('Saved :'));
  }
  catch (error){
    console.log(chalk.red('Save failed'),error.message);
  }
}

function addBook(book) {
  // TODO: Implement this function
}

function getUnreadBooks() {
  // TODO: Implement this function using filter()
}

function getBooksByGenre(genre) {
  // TODO: Implement this function using filter()
}

function markAsRead(id) {
  // TODO: Implement this function using map()
}

function getTotalBooks() {
  // TODO: Implement this function using length
}

function hasUnreadBooks() {
  // TODO: Implement this function using some()
}

function printAllBooks() {
  // TODO: Implement this function
  // Loop through and display with chalk
  // Use green for read books, yellow for unread
  // Use cyan for titles
}

function printSummary() {
  // TODO: Implement this function
  // Show statistics with chalk
  // Display total books, read count, unread count
  // Use bold for stats
}