import { WidgetFrame } from '../layout/WidgetFrame';
import { GSAD_04_LIVE_NEWS } from '../../config/gridSpec';

export const LiveNews = () => (
  <WidgetFrame definition={GSAD_04_LIVE_NEWS}>
    <div className="widget-placeholder">
      <div className="placeholder-row">
        <span className="live-badge">LIVE</span>
        <span className="placeholder-label">Global News Feed</span>
      </div>
      <div className="region-tabs">
        {['All', 'Americas', 'Europe', 'Asia', 'Africa', 'Middle East'].map(
          (r) => (
            <button key={r} className="region-tab">
              {r}
            </button>
          ),
        )}
      </div>
      <div className="feed-placeholder">
        {[1, 2, 3].map((i) => (
          <div key={i} className="feed-item-skeleton">
            <div className="skeleton-thumb" />
            <div className="skeleton-lines">
              <div className="skeleton-line long" />
              <div className="skeleton-line short" />
            </div>
          </div>
        ))}
      </div>
    </div>
  </WidgetFrame>
);
