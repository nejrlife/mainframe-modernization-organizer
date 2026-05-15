export const initialNodes = [
  {
    id: '1',
    type: 'customNode',
    position: { x: 100, y: 100 },
    data: {
      label: 'Legacy Mainframe System',
      status: 'legacy',
      poc: {
        name: 'John Smith',
        email: 'john.smith@company.com',
        phone: '+1-555-0100',
        department: 'IT Operations'
      },
      details: {
        description: 'Core banking system running on IBM z/OS',
        technology: 'COBOL, DB2, CICS',
        criticality: 'high',
        users: 5000,
        migrationTarget: 'Cloud-native microservices',
        timeline: 'Q2 2024 - Q4 2025',
        notes: 'Critical system requiring careful migration planning'
      }
    }
  },
  {
    id: '2',
    type: 'customNode',
    position: { x: 400, y: 100 },
    data: {
      label: 'Customer Portal',
      status: 'in-progress',
      poc: {
        name: 'Sarah Johnson',
        email: 'sarah.j@company.com',
        phone: '+1-555-0101',
        department: 'Digital Services'
      },
      details: {
        description: 'Web-based customer interface',
        technology: 'React, Node.js, PostgreSQL',
        criticality: 'high',
        users: 10000,
        migrationTarget: 'AWS ECS',
        timeline: 'Q1 2024 - Q2 2024',
        notes: 'Migration 60% complete'
      }
    }
  },
  {
    id: '3',
    type: 'customNode',
    position: { x: 700, y: 100 },
    data: {
      label: 'Analytics Engine',
      status: 'modernized',
      poc: {
        name: 'Michael Chen',
        email: 'mchen@company.com',
        phone: '+1-555-0102',
        department: 'Data Analytics'
      },
      details: {
        description: 'Real-time analytics and reporting',
        technology: 'Python, Spark, Kafka',
        criticality: 'medium',
        users: 500,
        migrationTarget: 'Completed - AWS EMR',
        timeline: 'Completed Q4 2023',
        notes: 'Successfully migrated and operational'
      }
    }
  },
  {
    id: '4',
    type: 'customNode',
    position: { x: 250, y: 300 },
    data: {
      label: 'Legacy Reporting',
      status: 'deprecated',
      poc: {
        name: 'Robert Davis',
        email: 'rdavis@company.com',
        phone: '+1-555-0103',
        department: 'Business Intelligence'
      },
      details: {
        description: 'Old reporting system to be decommissioned',
        technology: 'Crystal Reports, Oracle',
        criticality: 'low',
        users: 50,
        migrationTarget: 'Replaced by Analytics Engine',
        timeline: 'Decommission Q2 2024',
        notes: 'Users migrated to new system'
      }
    }
  }
];

export const initialEdges = [
  {
    id: 'e1-2',
    source: '1',
    target: '2',
    type: 'customEdge',
    data: {
      integrationType: 'api',
      status: 'completed',
      direction: 'unidirectional',
      criticality: 'high',
      protocol: 'REST API',
      dataFormat: 'JSON',
      frequency: 'Real-time',
      notes: 'Customer data synchronization'
    }
  },
  {
    id: 'e1-3',
    source: '1',
    target: '3',
    type: 'customEdge',
    data: {
      integrationType: 'message-queue',
      status: 'in-progress',
      direction: 'unidirectional',
      criticality: 'medium',
      protocol: 'Apache Kafka',
      dataFormat: 'Avro',
      frequency: 'Batch (hourly)',
      notes: 'Transaction data streaming'
    }
  },
  {
    id: 'e2-3',
    source: '2',
    target: '3',
    type: 'customEdge',
    data: {
      integrationType: 'api',
      status: 'completed',
      direction: 'bidirectional',
      criticality: 'medium',
      protocol: 'REST API',
      dataFormat: 'JSON',
      frequency: 'Real-time',
      notes: 'Analytics data exchange'
    }
  },
  {
    id: 'e1-4',
    source: '1',
    target: '4',
    type: 'customEdge',
    data: {
      integrationType: 'database',
      status: 'blocked',
      direction: 'unidirectional',
      criticality: 'low',
      protocol: 'JDBC',
      dataFormat: 'SQL',
      frequency: 'Batch (daily)',
      notes: 'Legacy integration - to be removed'
    }
  }
];

// Made with Bob
