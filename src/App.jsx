import { useState, useCallback, useRef, useEffect } from 'react';
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
  const [showSplash, setShowSplash] = useState(true);
  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);
  const [selectedElement, setSelectedElement] = useState(null);
  const [selectedElementType, setSelectedElementType] = useState(null);
  const reactFlowWrapper = useRef(null);
  const [reactFlowInstance, setReactFlowInstance] = useState(null);

  // Splash screen timer
  useEffect(() => {
    const timer = setTimeout(() => {
      setShowSplash(false);
    }, 2000);
    return () => clearTimeout(timer);
  }, []);

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



  // Show splash screen
  if (showSplash) {
    return (
      <div style={{
        width: '100vw',
        height: '100vh',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
        color: 'white',
        fontFamily: 'system-ui, -apple-system, sans-serif'
      }}>
        <div style={{
          textAlign: 'center',
          animation: 'fadeIn 1s ease-in'
        }}>
          <h1 style={{
            fontSize: '48px',
            fontWeight: '700',
            margin: '0 0 24px 0',
            letterSpacing: '-0.5px'
          }}>
            🏢 Mainframe Modernization Organizer
          </h1>
          <p style={{
            fontSize: '20px',
            fontWeight: '400',
            margin: '0',
            opacity: '0.9',
            maxWidth: '600px',
            lineHeight: '1.6'
          }}>
            Track and manage the progress of your mainframe modernization journey.
          </p>
        </div>
        <style>{`
          @keyframes fadeIn {
            from {
              opacity: 0;
              transform: translateY(20px);
            }
            to {
              opacity: 1;
              transform: translateY(0);
            }
          }
        `}</style>
      </div>
    );
  }

  // Main application
  return (
    <div style={{ width: '100vw', height: '100vh', position: 'relative' }}>
      {/* ReactFlow Canvas */}
      <div ref={reactFlowWrapper} style={{ width: '100%', height: '100%' }}>
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
            position="bottom-center"
          />
        </ReactFlow>
      </div>

      {/* Statistics Panel */}
      <Statistics nodes={nodes} edges={edges} />

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

      {/* Floating Action Button - Add System */}
      <button
        onClick={handleAddNode}
        style={{
          position: 'fixed',
          bottom: '24px',
          right: '24px',
          width: '56px',
          height: '56px',
          borderRadius: '50%',
          background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
          border: 'none',
          color: 'white',
          fontSize: '24px',
          cursor: 'pointer',
          boxShadow: '0 4px 12px rgba(102, 126, 234, 0.4)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          transition: 'transform 0.3s, box-shadow 0.3s',
          zIndex: 1002
        }}
        onMouseEnter={(e) => {
          e.target.style.transform = 'scale(1.1)';
          e.target.style.boxShadow = '0 6px 16px rgba(102, 126, 234, 0.5)';
        }}
        onMouseLeave={(e) => {
          e.target.style.transform = 'scale(1)';
          e.target.style.boxShadow = '0 4px 12px rgba(102, 126, 234, 0.4)';
        }}
        title="Add System"
      >
        ➕
      </button>
    </div>
  );
}

export default App;

// Made with Bob
