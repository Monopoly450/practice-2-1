import './styles.css';
import type { Book, BookFilter } from './task1-types';
import { formatBook } from './task1-types';
import { applyFilters, filterByAuthor, filterByMinYear } from './task3-filters';
import { createBookFromForm } from './task4-integration';

// Готовые данные для старта
const initialBooks: Book[] = [
  { id: '1', title: 'TypeScript Guide', authors: ['John Doe'], year: 2023 },
  { id: '2', title: 'JavaScript Basics', authors: ['Jane Smith'], year: 2022 },
];

// Текущий список книг
const books: Book[] = [...initialBooks];

// DOM-элементы
const bookList = document.getElementById('bookList');
const bookForm = document.getElementById('bookForm') as HTMLFormElement | null;
const applyFiltersBtn = document.getElementById('applyFilters') as HTMLButtonElement | null;

function renderBooks(items: Book[]) {
  if (!bookList) return;
  bookList.innerHTML = items
    .map(book => `<div class="book-card">${formatBook(book)}</div>`)
    .join('');
}

// Отрисовать начальные книги
renderBooks(books);

// Обработчик формы
bookForm?.addEventListener('submit', (e: SubmitEvent) => {
  e.preventDefault();

  const newBook = createBookFromForm(new FormData(bookForm));

  books.push(newBook);
  renderBooks(books);
  bookForm.reset();
});

// Обработчик фильтров
applyFiltersBtn?.addEventListener('click', () => {
  const authorFilterInput = document.getElementById('filterAuthor') as HTMLInputElement | null;
  const minYearFilterInput = document.getElementById('filterYear') as HTMLInputElement | null;

  const authorQuery = authorFilterInput?.value.trim() ?? '';
  const minYearQuery = Number(minYearFilterInput?.value);

  const filters: BookFilter[] = [];

  if (authorQuery) {
    filters.push(filterByAuthor(authorQuery));
  }

  if (!Number.isNaN(minYearQuery) && minYearQuery > 0) {
    filters.push(filterByMinYear(minYearQuery));
  }

  const filteredBooks = applyFilters(books, filters);
  renderBooks(filteredBooks);
});
