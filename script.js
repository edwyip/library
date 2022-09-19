class Book {
    constructor(title, author, pages, read) {
        this.title = title
        this.author = author
        this.pages = pages
        this.read = read
    }

    info() {
        return `${this.title} by ${author}, ${this.pages}, ${this.read}`
    }
}

let mylibrary = []

function addBookToLibrary(book) {
    mylibrary.push(book)
}

const OMATS = new Book("Old Man and the Sea", "Ernest Hemingway", 292, true)
const ONE984 = new Book("1984", "George Orwell", 199, false)
const METAMORPHOSIS = new Book("Metamorphosis", "Franz Kafka", 377, false)
const SUTTREE = new Book("Suttree", "Cormac McCarthy", 577, true)

addBookToLibrary(OMATS)
addBookToLibrary(ONE984)
addBookToLibrary(METAMORPHOSIS)
addBookToLibrary(SUTTREE)

const books = document.querySelector(".books")

function addBook(book) {
    const newBook = document.createElement("div")
    newBook.classList.add("book")

    //make a delete cross button
    const del = document.createElement("div")
    del.classList.add("delete-book")
    const delBtn = document.createElement("button")
    delBtn.textContent = "x"
    del.appendChild(delBtn)
    delBtn.addEventListener("click", () => {
        books.removeChild(newBook)
    })

    //make the info section
    const info = document.createElement("div")
    info.classList.add("info")
    for (let attr in book) {
        let newDiv = document.createElement("div")
        newDiv.classList.add(attr)
        switch (attr) {
            case "pages":
                newDiv.textContent = "Total Pages: " + book[attr]
                break
            case "read":
                const readText = document.createElement("span")
                readText.textContent = "Read: "

                //create input and label for Yes
                const readYes = document.createElement("div")
                const inputYes = document.createElement("input")
                inputYes.type = "radio"
                inputYes.name = book.title + "-read"
                inputYes.value = "Yes"
                inputYes.id = book.title + "-read"
                const labelYes = document.createElement("label")
                labelYes.setAttribute("for", inputYes.name)
                labelYes.textContent = "Yes"
                readYes.appendChild(inputYes)
                readYes.appendChild(labelYes)

                //create input and label for No
                const readNo = document.createElement("div")
                const inputNo = document.createElement("input")
                inputNo.type = "radio"
                inputNo.name = book.title + "-read"
                inputNo.value = "No"
                inputNo.id = book.title + "read"
                const labelNo = document.createElement("label")
                labelNo.setAttribute("for", inputNo.name)
                labelNo.textContent = "No"
                readNo.appendChild(inputNo)
                readNo.appendChild(labelNo)

                //append all the elements to div "read"
                newDiv.appendChild(readText)
                newDiv.appendChild(readYes)
                newDiv.appendChild(readNo)

                if (book[attr]) {
                    inputYes.setAttribute("checked", "")
                } else {
                    inputNo.setAttribute("checked", "")
                }
                break
            default:
                newDiv.textContent = book[attr]
        }
        info.appendChild(newDiv)
    }

    newBook.appendChild(del)
    newBook.appendChild(info)

    const books = document.querySelector(".books")
    books.appendChild(newBook)

}

function displayBooks(library) {
    for (let book of library) {
        addBook(book)
    }
}
const popup = document.querySelector(".popup-form")
let newBook = document.querySelector(".new-book > button")
newBook.addEventListener("click", () => {
    //this is a work-around by adding some timeout, otherwise the popup closing triggers immediately and close the popup again
    setTimeout(() => popup.classList.add("show-block"), 100)
})

document.addEventListener("click", (e) => {
    const isClosest = e.target.closest(".popup-form")
    if (!isClosest & popup.classList.contains("show-block")) {
        popup.classList.remove("show-block")
    }
})

//Book adding functionality, will come back later
// const submitBtn = document.querySelector(".popup-form .submit")
// submitBtn.addEventListener("click", () => {
//     let newTitle = document.querySelector(".new-title").value
//     let newAuthor = document.querySelector(".new-author").value
//     let newPages = document.querySelector(".new-pages").value
//     let newRead = document.querySelector("new-read").value
//     let book = new Book(newTitle, newAuthor, newPages, newRead)
//     addBookToLibrary(book)
// })

displayBooks(mylibrary)