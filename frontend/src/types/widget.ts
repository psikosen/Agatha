/**
 * GSAD Dashboard Widget Type Definitions
 * Grid Specification v1.1
 */

/** Priority levels 1-5 (1 = core, 5 = optional) */
export type PriorityLevel = 1 | 2 | 3 | 4 | 5;

/** Widget category for grouping and filtering */
export type WidgetCategory =
  | 'geospatial'
  | 'ai'
  | 'strategic'
  | 'news'
  | 'webcams'
  | 'intelligence'
  | 'markets'
  | 'technology'
  | 'risk'
  | 'crypto';

/** Cross-linking index — every widget event must carry these fields */
export interface CrossLinkPayload {
  eventId: string;
  countryCode: string;
  severityScore: number;
  timestamp: string; // ISO-8601
  categoryTags: string[];
}

/** Persistent grid position for layout storage */
export interface GridPosition {
  colStart: number;
  colSpan: number;
  rowStart: number;
  rowSpan: number;
}

/** Data source descriptor attached to each widget */
export interface DataSourceConfig {
  provider: string;
  endpoint?: string;
  apiKeyEnvVar?: string;
  refreshIntervalMs: number;
  fallback?: string;
}

/** Full widget definition */
export interface WidgetDefinition {
  id: string;             // e.g. "GSAD-01"
  name: string;           // human-readable
  category: WidgetCategory;
  priority: PriorityLevel;
  defaultPosition: GridPosition;
  dataSources: DataSourceConfig[];
  features: string[];
  description: string;
}

/** Runtime widget state */
export interface WidgetState {
  id: string;
  isLoading: boolean;
  hasError: boolean;
  errorMessage?: string;
  lastUpdated?: string;
  isExpanded: boolean;
  isFocused: boolean;
}

/** Layout persistence shape (matches spec §9.2) */
export interface PersistedLayout {
  widget_id: string;
  col_start: number;
  col_span: number;
  row_start: number;
  row_span: number;
}

/** Saved layout preset */
export interface LayoutPreset {
  id: string;
  name: string;
  description: string;
  widgets: PersistedLayout[];
  createdAt: string;
  updatedAt: string;
}
