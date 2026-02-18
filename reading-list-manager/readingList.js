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

function addBook(books, titles, author, genre) {
  // TODO: Implement this function
  //Create new book
  const newBook = {
    id: books.length + 1,
    title: title,
    author: author,
    genre: genre,
    read: false
  };

  
  books.push(newBook);
  
  
  saveBooks(books);
  
  
  console.log(chalk.green(`✓ Added "${title}"`));
  
  return books;


}

function getUnreadBooks(books) {
  // TODO: Implement this function using filter()
   const unreadBooks = books.filter(function(book) {
    return book.read === false;
  });

  console.log(chalk.blue('\n--- UNREAD BOOKS ---'));
  if (unreadBooks.length === 0) {
    console.log(chalk.yellow('No unread books!'));
  } else {
    for (let i = 0; i < unreadBooks.length; i++) {
      const book = unreadBooks[i];
      console.log(`${book.id}. ${book.title} by ${book.author}`);
    }
  }
  
  return unreadBooks;


}

function getBooksByGenre(books, genre) {
  // TODO: Implement this function using filter()
   const genreBooks = books.filter(function(book) {
    return book.genre.toLowerCase() === genre.toLowerCase();
  });

  console.log(chalk.blue(`\n--- ${genre} BOOKS ---`));
  if (genreBooks.length === 0) {
    console.log(chalk.yellow(`No ${genre} books!`));
  } else {
    for (let i = 0; i < genreBooks.length; i++) {
      const book = genreBooks[i];
      const readStatus = book.read ? '✓' : '○';
      console.log(`${readStatus} ${book.id}. ${book.title} by ${book.author}`);
    }
  }
  
  return genreBooks;
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