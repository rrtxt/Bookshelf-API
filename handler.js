const { nanoid } = require('nanoid')
const books = require('./books')

const AddBookToShelves = (request, h) => {
    const { name, year, author, summary, 
        publisher, pageCount, readPage, reading } = request.payload

    const id = nanoid(16)
    const insertedAt = new Date().toISOString
    const updatedAt = insertedAt

    const finished = (readPage === pageCount)? true : false

    const newBook = { id, name, year, author, summary, 
                    publisher, pageCount, readPage, finished, 
                    reading, insertedAt, updatedAt }

    if(name == undefined || name == ""){
        const response = h.response({
            status: 'fail',
            message: 'Gagal menambahkan buku. Mohon isi nama buku'
        })
        response.code(400)
        return response
    }

    if( readPage > pageCount ){
        const response = h.response({
            status: 'fail',
            message: 'Gagal menambahkan buku. readPage tidak boleh lebih besar dari pageCount'
        })
        response.code(400)
        return response
    }

    books.push(newBook)

    const isSuccess = books.filter((book) => book.id === id).length > 0
    if(isSuccess){
        const response = h.response({
            status: 'success',
            message: 'Buku berhasil ditambahkan',
            data : {
                bookId : id
            }
        })
        response.code(201)
        return response
    }
    
    const response = h.response({
        status: 'fail',
        message: 'Buku gagal ditambahkan'
    })
    response.code(500)
    return response

}

const GetBooksHandler = (request, h) => {
    const {name, finished, reading} = request.query
    let sortedBooks = []

    if(name !== undefined){
        sortedBooks = books.filter((book) => book.name.toLowerCase().includes(name.toLowerCase()))
        console.log(sortedBooks)
        const response = h.response({
            status: 'Success',
            books: {sortedBooks}
        })
        console.log(books)
        response.code(200)
        return response
    }

    if(finished !== undefined){
        sortedBooks = books.filter((book) => book.finished == (finished == 1))
        const response = h.response({
            status: 'Success',
            books: {sortedBooks}
        })
        response.code(200)
        return response
    }

    if(reading !== undefined){
        sortedBooks = books.filter((book) => book.reading == (reading == 1))
        const response = h.response({
            status: 'Success',
            books: {sortedBooks}
        })
        response.code(200)
        return response
    }

    return h.response({ status: 'Success',
                      books: {books}})

}

const GetBookByIdHandler = (request, h) => {
    const {id} = request.params
    
    const book = books.filter((n) => n.id === id)[0]

    if(book !== undefined){
        return{
            status: 'Success',
            data: {
                book
            }
        }
    }

    const response = h.response({
        status: 'Fail',
        message: 'Buku tidak ditemukan'
    })
    response.code(404)
    return response
}

const EditBookHandler = (request, h) => {
    const {id} = request.params
    const {name, year, author, summary, 
        publisher, pageCount, readPage, reading} = request.payload
    const updatedAt = new Date().toISOString()
    const index = books.findIndex((book) => book.id === id)
    

    if(name == null || name == ""){
      const response = h.response({
            status: 'Fail',
            message: 'Gagal memperbarui buku. Mohon isi nama buku'
        })
        response.code(400)
        return response
    }

    if(readPage > pageCount){
        const response = h.response({
            status: 'Fail',
            message: 'Gagal memprebarui buku. readPage tidak boleh lebih besar dari pageCount'
        })
        response.code(400)
        return response
    }

    if(index !== -1){
      books[index] = {
        ...books[index] = {
            id, name, year, author, summary,
            publisher, pageCount, readPage, 
            reading, updatedAt
        }
      }

      const response = h.response({
        status: 'Success',
        message: 'Buku berhasil diperbarui'
      })
      response.code(200)
      return response
    }

    const response = h.response({
        status: 'Fail',
        message: 'Gagal memperbarui buku. Id tidak ditemukan'
    })
    response.code(404)
    return response 
}

const DeleteBookByIdHandler = (request, h) => {
    const {id} = request.params 
    const index = books.findIndex((book) => book.id === id)

    if(index !== -1){
        books.splice(index, 1)
        const response = h.response ({
            status: 'Success',
            message: 'Buku berhasil dihapus'
        })
        response.code(200)
        return response
    }

    const response = h.response({
        status: 'Fail',
        message: 'Buku gagal dihapus, Id tidak ditemukan'
    })
    response.code(404)
    return response
}

module.exports = {AddBookToShelves, GetBooksHandler, GetBookByIdHandler, 
    EditBookHandler, DeleteBookByIdHandler}
