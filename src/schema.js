// Data Schema for Mainframe Modernization Organizer
// Based on requirements FR-2.8.1 and FR-2.8.2

// Node Status Types
export const NODE_STATUS = {
  LEGACY: 'Legacy',
  IN_PROGRESS: 'In Progress',
  MODERNIZED: 'Modernized',
  DEPRECATED: 'Deprecated'
};

// Node Status Colors
export const NODE_STATUS_COLORS = {
  [NODE_STATUS.LEGACY]: '#ef4444', // Red
  [NODE_STATUS.IN_PROGRESS]: '#f59e0b', // Orange/Yellow
  [NODE_STATUS.MODERNIZED]: '#10b981', // Green
  [NODE_STATUS.DEPRECATED]: '#6b7280' // Gray
};

// Integration Status Types
export const INTEGRATION_STATUS = {
  NOT_STARTED: 'Not Started',
  IN_PROGRESS: 'In Progress',
  COMPLETED: 'Completed',
  BLOCKED: 'Blocked'
};

// Integration Status Colors
export const INTEGRATION_STATUS_COLORS = {
  [INTEGRATION_STATUS.NOT_STARTED]: '#9ca3af', // Gray
  [INTEGRATION_STATUS.IN_PROGRESS]: '#f59e0b', // Orange
  [INTEGRATION_STATUS.COMPLETED]: '#10b981', // Green
  [INTEGRATION_STATUS.BLOCKED]: '#ef4444' // Red
};

// Integration Types
export const INTEGRATION_TYPES = {
  API: 'API',
  FILE_TRANSFER: 'File Transfer',
  DATABASE: 'Database',
  MESSAGE_QUEUE: 'Message Queue',
  BATCH: 'Batch',
  DIRECT: 'Direct'
};

// Integration Type Icons
export const INTEGRATION_TYPE_ICONS = {
  [INTEGRATION_TYPES.API]: '🔌',
  [INTEGRATION_TYPES.FILE_TRANSFER]: '📁',
  [INTEGRATION_TYPES.DATABASE]: '🗄️',
  [INTEGRATION_TYPES.MESSAGE_QUEUE]: '📨',
  [INTEGRATION_TYPES.BATCH]: '⏱️',
  [INTEGRATION_TYPES.DIRECT]: '↔️'
};

// Criticality Levels
export const CRITICALITY = {
  HIGH: 'High',
  MEDIUM: 'Medium',
  LOW: 'Low'
};

// Export array versions for dropdowns
export const NODE_STATUSES = Object.values(NODE_STATUS);
export const INTEGRATION_STATUSES = Object.values(INTEGRATION_STATUS);
export const INTEGRATION_TYPES_ARRAY = Object.values(INTEGRATION_TYPES);
export const CRITICALITY_LEVELS = Object.values(CRITICALITY);

// Criticality Colors
export const CRITICALITY_COLORS = {
  [CRITICALITY.HIGH]: '#ef4444', // Red
  [CRITICALITY.MEDIUM]: '#f59e0b', // Orange
  [CRITICALITY.LOW]: '#10b981' // Green
};

// Direction Types
export const DIRECTION = {
  UNIDIRECTIONAL: 'Unidirectional',
  BIDIRECTIONAL: 'Bidirectional'
};

/**
 * Creates a new node with default values
 * @param {Object} overrides - Properties to override defaults
 * @returns {Object} Node object
 */
