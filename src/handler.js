/* eslint-disable no-plusplus */
/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable object-curly-newline */
/* eslint-disable consistent-return */
const { nanoid } = require('nanoid');
const Books = require('./books');

// function untuk meng-efisiensi kan respone ke klien
const giveRespone = (request, h, status_, message_, code) => {
  const response = h.response({
    status: status_,
    message: message_,
  }).code(code);
  return response;
};

// lulus testing
const addNewBook = (request, h) => {
  const { name, year, author, summary, publisher, pageCount, readPage, reading } = request.payload;
  const bookId = nanoid(16);
  const id = bookId;
  const finished = false;
  const now = new Date();
  const insertedAt = now.toISOString();
  const updatedAt = insertedAt;

  // mengecek apakah properti "name" terdapat pada request body
  if (!name) {
    return giveRespone(request, h, 'fail', 'Gagal menambahkan buku. Mohon isi nama buku', 400);
  }

  // mengecek apakah properti "readPage" lebih besar dari pada "pageCount"
  if (readPage > pageCount) {
    return giveRespone(request, h, 'fail', 'Gagal menambahkan buku. readPage tidak boleh lebih besar dari pageCount', 400);
  }

  const theAllData = {
    id,
    name,
    year,
    author,
    summary,
    publisher,
    pageCount,
    readPage,
    finished,
    reading,
    insertedAt,
    updatedAt,
  };

  Books.push(theAllData);
  const berhasil = Books.filter((book) => book.id === bookId).length > 0;
  if (berhasil) {
    const response = h.response({
      status: 'success',
      message: 'Buku berhasil ditambahkan',
      data: {
        bookId,
      },
    }).code(201);
    return response;
  }

  const response = h.response({
    status: 'fail',
    message: 'gagal tambah buku',
  }).code(400);
  return response;
};

// lulus testing
const getAllBooks = (request, h) => {
  const { name, reading, finished } = request.query;

  let bukuFilter = Books;

  if (name !== undefined) {
    bukuFilter = bukuFilter.filter((book) => book.name !== undefined && book
      .name.toLowerCase().includes(name.toLowerCase()));
  }

  if (reading !== undefined) {
    const selesaiBaca = Number.parseInt(reading, 10) === 1;
    bukuFilter = bukuFilter.filter((book) => book.reading === selesaiBaca);
  }

  if (finished !== undefined) {
    const diSelesaikan = Number.parseInt(finished, 10) === 1;
    bukuFilter = bukuFilter.filter((book) => book.finished === diSelesaikan);
  }

  const response = h.response({
    status: 'success',
    data: {
      books: bukuFilter.map((book) => ({
        id: book.id,
        name: book.name,
        publisher: book.publisher,
      })),
    },
  });
  response.code(200);

  return response;
};

const getBooksById = (request, h) => {
  const { bookId } = request.params;
  const book = Books.filter((theBook) => theBook.id === bookId)[0];
  if (book) {
    const response = h.response({
      status: 'success',
      data: {
        book,
      },
    });
    response.code(200);
    return response;
  }
  return giveRespone(request, h, 'fail', 'Buku tidak ditemukan', 404);
};

// lulus testing
const updateBook = (request, h) => {
  const { bookId } = request.params;
  const { name, year, author, summary, publisher, pageCount, readPage } = request.payload;
  const finished = false;
  const reading = false;
  const now = new Date();
  const insertedAt = now.toISOString();
  const updatedAt = insertedAt;

  // mengecek apakah properti "name" terdapat pada request body
  if (!name) {
    return giveRespone(request, h, 'fail', 'Gagal memperbarui buku. Mohon isi nama buku', 400);
  }

  // mengecek apakah properti "readPage" lebih besar dari pada "pageCount"
  if (readPage > pageCount) {
    return giveRespone(request, h, 'fail', 'Gagal memperbarui buku. readPage tidak boleh lebih besar dari pageCount', 400);
  }

  const index = Books.findIndex((book) => book.id === bookId);

  if (index !== -1) {
    Books[index] = {
      ...Books[index],
      name,
      year,
      author,
      summary,
      publisher,
      pageCount,
      readPage,
      finished,
      reading,
      insertedAt,
      updatedAt,
    };
    return giveRespone(request, h, 'success', 'Buku berhasil diperbarui', 200);
  }

  return giveRespone(request, h, 'fail', 'Gagal memperbarui buku. Id tidak ditemukan', 404);
};

// lulus testing
const deleteBook = (request, h) => {
  const { bookId } = request.params;

  const index = Books.findIndex((book) => book.id === bookId);
  if (index !== -1) {
    Books.splice(index, 1);
    return giveRespone(request, h, 'success', 'Buku berhasil dihapus', 200);
  }
  return giveRespone(request, h, 'fail', 'Buku gagal dihapus. Id tidak ditemukan', 404);
};

module.exports = {
  addNewBook,
  getAllBooks,
  getBooksById,
  updateBook,
  deleteBook,
};
