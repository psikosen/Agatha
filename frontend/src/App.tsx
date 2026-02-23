import { DashboardHeader } from './components/layout/DashboardHeader';
import { GridDashboard } from './components/layout/GridDashboard';
import './styles/global.css';

function App() {
  return (
    <div className="gsad-app">
      <DashboardHeader />
      <GridDashboard />
    </div>
  );
}

export default App;
