import React, { useState, useEffect } from 'react';
import { Filter, X, Search } from 'lucide-react';
import BookCard from '../components/BookCard';
import FilterPanel from '../components/FilterPanel';
import { Book, getFeaturedBooks, getUniqueCategories, getUniqueLanguages } from '../services/books';

const BrowsePage = () => {
  const [books, setBooks] = useState<Book[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [isFiltersOpen, setIsFiltersOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [selectedLanguages, setSelectedLanguages] = useState<string[]>([]);
  const [minRating, setMinRating] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(12);

  const categories = getUniqueCategories();
  const languages = getUniqueLanguages();

  useEffect(() => {
    const loadBooks = async () => {
      try {
        const featuredBooks = await getFeaturedBooks();
        setBooks(featuredBooks);
      } catch (error) {
        console.error('Error loading books:', error);
      } finally {
        setIsLoading(false);
      }
    };

    loadBooks();
  }, []);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 640) setItemsPerPage(4);
      else if (window.innerWidth < 1024) setItemsPerPage(9);
      else setItemsPerPage(12);
    };

    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const filteredBooks = books.filter(book => {
    const matchesSearch =
      book.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      book.author.toLowerCase().includes(searchQuery.toLowerCase()) ||
      book.isbn.includes(searchQuery);

    const matchesCategory = !selectedCategory || book.categories.includes(selectedCategory);

    const matchesLanguage =
      selectedLanguages.length === 0 ||
      selectedLanguages.includes(book.language.toLowerCase());

    const matchesRating = (book.rating || 0) >= minRating;

    return matchesSearch && matchesCategory && matchesLanguage && matchesRating;
  });

  const generatePageNumbers = (currentPage, totalPages) => {
    const pagesToShow = [];

    if (totalPages <= 4) {
      // If the total pages are 4 or less, show all of them.
      for (let i = 1; i <= totalPages; i++) {
        pagesToShow.push(i);
      }
    } else {
      if (currentPage <= 3) {
        // If on the first pages, show pages 1, 2, 3, ... and the last page.
        pagesToShow.push(1, 2, 3, '...', totalPages);
      } else if (currentPage >= totalPages - 2) {
        // If on the last pages, show page 1, ..., and the last three pages.
        pagesToShow.push(1, '...', totalPages - 2, totalPages - 1, totalPages);
      } else {
        // Otherwise, show ellipses on both sides with the current page in the middle.
        pagesToShow.push('...', currentPage - 1, currentPage, currentPage + 1, '...');
      }
    }

    return pagesToShow;
  };

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentBooks = filteredBooks.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(filteredBooks.length / itemsPerPage);

  const handleLanguageToggle = (language: string) => {
    setSelectedLanguages(prev =>
      prev.includes(language) ? prev.filter(l => l !== language) : [...prev, language]
    );
  };

  const handleResetFilters = () => {
    setSelectedCategory(null);
    setSelectedLanguages([]);
    setMinRating(0);
    setCurrentPage(1);
  };

  useEffect(() => {
    setCurrentPage(1);
  }, [searchQuery, selectedCategory, selectedLanguages, minRating]);

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="mb-12">
          <h1 className="font-serif text-4xl font-bold text-[#2A3B4C] mb-4 text-center">
            Browse Our Collection
          </h1>
          <p className="text-gray-600 text-center max-w-2xl mx-auto">
            Explore our vast library of books across different genres, languages, and ratings.
          </p>
        </div>

        <div className="mb-8 flex gap-4 items-center">
          <div className="flex-1 relative">
            <input
              type="text"
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
              placeholder="Search by title, author, or ISBN..."
              className="w-full px-6 py-4 rounded-xl border-2 border-gray-200 focus:border-[#D4AF37] focus:ring-2 focus:ring-[#D4AF37] focus:ring-opacity-50 focus:outline-none transition-all duration-200 bg-white shadow-sm"
            />
            <div className="absolute right-4 top-1/2 transform -translate-y-1/2 flex items-center gap-2">
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="p-2 hover:bg-gray-100 rounded-full transition-colors"
                >
                  <X size={20} className="text-gray-400" />
                </button>
              )}
              <Search size={20} className="text-gray-400" />
            </div>
          </div>
          <button
            onClick={() => setIsFiltersOpen(!isFiltersOpen)}
            className="p-4 bg-[#2A3B4C] text-white rounded-xl hover:bg-[#1A2B3C] transition-colors shadow-md flex items-center gap-2"
          >
            <Filter size={20} />
            <span className="hidden sm:inline">Filters</span>
          </button>
        </div>

        <div className="flex gap-8">
          <div className="hidden lg:block w-80">
            <div className="sticky top-8">
              <FilterPanel
                categories={categories}
                languages={languages}
                selectedCategory={selectedCategory}
                selectedLanguages={selectedLanguages}
                minRating={minRating}
                onCategoryChange={setSelectedCategory}
                onLanguageToggle={handleLanguageToggle}
                onRatingChange={setMinRating}
                onReset={handleResetFilters}
              />
            </div>
          </div>

          {isFiltersOpen && (
            <>
              <div
                className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40 lg:hidden"
                onClick={() => setIsFiltersOpen(false)}
              />
              <div className="fixed left-0 top-0 h-screen w-80 bg-white z-50 p-6 shadow-xl lg:hidden">
                <FilterPanel
                  categories={categories}
                  languages={languages}
                  selectedCategory={selectedCategory}
                  selectedLanguages={selectedLanguages}
                  minRating={minRating}
                  onCategoryChange={setSelectedCategory}
                  onLanguageToggle={handleLanguageToggle}
                  onRatingChange={setMinRating}
                  onReset={handleResetFilters}
                  onClose={() => setIsFiltersOpen(false)}
                />
              </div>
            </>
          )}

          <div className="flex-1">
            {isLoading ? (
              <div className="flex justify-center items-center h-96">
                <div className="animate-spin rounded-full h-12 w-12 border-4 border-[#D4AF37] border-t-transparent" />
              </div>
            ) : filteredBooks.length > 0 ? (
              <>
                <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-3 gap-8">
                  {currentBooks.map(book => (
                    <div key={book.id} className="h-full">
                      <BookCard {...book} />
                    </div>
                  ))}
                </div>

                <div className="mt-12 flex flex-col sm:flex-row items-center justify-between gap-4">
                  <div className="text-sm text-gray-600">
                    Showing {indexOfFirstItem + 1}-{Math.min(indexOfLastItem, filteredBooks.length)} of{' '}
                    {filteredBooks.length} books
                  </div>

                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
                      disabled={currentPage === 1}
                      className="px-4 py-2 rounded-lg bg-white border-2 border-gray-200 hover:border-[#D4AF37] disabled:opacity-50 disabled:hover:border-gray-200 transition-colors"
                    >
                      Previous
                    </button>

                    <div className="flex gap-2">
                      {generatePageNumbers(currentPage, totalPages).map((page, idx) =>
                        page === '...' ? (
                          <span key={`ellipsis-${idx}`} className="px-2 py-2">
                            ...
                          </span>
                        ) : (
                          <button
                            key={page}
                            onClick={() => setCurrentPage(page)}
                            className={`w-10 h-10 rounded-lg ${
                              currentPage === page
                                ? 'bg-[#2A3B4C] text-white'
                                : 'bg-white border-2 border-gray-200 hover:border-[#D4AF37]'
                            } transition-colors`}
                          >
                            {page}
                          </button>
                        )
                      )}
                    </div>

                    <button
                      onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
                      disabled={currentPage === totalPages}
                      className="px-4 py-2 rounded-lg bg-white border-2 border-gray-200 hover:border-[#D4AF37] disabled:opacity-50 disabled:hover:border-gray-200 transition-colors"
                    >
                      Next
                    </button>
                  </div>
                </div>
              </>
            ) : (
              <div className="text-center py-16 bg-white rounded-xl shadow-sm">
                <div className="text-2xl font-serif text-[#2A3B4C] mb-4">No books found</div>
                <p className="text-gray-600 mb-6">Try adjusting your filters or search terms</p>
                <button
                  onClick={handleResetFilters}
                  className="px-6 py-3 bg-[#2A3B4C] text-white rounded-xl hover:bg-[#1A2B3C] transition-colors"
                >
                  Reset Filters
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default BrowsePage;
