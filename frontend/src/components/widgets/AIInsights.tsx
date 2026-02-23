import { WidgetFrame } from '../layout/WidgetFrame';
import { GSAD_02_AI_INSIGHTS } from '../../config/gridSpec';
import { useDashboardStore } from '../../stores/dashboardStore';

export const AIInsights = () => {
  const ollamaModel = useDashboardStore((s) => s.ollamaModel);

  return (
    <WidgetFrame definition={GSAD_02_AI_INSIGHTS}>
      <div className="widget-placeholder">
        <div className="placeholder-icon">&#x1F916;</div>
        <div className="placeholder-label">AI Insights</div>
        <div className="placeholder-sub">
          Model: {ollamaModel ?? 'Not selected'}
        </div>
        <div className="status-list">
          <div className="status-row">
            <span className="status-dot idle" />
            Data Acquisition
          </div>
          <div className="status-row">
            <span className="status-dot idle" />
            AI Pipeline
          </div>
          <div className="status-row">
            <span className="status-dot idle" />
            Brief Generation
          </div>
        </div>
      </div>
    </WidgetFrame>
  );
};
