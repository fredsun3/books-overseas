import styles from './Footer.module.css';

function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={styles['footer-inner']}>
        <div className={styles['footer-brand']}>
          <h3>海外古籍</h3>
          <p>
            记录流散海外的中国古代典籍，追溯每部珍本的收藏轨迹。
            让更多人了解这些文化瑰宝的前世今生，推动古籍保护与数字化回归。
          </p>
        </div>

        <div className={styles['footer-section']}>
          <h4>快速导航</h4>
          <ul className={styles['footer-links']}>
            <li><a href="#home">首页</a></li>
            <li><a href="#books">古籍名录</a></li>
            <li><a href="#stats">数据统计</a></li>
            <li><a href="#about">关于本站</a></li>
          </ul>
        </div>

        <div className={styles['footer-section']}>
          <h4>相关资源</h4>
          <ul className={styles['footer-links']}>
            <li><a href="https://idp.bl.uk/" target="_blank" rel="noopener">国际敦煌项目 (IDP)</a></li>
            <li><a href="https://www.bnf.fr/" target="_blank" rel="noopener">法国国家图书馆</a></li>
            <li><a href="https://www.loc.gov/" target="_blank" rel="noopener">美国国会图书馆</a></li>
            <li><a href="https://www.orientalstudies.ru/" target="_blank" rel="noopener">俄罗斯东方文献研究所</a></li>
          </ul>
        </div>
      </div>

      <div className={styles['footer-bottom']}>
        海外古籍 - 中国古代书籍海外藏馆 · 本站内容仅供参考，数据持续完善中
      </div>
    </footer>
  );
}

export default Footer;