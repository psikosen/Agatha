/**
 * WidgetFrame — generic container wrapping every dashboard widget.
 *
 * Provides:
 * - Title bar with widget ID badge + name
 * - Loading / error states
 * - Expand / collapse affordance
 * - Cross-link highlight ring
 */

import React from 'react';
import type { WidgetDefinition, WidgetState } from '../../types/widget';
import { useDashboardStore } from '../../stores/dashboardStore';
import './WidgetFrame.css';

interface Props {
  definition: WidgetDefinition;
  children: React.ReactNode;
}

export const WidgetFrame: React.FC<Props> = ({ definition, children }) => {
  const widgetState: WidgetState =
    useDashboardStore((s) => s.widgetStates[definition.id]) ?? {
      id: definition.id,
      isLoading: false,
      hasError: false,
      isExpanded: false,
      isFocused: false,
    };

  const focusedWidgetId = useDashboardStore((s) => s.focusedWidgetId);
  const expandWidget = useDashboardStore((s) => s.expandWidget);
  const collapseWidget = useDashboardStore((s) => s.collapseWidget);

  const isFocused = focusedWidgetId === definition.id;

  const priorityClass = `priority-${definition.priority}`;

  return (
    <div
      className={`widget-frame ${priorityClass} ${isFocused ? 'widget-focused' : ''}`}
      data-widget-id={definition.id}
    >
      {/* ── Title bar ─────────────────────────────────────── */}
      <div className="widget-header">
        <span className="widget-id-badge">{definition.id}</span>
        <span className="widget-name">{definition.name}</span>
        <div className="widget-header-actions">
          {widgetState.isExpanded ? (
            <button
              className="widget-btn"
              title="Collapse"
              onClick={() => collapseWidget(definition.id)}
            >
              &#x2715;
            </button>
          ) : (
            <button
              className="widget-btn"
              title="Expand"
              onClick={() => expandWidget(definition.id)}
            >
              &#x26F6;
            </button>
          )}
        </div>
      </div>

      {/* ── Body ──────────────────────────────────────────── */}
      <div className="widget-body">
        {widgetState.isLoading && (
          <div className="widget-loader">Loading…</div>
        )}
        {widgetState.hasError && (
          <div className="widget-error">
            {widgetState.errorMessage ?? 'Error loading data'}
          </div>
        )}
        {!widgetState.isLoading && !widgetState.hasError && children}
      </div>

      {/* ── Footer (last updated) ─────────────────────────── */}
      {widgetState.lastUpdated && (
        <div className="widget-footer">
          Updated {new Date(widgetState.lastUpdated).toLocaleTimeString()}
        </div>
      )}
    </div>
  );
};
