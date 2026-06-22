import { getBookById, getInstitutionById, getCountryName, books } from '../data/books';
import BookCard from './BookCard';
import styles from './BookDetailPage.module.css';

const COUNTRY_FLAGS = {
  UK: '🇬🇧', FR: '🇫🇷', US: '🇺🇸', JP: '🇯🇵', RU: '🇷🇺',
  DE: '🇩🇪', KR: '🇰🇷', SE: '🇸🇪', NL: '🇳🇱', AU: '🇦🇺', CA: '🇨🇦',
};

function BookDetailPage({ bookId, onBack, onSelectBook }) {
  const book = getBookById(bookId);

  if (!book) {
    return (
      <div className={styles['detail-page']}>
        <button className={styles['back-btn']} onClick={onBack}>← 返回</button>
        <p>未找到该古籍信息</p>
      </div>
    );
  }

  const institution = getInstitutionById(book.institution);
  const countryName = getCountryName(book.country);

  // Find related books (same country or same dynasty)
  const relatedBooks = books
    .filter(b => b.id !== book.id && (b.country === book.country || b.dynasty === book.dynasty))
    .slice(0, 3);

  return (
    <div className={styles['detail-page']}>
      <button className={styles['back-btn']} onClick={onBack}>← 返回列表</button>

      <div className={styles['detail-card']}>
        <div className={styles['detail-header']}>
          <span className={styles['detail-category-badge']}>{book.category}</span>
          <h1 className={styles['detail-title']}>{book.title}</h1>
          <div className={styles['detail-title-en']}>{book.titleEn}</div>
        </div>

        <div className={styles['detail-body']}>
          {/* Significance */}
          <div className={styles['detail-significance']}>
            <span className={styles['detail-significance-icon']}>⭐</span>
            <span className={styles['detail-significance-text']}>{book.significance}</span>
          </div>

          {/* Description */}
          <p className={styles['detail-description']}>{book.description}</p>

          {/* Meta */}
          <div className={styles['detail-meta-grid']}>
            <div className={styles['detail-meta-item']}>
              <div className={styles['detail-meta-label']}>朝代</div>
              <div className={styles['detail-meta-value']}>{book.dynasty}</div>
            </div>
            <div className={styles['detail-meta-item']}>
              <div className={styles['detail-meta-label']}>年代</div>
              <div className={styles['detail-meta-value']}>{book.year}</div>
            </div>
            <div className={styles['detail-meta-item']}>
              <div className={styles['detail-meta-label']}>收藏国家</div>
              <div className={styles['detail-meta-value']}>
                {COUNTRY_FLAGS[book.country]} {countryName}
              </div>
            </div>
            <div className={styles['detail-meta-item']}>
              <div className={styles['detail-meta-label']}>收藏机构</div>
              <div className={styles['detail-meta-value']}>
                {institution ? institution.name : book.institution}
              </div>
            </div>
            <div className={styles['detail-meta-item']}>
              <div className={styles['detail-meta-label']}>机构英文名</div>
              <div className={styles['detail-meta-value']}>
                {institution ? institution.nameEn : ''}
              </div>
            </div>
            <div className={styles['detail-meta-item']}>
              <div className={styles['detail-meta-label']}>类别</div>
              <div className={styles['detail-meta-value']}>{book.category}</div>
            </div>
            <div className={styles['detail-meta-item']}>
              <div className={styles['detail-meta-label']}>来源</div>
              <div className={styles['detail-meta-value']}>{book.source}</div>
            </div>
            <div className={styles['detail-meta-item']}>
              <div className={styles['detail-meta-label']}>入藏方式</div>
              <div className={styles['detail-meta-value']}>{book.acquisition}</div>
            </div>
          </div>
        </div>
      </div>

      {/* Related Books */}
      {relatedBooks.length > 0 && (
        <div className={styles['related-section']}>
          <h2 className={styles['related-title']}>相关古籍</h2>
          <div className={styles['related-grid']}>
            {relatedBooks.map(b => (
              <BookCard key={b.id} book={b} onClick={onSelectBook} />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

export default BookDetailPage;