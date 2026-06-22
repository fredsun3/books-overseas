import { useState, useMemo } from 'react';
import { books, COUNTRIES, DYNASTIES, CATEGORIES } from '../data/books';
import BookCard from './BookCard';
import styles from './BookListPage.module.css';

const PAGE_SIZE = 12;

function BookListPage({ initialFilters, onSelectBook }) {
  const [searchQuery, setSearchQuery] = useState('');
  const [countryFilter, setCountryFilter] = useState(initialFilters?.country || 'all');
  const [dynastyFilter, setDynastyFilter] = useState(initialFilters?.dynasty || 'all');
  const [categoryFilter, setCategoryFilter] = useState('all');
  const [currentPage, setCurrentPage] = useState(1);

  const filteredBooks = useMemo(() => {
    let result = books;

    // Search
    if (searchQuery) {
      const q = searchQuery.toLowerCase();
      result = result.filter(b =>
        b.title.toLowerCase().includes(q) ||
        b.titleEn.toLowerCase().includes(q) ||
        b.description.toLowerCase().includes(q) ||
        b.dynasty.includes(q) ||
        b.category.includes(q)
      );
    }

    // Country filter
    if (countryFilter !== 'all') {
      result = result.filter(b => b.country === countryFilter);
    }

    // Dynasty filter
    if (dynastyFilter !== 'all') {
      result = result.filter(b => b.dynasty === dynastyFilter);
    }

    // Category filter
    if (categoryFilter !== 'all') {
      result = result.filter(b => b.category === categoryFilter);
    }

    return result;
  }, [searchQuery, countryFilter, dynastyFilter, categoryFilter]);

  const totalPages = Math.ceil(filteredBooks.length / PAGE_SIZE);
  const paginatedBooks = filteredBooks.slice(
    (currentPage - 1) * PAGE_SIZE,
    currentPage * PAGE_SIZE
  );

  const handleSearch = (e) => {
    e.preventDefault();
    setCurrentPage(1);
  };

  const handleFilterChange = (setter) => (e) => {
    setter(e.target.value);
    setCurrentPage(1);
  };

  const resetFilters = () => {
    setSearchQuery('');
    setCountryFilter('all');
    setDynastyFilter('all');
    setCategoryFilter('all');
    setCurrentPage(1);
  };

  return (
    <div className={styles.page}>
      <h1 className={styles['page-title']}>古籍名录</h1>

      {/* Toolbar */}
      <div className={styles.toolbar}>
        <form className={styles['search-row']} onSubmit={handleSearch}>
          <input
            className={styles['search-input']}
            type="text"
            placeholder="搜索书名、描述、朝代..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <button className={styles['search-btn']} type="submit">搜索</button>
        </form>

        <div className={styles['filter-row']}>
          <div className={styles['filter-group']}>
            <span className={styles['filter-label']}>国家：</span>
            <select
              className={styles['filter-select']}
              value={countryFilter}
              onChange={handleFilterChange(setCountryFilter)}
            >
              {COUNTRIES.map(c => (
                <option key={c.id} value={c.id}>{c.name}</option>
              ))}
            </select>
          </div>

          <div className={styles['filter-group']}>
            <span className={styles['filter-label']}>朝代：</span>
            <select
              className={styles['filter-select']}
              value={dynastyFilter}
              onChange={handleFilterChange(setDynastyFilter)}
            >
              {DYNASTIES.map(d => (
                <option key={d.id} value={d.id}>{d.name}</option>
              ))}
            </select>
          </div>

          <div className={styles['filter-group']}>
            <span className={styles['filter-label']}>类别：</span>
            <select
              className={styles['filter-select']}
              value={categoryFilter}
              onChange={handleFilterChange(setCategoryFilter)}
            >
              {CATEGORIES.map(c => (
                <option key={c.id} value={c.id}>{c.name}</option>
              ))}
            </select>
          </div>

          <button
            className={styles['search-btn']}
            onClick={resetFilters}
            style={{ background: 'var(--color-text-muted)', fontSize: '13px', padding: '6px 16px' }}
          >
            重置
          </button>
        </div>
      </div>

      {/* Results */}
      <div className={styles['results-info']}>
        共找到 <strong>{filteredBooks.length}</strong> 部古籍
      </div>

      {paginatedBooks.length > 0 ? (
        <>
          <div className={styles['book-grid']}>
            {paginatedBooks.map(book => (
              <BookCard key={book.id} book={book} onClick={onSelectBook} />
            ))}
          </div>

          {/* Pagination */}
          {totalPages > 1 && (
            <div className={styles.pagination}>
              <button
                className={styles['page-btn']}
                disabled={currentPage === 1}
                onClick={() => setCurrentPage(p => p - 1)}
              >
                ← 上一页
              </button>
              {Array.from({ length: totalPages }, (_, i) => i + 1).map(page => (
                <button
                  key={page}
                  className={`${styles['page-btn']} ${currentPage === page ? styles.active : ''}`}
                  onClick={() => setCurrentPage(page)}
                >
                  {page}
                </button>
              ))}
              <button
                className={styles['page-btn']}
                disabled={currentPage === totalPages}
                onClick={() => setCurrentPage(p => p + 1)}
              >
                下一页 →
              </button>
            </div>
          )}
        </>
      ) : (
        <div className={styles['empty-state']}>
          <div className={styles['empty-state-icon']}>📚</div>
          <div className={styles['empty-state-text']}>未找到匹配的古籍</div>
          <div className={styles['empty-state-hint']}>尝试调整搜索条件或筛选项</div>
        </div>
      )}
    </div>
  );
}

export default BookListPage;