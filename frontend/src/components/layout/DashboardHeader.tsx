/**
 * DashboardHeader — top bar with title, UTC clock, layout controls,
 * and Ollama model selector.
 */

import { useEffect, useState } from 'react';
import { useDashboardStore } from '../../stores/dashboardStore';
import './DashboardHeader.css';

export const DashboardHeader = () => {
  const [utc, setUtc] = useState(new Date().toISOString());
  const resetLayout = useDashboardStore((s) => s.resetLayout);
  const savePreset = useDashboardStore((s) => s.savePreset);
  const presets = useDashboardStore((s) => s.presets);
  const loadPreset = useDashboardStore((s) => s.loadPreset);
  const ollamaModel = useDashboardStore((s) => s.ollamaModel);
  const setOllamaModel = useDashboardStore((s) => s.setOllamaModel);

  useEffect(() => {
    const timer = setInterval(() => setUtc(new Date().toISOString()), 1000);
    return () => clearInterval(timer);
  }, []);

  const handleSave = () => {
    const name = prompt('Layout preset name:');
    if (name) savePreset(name, '');
  };

  return (
    <header className="dashboard-header">
      <div className="header-left">
        <h1 className="header-title">GSAD</h1>
        <span className="header-subtitle">
          Global Situation Awareness Dashboard
        </span>
      </div>

      <div className="header-center">
        <span className="utc-clock">{utc.replace('T', ' ').slice(0, 19)} UTC</span>
      </div>

      <div className="header-right">
        {/* Ollama model selector */}
        <div className="header-control">
          <label className="header-label">AI Model:</label>
          <input
            className="header-input"
            type="text"
            placeholder="ollama model name"
            value={ollamaModel ?? ''}
            onChange={(e) => setOllamaModel(e.target.value)}
          />
        </div>

        {/* Layout controls */}
        <div className="header-control">
          {presets.length > 0 && (
            <select
              className="header-select"
              onChange={(e) => loadPreset(e.target.value)}
              defaultValue=""
            >
              <option value="" disabled>
                Load preset…
              </option>
              {presets.map((p) => (
                <option key={p.id} value={p.id}>
                  {p.name}
                </option>
              ))}
            </select>
          )}
          <button className="header-btn" onClick={handleSave}>
            Save Layout
          </button>
          <button className="header-btn secondary" onClick={resetLayout}>
            Reset
          </button>
        </div>
      </div>
    </header>
  );
};
