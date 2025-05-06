import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Star, Heart, ChevronRight, BookOpen, BookText, AlertTriangle } from 'lucide-react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import BookCard from '../components/BookCard';
import { getBookById, searchBooks, type Book } from '../services/books';
import Slider from 'react-slick';

const BookDetails = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [book, setBook] = useState<Book | null>(null);
    const [randomBooks, setRandomBooks] = useState<Book[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    // Settings for react-slick slider
    const sliderSettings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 5,
        slidesToScroll: 5,
        responsive: [
            {
                breakpoint: 1280,
                settings: {
                    slidesToShow: 4,
                    slidesToScroll: 4,
                }
            },
            {
                breakpoint: 768,
                settings: {
                    slidesToShow: 2,
                    slidesToScroll: 2,
                }
            }
        ]
    };
    useEffect(() => {
        const fetchBookDetails = async () => {
            if (!id) {
                setError('Book ID is missing');
                setIsLoading(false);
                return;
            }

            // Validate that the ID is alphanumeric and may include underscores.
            if (!/^[a-zA-Z0-9_]+$/.test(id)) {
                console.error('Invalid book ID:', id);
                navigate('/browse');
                return;
            }

            setIsLoading(true);
            setError(null);

            try {
                const bookData = await getBookById(id);
                setBook(bookData);

                if (bookData) {
                    // Fetch random books.
                    // Here we search with an empty string so the API returns a broad set of books.
                    const { books: randomBooksResult } = await searchBooks("", 0, 30);
                    const shuffled = randomBooksResult
                        .filter(b => b.id !== id)
                        .sort(() => Math.random() - 0.5)
                        .slice(0, 10);
                    setRandomBooks(shuffled);
                }
            } catch (error) {
                console.error('Error fetching book details:', error);
                const errorMessage = error instanceof Error ? error.message : 'An unexpected error occurred';

                if (errorMessage.includes('Google Books service is temporarily unavailable')) {
                    setError('The Google Books service is currently unavailable. Please try again in a few moments.');
                } else {
                    setError('Unable to load book details. Please try again later.');
                }
            } finally {
                setIsLoading(false);
            }
        };

        fetchBookDetails();
    }, [id, navigate]);

    if (isLoading) {
        return (
            <div className="min-h-screen flex justify-center items-center">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#D4AF37]"></div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="min-h-screen flex justify-center items-center bg-gray-50">
                <div className="text-center p-8 bg-white rounded-lg shadow-lg max-w-md">
                    <AlertTriangle className="h-12 w-12 text-[#D4AF37] mx-auto mb-4" />
                    <h2 className="text-2xl font-bold text-[#2A3B4C] mb-4">Unable to Load Book</h2>
                    <p className="text-gray-600 mb-6">{error}</p>
                    <div className="flex justify-center gap-4">
                        <button
                            onClick={() => window.location.reload()}
                            className="px-4 py-2 bg-[#2A3B4C] text-white rounded-full hover:bg-[#1A2B3C] transition-colors"
                        >
                            Try Again
                        </button>
                        <Link
                            to="/browse"
                            className="px-4 py-2 bg-[#D4AF37] text-white rounded-full hover:bg-[#C49F27] transition-colors"
                        >
                            Return to Browse
                        </Link>
                    </div>
                </div>
            </div>
        );
    }

    if (!book) {
        return (
            <div className="min-h-screen flex justify-center items-center">
                <div className="text-center">
                    <h2 className="text-2xl font-bold text-[#2A3B4C] mb-4">Book Not Found</h2>
                    <Link to="/browse" className="text-[#D4AF37] hover:underline">
                        Return to Browse
                    </Link>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-50">
            {/* Book Header */}
            <div className="bg-[#2A3B4C] text-white py-12">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex items-center text-sm mb-4">
                        <Link to="/" className="hover:text-[#D4AF37]">Home</Link>
                        <ChevronRight className="h-4 w-4 mx-2" />
                        <Link to="/browse" className="hover:text-[#D4AF37]">Browse</Link>
                        <ChevronRight className="h-4 w-4 mx-2" />
                        <span>{book.title}</span>
                    </div>

                    <div className="flex flex-col md:flex-row gap-8">
                        <motion.img
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            src={book.cover}
                            alt={book.title}
                            className="w-64 h-96 object-cover rounded-lg shadow-lg"
                        />
                        <div className="flex-1">
                            <motion.h1
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                className="font-serif text-4xl font-bold mb-4"
                            >
                                {book.title}
                            </motion.h1>

                            {/* Author Section */}
                            <div className="bg-[#1A2B3C] rounded-lg p-4 mb-6">
                                <h2 className="text-[#D4AF37] text-sm uppercase tracking-wide mb-2">Author</h2>
                                <p className="text-2xl font-serif">{book.author}</p>
                            </div>

                            <div className="flex items-center space-x-4 mb-6">
                                <div className="flex items-center">
                                    <Star className="h-5 w-5 text-[#D4AF37] fill-current" />
                                    <span className="ml-2">{book.rating}</span>
                                </div>
                                <motion.button
                                    whileHover={{ scale: 1.1 }}
                                    whileTap={{ scale: 0.9 }}
                                    className="flex items-center px-4 py-2 bg-[#D4AF37] rounded-full"
                                >
                                    <Heart className="h-5 w-5 mr-2" />
                                    Add to Library
                                </motion.button>
                            </div>

                            <div className="grid grid-cols-2 gap-4 text-sm mb-6">
                                <div>
                                    <p className="text-gray-400">Publisher</p>
                                    <p>{book.publisher}</p>
                                </div>
                                <div>
                                    <p className="text-gray-400">ISBN</p>
                                    <p>{book.isbn || 'N/A'}</p>
                                </div>
                                <div>
                                    <p className="text-gray-400">Published Date</p>
                                    <p>{book.publishedDate}</p>
                                </div>
                                <div>
                                    <p className="text-gray-400">Pages</p>
                                    <p>{book.pageCount}</p>
                                </div>
                            </div>

                            <div className="flex flex-wrap gap-2">
                                {book.categories.map((category, index) => (
                                    <Link
                                        key={index}
                                        to={`/browse?category=${encodeURIComponent(category)}`}
                                        className="px-3 py-1 bg-[#1A2B3C] rounded-full text-sm hover:bg-[#D4AF37] transition-colors"
                                    >
                                        {category}
                                    </Link>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Main Content */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                <div className="bg-white rounded-lg shadow-lg p-8">
                    <h2 className="font-serif text-2xl font-bold text-[#2A3B4C] mb-4">
                        Synopsis
                    </h2>
                    <div
                        className="text-gray-600 mb-8 prose max-w-none"
                        dangerouslySetInnerHTML={{ __html: book.description }}
                    />

                    <div className="flex flex-wrap gap-4">
                        <motion.button
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            className="flex items-center px-6 py-3 bg-[#2A3B4C] text-white rounded-full"
                        >
                            <BookOpen className="h-5 w-5 mr-2" />
                            Read an Excerpt
                        </motion.button>

                        <motion.a
                            href={`https://books.google.com/books?id=${book.id}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            className="flex items-center px-6 py-3 bg-[#D4AF37] text-white rounded-full"
                        >
                            <BookText className="h-5 w-5 mr-2" />
                            View on Google Books
                        </motion.a>
                    </div>
                </div>

                {/* Random Books Section */}
                <section className="py-16 bg-gray-50">
                    <div className="max-w-7xl mx-auto px-6 sm:px-6 lg:px-8">
                        <h2 className="font-serif text-3xl font-bold text-[#2A3B4C] mb-8">
                            Top Rated Books
                        </h2>
                        {randomBooks.length > 0 ? (
                            <Slider {...sliderSettings}>
                                {randomBooks.map((book) => (
                                    <div key={book.id} className="px-2">
                                        <BookCard {...book} />
                                    </div>
                                ))}
                            </Slider>
                        ) : (
                            <p>No books found.</p>
                        )}
                        <div className="text-center mt-12">
                            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                            </motion.div>
                        </div>
                    </div>
                </section>
            </div>
        </div>
    );
};

export default BookDetails;
