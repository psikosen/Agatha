/**
 * GenericFeedWidget — reusable feed-style widget for intelligence,
 * news, technology, and risk panels (GSAD-06 through GSAD-25).
 *
 * Renders a placeholder skeleton with the widget's features listed.
 */

import { WidgetFrame } from '../layout/WidgetFrame';
import type { WidgetDefinition } from '../../types/widget';

interface Props {
  definition: WidgetDefinition;
  icon: string;
}

export const GenericFeedWidget: React.FC<Props> = ({ definition, icon }) => (
  <WidgetFrame definition={definition}>
    <div className="widget-placeholder">
      <div className="placeholder-icon">{icon}</div>
      <div className="placeholder-label">{definition.name}</div>
      <div className="placeholder-sub">{definition.description}</div>
      <ul className="placeholder-features">
        {definition.features.map((f) => (
          <li key={f}>{f}</li>
        ))}
      </ul>
      <div className="placeholder-sources">
        {definition.dataSources.map((ds) => (
          <span key={ds.provider} className="source-badge">
            {ds.provider}
          </span>
        ))}
      </div>
    </div>
  </WidgetFrame>
);
