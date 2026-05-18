// Data Schema for Mainframe Modernization Organizer
// Based on requirements FR-2.8.1 and FR-2.8.2

// Node Status Types
export const NODE_STATUS = {
  LEGACY: 'Blocked',
  IN_PROGRESS: 'In Progress',
  MODERNIZED: 'Completed',
  DEPRECATED: 'Not Started'
};

// Node Status Colors
export const NODE_STATUS_COLORS = {
  [NODE_STATUS.LEGACY]: '#ef4444', // Red - Blocked
  [NODE_STATUS.IN_PROGRESS]: '#f59e0b', // Orange/Yellow - In Progress
  [NODE_STATUS.MODERNIZED]: '#10b981', // Green - Completed
  [NODE_STATUS.DEPRECATED]: '#6b7280' // Gray - Not Started
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
  REST: 'REST',
  SOAP: 'SOAP',
  FILE_TRANSFER: 'File Transfer',
  DATABASE: 'Database',
  MESSAGE_QUEUE: 'Message Queue',
  DIRECT: 'Direct'
};

// Integration Type Icons
export const INTEGRATION_TYPE_ICONS = {
  [INTEGRATION_TYPES.REST]: '🔌',
  [INTEGRATION_TYPES.SOAP]: '🔧',
  [INTEGRATION_TYPES.FILE_TRANSFER]: '📁',
  [INTEGRATION_TYPES.DATABASE]: '🗄️',
  [INTEGRATION_TYPES.MESSAGE_QUEUE]: '📨',
  [INTEGRATION_TYPES.DIRECT]: '↔️'
};

// Criticality Levels
export const CRITICALITY = {
  HIGH: 'High',
  MEDIUM: 'Medium',
  LOW: 'Low'
};

// Modernization Target Types
export const MODERNIZATION_TARGET = {
  UPGRADE: 'Upgrade',
  KEEP: 'Keep',
  NEW: 'New',
  DECOM: 'Decom'
};

// Modernization Target Colors
export const MODERNIZATION_TARGET_COLORS = {
  [MODERNIZATION_TARGET.DECOM]: '#ef4444', // Red
  [MODERNIZATION_TARGET.UPGRADE]: '#3b82f6', // Blue
  [MODERNIZATION_TARGET.KEEP]: '#f59e0b', // Orange
  [MODERNIZATION_TARGET.NEW]: '#10b981' // Green
};

// Export array versions for dropdowns
export const NODE_STATUSES = Object.values(NODE_STATUS);
export const INTEGRATION_STATUSES = Object.values(INTEGRATION_STATUS);
export const INTEGRATION_TYPES_ARRAY = Object.values(INTEGRATION_TYPES);
export const CRITICALITY_LEVELS = Object.values(CRITICALITY);
export const MODERNIZATION_TARGETS = Object.values(MODERNIZATION_TARGET);

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
      modernizationTarget: overrides.modernizationTarget || MODERNIZATION_TARGET.KEEP,
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
 * @param {Object} params - Edge parameters (can be called with source, target, overrides OR single object)
 * @returns {Object} Edge object
 */
