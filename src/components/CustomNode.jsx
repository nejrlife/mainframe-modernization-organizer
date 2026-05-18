import { memo } from 'react';
import { Handle, Position } from 'reactflow';
import { NODE_STATUS_COLORS, CRITICALITY_COLORS } from '../schema';

/**
 * CustomNode Component
 * Displays a system/application node on the canvas
 * Requirements: FR-2.1.1, FR-2.1.2, FR-2.1.3
 */
const CustomNode = ({ data, selected }) => {
  const statusColor = NODE_STATUS_COLORS[data.status] || '#6b7280';
  const criticalityColor = CRITICALITY_COLORS[data.details?.criticality] || '#f59e0b';

  return (
    <div
      className="custom-node"
      style={{
        background: 'white',
        border: `3px solid ${selected ? '#3b82f6' : statusColor}`,
        borderRadius: '12px',
        padding: '16px',
        minWidth: '200px',
        maxWidth: '250px',
        boxShadow: selected 
          ? '0 10px 25px rgba(0, 0, 0, 0.2)' 
          : '0 4px 6px rgba(0, 0, 0, 0.1)',
        transition: 'all 0.2s ease',
        cursor: 'pointer',
        position: 'relative'
      }}
    >
      {/* Criticality Indicator - Top Right Corner */}
      <div
        style={{
          position: 'absolute',
          top: '8px',
          right: '8px',
          width: '12px',
          height: '12px',
          borderRadius: '50%',
          backgroundColor: criticalityColor,
          border: '2px solid white',
          boxShadow: '0 2px 4px rgba(0, 0, 0, 0.2)'
        }}
        title={`Criticality: ${data.details?.criticality || 'Medium'}`}
      />

      {/* System Name */}
      <div
        style={{
          fontSize: '16px',
          fontWeight: '600',
          color: '#1f2937',
          marginBottom: '8px',
          paddingRight: '20px',
          wordWrap: 'break-word'
        }}
      >
        {data.label}
      </div>

      {/* Status Badge */}
      <div
        style={{
          display: 'inline-block',
          padding: '4px 8px',
          borderRadius: '6px',
          fontSize: '12px',
          fontWeight: '500',
          backgroundColor: statusColor,
          color: 'white',
          marginBottom: '8px'
        }}
      >
        {data.status}
      </div>

      {/* Technology Stack */}
      {data.details?.technology && (
        <div
          style={{
            fontSize: '12px',
            color: '#6b7280',
            marginBottom: '6px',
            fontStyle: 'italic'
          }}
        >
          {data.details.technology.length > 30 
            ? data.details.technology.substring(0, 30) + '...' 
            : data.details.technology}
        </div>
      )}

      {/* Point of Contact */}
      {data.poc?.name && (
        <div
          style={{
            fontSize: '11px',
            color: '#4b5563',
            marginTop: '8px',
            paddingTop: '8px',
            borderTop: '1px solid #e5e7eb'
          }}
        >
          <div style={{ fontWeight: '500' }}>👤 {data.poc.name}</div>
          {data.poc.email && (
            <div style={{ color: '#6b7280', marginTop: '2px' }}>
              ✉️ {data.poc.email}
            </div>
          )}
        </div>
      )}

      {/* Connection Handles */}
      <Handle
        type="target"
        position={Position.Left}
        style={{
          background: statusColor,
          width: '10px',
          height: '10px',
          border: '2px solid white'
        }}
      />
      <Handle
        type="source"
        position={Position.Right}
        style={{
          background: statusColor,
          width: '10px',
          height: '10px',
          border: '2px solid white'
        }}
      />
    </div>
  );
};

export default memo(CustomNode);

// Made with Bob
