import { memo } from 'react';

/**
 * ViewToggle Component
 * Toggle between As-Is and To-Be views
 */
const ViewToggle = ({ view, onViewChange }) => {
  return (
    <div style={{
      position: 'fixed',
      top: '20px',
      left: '50%',
      transform: 'translateX(-50%)',
      zIndex: 1001,
      background: 'white',
      borderRadius: '12px',
      boxShadow: '0 4px 12px rgba(0, 0, 0, 0.15)',
      padding: '6px',
      display: 'flex',
      gap: '4px'
    }}>
      <button
        onClick={() => onViewChange('as-is')}
        style={{
          padding: '10px 24px',
          border: 'none',
          borderRadius: '8px',
          fontSize: '14px',
          fontWeight: '600',
          cursor: 'pointer',
          transition: 'all 0.2s ease',
          background: view === 'as-is' 
            ? 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)' 
            : 'transparent',
          color: view === 'as-is' ? 'white' : '#6b7280',
          boxShadow: view === 'as-is' ? '0 2px 8px rgba(102, 126, 234, 0.3)' : 'none'
        }}
      >
        📊 As-Is Architecture
      </button>
      <button
        onClick={() => onViewChange('to-be')}
        style={{
          padding: '10px 24px',
          border: 'none',
          borderRadius: '8px',
          fontSize: '14px',
          fontWeight: '600',
          cursor: 'pointer',
          transition: 'all 0.2s ease',
          background: view === 'to-be' 
            ? 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)' 
            : 'transparent',
          color: view === 'to-be' ? 'white' : '#6b7280',
          boxShadow: view === 'to-be' ? '0 2px 8px rgba(102, 126, 234, 0.3)' : 'none'
        }}
      >
        🚀 To-Be Architecture
      </button>
    </div>
  );
};

export default memo(ViewToggle);

// Made with Bob