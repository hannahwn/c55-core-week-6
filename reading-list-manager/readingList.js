// Place here the file operation functions for loading and saving books
const fs = require('fs');
const chalk = require('chalk');

const FILE_NAME = 'books.json';

function loadBooks() {
  try {
    const content = fs.readFileSync('./books.json', 'utf8');
    const books = JSON.parse(content);

    if (!Array.isArray(books)) {
      console.log(chalk.yellow('Books data was not an array – starting fresh'));
      return [];
    }

    return books;
  } catch (error) {
    if (error.code === 'ENOENT') {
      console.log(
        chalk.yellow('No books.json found. Starting with empty list.')
      );
      return [];
    }
    if (error instanceof SyntaxError) {
      console.log(
        chalk.red(
          'Invalid JSON in books.json – file is broken. Starting fresh!'
        )
      );
      return [];
    }
    console.log(chalk.red('Error loading books:'), error.message);
    return [];
  }
}

function saveBooks(books) {
  // TODO: Implement this function
  // Write books array to books.json
  // Use try-catch for error handling
  try {
    const data = JSON.stringify(books, null, 2);
    fs.writeFileSync(FILE_NAME, data);
    console.log(chalk.green('Saved :'));
  } catch (error) {
    console.log(chalk.red('Save failed'), error.message);
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
    read: false,
  };

  books.push(newBook);

  saveBooks(books);

  console.log(chalk.green(`✓ Added "${title}"`));

  return books;
}

function getUnreadBooks(books) {
  // TODO: Implement this function using filter()
  const unreadBooks = books.filter(function (book) {
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

  console.log('DEBUG → books type:', typeof books);
  console.log('DEBUG → is array?:', Array.isArray(books));
  console.log(
    'DEBUG → books length:',
    books?.length ?? 'N/A (books not array)'
  );

  // Safe filter – prevents crash even if array has holes, undefined items, null, etc.
  const genreBooks = books.filter(
    (book) =>
      book &&
      typeof book === 'object' && // exists & is object (not null/undefined)
      typeof book.genre === 'string' && // genre exists and is actually a string
      book.genre.toLowerCase() === genre.toLowerCase()
  );

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

function markAsRead(books, id) {
  // TODO: Implement this function using map()
  const updatedBooks = books.map(function (book) {
    if (book.id === id) {
      return {
        id: book.id,
        title: book.title,
        author: book.author,
        genre: book.genre,
        read: true,
      };
    }

    return book;
  });

  //Does book exist?

  const oldBook = books.find(function (book) {
    return book.id === id;
  });

  if (!oldBook) {
    console.log(chalk.red(`✗ Book #${id} not found!`));
    return books;
  }

  // Save changes
  saveBooks(updatedBooks);
  console.log(chalk.green(`✓ Marked "${oldBook.title}" as read!`));

  return updatedBooks;
}

function getTotalBooks(books) {
  // TODO: Implement this function using length
  const total = books.length;
  console.log(chalk.blue(`\nTotal books: ${total}`));
  return total;
}

function hasUnreadBooks(books) {
  // TODO: Implement this function using some()
  const hasUnread = books.some(function (book) {
    return book.read === false;
  });

  if (hasUnread) {
    console.log(chalk.yellow('You have books to read!'));
  } else {
    console.log(chalk.green('All books are read!'));
  }

  return hasUnread;
}

function printAllBooks(books) {
  // TODO: Implement this function
  // Loop through and display with chalk
  // Use green for read books, yellow for unread
  // Use cyan for titles
  console.log(chalk.blue('\n--- ALL BOOKS ---'));

  if (books.length === 0) {
    console.log(chalk.yellow('No books yet!'));
    return;
  }

  for (let i = 0; i < books.length; i++) {
    const book = books[i];
    let status;
    if (book.read) {
      status = chalk.green('✓ Read');
    } else {
      status = chalk.red('○ Unread');
    }
    console.log(
      `${book.id}.${chalk.cyan(book.title)} by ${book.author} - ${status}`
    );
  }
}

function printSummary(books) {
  // TODO: Implement this function
  // Show statistics with chalk
  // Display total books, read count, unread count
  // Use bold for stats
  console.log(chalk.blue('\n--- READING SUMMARY ---'));

  // Total books
  const total = books.length;
  console.log(`Total: ${total}`);

  // Count read books
  let readCount = 0;
  for (let i = 0; i < books.length; i++) {
    if (books[i].read) {
      readCount++;
    }
  }
  const unreadCount = total - readCount;

  console.log(chalk.green(`Read: ${readCount}`));
  console.log(chalk.red(`Unread: ${unreadCount}`));
}

module.exports = {
  loadBooks,
  saveBooks,
  addBook,
  getUnreadBooks,
  getBooksByGenre,
  markAsRead,
  getTotalBooks,
  hasUnreadBooks,
  printAllBooks,
  printSummary,
};
