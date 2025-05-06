import React, { useState, useEffect } from 'react';
import { supabase } from '../../lib/supabase';
import { Edit2, Trash2, Plus, Search } from 'lucide-react';
import { toast } from 'react-hot-toast';

interface Book {
  id: string;
  isbn: string;
  title: string;
  author: string;
  cover: string;
  rating: number;
  description: string;
  publishedDate: string;
  publisher: string;
  pageCount: number;
  language: string;
}

const Books = () => {
  const [books, setBooks] = useState<Book[]>([]);
  const [loading, setLoading] = useState(true);
  const [editingBook, setEditingBook] = useState<Book | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [formData, setFormData] = useState({
    isbn: '',
    title: '',
    author: '',
    cover: '',
    description: '',
    publisher: '',
    pageCount: 0,
    language: 'en'
  });

  useEffect(() => {
    fetchBooks();
  }, []);

  const fetchBooks = async () => {
    try {
      const { data, error } = await supabase
        .from('books')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;
      setBooks(data || []);
    } catch (error) {
      console.error('Error fetching books:', error);
      toast.error('Failed to load books');
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      if (editingBook) {
        const { error } = await supabase
          .from('books')
          .update({
            ...formData,
            pageCount: Number(formData.pageCount)
          })
          .eq('id', editingBook.id);

        if (error) throw error;
        toast.success('Book updated successfully');
      } else {
        const { error } = await supabase
          .from('books')
          .insert([{
            ...formData,
            pageCount: Number(formData.pageCount)
          }]);

        if (error) throw error;
        toast.success('Book created successfully');
      }

      setEditingBook(null);
      setFormData({
        isbn: '',
        title: '',
        author: '',
        cover: '',
        description: '',
        publisher: '',
        pageCount: 0,
        language: 'en'
      });
      fetchBooks();
    } catch (error) {
      console.error('Error saving book:', error);
      toast.error('Failed to save book');
    }
  };

  const handleDelete = async (id: string) => {
    if (!window.confirm('Are you sure you want to delete this book?')) return;

    try {
      const { error } = await supabase
        .from('books')
        .delete()
        .eq('id', id);

      if (error) throw error;
      toast.success('Book deleted successfully');
      fetchBooks();
    } catch (error) {
      console.error('Error deleting book:', error);
      toast.error('Failed to delete book');
    }
  };

  const filteredBooks = books.filter(book =>
    book.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    book.author.toLowerCase().includes(searchQuery.toLowerCase()) ||
    book.isbn.includes(searchQuery)
  );

  if (loading) {
    return <div className="animate-spin rounded-full h-12 w-12 border-4 border-[#D4AF37] border-t-transparent"></div>;
  }

  return (
    <div className="bg-white rounded-lg shadow p-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-[#2A3B4C]">Manage Books</h2>
        <button
          onClick={() => {
            setEditingBook(null);
            setFormData({
              isbn: '',
              title: '',
              author: '',
              cover: '',
              description: '',
              publisher: '',
              pageCount: 0,
              language: 'en'
            });
          }}
          className="flex items-center px-4 py-2 bg-[#2A3B4C] text-white rounded-lg hover:bg-[#1A2B3C]"
        >
          <Plus className="h-5 w-5 mr-2" />
          Add Book
        </button>
      </div>

      <div className="mb-6">
        <div className="relative">
          <input
            type="text"
            placeholder="Search books..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full px-10 py-2 border rounded-lg"
          />
          <Search className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
        </div>
      </div>

      {(editingBook || formData.isbn !== '') && (
        <form onSubmit={handleSubmit} className="mb-8 bg-gray-50 p-6 rounded-lg">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">ISBN</label>
              <input
                type="text"
                value={formData.isbn}
                onChange={(e) => setFormData({ ...formData, isbn: e.target.value })}
                className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Title</label>
              <input
                type="text"
                value={formData.title}
                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Author</label>
              <input
                type="text"
                value={formData.author}
                onChange={(e) => setFormData({ ...formData, author: e.target.value })}
                className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Cover URL</label>
              <input
                type="url"
                value={formData.cover}
                onChange={(e) => setFormData({ ...formData, cover: e.target.value })}
                className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Publisher</label>
              <input
                type="text"
                value={formData.publisher}
                onChange={(e) => setFormData({ ...formData, publisher: e.target.value })}
                className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Page Count</label>
              <input
                type="number"
                value={formData.pageCount}
                onChange={(e) => setFormData({ ...formData, pageCount: parseInt(e.target.value) })}
                className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Language</label>
              <input
                type="text"
                value={formData.language}
                onChange={(e) => setFormData({ ...formData, language: e.target.value })}
                className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2"
                required
              />
            </div>
            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-700">Description</label>
              <textarea
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2"
                rows={4}
                required
              />
            </div>
          </div>
          <div className="mt-4 flex gap-4">
            <button
              type="submit"
              className="px-4 py-2 bg-[#2A3B4C] text-white rounded-lg hover:bg-[#1A2B3C]"
            >
              {editingBook ? 'Update' : 'Create'} Book
            </button>
            <button
              type="button"
              onClick={() => {
                setEditingBook(null);
                setFormData({
                  isbn: '',
                  title: '',
                  author: '',
                  cover: '',
                  description: '',
                  publisher: '',
                  pageCount: 0,
                  language: 'en'
                });
              }}
              className="px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300"
            >
              Cancel
            </button>
          </div>
        </form>
      )}

      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Cover</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Title</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Author</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">ISBN</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Language</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {filteredBooks.map((book) => (
              <tr key={book.id}>
                <td className="px-6 py-4 whitespace-nowrap">
                  <img src={book.cover} alt={book.title} className="h-16 w-12 object-cover rounded" />
                </td>
                <td className="px-6 py-4 whitespace-nowrap">{book.title}</td>
                <td className="px-6 py-4 whitespace-nowrap">{book.author}</td>
                <td className="px-6 py-4 whitespace-nowrap">{book.isbn}</td>
                <td className="px-6 py-4 whitespace-nowrap">{book.language}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                  <button
                    onClick={() => {
                      setEditingBook(book);
                      setFormData({
                        isbn: book.isbn,
                        title: book.title,
                        author: book.author,
                        cover: book.cover,
                        description: book.description,
                        publisher: book.publisher,
                        pageCount: book.pageCount,
                        language: book.language
                      });
                    }}
                    className="text-indigo-600 hover:text-indigo-900 mr-4"
                  >
                    <Edit2 className="h-5 w-5" />
                  </button>
                  <button
                    onClick={() => handleDelete(book.id)}
                    className="text-red-600 hover:text-red-900"
                  >
                    <Trash2 className="h-5 w-5" />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Books;