import React from 'react';

const Legend = () => {
  const statusItems = [
    { label: 'Legacy', color: '#ef4444' },
    { label: 'In Progress', color: '#f59e0b' },
    { label: 'Modernized', color: '#10b981' },
    { label: 'Deprecated', color: '#6b7280' }
  ];

  return (
    <div
      style={{
        position: 'absolute',
        bottom: '20px',
        right: '20px',
        backgroundColor: 'white',
        padding: '15px',
        borderRadius: '8px',
        boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
        zIndex: 10
      }}
    >
      <h4 style={{ margin: '0 0 10px 0', fontSize: '14px', color: '#1f2937', fontWeight: 'bold' }}>
        Legend
      </h4>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
        {statusItems.map(item => (
          <div
            key={item.label}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '8px'
            }}
          >
            <div
              style={{
                width: '16px',
                height: '16px',
                backgroundColor: item.color,
                borderRadius: '2px'
              }}
            />
            <span style={{ fontSize: '12px', color: '#374151' }}>
              {item.label}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Legend;

// Made with Bob
