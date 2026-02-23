/**
 * Zustand store for GSAD Dashboard state management.
 *
 * Manages:
 * - Layout positions (react-grid-layout compatible)
 * - Widget runtime states
 * - Cross-linking / focus mode
 * - Layout presets (save/load)
 */

import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { LayoutItem } from 'react-grid-layout/legacy';
import type {
  CrossLinkPayload,
  LayoutPreset,
  WidgetState,
} from '../types/widget';
import { ALL_WIDGETS, GRID_COLS } from '../config/gridSpec';

// ─── Helpers ─────────────────────────────────────────────────────

/** Convert our spec positions → react-grid-layout LayoutItem[] */
function defaultRGLLayout(): LayoutItem[] {
  return ALL_WIDGETS.map((w) => ({
    i: w.id,
    x: w.defaultPosition.colStart - 1, // RGL is 0-based
    y: w.defaultPosition.rowStart - 1,
    w: w.defaultPosition.colSpan,
    h: w.defaultPosition.rowSpan,
    minW: 2,
    minH: 1,
  }));
}

function defaultWidgetStates(): Record<string, WidgetState> {
  const states: Record<string, WidgetState> = {};
  for (const w of ALL_WIDGETS) {
    states[w.id] = {
      id: w.id,
      isLoading: false,
      hasError: false,
      isExpanded: false,
      isFocused: false,
    };
  }
  return states;
}

// ─── Store types ─────────────────────────────────────────────────

interface DashboardState {
  // Layout
  layout: LayoutItem[];
  cols: number;
  presets: LayoutPreset[];
  activePresetId: string | null;

  // Widget runtime
  widgetStates: Record<string, WidgetState>;

  // Cross-linking
  activeCrossLink: CrossLinkPayload | null;
  focusedWidgetId: string | null;

  // Ollama
  ollamaModel: string | null;

  // Actions
  setLayout: (layout: LayoutItem[]) => void;
  resetLayout: () => void;
  savePreset: (name: string, description: string) => void;
  loadPreset: (presetId: string) => void;
  deletePreset: (presetId: string) => void;

  setWidgetState: (id: string, partial: Partial<WidgetState>) => void;
  expandWidget: (id: string) => void;
  collapseWidget: (id: string) => void;

  setCrossLink: (payload: CrossLinkPayload | null) => void;
  setFocusedWidget: (id: string | null) => void;

  setOllamaModel: (model: string) => void;
}

// ─── Store ───────────────────────────────────────────────────────

export const useDashboardStore = create<DashboardState>()(
  persist(
    (set, get) => ({
      layout: defaultRGLLayout(),
      cols: GRID_COLS,
      presets: [],
      activePresetId: null,

      widgetStates: defaultWidgetStates(),

      activeCrossLink: null,
      focusedWidgetId: null,

      ollamaModel: null,

      // ── Layout actions ──────────────────────────────────────
      setLayout: (layout) => set({ layout }),

      resetLayout: () =>
        set({
          layout: defaultRGLLayout(),
          activePresetId: null,
        }),

      savePreset: (name, description) => {
        const now = new Date().toISOString();
        const preset: LayoutPreset = {
          id: `preset-${Date.now()}`,
          name,
          description,
          widgets: get().layout.map((l) => ({
            widget_id: l.i,
            col_start: l.x + 1,
            col_span: l.w,
            row_start: l.y + 1,
            row_span: l.h,
          })),
          createdAt: now,
          updatedAt: now,
        };
        set((s) => ({ presets: [...s.presets, preset] }));
      },

      loadPreset: (presetId) => {
        const preset = get().presets.find((p) => p.id === presetId);
        if (!preset) return;
        const layout: LayoutItem[] = preset.widgets.map((pw) => ({
          i: pw.widget_id,
          x: pw.col_start - 1,
          y: pw.row_start - 1,
          w: pw.col_span,
          h: pw.row_span,
          minW: 2,
          minH: 1,
        }));
        set({ layout, activePresetId: presetId });
      },

      deletePreset: (presetId) =>
        set((s) => ({
          presets: s.presets.filter((p) => p.id !== presetId),
          activePresetId:
            s.activePresetId === presetId ? null : s.activePresetId,
        })),

      // ── Widget state ────────────────────────────────────────
      setWidgetState: (id, partial) =>
        set((s) => ({
          widgetStates: {
            ...s.widgetStates,
            [id]: { ...s.widgetStates[id], ...partial },
          },
        })),

      expandWidget: (id) =>
        set((s) => ({
          widgetStates: {
            ...s.widgetStates,
            [id]: { ...s.widgetStates[id], isExpanded: true },
          },
        })),

      collapseWidget: (id) =>
        set((s) => ({
          widgetStates: {
            ...s.widgetStates,
            [id]: { ...s.widgetStates[id], isExpanded: false },
          },
        })),

      // ── Cross-linking ───────────────────────────────────────
      setCrossLink: (payload) => set({ activeCrossLink: payload }),

      setFocusedWidget: (id) => set({ focusedWidgetId: id }),

      // ── Ollama ──────────────────────────────────────────────
      setOllamaModel: (model) => set({ ollamaModel: model }),
    }),
    {
      name: 'gsad-dashboard-storage',
      partialize: (state) => ({
        layout: state.layout,
        presets: state.presets,
        activePresetId: state.activePresetId,
        ollamaModel: state.ollamaModel,
      }),
    },
  ),
);
