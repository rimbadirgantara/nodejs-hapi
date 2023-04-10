const {
  addNewBook,
  getAllBooks,
  getBooksById,
  updateBook,
  deleteBook,
} = require('./handler');

const routes = [
  {
    // route untuk menambahkan buku # kriteria 3
    method: 'POST',
    path: '/books',
    handler: addNewBook,
  },
  {
    // route untuk menampilkan 1 buku dengan id
    method: 'GET',
    path: '/books/{bookId}',
    handler: getBooksById,
  },
  {
    // route untuk menampilkan semua buku
    method: 'GET',
    path: '/books',
    handler: getAllBooks,
  },
  {
    // route untuk update data buku
    method: 'PUT',
    path: '/books/{bookId}',
    handler: updateBook,
  },
  {
    // route untuk update data buku
    method: 'DELETE',
    path: '/books/{bookId}',
    handler: deleteBook,
  },
];

module.exports = routes;
