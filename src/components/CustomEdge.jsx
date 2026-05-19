import { memo } from 'react';
import { BaseEdge, EdgeLabelRenderer, getBezierPath } from 'reactflow';
import { INTEGRATION_STATUS_COLORS, INTEGRATION_TYPE_ICONS } from '../schema';

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
  selected,
  style
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

  const edgeOpacity = style?.opacity !== undefined ? style.opacity : 1;
  const strokeDasharray = style?.strokeDasharray || (data?.type === 'Batch' ? '5,5' : 'none');
  const hasDottedLine = strokeDasharray === '5,5';
  const animationDirection = style?.animationDirection || 'normal';
  
  // Use purple color for dotted lines, otherwise use status color
  const edgeColor = hasDottedLine ? '#9333ea' : statusColor;

  return (
    <>
      <BaseEdge
        id={id}
        path={edgePath}
        markerEnd={markerEnd}
        style={{
          stroke: edgeColor,
          strokeWidth: strokeWidth,
          strokeDasharray: strokeDasharray,
          strokeDashoffset: hasDottedLine ? 0 : undefined,
          animation: hasDottedLine ? 'dashmove 1s linear infinite' : 'none',
          animationDirection: animationDirection,
          transition: 'all 0.2s ease',
          opacity: edgeOpacity
        }}
      />
      <style>{`
        @keyframes dashmove {
          to {
            stroke-dashoffset: -10;
          }
        }
      `}</style>
      
      {/* Edge Label */}
      <EdgeLabelRenderer>
        <div
          style={{
            position: 'absolute',
            transform: `translate(-50%, -50%) translate(${labelX}px,${labelY}px)`,
            pointerEvents: 'all',
            fontSize: '11px',
            fontWeight: '500',
            opacity: edgeOpacity,
            transition: 'opacity 0.3s ease'
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
              whiteSpace: 'nowrap',
              display: 'flex',
              alignItems: 'center',
              gap: '4px'
            }}
          >
            <span>{INTEGRATION_TYPE_ICONS[data?.integrationType] || '🔗'}</span>
            <span>{data?.integrationType || 'Integration'}</span>
          </div>
        </div>
      </EdgeLabelRenderer>
    </>
  );
};

export default memo(CustomEdge);

// Made with Bob