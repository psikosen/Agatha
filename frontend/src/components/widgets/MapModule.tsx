import { WidgetFrame } from '../layout/WidgetFrame';
import { GSAD_01_MAP } from '../../config/gridSpec';

export const MapModule = () => (
  <WidgetFrame definition={GSAD_01_MAP}>
    <div className="widget-placeholder">
      <div className="placeholder-icon">&#x1F5FA;</div>
      <div className="placeholder-label">Interactive Map</div>
      <div className="placeholder-sub">
        OpenStreetMap + GDELT + FIRMS + ADS-B + AIS overlays
      </div>
      <ul className="placeholder-features">
        {GSAD_01_MAP.features.map((f) => (
          <li key={f}>{f}</li>
        ))}
      </ul>
    </div>
  </WidgetFrame>
);
