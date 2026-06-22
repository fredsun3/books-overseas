import { books, COUNTRIES, DYNASTIES, getStatistics } from '../data/books';
import BookCard from './BookCard';
import styles from './HomePage.module.css';

const COUNTRY_FLAGS = {
  UK: '🇬🇧',
  FR: '🇫🇷',
  US: '🇺🇸',
  JP: '🇯🇵',
  RU: '🇷🇺',
  DE: '🇩🇪',
  KR: '🇰🇷',
  SE: '🇸🇪',
  NL: '🇳🇱',
  AU: '🇦🇺',
  CA: '🇨🇦',
};

function HomePage({ onNavigate, onSelectBook }) {
  const stats = getStatistics();
  const featuredBooks = books.filter(b =>
    [1, 9, 16, 32, 38, 27, 17, 2].includes(b.id)
  );
  const dynastiesWithData = DYNASTIES.filter(d => d.id !== 'all' && stats.byDynasty[d.id]);

  return (
    <div className={styles.home}>
      {/* Hero */}
      <section className={styles.hero}>
        <div className={styles['hero-content']}>
          <span className={styles['hero-badge']}>传承 · 记忆 · 归来</span>
          <h1>海外古籍总览</h1>
          <p>
            记录流散海外的中国古代典籍，追溯每部珍本的收藏轨迹，
            让更多人了解这些文化瑰宝的前世今生
          </p>
          <button className={styles['hero-btn']} onClick={() => onNavigate('books')}>
            探索古籍名录 →
          </button>
        </div>
      </section>

      {/* Stats Bar */}
      <section className={styles['stats-bar']}>
        <div className={styles['stats-bar-inner']}>
          <div className={styles['stat-item']}>
            <div className={styles['stat-number']}>{stats.totalBooks}</div>
            <div className={styles['stat-label']}>收录古籍</div>
          </div>
          <div className={styles['stat-item']}>
            <div className={styles['stat-number']}>{stats.totalCountries}</div>
            <div className={styles['stat-label']}>涉及国家</div>
          </div>
          <div className={styles['stat-item']}>
            <div className={styles['stat-number']}>{stats.totalInstitutions}</div>
            <div className={styles['stat-label']}>收藏机构</div>
          </div>
          <div className={styles['stat-item']}>
            <div className={styles['stat-number']}>{Object.keys(stats.byDynasty).length}</div>
            <div className={styles['stat-label']}>跨越朝代</div>
          </div>
        </div>
      </section>

      {/* Featured Books */}
      <section className={styles.featured}>
        <div className={styles['section-header']}>
          <h2 className={styles['section-title']}>重点藏品</h2>
          <button className={styles['section-more']} onClick={() => onNavigate('books')}>
            查看全部 →
          </button>
        </div>
        <div className={styles['featured-grid']}>
          {featuredBooks.map(book => (
            <BookCard key={book.id} book={book} onClick={onSelectBook} />
          ))}
        </div>
      </section>

      {/* Countries */}
      <section className={styles['countries-section']}>
        <div className={styles['section-header']}>
          <h2 className={styles['section-title']}>收藏国家</h2>
        </div>
        <div className={styles['countries-grid']}>
          {COUNTRIES.filter(c => c.id !== 'all').map(country => (
            <div
              key={country.id}
              className={styles['country-card']}
              onClick={() => onNavigate('books', { country: country.id })}
            >
              <div className={styles['country-flag']}>{COUNTRY_FLAGS[country.id]}</div>
              <div className={styles['country-name']}>{country.name}</div>
              <div className={styles['country-count']}>
                {stats.byCountry[country.id] || 0} 部古籍
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Timeline */}
      <section className={styles['timeline-section']}>
        <div className={styles['timeline-inner']}>
          <div className={styles['section-header']}>
            <h2 className={styles['section-title']}>朝代分布</h2>
          </div>
          <div className={styles.timeline}>
            {dynastiesWithData.map(dynasty => (
              <div
                key={dynasty.id}
                className={styles['timeline-item']}
                onClick={() => onNavigate('books', { dynasty: dynasty.id })}
              >
                <div className={styles['timeline-dynasty']}>{dynasty.name}</div>
                <div className={styles['timeline-count']}>
                  {stats.byDynasty[dynasty.id]} 部
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}

export default HomePage;