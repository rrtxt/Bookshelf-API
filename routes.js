const { AddBookToShelves, GetBooksHandler, GetBookByIdHandler, EditBookHandler, DeleteBookByIdHandler, GetBookByFinishedStatusHandler} = require('./handler')

const routes = [
    {
     method: 'POST',
     path: '/books',
     handler: AddBookToShelves
    },
    {
     method: 'GET',
     path: '/books',
     handler: GetBooksHandler
    },
    {
     method: 'GET',
     path: '/books/{id}',
     handler: GetBookByIdHandler
    },
    {
     method: 'PUT',
     path: '/books/{id}',
     handler: EditBookHandler
    },
    {
     method: 'DELETE',
     path: '/books/{id}',
     handler: DeleteBookByIdHandler
    }
]

module.exports = routes