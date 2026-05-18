import { memo } from 'react';
import { BaseEdge, EdgeLabelRenderer, getBezierPath } from 'reactflow';
import { INTEGRATION_STATUS_COLORS } from '../schema';

/**
 * CustomEdge Component
 * Displays integration connections between systems
 * Requirements: FR-2.2.1, FR-2.2.2, FR-2.2.3
 */
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

  const statusColor = INTEGRATION_STATUS_COLORS[data?.status] || '#6b7280';
  const strokeWidth = selected ? 3 : 2;

  return (
    <>
      <BaseEdge
        id={id}
        path={edgePath}
        markerEnd={markerEnd}
        style={{
          stroke: statusColor,
          strokeWidth: strokeWidth,
          strokeDasharray: data?.type === 'Batch' ? '5,5' : 'none',
          transition: 'all 0.2s ease'
        }}
      />
      
      {/* Edge Label */}
      <EdgeLabelRenderer>
        <div
          style={{
            position: 'absolute',
            transform: `translate(-50%, -50%) translate(${labelX}px,${labelY}px)`,
            pointerEvents: 'all',
            fontSize: '11px',
            fontWeight: '500'
          }}
          className="nodrag nopan"
        >
          <div
            style={{
              background: 'white',
              padding: '4px 8px',
              borderRadius: '6px',
              border: `2px solid ${statusColor}`,
              boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
              whiteSpace: 'nowrap'
            }}
          >
            {data?.type || 'Integration'}
          </div>
        </div>
      </EdgeLabelRenderer>
    </>
  );
};

export default memo(CustomEdge);

// Made with Bob