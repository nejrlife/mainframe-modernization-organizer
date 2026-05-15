import React from 'react';
import { BaseEdge, EdgeLabelRenderer, getBezierPath } from 'reactflow';

const integrationTypeIcons = {
  api: '🔌',
  'file-transfer': '📁',
  database: '🗄️',
  'message-queue': '📨',
  batch: '⏱️',
  direct: '↔️'
};

const statusColors = {
  'not-started': '#9ca3af',
  'in-progress': '#f59e0b',
  completed: '#10b981',
  blocked: '#ef4444'
};

const CustomEdge = ({
  id,
  sourceX,
  sourceY,
  targetX,
  targetY,
  sourcePosition,
  targetPosition,
  data,
  markerEnd,
  selected
}) => {
  const [edgePath, labelX, labelY] = getBezierPath({
    sourceX,
    sourceY,
    sourcePosition,
    targetX,
    targetY,
    targetPosition,
  });

  const statusColor = statusColors[data?.status] || '#9ca3af';
  const isDashed = data?.status === 'not-started';
  const icon = integrationTypeIcons[data?.integrationType] || '🔌';

  return (
    <>
      <BaseEdge
        id={id}
        path={edgePath}
        markerEnd={markerEnd}
        style={{
          stroke: selected ? '#3b82f6' : statusColor,
          strokeWidth: selected ? 3 : 2,
          strokeDasharray: isDashed ? '5,5' : 'none'
        }}
      />
      <EdgeLabelRenderer>
        <div
          style={{
            position: 'absolute',
            transform: `translate(-50%, -50%) translate(${labelX}px,${labelY}px)`,
            pointerEvents: 'all',
            backgroundColor: 'white',
            padding: '6px 10px',
            borderRadius: '6px',
            border: `2px solid ${statusColor}`,
            fontSize: '11px',
            fontWeight: '500',
            boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
            cursor: 'pointer',
            transition: 'transform 0.2s',
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.transform = `translate(-50%, -50%) translate(${labelX}px,${labelY}px) scale(1.1)`;
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.transform = `translate(-50%, -50%) translate(${labelX}px,${labelY}px) scale(1)`;
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
            <span>{icon}</span>
            <span style={{ textTransform: 'capitalize' }}>
              {data?.integrationType?.replace('-', ' ') || 'Integration'}
            </span>
          </div>
          {data?.protocol && (
            <div style={{ fontSize: '9px', color: '#6b7280', marginTop: '2px' }}>
              {data.protocol}
            </div>
          )}
          {data?.criticality && (
            <div
              style={{
                fontSize: '9px',
                color: 'white',
                backgroundColor: data.criticality === 'high' ? '#ef4444' : data.criticality === 'medium' ? '#f59e0b' : '#10b981',
                padding: '1px 4px',
                borderRadius: '3px',
                marginTop: '2px',
                textAlign: 'center'
              }}
            >
              {data.criticality.toUpperCase()}
            </div>
          )}
        </div>
      </EdgeLabelRenderer>
    </>
  );
};

export default CustomEdge;

// Made with Bob
