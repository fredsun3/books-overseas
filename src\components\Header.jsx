import { useState } from 'react';
import styles from './Header.module.css';

function Header({ currentPage, onNavigate }) {
  const [menuOpen, setMenuOpen] = useState(false);

  const navItems = [
    { id: 'home', label: '首页' },
    { id: 'books', label: '古籍名录' },
    { id: 'stats', label: '数据统计' },
    { id: 'about', label: '关于' },
  ];

  const handleNav = (page) => {
    onNavigate(page);
    setMenuOpen(false);
  };

  return (
    <header className={styles.header}>
      <div className={styles['header-inner']}>
        <div className={styles['header-logo']} onClick={() => handleNav('home')}>
          <div className={styles['header-logo-icon']}>籍</div>
          <div className={styles['header-logo-text']}>
            <span className={styles['header-logo-title']}>海外古籍</span>
            <span className={styles['header-logo-subtitle']}>中国古代书籍海外藏馆</span>
          </div>
        </div>

        <button
          className={styles['header-menu-btn']}
          onClick={() => setMenuOpen(!menuOpen)}
        >
          {menuOpen ? '✕' : '☰'}
        </button>

        <nav className={`${styles['header-nav']} ${menuOpen ? styles.open : ''}`}>
          {navItems.map(item => (
            <button
              key={item.id}
              className={`${styles['header-nav-item']} ${currentPage === item.id ? styles.active : ''}`}
              onClick={() => handleNav(item.id)}
            >
              {item.label}
            </button>
          ))}
        </nav>
      </div>
    </header>
  );
}

export default Header;