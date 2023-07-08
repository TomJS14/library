/** @format */

const addBook = document.querySelector(".new");
const main = document.querySelector("main");
const libraryContainer = document.querySelector(".libraryContainer");
const modal = document.querySelector(".modal");
const openModal = document.querySelector(".open-button");
const closeModal = document.querySelector(".close-button");
let deleteButton = "";
let readButton = "";
let card;

//get elements of form input
const bookForm = document.querySelector(".book-form");
const titleInput = document.querySelector("#title-input");
const authorInput = document.querySelector("#author-input");
const pageInput = document.querySelector("#page-input");
const readInput = document.querySelector("#read-input");
const submit = document.querySelector("#submit-button");
const closeButton = document.querySelector("#close-button");

//Save books in library array
let myLibrary = [];

class Book {
  constructor(title, author, pages, read) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.read = read;
  }

  get bookTitle() {
    return `The title is ${this.title}`;
  }

  get bookAuthor() {
    return `The author is ${this.author}`;
  }
  //Set new author - to be used when edit button added
  set newAuthor(author) {
    this.author = author;
  }
}

// the constructor for creating new books

const addBookToLibrary = () => {
  let title = titleInput.value;
  let author = authorInput.value;
  let pages = pageInput.value;
  let read = readInput.checked;
  let newBook = new Book(title, author, pages, read);
  myLibrary.push(newBook);
  displayLibrary();
};

submit.addEventListener("click", (e) => {
  if (!titleInput.validity.valid) {
    showError();
    e.preventDefault();
    return;
  }
  if (!pageInput.validity.valid) {
    showError();
    e.preventDefault();
    return;
  }
  addBookToLibrary();
  bookForm.reset();
  modal.close();
});

closeButton.addEventListener("click", (e) => {
  e.preventDefault();
  modal.close();
});

const displayLibrary = () => {
  //clear the books from the display, so the function can loop the full array and display all PLUS the newly added book
  libraryContainer.textContent = "";
  //declare index variable for books in the array
  let index;
  let status;

  myLibrary.forEach((book, i) => {
    index = i; // assign current index of the book
    status = "";
    //Card for the book
    card = document.createElement("div");
    card.classList.add("booksCard");

    //title
    let titleSpan = document.createElement("span");
    titleSpan.textContent = `Title: ${book.title}`;
    card.appendChild(titleSpan);

    //author
    let authorSpan = document.createElement("span");
    authorSpan.textContent = `Author: ${book.author}`;
    card.appendChild(authorSpan);

    //pages
    let pageSpan = document.createElement("span");
    pageSpan.textContent = `Pages: ${book.pages} `;
    card.appendChild(pageSpan);

    //read button
    readButton = document.createElement("button");
    readButton.classList.add("read-button");
    readButton.textContent = "";
    readButton.setAttribute("data-status", book.read);
    readButton.setAttribute("data-index", i);
    card.appendChild(readButton);

    //read status check
    if (book.read === true) {
      readButton.textContent = "Book is read";
      readButton.setAttribute("style", "background-color: green");
      card.setAttribute("style", "border-left: 4px solid green");
    } else if (book.read === false) {
      readButton.textContent = "Book is unread";
      readButton.setAttribute("style", "background-color: lightcoral");
      card.setAttribute("style", "border-left: 4px solid red");
    }

    //delete button
    deleteButton = document.createElement("button");
    deleteButton.classList.add("delete-button");
    deleteButton.textContent = "Delete";
    deleteButton.setAttribute("data-index", index);
    card.appendChild(deleteButton);

    //append the new dom elements
    libraryContainer.appendChild(card);
  });
};
/* delete the book */
libraryContainer.addEventListener("click", (e) => {
  if (e.target.classList.contains("delete-button")) {
    const index = e.target.getAttribute("data-index");
    if (index !== null) {
      //remove the book from the myLibrary array
      myLibrary.splice(index, 1);
      displayLibrary(); //update the displayed library
    }
  }
});

/* Update the read status */

libraryContainer.addEventListener("click", (e) => {
  if (e.target.classList.contains("read-button")) {
    const status = e.target.getAttribute("data-status");
    const index = e.target.getAttribute("data-index");

    if (status == "true") {
      myLibrary[index].read = false;
      e.target.textContent = "Book is unread";
      e.target.setAttribute("data-status", false);
      e.target.setAttribute("style", "background-color: lightcoral");
      const thisCard = e.target.closest(".booksCard");
      thisCard.setAttribute("style", "border-left: 4px solid red");
    } else if (status == "false") {
      myLibrary[index].read = true;
      e.target.textContent = "Book is read";
      e.target.setAttribute("data-status", true);
      e.target.setAttribute("style", "background-color: green");
      const thisCard = e.target.closest(".booksCard");
      thisCard.setAttribute("style", "border-left: 4px solid green");
    }
  }
});

//Open the Modal to add a book
openModal.addEventListener("click", () => {
  modal.showModal();
});

//Check if click is outside the bounds of the modal
//If so, close the modal
modal.addEventListener("click", (e) => {
  const dialogDimensions = modal.getBoundingClientRect();
  if (
    e.clientX < dialogDimensions.left ||
    e.clientX > dialogDimensions.right ||
    e.clientY < dialogDimensions.top ||
    e.clientY > dialogDimensions.bottom
  ) {
    modal.close();
  }
});

/* Form Validation */

const titleError = document.querySelector(".title-error");

//bookForm
//titleInput
//titleError

//pageInput

titleInput.addEventListener("keyup", (e) => {
  if (titleInput.validity.valid) {
    titleError.textContent = "";
    titleError.className = "error";
  } else {
    showError();
  }
});

pageInput.addEventListener("keyup", (e) => {
  if (pageInput.validity.valid) {
    titleError.textContent = "";
    titleError.className = "error";
  } else {
    showError();
  }
});

function showError() {
  if (titleInput.validity.tooShort) {
    titleError.textContent = `Title should be at least ${titleInput.minLength} characters, you only entered ${titleInput.value.length}`;
  }
  if (pageInput.validity.rangeUnderflow) {
    titleError.textContent = "Not enough pages bro";
  }
  if (pageInput.validity.rangeOverflow) {
    titleError.textContent = "Too many pages bro";
  }
  titleError.className = "error active";
}
