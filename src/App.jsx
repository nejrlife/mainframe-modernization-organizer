import { useState, useCallback, useRef } from 'react';
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
import Statistics from './components/Statistics';
import Legend from './components/Legend';
import { initialNodes, initialEdges, createNode, createEdge } from './schema';

const nodeTypes = {
  custom: CustomNode,
};

const edgeTypes = {
  custom: CustomEdge,
};

/**
 * Main App Component
 * Mainframe Modernization Organizer
 * Interactive canvas for visualizing and managing modernization projects
 */
function App() {
  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);
  const [selectedElement, setSelectedElement] = useState(null);
  const [selectedElementType, setSelectedElementType] = useState(null);
  const reactFlowWrapper = useRef(null);
  const [reactFlowInstance, setReactFlowInstance] = useState(null);

  // Handle connection creation (FR-2.2.4)
  const onConnect = useCallback(
    (params) => {
      const newEdge = {
        ...params,
        id: `edge-${Date.now()}`,
        type: 'custom',
        markerEnd: {
          type: MarkerType.ArrowClosed,
          width: 20,
          height: 20,
        },
        data: {
          type: 'API',
          status: 'Not Started',
          description: '',
        },
      };
      setEdges((eds) => addEdge(newEdge, eds));
    },
    [setEdges]
  );

  // Handle node click (FR-2.3.1)
  const onNodeClick = useCallback((event, node) => {
    setSelectedElement(node);
    setSelectedElementType('node');
  }, []);

  // Handle edge click (FR-2.3.1)
  const onEdgeClick = useCallback((event, edge) => {
    setSelectedElement(edge);
    setSelectedElementType('edge');
  }, []);

  // Handle pane click to deselect
  const onPaneClick = useCallback(() => {
    setSelectedElement(null);
    setSelectedElementType(null);
  }, []);

  // Update node or edge (FR-2.3.2)
  const handleUpdate = useCallback((updatedElement) => {
    if (selectedElementType === 'node') {
      setNodes((nds) =>
        nds.map((node) =>
          node.id === updatedElement.id ? updatedElement : node
        )
      );
    } else {
      setEdges((eds) =>
        eds.map((edge) =>
          edge.id === updatedElement.id ? updatedElement : edge
        )
      );
    }
    setSelectedElement(null);
    setSelectedElementType(null);
  }, [selectedElementType, setNodes, setEdges]);

  // Delete node or edge (FR-2.3.3)
  const handleDelete = useCallback((id) => {
    if (selectedElementType === 'node') {
      setNodes((nds) => nds.filter((node) => node.id !== id));
      // Also remove connected edges
      setEdges((eds) => eds.filter((edge) => edge.source !== id && edge.target !== id));
    } else {
      setEdges((eds) => eds.filter((edge) => edge.id !== id));
    }
    setSelectedElement(null);
    setSelectedElementType(null);
  }, [selectedElementType, setNodes, setEdges]);

  // Close detail panel
  const handleClosePanel = useCallback(() => {
    setSelectedElement(null);
    setSelectedElementType(null);
  }, []);

  // Add new node (FR-2.3.4)
  const handleAddNode = useCallback(() => {
    const newNode = createNode({
      label: `System ${nodes.length + 1}`,
      position: { x: Math.random() * 500, y: Math.random() * 500 }
    });
    setNodes((nds) => [...nds, newNode]);
  }, [nodes.length, setNodes]);

  // Export data (FR-2.5.1)
  const handleExport = useCallback(() => {
    const data = {
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
      exportDate: new Date().toISOString(),
      version: '1.0'
    };

    const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `modernization-project-${Date.now()}.json`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  }, [nodes, edges]);

  // Import data (FR-2.5.2)
  const handleImport = useCallback((event) => {
    const file = event.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (e) => {
      try {
        const data = JSON.parse(e.target.result);
        
        // Validate and restore nodes
        if (data.nodes && Array.isArray(data.nodes)) {
          const restoredNodes = data.nodes.map(node => ({
            ...node,
            type: 'custom'
          }));
          setNodes(restoredNodes);
        }

        // Validate and restore edges
        if (data.edges && Array.isArray(data.edges)) {
          const restoredEdges = data.edges.map(edge => ({
            ...edge,
            type: 'custom',
            markerEnd: {
              type: MarkerType.ArrowClosed,
              width: 20,
              height: 20,
            }
          }));
          setEdges(restoredEdges);
        }

        alert('Project imported successfully!');
      } catch (error) {
        alert('Error importing file: ' + error.message);
      }
    };
    reader.readAsText(file);
    event.target.value = ''; // Reset input
  }, [setNodes, setEdges]);

  // Clear canvas
  const handleClear = useCallback(() => {
    if (window.confirm('Are you sure you want to clear the entire canvas? This cannot be undone.')) {
      setNodes([]);
      setEdges([]);
      setSelectedElement(null);
      setSelectedElementType(null);
    }
  }, [setNodes, setEdges]);

  return (
    <div style={{ width: '100vw', height: '100vh', position: 'relative' }}>
      {/* Header */}
      <div style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        height: '60px',
        background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
        boxShadow: '0 2px 8px rgba(0, 0, 0, 0.15)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: '0 20px',
        zIndex: 1001
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <h1 style={{ 
            margin: 0, 
            fontSize: '20px', 
            fontWeight: '700',
            color: 'white'
          }}>
            🏢 Mainframe Modernization Organizer
          </h1>
        </div>

        <div style={{ display: 'flex', gap: '10px' }}>
          <button
            onClick={handleAddNode}
            style={{
              padding: '8px 16px',
              background: 'white',
              color: '#667eea',
              border: 'none',
              borderRadius: '6px',
              fontSize: '14px',
              fontWeight: '600',
              cursor: 'pointer',
              boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)'
            }}
          >
            ➕ Add System
          </button>

          <label style={{
            padding: '8px 16px',
            background: 'white',
            color: '#667eea',
            border: 'none',
            borderRadius: '6px',
            fontSize: '14px',
            fontWeight: '600',
            cursor: 'pointer',
            boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)'
          }}>
            📥 Import
            <input
              type="file"
              accept=".json"
              onChange={handleImport}
              style={{ display: 'none' }}
            />
          </label>

          <button
            onClick={handleExport}
            style={{
              padding: '8px 16px',
              background: 'white',
              color: '#667eea',
              border: 'none',
              borderRadius: '6px',
              fontSize: '14px',
              fontWeight: '600',
              cursor: 'pointer',
              boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)'
            }}
          >
            📤 Export
          </button>

          <button
            onClick={handleClear}
            style={{
              padding: '8px 16px',
              background: 'rgba(255, 255, 255, 0.2)',
              color: 'white',
              border: '1px solid rgba(255, 255, 255, 0.3)',
              borderRadius: '6px',
              fontSize: '14px',
              fontWeight: '600',
              cursor: 'pointer'
            }}
          >
            🗑️ Clear
          </button>
        </div>
      </div>

      {/* ReactFlow Canvas */}
      <div ref={reactFlowWrapper} style={{ width: '100%', height: '100%', paddingTop: '60px' }}>
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
          attributionPosition="bottom-right"
          minZoom={0.2}
          maxZoom={2}
        >
          <Background color="#e5e7eb" gap={16} />
          <Controls />
          <MiniMap
            nodeColor={(node) => {
              const statusColors = {
                'Legacy': '#ef4444',
                'In Progress': '#f59e0b',
                'Modernized': '#10b981',
                'Deprecated': '#6b7280'
              };
              return statusColors[node.data.status] || '#6b7280';
            }}
            maskColor="rgba(0, 0, 0, 0.1)"
          />
        </ReactFlow>
      </div>

      {/* Statistics Panel */}
      <Statistics nodes={nodes} edges={edges} />

      {/* Legend */}
      <Legend />

      {/* Detail Panel */}
      {selectedElement && (
        <NodeDetailPanel
          selectedElement={selectedElement}
          elementType={selectedElementType}
          onUpdate={handleUpdate}
          onDelete={handleDelete}
          onClose={handleClosePanel}
        />
      )}
    </div>
  );
}

export default App;

// Made with Bob
