import React from 'react';

const StatisticsPanel = ({ nodes, edges }) => {
  const stats = {
    total: nodes.length,
    legacy: nodes.filter(n => n.data.status === 'legacy').length,
    inProgress: nodes.filter(n => n.data.status === 'in-progress').length,
    modernized: nodes.filter(n => n.data.status === 'modernized').length,
    deprecated: nodes.filter(n => n.data.status === 'deprecated').length,
    totalIntegrations: edges.length,
    completedIntegrations: edges.filter(e => e.data?.status === 'completed').length
  };

  return (
    <div
      style={{
        position: 'absolute',
        top: '20px',
        left: '20px',
        backgroundColor: 'white',
        padding: '20px',
        borderRadius: '8px',
        boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
        minWidth: '250px',
        zIndex: 10
      }}
    >
      <h3 style={{ margin: '0 0 15px 0', fontSize: '18px', color: '#1f2937', fontWeight: 'bold' }}>
        📊 Statistics
      </h3>

      {/* System Statistics */}
      <div style={{ marginBottom: '15px' }}>
        <h4 style={{ margin: '0 0 10px 0', fontSize: '14px', color: '#6b7280', fontWeight: '600' }}>
          Systems
        </h4>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <span style={{ fontSize: '13px', color: '#374151' }}>Total Systems:</span>
            <span style={{ fontSize: '13px', fontWeight: 'bold', color: '#1f2937' }}>{stats.total}</span>
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <span style={{ fontSize: '13px', color: '#ef4444' }}>Legacy:</span>
            <span style={{ fontSize: '13px', fontWeight: 'bold', color: '#ef4444' }}>{stats.legacy}</span>
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <span style={{ fontSize: '13px', color: '#f59e0b' }}>In Progress:</span>
            <span style={{ fontSize: '13px', fontWeight: 'bold', color: '#f59e0b' }}>{stats.inProgress}</span>
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <span style={{ fontSize: '13px', color: '#10b981' }}>Modernized:</span>
            <span style={{ fontSize: '13px', fontWeight: 'bold', color: '#10b981' }}>{stats.modernized}</span>
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <span style={{ fontSize: '13px', color: '#6b7280' }}>Deprecated:</span>
            <span style={{ fontSize: '13px', fontWeight: 'bold', color: '#6b7280' }}>{stats.deprecated}</span>
          </div>
        </div>
      </div>

      {/* Integration Statistics */}
      <div style={{ paddingTop: '15px', borderTop: '1px solid #e5e7eb' }}>
        <h4 style={{ margin: '0 0 10px 0', fontSize: '14px', color: '#6b7280', fontWeight: '600' }}>
          Integrations
        </h4>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <span style={{ fontSize: '13px', color: '#374151' }}>Total:</span>
            <span style={{ fontSize: '13px', fontWeight: 'bold', color: '#1f2937' }}>{stats.totalIntegrations}</span>
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <span style={{ fontSize: '13px', color: '#10b981' }}>Completed:</span>
            <span style={{ fontSize: '13px', fontWeight: 'bold', color: '#10b981' }}>{stats.completedIntegrations}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StatisticsPanel;

// Made with Bob
