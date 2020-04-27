//Using ES6
class Book {
    constructor(title, author, isbn) {
        this.title = title;
        this.author = author;
        this.isbn = isbn;
    }
}

class UI {
    addBookToList(book) {
        const list = document.getElementById('book-list');
        const row = document.createElement('tr');
        //insert value
        row.innerHTML = `
        <td>${book.title}</td>
        <td>${book.author}</td>
        <td>${book.isbn}</td>
        <td><a href="" class="delete">X</a></td>`;
        list.appendChild(row);
    }

    showAlert(message, className) {
        const div = document.createElement('div');
        //Adding a classNamme
        div.className = `alert ${className}`;
        //Adding a text
        div.appendChild(document.createTextNode(message));

        //get the parent to insert into the DOM

        const container = document.querySelector('.container');
        const form = document.querySelector('#book-form');
        container.insertBefore(div, form);

        //disappear after 3 seconds
        setTimeout(function() {
            document.querySelector('.alert').remove()
        }, 3000);

    }

    deleteBook(target) {
        if (target.className === 'delete') {
            target.parentElement.parentElement.remove();
            this.showAlert('Book Removed', 'success');
        }
    }

    clearField() {
        document.getElementById('title').value = '';
        document.getElementById('author').value = '';
        document.getElementById('isbn').value = '';
    }
}
//Local Storage Class

class Store {
    static getBooks() {
        let books;
        if (localStorage.getItem('books') === null) {
            books = [];
        } else {
            books = JSON.parse(localStorage.getItem('books'));
        }
        return books;
    }
    static displayBooks() {
        const books = Store.getBooks();

        books.forEach(function(book) {
            const ui = new UI();
            ui.addBookToList(book);
        })
    }
    static addBook(book) {
        const books = Store.getBooks();
        books.push(book);
        localStorage.setItem('books', JSON.stringify(books));
    }
    static removeBook(isbn) {
        const books = Store.getBooks();

        books.forEach(function(book, index) {
            if (book.isbn === isbn) {
                books.splice(index, 1);
            }
        });
        localStorage.setItem('books', JSON.stringify(books));
    }
}

//DOM load event

document.addEventListener('DOMContentLoaded', Store.displayBooks);

//Event listener to add the books
document.getElementById('book-form').addEventListener('submit', function(e) {
    const title = document.getElementById('title').value,
        author = document.getElementById('author').value,
        isbn = document.getElementById('isbn').value
    const book = new Book(title, author, isbn);
    //UI constructor created on top and methods were added using prototype

    const ui = new UI();
    //Validate 

    if (title === '' || author === '' || isbn === '') {
        ui.showAlert('Please fill in all fields', 'error');
    } else {
        ui.addBookToList(book);

        //add to Local Storage
        Store.addBook(book);

        ui.showAlert('Success!! Your record has been updated', 'success');

        ui.clearField();
    }
    e.preventDefault();
});

//Event Listener for Deletion

document.getElementById('book-list').addEventListener('click', function(e) {

    const ui = new UI();

    ui.deleteBook(e.target);
    //Remove from Local Storage
    Store.removeBook(e.target.parentElement.previousElementSibling.textContent);
    e.preventDefault();
});