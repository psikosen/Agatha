// Polyfill ResizeObserver for jsdom (used by react-grid-layout)
global.ResizeObserver = class ResizeObserver {
  observe() {}
  unobserve() {}
  disconnect() {}
};
