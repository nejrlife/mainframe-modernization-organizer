import React from 'react';
import { Handle, Position } from 'reactflow';

const statusColors = {
  legacy: '#ef4444',
  'in-progress': '#f59e0b',
  modernized: '#10b981',
  deprecated: '#6b7280'
};

const criticalityColors = {
  high: '#ef4444',
  medium: '#f59e0b',
  low: '#10b981'
};

const CustomNode = ({ data, selected }) => {
  const statusColor = statusColors[data.status] || '#6b7280';
  const criticalityColor = criticalityColors[data.details?.criticality] || '#f59e0b';

  return (
    <div
      style={{
        padding: '15px',
        borderRadius: '8px',
        border: selected ? '3px solid #3b82f6' : '2px solid #e5e7eb',
        backgroundColor: 'white',
        minWidth: '200px',
        boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
        position: 'relative'
      }}
    >
      <Handle type="target" position={Position.Left} />
      
      {/* Criticality indicator */}
      <div
        style={{
          position: 'absolute',
          top: '8px',
          right: '8px',
          width: '12px',
          height: '12px',
          borderRadius: '50%',
          backgroundColor: criticalityColor
        }}
        title={`Criticality: ${data.details?.criticality || 'medium'}`}
      />

      {/* Node content */}
      <div style={{ marginBottom: '8px' }}>
        <div
          style={{
            fontWeight: 'bold',
            fontSize: '14px',
            marginBottom: '4px',
            color: '#1f2937'
          }}
        >
          {data.label}
        </div>
        <div
          style={{
            fontSize: '11px',
            color: 'white',
            backgroundColor: statusColor,
            padding: '2px 8px',
            borderRadius: '4px',
            display: 'inline-block',
            textTransform: 'capitalize'
          }}
        >
          {data.status.replace('-', ' ')}
        </div>
      </div>

      {/* Technology stack */}
      {data.details?.technology && (
        <div
          style={{
            fontSize: '11px',
            color: '#6b7280',
            marginBottom: '4px'
          }}
        >
          {data.details.technology.split(',')[0]}...
        </div>
      )}

      {/* POC info */}
      {data.poc?.name && (
        <div
          style={{
            fontSize: '10px',
            color: '#9ca3af',
            marginTop: '8px',
            paddingTop: '8px',
            borderTop: '1px solid #e5e7eb'
          }}
        >
          👤 {data.poc.name}
        </div>
      )}

      <Handle type="source" position={Position.Right} />
    </div>
  );
};

export default CustomNode;

// Made with Bob
