/**
 * GridDashboard — the top-level 12-column responsive grid.
 *
 * Uses react-grid-layout (ResponsiveGridLayout) to render all 25 GSAD
 * widgets in the positions stored in the Zustand dashboard store.
 *
 * Drag-and-drop is enabled; positions snap to grid and persist via
 * localStorage (Zustand persist middleware).
 */

import { useRef, useMemo, useCallback } from 'react';
import { ResponsiveGridLayout, useContainerWidth } from 'react-grid-layout';
import type { Layout, Layouts } from 'react-grid-layout';
import 'react-grid-layout/css/styles.css';
import 'react-resizable/css/styles.css';

import { useDashboardStore } from '../../stores/dashboardStore';
import {
  GRID_COLS,
  ROW_HEIGHT,
  GRID_MARGIN,
  GRID_CONTAINER_PADDING,
  ALL_WIDGETS,
} from '../../config/gridSpec';
import { renderWidget } from '../widgets';
import './GridDashboard.css';

const BREAKPOINTS = { lg: 1600, md: 1200, sm: 900, xs: 600 };
const COLS = { lg: GRID_COLS, md: 8, sm: 4, xs: 2 };

export const GridDashboard = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const width = useContainerWidth(containerRef);

  const layout = useDashboardStore((s) => s.layout);
  const setLayout = useDashboardStore((s) => s.setLayout);

  const layouts: Layouts = useMemo(
    () => ({
      lg: layout,
      md: layout.map((l) => ({ ...l, w: Math.min(l.w, 8) })),
      sm: layout.map((l) => ({ ...l, x: 0, w: 4 })),
      xs: layout.map((l) => ({ ...l, x: 0, w: 2 })),
    }),
    [layout],
  );

  const handleLayoutChange = useCallback(
    (current: Layout[], _all: Layouts) => {
      if (current.length === ALL_WIDGETS.length) {
        setLayout(current);
      }
    },
    [setLayout],
  );

  return (
    <div className="grid-dashboard" ref={containerRef}>
      {width > 0 && (
        <ResponsiveGridLayout
          className="gsad-grid"
          width={width}
          layouts={layouts}
          breakpoints={BREAKPOINTS}
          cols={COLS}
          rowHeight={ROW_HEIGHT}
          margin={GRID_MARGIN}
          containerPadding={GRID_CONTAINER_PADDING}
          isDraggable
          isResizable
          compactType="vertical"
          onLayoutChange={handleLayoutChange}
          draggableHandle=".widget-header"
        >
          {ALL_WIDGETS.map((w) => (
            <div key={w.id} data-grid-id={w.id}>
              {renderWidget(w.id)}
            </div>
          ))}
        </ResponsiveGridLayout>
      )}
    </div>
  );
};
