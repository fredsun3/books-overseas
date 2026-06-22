import styles from './AboutPage.module.css';

function AboutPage() {
  return (
    <div className={styles['about-page']}>
      <h1 className={styles['page-title']}>关于本站</h1>

      <div className={styles['about-section']}>
        <h2>项目简介</h2>
        <p>
          "海外古籍"是一个致力于记录和展示流散海外的中国古代书籍的公益性网站。
          我们希望通过系统整理和数字化展示，让更多人了解这些中华文化瑰宝的收藏轨迹与历史命运。
        </p>
        <div className={styles['about-highlight']}>
          据不完全统计，自19世纪中叶以来，数以百万计的中国古籍善本通过各种途径流散至海外，
          分布在英国、法国、美国、日本、俄罗斯等数十个国家的图书馆、博物馆和研究机构中。
          这些珍贵文献涵盖了从甲骨文到明清善本数千年的中华文明成果。
        </div>
        <p>
          本站所收录的古籍信息基于公开的学术资料和研究文献，力求准确、客观地呈现每部古籍的基本信息、
          收藏地点、历史背景和学术价值。由于资料浩繁，本站内容仍在持续完善中。
        </p>
      </div>

      <div className={styles['about-section']}>
        <h2>主要收藏领域</h2>
        <ul className={styles['about-list']}>
          <li>敦煌文献 —— 英、法、俄等国收藏的敦煌莫高窟藏经洞出土文献</li>
          <li>宋元善本 —— 流散海外的宋元时期刻本和写本</li>
          <li>永乐大典 —— 现存约400余卷残卷的收藏分布</li>
          <li>甲骨文 —— 商代占卜记录的海外收藏</li>
          <li>古地图 —— 中西合璧的古代舆图和世界地图</li>
          <li>佛经写本 —— 历代佛教经典的海外珍本</li>
          <li>黑水城文献 —— 西夏王朝的历史文献</li>
          <li>明清善本 —— 明清时期刻本和稿钞本的海外收藏</li>
        </ul>
      </div>

      <div className={styles['about-section']}>
        <h2>重要历史事件</h2>
        <div className={styles['about-timeline']}>
          <div className={styles['about-timeline-item']}>
            <span className={styles['about-timeline-year']}>1900</span>
            <span className={styles['about-timeline-text']}>
              敦煌莫高窟藏经洞被发现，内藏约5万件古代文献。此后数年间，斯坦因、伯希和等外国探险家大量收购带走。
            </span>
          </div>
          <div className={styles['about-timeline-item']}>
            <span className={styles['about-timeline-year']}>1900</span>
            <span className={styles['about-timeline-text']}>
              八国联军攻入北京，《永乐大典》等大量珍贵典籍被劫掠，散落世界各地。
            </span>
          </div>
          <div className={styles['about-timeline-item']}>
            <span className={styles['about-timeline-year']}>1907</span>
            <span className={styles['about-timeline-text']}>
              英国探险家斯坦因从敦煌带走约7000件文献，现存大英图书馆，包括世界最早印刷品《金刚经》。
            </span>
          </div>
          <div className={styles['about-timeline-item']}>
            <span className={styles['about-timeline-year']}>1908</span>
            <span className={styles['about-timeline-text']}>
              法国汉学家伯希和从敦煌精选约5000件文献运往法国，现存法国国家图书馆。
            </span>
          </div>
          <div className={styles['about-timeline-item']}>
            <span className={styles['about-timeline-year']}>1908</span>
            <span className={styles['about-timeline-text']}>
              俄国探险家科兹洛夫发现黑水城遗址，出土大量西夏文文献，现存俄罗斯科学院东方文献研究所。
            </span>
          </div>
          <div className={styles['about-timeline-item']}>
            <span className={styles['about-timeline-year']}>1860</span>
            <span className={styles['about-timeline-text']}>
              英法联军火烧圆明园，大量清宫珍藏典籍文物被劫掠至欧洲。
            </span>
          </div>
        </div>
      </div>

      <div className={styles['about-section']}>
        <h2>参考来源</h2>
        <div className={styles['about-sources']}>
          <div className={styles['about-source-item']}>
            <strong>大英图书馆</strong> —— International Dunhuang Project (IDP)
          </div>
          <div className={styles['about-source-item']}>
            <strong>法国国家图书馆</strong> —— Pelliot Collection 数字化项目
          </div>
          <div className={styles['about-source-item']}>
            <strong>美国国会图书馆</strong> —— Asian Division 珍本收藏
          </div>
          <div className={styles['about-source-item']}>
            <strong>俄罗斯科学院</strong> —— 东方文献研究所黑水城文献
          </div>
          <div className={styles['about-source-item']}>
            <strong>哈佛燕京图书馆</strong> —— 善本特藏数字化
          </div>
          <div className={styles['about-source-item']}>
            <strong>《中国古籍海外珍本丛刊》</strong> —— 中华书局
          </div>
          <div className={styles['about-source-item']}>
            <strong>《流散海外的中国古籍》</strong> —— 各类学术研究文献
          </div>
        </div>
      </div>
    </div>
  );
}

export default AboutPage;