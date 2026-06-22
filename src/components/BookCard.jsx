import { getInstitutionById, getCountryName } from '../data/books';
import styles from './BookCard.module.css';

const CATEGORY_ICONS = {
  '经': '📜',
  '史': '📖',
  '子': '💡',
  '集': '🎋',
  '佛经': '☸',
  '敦煌': '🏜️',
  '甲骨': '🦴',
  '简牍': '🎋',
  '地图': '🗺️',
  '书画': '🎨',
};

function BookCard({ book, onClick }) {
  const institution = getInstitutionById(book.institution);
  const countryName = getCountryName(book.country);

  return (
    <div className={styles.card} onClick={() => onClick(book.id)}>
      <div className={styles['card-image']}>
        {book.image ? (
          <img src={book.image} alt={book.title} />
        ) : (
          <span className={styles['card-image-placeholder']}>
            {CATEGORY_ICONS[book.category] || '📜'}
          </span>
        )}
        <span className={styles['card-image-category']}>{book.category}</span>
      </div>
      <div className={styles['card-body']}>
        <div className={styles['card-title']}>{book.title}</div>
        <div className={styles['card-title-en']}>{book.titleEn}</div>
        <div className={styles['card-meta']}>
          <span className={styles['card-meta-item']}>📅 {book.dynasty}</span>
          <span className={styles['card-meta-item']}>🕐 {book.year}</span>
          <span className={styles['card-meta-item']}>🌍 {countryName}</span>
        </div>
        <div className={styles['card-desc']}>{book.description}</div>
      </div>
      <div className={styles['card-footer']}>
        <span className={styles['card-institution']}>
          {institution ? institution.name : book.institution}
        </span>
        <span className={styles['card-significance']}>{book.significance}</span>
      </div>
    </div>
  );
}

export default BookCard;