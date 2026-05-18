import { NODE_STATUS_COLORS, INTEGRATION_STATUS_COLORS, CRITICALITY_COLORS } from '../schema';

/**
 * Legend Component
 * Displays color coding reference for statuses and criticality
 * Requirements: FR-2.1.1, FR-2.2.1
 */
const Legend = () => {
  return (
    <div style={{
      position: 'fixed',
      left: '20px',
      bottom: '20px',
      width: '280px',
      background: 'white',
      borderRadius: '12px',
      boxShadow: '0 4px 12px rgba(0, 0, 0, 0.15)',
      padding: '16px',
      zIndex: 1000
    }}>
      <h4 style={{ 
        margin: '0 0 12px 0', 
        fontSize: '14px', 
        fontWeight: '600',
        color: '#1f2937'
      }}>
        🎨 Legend
      </h4>

      {/* Node Status Colors */}
      <div style={{ marginBottom: '12px' }}>
        <div style={{ 
          fontSize: '12px', 
          fontWeight: '600', 
          marginBottom: '6px',
          color: '#6b7280'
        }}>
          System Status
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
          {Object.entries(NODE_STATUS_COLORS).map(([status, color]) => (
            <LegendItem key={status} label={status} color={color} />
          ))}
        </div>
      </div>

      {/* Integration Status Colors */}
      <div style={{ marginBottom: '12px' }}>
        <div style={{ 
          fontSize: '12px', 
          fontWeight: '600', 
          marginBottom: '6px',
          color: '#6b7280'
        }}>
          Integration Status
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
          {Object.entries(INTEGRATION_STATUS_COLORS).map(([status, color]) => (
            <LegendItem key={status} label={status} color={color} type="line" />
          ))}
        </div>
      </div>

      {/* Criticality Colors */}
      <div>
        <div style={{ 
          fontSize: '12px', 
          fontWeight: '600', 
          marginBottom: '6px',
          color: '#6b7280'
        }}>
          Criticality Level
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
          {Object.entries(CRITICALITY_COLORS).map(([level, color]) => (
            <LegendItem key={level} label={level} color={color} type="dot" />
          ))}
        </div>
      </div>

      {/* Additional Info */}
      <div style={{
        marginTop: '12px',
        paddingTop: '12px',
        borderTop: '1px solid #e5e7eb',
        fontSize: '11px',
        color: '#6b7280',
        lineHeight: '1.4'
      }}>
        <div style={{ marginBottom: '4px' }}>
          💡 <strong>Tip:</strong> Click nodes/edges to edit
        </div>
        <div>
          🔗 Drag from handles to create integrations
        </div>
      </div>
    </div>
  );
};

// Helper component for legend items
const LegendItem = ({ label, color, type = 'border' }) => {
  let indicator;
  
  if (type === 'dot') {
    indicator = (
      <div style={{
        width: '10px',
        height: '10px',
        borderRadius: '50%',
        backgroundColor: color,
        border: '2px solid white',
        boxShadow: '0 1px 2px rgba(0, 0, 0, 0.2)'
      }} />
    );
  } else if (type === 'line') {
    indicator = (
      <div style={{
        width: '20px',
        height: '3px',
        backgroundColor: color,
        borderRadius: '2px'
      }} />
    );
  } else {
    indicator = (
      <div style={{
        width: '16px',
        height: '16px',
        border: `3px solid ${color}`,
        borderRadius: '4px',
        backgroundColor: 'white'
      }} />
    );
  }

  return (
    <div style={{
      display: 'flex',
      alignItems: 'center',
      gap: '8px',
      fontSize: '12px',
      color: '#374151'
    }}>
      {indicator}
      <span>{label}</span>
    </div>
  );
};

export default Legend;

// Made with Bob