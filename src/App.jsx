import React, { useState, useCallback, useRef } from 'react';
import ReactFlow, {
  MiniMap,
  Controls,
  Background,
  useNodesState,
  useEdgesState,
  addEdge,
  MarkerType,
} from 'reactflow';
import 'reactflow/dist/style.css';

import CustomNode from './components/CustomNode';
import CustomEdge from './components/CustomEdge';
import NodeDetailPanel from './components/NodeDetailPanel';
import IntegrationDetailPanel from './components/IntegrationDetailPanel';
import StatisticsPanel from './components/StatisticsPanel';
import Legend from './components/Legend';
import ActionButtons from './components/ActionButtons';
import { initialNodes, initialEdges } from './data/initialData';

const nodeTypes = {
  customNode: CustomNode,
};

const edgeTypes = {
  customEdge: CustomEdge,
};

function App() {
  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);
  const [selectedNode, setSelectedNode] = useState(null);
  const [selectedEdge, setSelectedEdge] = useState(null);
  const reactFlowWrapper = useRef(null);
  const [reactFlowInstance, setReactFlowInstance] = useState(null);

  const onConnect = useCallback(
    (params) => {
      const newEdge = {
        ...params,
        type: 'customEdge',
        markerEnd: {
          type: MarkerType.ArrowClosed,
          width: 20,
          height: 20,
        },
        data: {
          integrationType: 'api',
          status: 'not-started',
          direction: 'unidirectional',
          criticality: 'medium',
          protocol: '',
          dataFormat: '',
          frequency: '',
          notes: ''
        }
      };
      setEdges((eds) => addEdge(newEdge, eds));
    },
    [setEdges]
  );

  const onNodeClick = useCallback((event, node) => {
    setSelectedNode(node);
    setSelectedEdge(null);
  }, []);

  const onEdgeClick = useCallback((event, edge) => {
    setSelectedEdge(edge);
    setSelectedNode(null);
  }, []);

  const onPaneClick = useCallback(() => {
    setSelectedNode(null);
    setSelectedEdge(null);
  }, []);

  const handleNodeUpdate = useCallback((nodeId, newData) => {
    setNodes((nds) =>
      nds.map((node) => {
        if (node.id === nodeId) {
          return {
            ...node,
            data: newData,
          };
        }
        return node;
      })
    );
    setSelectedNode(null);
  }, [setNodes]);

  const handleNodeDelete = useCallback((nodeId) => {
    setNodes((nds) => nds.filter((node) => node.id !== nodeId));
    setEdges((eds) => eds.filter((edge) => edge.source !== nodeId && edge.target !== nodeId));
    setSelectedNode(null);
  }, [setNodes, setEdges]);

  const handleEdgeUpdate = useCallback((edgeId, newData) => {
    setEdges((eds) =>
      eds.map((edge) => {
        if (edge.id === edgeId) {
          return {
            ...edge,
            data: newData,
          };
        }
        return edge;
      })
    );
    setSelectedEdge(null);
  }, [setEdges]);

  const handleEdgeDelete = useCallback((edgeId) => {
    setEdges((eds) => eds.filter((edge) => edge.id !== edgeId));
    setSelectedEdge(null);
  }, [setEdges]);

  const handleAddNode = useCallback(() => {
    const newNode = {
      id: `node-${Date.now()}`,
      type: 'customNode',
      position: {
        x: Math.random() * 500 + 100,
        y: Math.random() * 300 + 100,
      },
      data: {
        label: 'New System',
        status: 'legacy',
        poc: {
          name: '',
          email: '',
          phone: '',
          department: ''
        },
        details: {
          description: '',
          technology: '',
          criticality: 'medium',
          users: 0,
          migrationTarget: '',
          timeline: '',
          notes: ''
        }
      }
    };
    setNodes((nds) => [...nds, newNode]);
    setSelectedNode(newNode);
  }, [setNodes]);

  const handleExport = useCallback(() => {
    const exportData = {
      nodes: nodes.map(node => ({
        id: node.id,
        position: node.position,
        data: node.data
      })),
      edges: edges.map(edge => ({
        id: edge.id,
        source: edge.source,
        target: edge.target,
        data: edge.data
      })),
      timestamp: new Date().toISOString(),
      version: '1.0.0'
    };

    const dataStr = JSON.stringify(exportData, null, 2);
    const dataBlob = new Blob([dataStr], { type: 'application/json' });
    const url = URL.createObjectURL(dataBlob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `modernization-map-${Date.now()}.json`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  }, [nodes, edges]);

  const handleImport = useCallback((data) => {
    try {
      if (!data.nodes || !data.edges) {
        throw new Error('Invalid data format');
      }

      const importedNodes = data.nodes.map(node => ({
        ...node,
        type: 'customNode'
      }));

      const importedEdges = data.edges.map(edge => ({
        ...edge,
        type: 'customEdge',
        markerEnd: {
          type: MarkerType.ArrowClosed,
          width: 20,
          height: 20,
        }
      }));

      setNodes(importedNodes);
      setEdges(importedEdges);
      setSelectedNode(null);
      setSelectedEdge(null);
      
      alert('Data imported successfully!');
    } catch (error) {
      alert('Error importing data: ' + error.message);
      console.error('Import error:', error);
    }
  }, [setNodes, setEdges]);

  return (
    <div style={{ width: '100vw', height: '100vh', display: 'flex', flexDirection: 'column' }}>
      {/* Header */}
      <div
        style={{
          background: 'linear-gradient(135deg, #7c3aed 0%, #a855f7 100%)',
          color: 'white',
          padding: '20px 30px',
          boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)'
        }}
      >
        <h1 style={{ margin: '0 0 5px 0', fontSize: '28px', fontWeight: 'bold' }}>
          🏗️ Mainframe Modernization Organizer
        </h1>
        <p style={{ margin: 0, fontSize: '14px', opacity: 0.9 }}>
          Interactive visualization of systems, integrations, and migration status
        </p>
      </div>

      {/* Canvas */}
      <div ref={reactFlowWrapper} style={{ flex: 1, position: 'relative' }}>
        <ReactFlow
          nodes={nodes}
          edges={edges}
          onNodesChange={onNodesChange}
          onEdgesChange={onEdgesChange}
          onConnect={onConnect}
          onNodeClick={onNodeClick}
          onEdgeClick={onEdgeClick}
          onPaneClick={onPaneClick}
          onInit={setReactFlowInstance}
          nodeTypes={nodeTypes}
          edgeTypes={edgeTypes}
          fitView
          defaultEdgeOptions={{
            markerEnd: {
              type: MarkerType.ArrowClosed,
              width: 20,
              height: 20,
            },
          }}
        >
          <Controls />
          <MiniMap
            nodeColor={(node) => {
              const colors = {
                legacy: '#ef4444',
                'in-progress': '#f59e0b',
                modernized: '#10b981',
                deprecated: '#6b7280'
              };
              return colors[node.data.status] || '#6b7280';
            }}
            style={{
              backgroundColor: '#f9fafb',
            }}
          />
          <Background variant="dots" gap={12} size={1} />
        </ReactFlow>

        {/* Overlays */}
        <StatisticsPanel nodes={nodes} edges={edges} />
        <Legend />
        <ActionButtons
          onAddNode={handleAddNode}
          onExport={handleExport}
          onImport={handleImport}
        />

        {/* Detail Panels */}
        {selectedNode && (
          <NodeDetailPanel
            node={selectedNode}
            onClose={() => setSelectedNode(null)}
            onUpdate={handleNodeUpdate}
            onDelete={handleNodeDelete}
          />
        )}

        {selectedEdge && (
          <IntegrationDetailPanel
            edge={selectedEdge}
            onClose={() => setSelectedEdge(null)}
            onUpdate={handleEdgeUpdate}
            onDelete={handleEdgeDelete}
          />
        )}
      </div>
    </div>
  );
}

export default App;

// Made with Bob
