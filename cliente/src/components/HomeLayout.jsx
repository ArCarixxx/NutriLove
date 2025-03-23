// src/components/DashboardLayout.jsx
import Header from './HeaderHome';

const DashboardLayout = ({ children }) => {
  return (
      <div style={{ flex: 1 }}>
        <Header />
        <main style={{ padding: '20px' }}>
          {children}
        </main>
      </div>
  );
};

export default DashboardLayout;
