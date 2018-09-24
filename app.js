// class based approach ES6 
class Book {
    constructor(title, author, isbn) {
        this.title = title;
        this.author = author;
        this.isbn = isbn;
    }

    isEmptyAll() {
        return Object.values(this).every(x => (x === null || x === ''));
    }
}

class UI {

    addBookToList(bookObj) {
        // select tablebody
        const list = document.getElementById("book-list");

        // create row
        const row = document.createElement("tr");

        row.innerHTML = `
        <td>${bookObj.title}</td>
        <td>${bookObj.author}</td>
        <td>${bookObj.isbn}</td>
        <td><a href='#' id='delete' title='delete this record?' class='delete'>X</a></td>
    `;

        list.appendChild(row);
        // UI.clearFormFields();

    }

    clearFormFields() {
        document.getElementById('book-form').reset();
    }

    deleteBook(target) {
        if (target.className === 'delete') {
            target.parentElement.parentElement.remove();
        }
    }

    showAlerts(msg, className) {
        const div = document.createElement("div");
        div.className = `alert ${className}`;

        div.appendChild(document.createTextNode(msg));

        const container = document.querySelector(".container");

        const form = document.querySelector("#book-form");

        container.insertBefore(div, form);

        // after 3s

        setTimeout(function () {
            document.querySelector('.alert').remove();
        }, 3000);
    }

}

// Localstorage

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
        let books = Store.getBooks();

        books.forEach(function (book) {
            const ui = new UI();
            ui.addBookToList(book);
        });
    }

    static addBook(book) {
        const books = Store.getBooks();
        books.push(book);

        localStorage.setItem("books", JSON.stringify(books));
    }

    static removeBook(isbn) {
        const books = Store.getBooks();
        
        books.forEach(function(book, index) {
            if(book.isbn === isbn){
                books.splice(index, 1);
            }
        });

        localStorage.setItem("books", JSON.stringify(books));
    }
}



/* function based approach ES5
// Book Constructor
function Book(title, author, isbn) {
    this.title = title;
    this.author = author;
    this.isbn = isbn;

    this.isEmptyAll = Object.values(this).every(x => (x === null || x === ''));

}

// UI constructor
function UI() { }

UI.prototype.addBookToList = function (bookObj) {
    // select tablebody
    const list = document.getElementById("book-list");

    // create row
    const row = document.createElement("tr");

    row.innerHTML = `
        <td>${bookObj.title}</td>
        <td>${bookObj.author}</td>
        <td>${bookObj.isbn}</td>
        <td><a href='#' id='delete' title='delete this record?' class='delete'>X</a></td>
    `;

    list.appendChild(row);
    // UI.clearFormFields();
};

UI.prototype.clearFormFields = function () {
    document.getElementById('book-form').reset();
};

UI.prototype.deleteBook = function (target) {
    if (target.className === 'delete') {
        target.parentElement.parentElement.remove();
    }
}

UI.prototype.showAlerts = function (msg, className) {
    const div = document.createElement("div");
    div.className = `alert ${className}`;

    div.appendChild(document.createTextNode(msg));

    const container = document.querySelector(".container");

    const form = document.querySelector("#book-form");

    container.insertBefore(div, form);

    // after 3s

    setTimeout(function () {
        document.querySelector('.alert').remove();
    }, 3000);
}
*/

document.addEventListener('DOMContentLoaded', Store.displayBooks())

// Event Listener
document.getElementById("book-form").addEventListener("submit", function (e) {
    // While form submitting values, prevent default action
    e.preventDefault();

    // Get Values
    const title = document.getElementById("title").value,
        author = document.getElementById("author").value,
        isbn = document.getElementById("isbn").value;

    const book = new Book(title, author, isbn);
    const ui = new UI();
    
    console.log(book)
    // Add book into list
    if (!book.title && !book.author && !book.isbn) {
        ui.showAlerts("Please fill all necessary fields", 'error');
    } else {
        ui.addBookToList(book);
        ui.showAlerts("Successfully added!", "success")
        
        Store.addBook(book);
        ui.clearFormFields();
    }
});

// event listener for delete
document.getElementById("book-list").addEventListener("click", function (e) {
    const ui = new UI();
    ui.deleteBook(e.target);
    Store.removeBook(e.target.parentElement.previousElementSibling.textContent);
    ui.showAlerts("Successfully deleted!", "success");

    e.preventDefault();
});