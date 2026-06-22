import { useMemo } from 'react';
import { books, COUNTRIES, getStatistics, INSTITUTIONS } from '../data/books';
import styles from './StatsPage.module.css';

const COUNTRY_FLAGS = {
  UK: '🇬🇧', FR: '🇫🇷', US: '🇺🇸', JP: '🇯🇵', RU: '🇷🇺',
  DE: '🇩🇪', KR: '🇰🇷', SE: '🇸🇪', NL: '🇳🇱', AU: '🇦🇺', CA: '🇨🇦',
};

function StatsPage() {
  const stats = getStatistics();

  const countryData = useMemo(() => {
    return COUNTRIES
      .filter(c => c.id !== 'all' && stats.byCountry[c.id])
      .map(c => ({ ...c, count: stats.byCountry[c.id] || 0 }))
      .sort((a, b) => b.count - a.count);
  }, [stats]);

  const dynastyData = useMemo(() => {
    const dynastyOrder = ['先秦', '汉', '隋', '唐', '五代', '宋', '辽', '金', '西夏', '元', '明', '清', '高丽', '北魏'];
    return dynastyOrder
      .filter(d => stats.byDynasty[d])
      .map(d => ({ name: d, count: stats.byDynasty[d] || 0 }))
      .sort((a, b) => b.count - a.count);
  }, [stats]);

  const categoryData = useMemo(() => {
    const cats = [
      { name: '经部', id: '经' },
      { name: '史部', id: '史' },
      { name: '子部', id: '子' },
      { name: '集部', id: '集' },
      { name: '佛经', id: '佛经' },
      { name: '敦煌文献', id: '敦煌' },
      { name: '甲骨文', id: '甲骨' },
      { name: '古地图', id: '地图' },
      { name: '书画', id: '书画' },
    ];
    return cats
      .filter(c => stats.byCategory[c.id])
      .map(c => ({ ...c, count: stats.byCategory[c.id] || 0 }))
      .sort((a, b) => b.count - a.count);
  }, [stats]);

  const institutionData = useMemo(() => {
    const instCounts = {};
    books.forEach(b => {
      instCounts[b.institution] = (instCounts[b.institution] || 0) + 1;
    });
    return INSTITUTIONS
      .map(inst => ({ ...inst, count: instCounts[inst.id] || 0 }))
      .filter(inst => inst.count > 0)
      .sort((a, b) => b.count - a.count);
  }, []);

  const acquisitionData = useMemo(() => {
    const methods = {};
    books.forEach(b => {
      const method = b.acquisition;
      methods[method] = (methods[method] || 0) + 1;
    });
    return Object.entries(methods)
      .map(([method, count]) => ({ method, count }))
      .sort((a, b) => b.count - a.count);
  }, []);

  const maxCountry = Math.max(...countryData.map(c => c.count), 1);
  const maxDynasty = Math.max(...dynastyData.map(d => d.count), 1);
  const maxCategory = Math.max(...categoryData.map(c => c.count), 1);
  const maxDynastyForTimeline = Math.max(...dynastyData.map(d => d.count), 1);

  return (
    <div className={styles['stats-page']}>
      <h1 className={styles['page-title']}>数据统计</h1>

      {/* Summary */}
      <div className={styles['summary-grid']}>
        <div className={styles['summary-card']}>
          <div className={styles['summary-icon']}>📚</div>
          <div className={styles['summary-number']}>{stats.totalBooks}</div>
          <div className={styles['summary-label']}>收录古籍</div>
        </div>
        <div className={styles['summary-card']}>
          <div className={styles['summary-icon']}>🌍</div>
          <div className={styles['summary-number']}>{stats.totalCountries}</div>
          <div className={styles['summary-label']}>收藏国家</div>
        </div>
        <div className={styles['summary-card']}>
          <div className={styles['summary-icon']}>🏛️</div>
          <div className={styles['summary-number']}>{stats.totalInstitutions}</div>
          <div className={styles['summary-label']}>收藏机构</div>
        </div>
        <div className={styles['summary-card']}>
          <div className={styles['summary-icon']}>📅</div>
          <div className={styles['summary-number']}>{Object.keys(stats.byDynasty).length}</div>
          <div className={styles['summary-label']}>跨越朝代</div>
        </div>
      </div>

      {/* Charts Grid */}
      <div className={styles['charts-grid']}>
        {/* By Country */}
        <div className={styles['chart-card']}>
          <h3 className={styles['chart-title']}>各国收藏数量</h3>
          <div className={styles['bar-chart']}>
            {countryData.map(c => (
              <div key={c.id} className={styles['bar-row']}>
                <span className={styles['bar-label']}>
                  {COUNTRY_FLAGS[c.id]} {c.name}
                </span>
                <div className={styles['bar-track']}>
                  <div
                    className={styles['bar-fill']}
                    style={{ width: `${(c.count / maxCountry) * 100}%` }}
                  />
                </div>
                <span className={styles['bar-value']}>{c.count}</span>
              </div>
            ))}
          </div>
        </div>

        {/* By Category */}
        <div className={styles['chart-card']}>
          <h3 className={styles['chart-title']}>古籍类别分布</h3>
          <div className={styles['bar-chart']}>
            {categoryData.map(c => (
              <div key={c.id} className={styles['bar-row']}>
                <span className={styles['bar-label']}>{c.name}</span>
                <div className={styles['bar-track']}>
                  <div
                    className={`${styles['bar-fill']} ${styles.accent}`}
                    style={{ width: `${(c.count / maxCategory) * 100}%` }}
                  />
                </div>
                <span className={styles['bar-value']}>{c.count}</span>
              </div>
            ))}
          </div>
        </div>

        {/* By Dynasty - Timeline */}
        <div className={styles['chart-card']}>
          <h3 className={styles['chart-title']}>朝代分布</h3>
          <div className={styles['timeline-chart']}>
            {dynastyData.map(d => (
              <div key={d.name} className={styles['timeline-bar']}>
                <span className={styles['timeline-bar-value']}>{d.count}</span>
                <div
                  className={styles['timeline-bar-fill']}
                  style={{ height: `${(d.count / maxDynastyForTimeline) * 100}%` }}
                />
                <span className={styles['timeline-bar-label']}>{d.name}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Top Institutions */}
        <div className={styles['chart-card']}>
          <h3 className={styles['chart-title']}>主要收藏机构</h3>
          <div className={styles['institution-list']}>
            {institutionData.slice(0, 10).map(inst => (
              <div key={inst.id} className={styles['institution-item']}>
                <div>
                  <div className={styles['institution-name']}>{inst.name}</div>
                  <div className={styles['institution-name-en']}>{inst.nameEn}</div>
                </div>
                <span className={styles['institution-count']}>{inst.count}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Acquisition Methods */}
      <div className={styles['chart-card']}>
        <h3 className={styles['chart-title']}>入藏方式</h3>
        <div className={styles['acquisition-list']}>
          {acquisitionData.map((item, idx) => (
            <div key={item.method} className={styles['acquisition-item']}>
              <span className={`${styles['acquisition-dot']} ${idx % 3 === 1 ? styles.accent : ''} ${idx % 3 === 2 ? styles.muted : ''}`} />
              <span className={styles['acquisition-text']}>{item.method}</span>
              <span className={styles['acquisition-count']}>{item.count} 部</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default StatsPage;