// Задание 4: Интеграция с DOM (Парсинг сырых данных)
// Преобразование данных из HTML-формы в строго типизированный объект

import type { Book } from './task1-types';

/**
 * Создаёт объект Book из данных HTML-формы.
 * 
 * ВАЖНО: Данные из формы всегда приходят как строки. 
 * Ваша задача — преобразовать их в правильные типы и проверить границы значений.
 */
export function createBookFromForm(formData: FormData): Book {
  // TODO 1: Получите сырые значения полей формы
  // Используйте formData.get("fieldName") as string
  // Поля: title, authors, year, rating

  // TODO 2: Обработайте авторов
  // Разбейте строку по запятой, уберите лишние пробелы (trim), 
  // отфильтруйте пустые строки. Результат должен быть массивом string[].

  // TODO 3: Преобразуйте год
  // Если поле года заполнено, преобразуйте строку в число через parseInt(str, 10).
  // Если поле пустое, значение должно остаться undefined.

  // TODO 4: Преобразуйте и ВАЛИДИРУЕМ рейтинг
  // Если поле рейтинга заполнено, преобразуйте строку в число через parseFloat.
  // Проверьте: если полученное число меньше 0 или больше 5, 
  // выбросьте ошибку: throw new Error("Рейтинг должен быть числом от 0 до 5");
  // Если поле пустое, значение должно остаться undefined.

  // TODO 5: Сгенерируйте уникальный ID
  // Используйте встроенную функцию crypto.randomUUID()

  const title = formData.get('title') as string;
  const rawAuthors = formData.get('authors') as string;
  const rawYear = formData.get('year') as string;
  const rawRating = formData.get('rating') as string;

  const authors = rawAuthors
    .split(',')
    .map((author) => author.trim())
    .filter(Boolean);
  const year = rawYear ? parseInt(rawYear, 10) : undefined;
  const rating = rawRating ? parseFloat(rawRating) : undefined;

  if (rating !== undefined && (rating < 0 || rating > 5)) {
    throw new Error('Рейтинг должен быть числом от 0 до 5');
  }

  return {
    id: crypto.randomUUID(),
    title,
    authors,
    ...(year === undefined ? {} : { year }),
    ...(rating === undefined ? {} : { rating }),
  };
}
