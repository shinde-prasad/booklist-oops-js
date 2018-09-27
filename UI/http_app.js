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
        <td>
            <a href='#' id='delete' title='delete this record?' class='delete'>X</a>
        </td>
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

const ui = new UI();
const http = new easyHttp();
document.addEventListener('DOMContentLoaded', displayBooks);

function displayBooks() {
    console.log("Inside GET displaybooks")
    const http = new easyHttp();
    http.get("/getAllBooks")
        .then(data => {
            if (data.result.length) {
                data.result.forEach(function (book) {
                    const ui = new UI();
                    ui.addBookToList(book);
                });
            }
        })
        .catch(err => console.log(err));
}

// Event Listener
document.getElementById("book-form").addEventListener("submit", function (e) {
    // While form submitting values, prevent default action
    e.preventDefault();

    // Get Values
    const title = document.getElementById("title").value,
        author = document.getElementById("author").value,
        isbn = document.getElementById("isbn").value;

    const book = new Book(title, author, isbn);

    // Add book into list
    if (!book.title && !book.author && !book.isbn) {
        ui.showAlerts("Please fill all necessary fields", 'error');
    } else {
        http.post("/addBook", book).then(data => {
            ui.showAlerts("Successfully added!", "success")
            ui.addBookToList(book);
            ui.clearFormFields();
        }).catch(error => {
            ui.showAlerts("There is some error while saving record: " + error, "error");
        });
    }
});

// delete event listener 
document.getElementById("book-list").addEventListener("click", function (e) {
    const ui = new UI();
    ui.deleteBook(e.target);
    // store.removeBook(e.target.parentElement.previousElementSibling.textContent);
    ui.showAlerts("Successfully deleted!", "success");

    e.preventDefault();
});