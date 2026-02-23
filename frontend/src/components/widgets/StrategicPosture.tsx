import { WidgetFrame } from '../layout/WidgetFrame';
import { GSAD_03_STRATEGIC_POSTURE } from '../../config/gridSpec';

export const StrategicPosture = () => (
  <WidgetFrame definition={GSAD_03_STRATEGIC_POSTURE}>
    <div className="widget-placeholder">
      <div className="placeholder-icon">&#x1F3AF;</div>
      <div className="placeholder-label">Strategic Posture</div>
      <div className="gauge-placeholder">
        <div className="gauge-arc" />
        <div className="gauge-value">--</div>
        <div className="gauge-label">Risk Score</div>
      </div>
      <div className="trend-badge neutral">Stable</div>
    </div>
  </WidgetFrame>
);
