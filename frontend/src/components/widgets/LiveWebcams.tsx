import { WidgetFrame } from '../layout/WidgetFrame';
import { GSAD_05_LIVE_WEBCAMS } from '../../config/gridSpec';

export const LiveWebcams = () => (
  <WidgetFrame definition={GSAD_05_LIVE_WEBCAMS}>
    <div className="widget-placeholder">
      <div className="placeholder-row">
        <span className="live-badge">LIVE</span>
        <span className="placeholder-label">Webcam Feeds</span>
      </div>
      <div className="webcam-grid">
        {[1, 2, 3, 4].map((i) => (
          <div key={i} className="webcam-slot">
            <div className="webcam-placeholder-img" />
            <span className="webcam-label">Camera {i}</span>
          </div>
        ))}
      </div>
    </div>
  </WidgetFrame>
);
