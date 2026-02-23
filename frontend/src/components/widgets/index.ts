/**
 * Widget Registry — maps every GSAD-## ID to its React component.
 *
 * This is the single source of truth used by <GridDashboard> to
 * render the correct widget for each layout cell.
 */

import React from 'react';
import type { WidgetDefinition } from '../../types/widget';
import * as spec from '../../config/gridSpec';

// Eagerly imported widgets (Row 1 — unique UIs)
import { MapModule } from './MapModule';
import { AIInsights } from './AIInsights';
import { StrategicPosture } from './StrategicPosture';
import { LiveNews } from './LiveNews';
import { LiveWebcams } from './LiveWebcams';
import { GenericFeedWidget } from './GenericFeedWidget';

// ── Icon map for generic feed widgets ───────────────────────────
const ICON_MAP: Record<string, string> = {
  'GSAD-06': '\u{1F4E1}', // Intel Feed — satellite
  'GSAD-07': '\u{1F3D7}', // Infrastructure — construction
  'GSAD-08': '\u{1F30D}', // World News — globe
  'GSAD-09': '\u{1F54C}', // Middle East — mosque
  'GSAD-10': '\u{1F6E2}', // Commodities — oil
  'GSAD-11': '\u{1F4C8}', // Markets — chart up
  'GSAD-12': '\u{1F4CA}', // Economic — bar chart
  'GSAD-13': '\u{1F4F0}', // Financial News — newspaper
  'GSAD-14': '\u{1F9E0}', // AI/ML — brain
  'GSAD-15': '\u{1F4C9}', // Layoffs — chart down
  'GSAD-16': '\u{1F514}', // My Monitors — bell
  'GSAD-17': '\u{1F4BB}', // Technology — laptop
  'GSAD-18': '\u{1F525}', // Fires/Conflict — fire
  'GSAD-19': '\u{1F6B6}', // UNHCR — walking person
  'GSAD-20': '\u{1F321}', // Climate — thermometer
  'GSAD-21': '\u{1F465}', // Population — people
  'GSAD-22': '\u{20BF}',  // BTC ETF — bitcoin
  'GSAD-23': '\u{1F4B2}', // Stablecoins — dollar
  'GSAD-24': '\u{1F5FA}', // Sector Heatmap — map
  'GSAD-25': '\u{1F4E1}', // Market Radar — satellite
};

// ── Definitions keyed by GSAD-## ────────────────────────────────
const DEFS: Record<string, WidgetDefinition> = {
  'GSAD-06': spec.GSAD_06_INTEL_FEED,
  'GSAD-07': spec.GSAD_07_INFRA_CASCADE,
  'GSAD-08': spec.GSAD_08_WORLD_NEWS,
  'GSAD-09': spec.GSAD_09_MIDDLE_EAST,
  'GSAD-10': spec.GSAD_10_COMMODITIES,
  'GSAD-11': spec.GSAD_11_MARKETS,
  'GSAD-12': spec.GSAD_12_ECONOMIC_INDICATORS,
  'GSAD-13': spec.GSAD_13_FINANCIAL_NEWS,
  'GSAD-14': spec.GSAD_14_AI_ML_FEED,
  'GSAD-15': spec.GSAD_15_LAYOFFS_TRACKER,
  'GSAD-16': spec.GSAD_16_MY_MONITORS,
  'GSAD-17': spec.GSAD_17_TECHNOLOGY,
  'GSAD-18': spec.GSAD_18_FIRES_CONFLICT,
  'GSAD-19': spec.GSAD_19_UNHCR,
  'GSAD-20': spec.GSAD_20_CLIMATE,
  'GSAD-21': spec.GSAD_21_POPULATION,
  'GSAD-22': spec.GSAD_22_BTC_ETF,
  'GSAD-23': spec.GSAD_23_STABLECOINS,
  'GSAD-24': spec.GSAD_24_SECTOR_HEATMAP,
  'GSAD-25': spec.GSAD_25_MARKET_RADAR,
};

/**
 * Resolve a widget ID to its React element.
 */
export function renderWidget(widgetId: string): React.ReactNode {
  switch (widgetId) {
    case 'GSAD-01':
      return React.createElement(MapModule);
    case 'GSAD-02':
      return React.createElement(AIInsights);
    case 'GSAD-03':
      return React.createElement(StrategicPosture);
    case 'GSAD-04':
      return React.createElement(LiveNews);
    case 'GSAD-05':
      return React.createElement(LiveWebcams);
    default: {
      const def = DEFS[widgetId];
      if (!def) return null;
      return React.createElement(GenericFeedWidget, {
        definition: def,
        icon: ICON_MAP[widgetId] ?? '\u{2753}',
      });
    }
  }
}
