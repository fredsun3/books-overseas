import { useState, useEffect } from 'react';
import Header from './components/Header';
import Footer from './components/Footer';
import HomePage from './components/HomePage';
import BookListPage from './components/BookListPage';
import BookDetailPage from './components/BookDetailPage';
import StatsPage from './components/StatsPage';
import AboutPage from './components/AboutPage';

function App() {
  const [currentPage, setCurrentPage] = useState('home');
  const [selectedBookId, setSelectedBookId] = useState(null);
  const [pageFilters, setPageFilters] = useState({});

  const handleNavigate = (page, filters = {}) => {
    setCurrentPage(page);
    setPageFilters(filters);
    setSelectedBookId(null);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleSelectBook = (bookId) => {
    setSelectedBookId(bookId);
    setCurrentPage('detail');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleBackFromDetail = () => {
    setSelectedBookId(null);
    setCurrentPage('books');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const renderPage = () => {
    switch (currentPage) {
      case 'home':
        return <HomePage onNavigate={handleNavigate} onSelectBook={handleSelectBook} />;
      case 'books':
        return <BookListPage initialFilters={pageFilters} onSelectBook={handleSelectBook} />;
      case 'detail':
        return <BookDetailPage bookId={selectedBookId} onBack={handleBackFromDetail} onSelectBook={handleSelectBook} />;
      case 'stats':
        return <StatsPage />;
      case 'about':
        return <AboutPage />;
      default:
        return <HomePage onNavigate={handleNavigate} onSelectBook={handleSelectBook} />;
    }
  };

  return (
    <>
      <Header currentPage={currentPage} onNavigate={handleNavigate} />
      <main style={{ flex: 1 }}>
        {renderPage()}
      </main>
      <Footer />
    </>
  );
}

export default App;
