import { useMemo } from 'react';

/**
 * Statistics Component
 * Displays dashboard metrics for the modernization project
 * Requirements: FR-2.4.1
 */
const Statistics = ({ nodes, edges }) => {
  const stats = useMemo(() => {
    // Node statistics
    const nodesByStatus = nodes.reduce((acc, node) => {
      const status = node.data.status;
      acc[status] = (acc[status] || 0) + 1;
      return acc;
    }, {});

    const nodesByCriticality = nodes.reduce((acc, node) => {
      const criticality = node.data.details?.criticality || 'Medium';
      acc[criticality] = (acc[criticality] || 0) + 1;
      return acc;
    }, {});

    // Edge statistics
    const edgesByStatus = edges.reduce((acc, edge) => {
      const status = edge.data?.status || 'Not Started';
      acc[status] = (acc[status] || 0) + 1;
      return acc;
    }, {});

    const edgesByType = edges.reduce((acc, edge) => {
      const type = edge.data?.type || 'Unknown';
      acc[type] = (acc[type] || 0) + 1;
      return acc;
    }, {});

    // Calculate progress percentages
    const totalNodes = nodes.length;
    const completedNodes = nodesByStatus['Completed'] || 0;
    const inProgressNodes = nodesByStatus['In Progress'] || 0;
    const blockedNodes = nodesByStatus['Blocked'] || 0;
    const notStartedNodes = nodesByStatus['Not Started'] || 0;

    const totalEdges = edges.length;
    const completedEdges = edgesByStatus['Completed'] || 0;
    const inProgressEdges = edgesByStatus['In Progress'] || 0;

    const modernizationProgress = totalNodes > 0
      ? Math.round((completedNodes / totalNodes) * 100)
      : 0;

    const integrationProgress = totalEdges > 0
      ? Math.round((completedEdges / totalEdges) * 100)
      : 0;

    return {
      totalNodes,
      totalEdges,
      nodesByStatus,
      nodesByCriticality,
      edgesByStatus,
      edgesByType,
      completedNodes,
      inProgressNodes,
      blockedNodes,
      notStartedNodes,
      completedEdges,
      inProgressEdges,
      modernizationProgress,
      integrationProgress
    };
  }, [nodes, edges]);

  return (
    <div style={{
      position: 'fixed',
      left: '20px',
      top: '20px',
      width: '280px',
      background: 'white',
      borderRadius: '12px',
      boxShadow: '0 4px 12px rgba(0, 0, 0, 0.15)',
      padding: '20px',
      zIndex: 1000
    }}>
      <h3 style={{ 
        margin: '0 0 16px 0', 
        fontSize: '18px', 
        fontWeight: '600',
        color: '#1f2937'
      }}>
        📊 Project Statistics
      </h3>

      {/* Overall Progress */}
      <div style={{ marginBottom: '20px' }}>
        <div style={{ 
          fontSize: '14px', 
          fontWeight: '500', 
          marginBottom: '8px',
          color: '#374151'
        }}>
          Modernization Progress
        </div>
        <div style={{
          width: '100%',
          height: '24px',
          background: '#e5e7eb',
          borderRadius: '12px',
          overflow: 'hidden',
          position: 'relative'
        }}>
          <div style={{
            width: `${stats.modernizationProgress}%`,
            height: '100%',
            background: 'linear-gradient(90deg, #10b981, #059669)',
            transition: 'width 0.3s ease',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: 'white',
            fontSize: '12px',
            fontWeight: '600'
          }}>
            {stats.modernizationProgress}%
          </div>
        </div>
      </div>

      {/* Systems Summary */}
      <div style={{ 
        marginBottom: '16px',
        paddingBottom: '16px',
        borderBottom: '1px solid #e5e7eb'
      }}>
        <div style={{ 
          fontSize: '14px', 
          fontWeight: '600', 
          marginBottom: '10px',
          color: '#374151'
        }}>
          Systems ({stats.totalNodes})
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
          <StatItem
            label="Completed"
            value={stats.completedNodes}
            color="#10b981"
          />
          <StatItem
            label="In Progress"
            value={stats.inProgressNodes}
            color="#f59e0b"
          />
          <StatItem
            label="Blocked"
            value={stats.blockedNodes}
            color="#ef4444"
          />
          <StatItem
            label="Not Started"
            value={stats.notStartedNodes}
            color="#6b7280"
          />
        </div>
      </div>

      {/* Integrations Summary */}
      <div style={{ marginBottom: '0' }}>
        <div style={{ 
          fontSize: '14px', 
          fontWeight: '600', 
          marginBottom: '10px',
          color: '#374151'
        }}>
          Integrations ({stats.totalEdges})
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
          <StatItem 
            label="Completed" 
            value={stats.completedEdges} 
            color="#10b981" 
          />
          <StatItem 
            label="In Progress" 
            value={stats.inProgressEdges} 
            color="#f59e0b" 
          />
          <StatItem 
            label="Not Started" 
            value={stats.edgesByStatus['Not Started'] || 0} 
            color="#6b7280" 
          />
          <StatItem 
            label="Blocked" 
            value={stats.edgesByStatus['Blocked'] || 0} 
            color="#ef4444" 
          />
        </div>
      </div>
    </div>
  );
};

// Helper component for stat items
const StatItem = ({ label, value, color }) => (
  <div style={{
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    fontSize: '13px'
  }}>
    <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
      <div style={{
        width: '8px',
        height: '8px',
        borderRadius: '50%',
        backgroundColor: color
      }} />
      <span style={{ color: '#6b7280' }}>{label}</span>
    </div>
    <span style={{ fontWeight: '600', color: '#1f2937' }}>{value}</span>
  </div>
);

export default Statistics;

// Made with Bob