//Book Constructor
function Book(title, author, isbn) {
    this.title = title;
    this.author = author;
    this.isbn = isbn;
}
//UI constructor

function UI() {}

//Function 1 - Add book to the table 
UI.prototype.addBookToList = function(book) {
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
    //Function 2 - Show the alert

UI.prototype.showAlert = function(message, className) {
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
    //Deleting the book title

//Function 3 - Delete the book
UI.prototype.deleteBook = function(target) {
    if (target.className === 'delete') {
        target.parentElement.parentElement.remove();
    }
}

//Function 4 - clear the book
UI.prototype.clearField = function() {

    document.getElementById('title').value = '';
    document.getElementById('author').value = '';
    document.getElementById('isbn').value = '';
}

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

        ui.showAlert('Success!! Your record has been updated', 'success');

        ui.clearField();
    }


    e.preventDefault();
});

//Event Listener for Deletion

document.getElementById('book-list').addEventListener('click', function(e) {

    const ui = new UI();

    ui.deleteBook(e.target);

    //show a message

    ui.showAlert('Book Removed', 'success');
    e.preventDefault();
});