export const createEdge = (...args) => {
  let source, target, overrides = {};
  
  // Support both signatures: createEdge(source, target, overrides) and createEdge({...})
  if (args.length === 1 && typeof args[0] === 'object') {
    // Single object parameter
    const params = args[0];
    source = params.source;
    target = params.target;
    overrides = params;
  } else {
    // Legacy signature: source, target, overrides
    [source, target, overrides = {}] = args;
  }
  
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

// Sample nodes representing your current systems
export const initialNodes = [
  createNode({
    id: 'hellofrontend',
    label: 'HelloFrontend System',
    position: { x: 100, y: 100 },
    status: NODE_STATUS.MODERNIZED,
    modernizationTarget: MODERNIZATION_TARGET.KEEP,
    poc: {
      name: 'HF Team Lead',
      email: 'hf.team@company.com',
      phone: '+1-555-0100',
      department: 'Customer Service'
    },
    details: {
      description: 'Interactive UI system for customer service automation',
      technology: 'ReactJS',
      criticality: CRITICALITY.HIGH,
      users: 10000,
      lastUpdated: '2024-01-15',
      migrationTarget: 'Cloud-native microservices',
      estimatedCost: '$500K',
      timeline: 'Q2-Q4 2024',
      dependencies: ['MFTAWrapIt', 'MFTA'],
      risks: ['Legacy TIBCO integration', 'High availability requirements'],
      notes: 'Critical customer-facing system. Requires 99.9% uptime.'
    }
  }),

  createNode({
    id: 'hellobackend',
    label: 'HelloBackend System',
    position: { x: 250, y: 100 },
    status: NODE_STATUS.MODERNIZED,
    modernizationTarget: MODERNIZATION_TARGET.KEEP,
    poc: {
      name: 'Backend Team Lead',
      email: 'backend.team@company.com',
      phone: '+1-555-0150',
      department: 'Application Development'
    },
    details: {
      description: 'Backend API layer for HelloFrontend system',
      technology: 'Node.js, Express',
      criticality: CRITICALITY.HIGH,
      users: 10000,
      lastUpdated: '2024-01-20',
      migrationTarget: 'Microservices architecture',
      estimatedCost: '$300K',
      timeline: 'Q2-Q3 2024',
      dependencies: ['HelloFrontend', 'MFTAWrapIt'],
      risks: ['API performance', 'Data consistency'],
      notes: 'Backend service layer being modernized to support frontend operations.'
    }
  }),

  createNode({
    id: 'datastorage',
    label: 'DataStorage',
    position: { x: 250, y: 250 },
    status: NODE_STATUS.IN_PROGRESS,
    modernizationTarget: MODERNIZATION_TARGET.NEW,
    poc: {
      name: 'Data Team Lead',
      email: 'data.team@company.com',
      phone: '+1-555-0160',
      department: 'Data Engineering'
    },
    details: {
      description: 'Central data storage and management system',
      technology: 'PostgreSQL, Redis',
      criticality: CRITICALITY.HIGH,
      users: 5000,
      lastUpdated: '2024-01-25',
      migrationTarget: 'Cloud-native database services',
      estimatedCost: '$400K',
      timeline: 'Q3-Q4 2024',
      dependencies: ['HelloBackend'],
      risks: ['Data migration', 'Performance optimization'],
      notes: 'Critical data layer supporting backend operations.'
    }
  }),

  createNode({
    id: 'aas',
    label: 'Address Attainment Service (AAS)',
    position: { x: 400, y: 100 },
    status: NODE_STATUS.IN_PROGRESS,
    modernizationTarget: MODERNIZATION_TARGET.UPGRADE,
    poc: {
      name: 'AAS Team Lead',
      email: 'aas.team@company.com',
      phone: '+1-555-0170',
      department: 'Service Operations'
    },
    details: {
      description: 'Address validation and attainment service for customer data',
      technology: 'Java, Spring Boot',
      criticality: CRITICALITY.HIGH,
      users: 8000,
      lastUpdated: '2024-01-22',
      migrationTarget: 'Modernized microservice with enhanced APIs',
      estimatedCost: '$350K',
      timeline: 'Q2-Q4 2024',
      dependencies: ['HelloBackend', 'DataStorage'],
      risks: ['Data quality', 'API compatibility'],
      notes: 'Critical service for address validation being upgraded to modern architecture.'
    }
  }),

  createNode({
    id: 'mftawrapit',
    label: 'MFTAWrapIt',
    position: { x: 550, y: 100 },
    status: NODE_STATUS.IN_PROGRESS,
    modernizationTarget: MODERNIZATION_TARGET.DECOM,
    poc: {
      name: 'Messaging Team',
      email: 'messaging@company.com',
      phone: '+1-555-0200',
      department: 'Infrastructure'
    },
    details: {
      description: 'Enterprise messaging middleware for real-time data distribution',
      technology: 'Spring Boot Java',
      criticality: CRITICALITY.HIGH,
      users: 50,
      lastUpdated: '2023-12-01',
      migrationTarget: 'Apache Kafka / RabbitMQ',
      estimatedCost: '$750K',
      timeline: 'Q3 2024 - Q1 2025',
      dependencies: ['Multiple legacy systems'],
      risks: ['Complex message routing', 'Performance requirements', 'Multiple dependent systems'],
      notes: 'Core messaging infrastructure. Migration requires careful planning.'
    }
  }),

  createNode({
    id: 'mfta',
    label: 'MFTA (MainFrame Transformation Application)',
    position: { x: 700, y: 100 },
    status: NODE_STATUS.COMPLETED,
    modernizationTarget: MODERNIZATION_TARGET.DECOM,
    poc: {
      name: 'MFTA Architecture Team',
      email: 'mfta.team@company.com',
      phone: '+1-555-0300',
      department: 'Enterprise Architecture'
    },
    details: {
      description: 'Service orchestration layer for network operations',
      technology: 'Java, WebLogic, Tuxedo',
      criticality: CRITICALITY.HIGH,
      users: 200,
      lastUpdated: '2023-11-20',
      migrationTarget: 'Spring Boot microservices on Kubernetes',
      estimatedCost: '$1.2M',
      timeline: 'Q1 2025 - Q4 2025',
      dependencies: ['MFTAWrapIt', 'Mainframe systems', 'Network databases'],
      risks: ['Complex business logic', 'Multiple integrations', 'Data migration'],
      notes: 'Large monolithic application. Requires phased migration approach.'
    }
  }),

  createNode({
    id: 'inventory-check',
    label: 'Inventory Check Service',
    position: { x: 400, y: 300 },
    status: NODE_STATUS.COMPLETED,
    modernizationTarget: MODERNIZATION_TARGET.DECOM,
    poc: {
      name: 'Network Services Team',
      email: 'network.services@company.com',
      phone: '+1-555-0400',
      department: 'Network Operations'
    },
    details: {
      description: 'Service for checking network inventory availability',
      technology: 'Java, REST API',
      criticality: CRITICALITY.MEDIUM,
      users: 150,
      lastUpdated: '2024-01-10',
      migrationTarget: 'Containerized microservice',
      estimatedCost: '$200K',
      timeline: 'Q2 2024',
      dependencies: ['MFTA', 'Network databases'],
      risks: ['Database performance', 'API versioning'],
      notes: 'Modernization in progress. API redesign completed.'
    }
  }),

  createNode({
    id: 'mainframe',
    label: 'Mainframe Systems',
    position: { x: 1000, y: 200 },
    status: NODE_STATUS.COMPLETED,
    modernizationTarget: MODERNIZATION_TARGET.DECOM,
    poc: {
      name: 'Mainframe Operations',
      email: 'mainframe@company.com',
      phone: '+1-555-0500',
      department: 'Legacy Systems'
    },
    details: {
      description: 'Core business logic and data storage',
      technology: 'COBOL, DB2, CICS',
      criticality: CRITICALITY.HIGH,
      users: 500,
      lastUpdated: '2023-10-15',
      migrationTarget: 'Hybrid cloud with data modernization',
      estimatedCost: '$3M+',
      timeline: '2025-2027',
      dependencies: ['Multiple systems'],
      risks: ['Business continuity', 'Data migration complexity', 'Skills shortage'],
      notes: 'Long-term modernization initiative. Requires extensive planning.'
    }
  }),

];

// Sample edges representing integrations
export const initialEdges = [
  createEdge({
    id: 'e-hellofrontend-hellobackend',
    source: 'hellofrontend',
    target: 'hellobackend',
    integrationType: INTEGRATION_TYPES.REST,
    status: INTEGRATION_STATUS.COMPLETED,
    direction: DIRECTION.BIDIRECTIONAL,
    criticality: CRITICALITY.HIGH,
    protocol: 'REST API',
    dataFormat: 'JSON',
    frequency: 'Real-time',
    notes: 'Frontend to backend API communication'
  }),

  createEdge({
    id: 'e-hellobackend-datastorage',
    source: 'hellobackend',
    target: 'datastorage',
    integrationType: INTEGRATION_TYPES.REST,
    status: INTEGRATION_STATUS.IN_PROGRESS,
    direction: DIRECTION.BIDIRECTIONAL,
    criticality: CRITICALITY.HIGH,
    protocol: 'SQL/TCP',
    dataFormat: 'JSON',
    frequency: 'Real-time',
    notes: 'Backend to database connection for data persistence'
  }),

  createEdge({
    id: 'e-hellobackend-aas',
    source: 'hellobackend',
    target: 'aas',
    integrationType: INTEGRATION_TYPES.REST,
    status: INTEGRATION_STATUS.IN_PROGRESS,
    direction: DIRECTION.BIDIRECTIONAL,
    criticality: CRITICALITY.HIGH,
    protocol: 'REST API',
    dataFormat: 'JSON',
    frequency: 'Real-time',
    notes: 'Backend to AAS service for address validation'
  }),

  createEdge({
    id: 'e-hellobackend-mftawrapit',
    source: 'hellobackend',
    target: 'mftawrapit',
    integrationType: INTEGRATION_TYPES.REST,
    status: INTEGRATION_STATUS.IN_PROGRESS,
    direction: DIRECTION.BIDIRECTIONAL,
    criticality: CRITICALITY.HIGH,
    protocol: 'TIBCO RV',
    dataFormat: 'XML',
    frequency: 'Real-time',
    notes: 'Backend messaging integration with MFTAWrapIt'
  }),

  createEdge({
    id: 'e-mftawrapit-mfta',
    source: 'mftawrapit',
    target: 'mfta',
    integrationType: INTEGRATION_TYPES.SOAP,
    status: INTEGRATION_STATUS.COMPLETED,
    direction: DIRECTION.BIDIRECTIONAL,
    criticality: CRITICALITY.HIGH,
    protocol: 'TIBCO RV',
    dataFormat: 'XML',
    frequency: 'Real-time',
    notes: 'Core messaging between MFTAWrapIt and MFTA'
  }),

  createEdge({
    id: 'e-mfta-inventory',
    source: 'mfta',
    target: 'inventory-check',
    integrationType: INTEGRATION_TYPES.DIRECT,
    status: INTEGRATION_STATUS.COMPLETED,
    direction: DIRECTION.UNIDIRECTIONAL,
    criticality: CRITICALITY.MEDIUM,
    protocol: 'REST/SOAP',
    dataFormat: 'JSON/XML',
    frequency: 'On-demand',
    notes: 'Migrating from SOAP to REST API'
  }),

  createEdge({
    id: 'e-mfta-mainframe',
    source: 'mfta',
    target: 'mainframe',
    integrationType: INTEGRATION_TYPES.DIRECT,
    status: INTEGRATION_STATUS.COMPLETED,
    direction: DIRECTION.BIDIRECTIONAL,
    criticality: CRITICALITY.HIGH,
    protocol: 'Tuxedo/ATMI',
    dataFormat: 'Proprietary',
    frequency: 'Real-time',
    notes: 'Legacy integration via Tuxedo middleware'
  }),
];

// Made with Bob