export const createNode = (overrides = {}) => {
  const id = overrides.id || `node-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
  
  return {
    id,
    type: 'custom',
    position: overrides.position || { x: 250, y: 250 },
    data: {
      label: overrides.label || 'New System',
      status: overrides.status || NODE_STATUS.LEGACY,
      poc: {
        name: overrides.poc?.name || '',
        email: overrides.poc?.email || '',
        phone: overrides.poc?.phone || '',
        department: overrides.poc?.department || ''
      },
      details: {
        description: overrides.details?.description || '',
        technology: overrides.details?.technology || '',
        criticality: overrides.details?.criticality || CRITICALITY.MEDIUM,
        users: overrides.details?.users || '',
        migrationTarget: overrides.details?.migrationTarget || '',
        timeline: overrides.details?.timeline || '',
        notes: overrides.details?.notes || ''
      }
    }
  };
};

/**
 * Creates a new edge (integration) with default values
 * @param {string} source - Source node ID
 * @param {string} target - Target node ID
 * @param {Object} overrides - Properties to override defaults
 * @returns {Object} Edge object
 */
export const createEdge = (source, target, overrides = {}) => {
  const id = overrides.id || `edge-${source}-${target}-${Date.now()}`;
  
  return {
    id,
    source,
    target,
    type: 'custom',
    animated: overrides.animated !== undefined ? overrides.animated : false,
    data: {
      integrationType: overrides.integrationType || INTEGRATION_TYPES.API,
      status: overrides.status || INTEGRATION_STATUS.NOT_STARTED,
      direction: overrides.direction || DIRECTION.UNIDIRECTIONAL,
      criticality: overrides.criticality || CRITICALITY.MEDIUM,
      protocol: overrides.protocol || '',
      dataFormat: overrides.dataFormat || '',
      frequency: overrides.frequency || '',
      notes: overrides.notes || ''
    }
  };
};

/**
 * Validates node data structure
 * @param {Object} node - Node to validate
 * @returns {boolean} True if valid
 */
export const validateNode = (node) => {
  if (!node.id || !node.data) return false;
  if (!Object.values(NODE_STATUS).includes(node.data.status)) return false;
  if (node.data.details?.criticality && !Object.values(CRITICALITY).includes(node.data.details.criticality)) return false;
  return true;
};

/**
 * Validates edge data structure
 * @param {Object} edge - Edge to validate
 * @returns {boolean} True if valid
 */
export const validateEdge = (edge) => {
  if (!edge.id || !edge.source || !edge.target || !edge.data) return false;
  if (!Object.values(INTEGRATION_TYPES).includes(edge.data.integrationType)) return false;
  if (!Object.values(INTEGRATION_STATUS).includes(edge.data.status)) return false;
  if (!Object.values(DIRECTION).includes(edge.data.direction)) return false;
  if (!Object.values(CRITICALITY).includes(edge.data.criticality)) return false;
  return true;
};

// Sample initial data for demonstration
export const initialNodes = [
  createNode({
    id: 'node-1',
    position: { x: 100, y: 100 },
    label: 'Legacy Mainframe',
    status: NODE_STATUS.LEGACY,
    poc: {
      name: 'John Smith',
      email: 'john.smith@company.com',
      phone: '+1-555-0100',
      department: 'IT Operations'
    },
    details: {
      description: 'Core banking system running on IBM z/OS',
      technology: 'COBOL, DB2, CICS',
      criticality: CRITICALITY.HIGH,
      users: '5000+',
      migrationTarget: 'Cloud Native (Java/Spring Boot)',
      timeline: 'Q2 2026 - Q4 2027',
      notes: 'Critical system requiring careful migration planning'
    }
  }),
  createNode({
    id: 'node-2',
    position: { x: 400, y: 100 },
    label: 'Customer Portal',
    status: NODE_STATUS.IN_PROGRESS,
    poc: {
      name: 'Sarah Johnson',
      email: 'sarah.johnson@company.com',
      phone: '+1-555-0101',
      department: 'Digital Banking'
    },
    details: {
      description: 'Web-based customer portal',
      technology: 'React, Node.js, PostgreSQL',
      criticality: CRITICALITY.HIGH,
      users: '10000+',
      migrationTarget: 'Microservices Architecture',
      timeline: 'Q1 2026 - Q3 2026',
      notes: 'Migration 60% complete'
    }
  }),
  createNode({
    id: 'node-3',
    position: { x: 700, y: 100 },
    label: 'Mobile App Backend',
    status: NODE_STATUS.MODERNIZED,
    poc: {
      name: 'Mike Chen',
      email: 'mike.chen@company.com',
      phone: '+1-555-0102',
      department: 'Mobile Development'
    },
    details: {
      description: 'RESTful API for mobile applications',
      technology: 'Java Spring Boot, MongoDB, Kubernetes',
      criticality: CRITICALITY.MEDIUM,
      users: '15000+',
      migrationTarget: 'Already Modernized',
      timeline: 'Completed Q4 2025',
      notes: 'Successfully migrated to cloud-native architecture'
    }
  })
];

export const initialEdges = [
  createEdge('node-1', 'node-2', {
    id: 'edge-1',
    integrationType: INTEGRATION_TYPES.API,
    status: INTEGRATION_STATUS.IN_PROGRESS,
    direction: DIRECTION.BIDIRECTIONAL,
    criticality: CRITICALITY.HIGH,
    protocol: 'REST API',
    dataFormat: 'JSON',
    frequency: 'Real-time',
    notes: 'Account data synchronization'
  }),
  createEdge('node-2', 'node-3', {
    id: 'edge-2',
    integrationType: INTEGRATION_TYPES.API,
    status: INTEGRATION_STATUS.COMPLETED,
    direction: DIRECTION.UNIDIRECTIONAL,
    criticality: CRITICALITY.MEDIUM,
    protocol: 'GraphQL',
    dataFormat: 'JSON',
    frequency: 'Real-time',
    notes: 'Mobile API gateway'
  })
];

// Made with Bob
