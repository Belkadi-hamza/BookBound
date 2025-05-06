import booksData from '../data/books.json';

export interface Book {
  id: string;
  title: string;
  author: string;
  cover: string | null;
  rating: number | null;
  description: string;
  publishedDate: string;
  publisher: string | null;
  isbn: string;
  pageCount: number;
  categories: string[];
  language: string;
}

export const getFeaturedBooks = async (): Promise<Book[]> => {
  return booksData.map(book => ({
    ...book,
    isbn: book.isbn.toString(),
    cover: book.cover || 'https://placehold.co/400x600?text=No+Cover',
    rating: book.rating || 3.5
  }));
};

export const getBookById = async (id: string): Promise<Book | null> => {
  const book = booksData.find(book => book.id === id);
  
  if (!book) return null;

  return {
    ...book,
    cover: book.cover || 'https://placehold.co/400x600?text=No+Cover',
    rating: book.rating || 3.5
  };
};

export const searchBooks = async (query: string, offset: number = 0, limit: number = 10): Promise<{ books: Book[], total: number }> => {
  const normalizedQuery = query.toLowerCase();
  
  // Handle author search
  if (normalizedQuery.startsWith('inauthor:')) {
    const authorName = normalizedQuery.replace('inauthor:', '').trim().replace(/"/g, '');
    const filteredBooks = booksData.filter(book => 
      book.author.toLowerCase().includes(authorName.toLowerCase())
    );

    return {
      books: filteredBooks.slice(offset, offset + limit).map(book => ({
        ...book,
        isbn: book.isbn.toString(),
        cover: book.cover || 'https://placehold.co/400x600?text=No+Cover',
        rating: book.rating || 3.5
      })),
      total: filteredBooks.length
    };
  }

  // General search across title and author
  const filteredBooks = booksData.filter(book =>
    book.title.toLowerCase().includes(normalizedQuery) ||
    book.author.toLowerCase().includes(normalizedQuery)
  );

  return {
    books: filteredBooks.slice(offset, offset + limit).map(book => ({
      ...book,
      isbn: book.isbn.toString(),
      cover: book.cover || 'https://placehold.co/400x600?text=No+Cover',
      rating: book.rating || 3.5
    })),
    total: filteredBooks.length
  };
};

export const getUniqueCategories = (): string[] => {
  const categories = booksData.flatMap(book => book.categories);
  return [...new Set(categories)].filter(Boolean);
};

export const getUniqueLanguages = (): string[] => {
  const languages = booksData.map(book => book.language);
  return [...new Set(languages)].filter(Boolean);
};