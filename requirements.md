# Mainframe Modernization Organizer - Functional Requirements

## 1. Overview

The Mainframe Modernization Organizer (MMO) is an interactive visualization tool designed to help organizations track and manage their mainframe modernization initiatives. It provides a visual canvas for mapping systems, their relationships, and migration status.

---

## 2. Functional Requirements

### 2.1 System Node Management

**FR-2.1.1: Node Visualization**

- System displays nodes on an interactive canvas
- Each node represents a system/application in the modernization landscape
- Nodes are color-coded based on their modernization status:
  - **Legacy** (Red): Systems requiring modernization
  - **In Progress** (Yellow/Orange): Systems currently being modernized
  - **Modernized** (Green): Successfully modernized systems
  - **Deprecated** (Gray): Systems marked for decommissioning

**FR-2.1.2: Node Interaction**

- Users can click on any node to view detailed information
- Users can drag nodes to reposition them on the canvas
- Selected nodes display a blue border highlight
- Nodes show a criticality indicator (colored dot) in the top-right corner

**FR-2.1.3: Node Information Display**

- Each node displays:
  - System/Application name (label)
  - Current status
  - Technology stack (abbreviated)
  - Point of Contact name and email

**FR-2.1.4: Node Detail Panel**

- Clicking a node opens a right-side detail panel (400px width) showing:
  - **Header Information:**
    - System name (editable)
    - Status (editable dropdown: Legacy, In Progress, Modernized, Deprecated)
  - **Point of Contact Section:**
    - Name
    - Email
    - Phone
    - Department
  - **System Details Section:**
    - Description
    - Technology stack
    - Criticality level (High/Medium/Low)
    - User count
    - Migration target platform
    - Timeline
    - Notes

**FR-2.1.5: Node Creation**

- Users can add new system nodes to the canvas
- System provides an "Add Node" or "+" button to create new nodes
- New nodes are created with default values:
  - Default status: Legacy
  - Default position: Center of current viewport or next available position
  - Default criticality: Medium
  - Empty fields for user to populate
- Newly created nodes can be immediately edited via detail panel
- Users can populate all node fields (name, status, POC, system details)

**FR-2.1.6: Node Editing**

- Users can click "Edit" button to enable edit mode
- All node fields become editable in edit mode
- Users can save changes or cancel to revert
- Changes update the node visualization immediately

**FR-2.1.7: Node Deletion**

- Users can delete nodes from the canvas
- System provides delete functionality in node detail panel or context menu
- Deleting a node also removes all connected integrations
- System prompts for confirmation before deletion

### 2.2 Integration Management

**FR-2.2.1: Integration Visualization**

- System displays directed edges (arrows) between nodes representing integrations
- Edges show direction of data flow
- Bidirectional integrations display arrows on both ends
- Integration lines are color-coded by status:
  - **Not Started** (Gray, dashed): Planned integrations
  - **In Progress** (Orange): Integrations being developed
  - **Completed** (Green): Active integrations
  - **Blocked** (Red): Integrations with issues

**FR-2.2.2: Integration Labels**

- Each integration displays a label showing:
  - Integration type icon (🔌 API, 📁 File Transfer, 🗄️ Database, 📨 Message Queue, ⏱️ Batch, ↔️ Direct)
  - Integration type name
  - Protocol (e.g., REST, SOAP, TIBCO RV)
  - Criticality badge (High/Medium/Low)
- Labels have hover effect (scale 1.1x on hover)

**FR-2.2.3: Integration Creation**

- Users can create new integrations by connecting nodes
- System automatically assigns default integration type
- New integrations can be customized via detail panel

**FR-2.2.4: Integration Detail Panel**

- Clicking an integration edge opens detail panel showing:
  - Integration type (dropdown: API, File Transfer, Database, Message Queue, Batch, Direct)
  - Status (dropdown: Not Started, In Progress, Completed, Blocked)
  - Protocol
  - Data format
  - Frequency
  - Criticality level
  - Notes

**FR-2.2.5: Integration Editing**

- Users can edit all integration properties
- Changes are saved and reflected immediately
- Users can cancel edits to revert changes

**FR-2.2.6: Integration Deletion**

- Users can delete integrations from the canvas
- System provides delete functionality in integration detail panel
- System prompts for confirmation before deletion
- Deleting an integration removes the edge but preserves connected nodes

### 2.3 Canvas Controls

**FR-2.3.1: Pan and Zoom**

- Users can pan the canvas by clicking and dragging on empty space
- Users can zoom in/out using mouse wheel or zoom controls
- Canvas supports smooth transitions

**FR-2.3.2: Control Panel**

- System provides standard ReactFlow controls:
  - Zoom in button
  - Zoom out button
  - Fit view button
  - Lock/unlock button

**FR-2.3.3: Mini Map**

- System displays a mini-map in bottom-left corner
- Mini-map shows overview of entire canvas
- Nodes in mini-map are color-coded by status
- Users can click mini-map to navigate to different areas

**FR-2.3.4: Background Grid**

- Canvas displays a subtle grid pattern for visual reference
- Grid helps with node alignment

**FR-2.3.5: Fit View**

- System automatically fits all nodes in view on initial load
- Users can trigger fit view manually via controls

### 2.4 Statistics Dashboard

**FR-2.4.1: Statistics Panel**

- System displays statistics panel in top-left corner showing:
  - **System Statistics:**
    - Total Systems count
    - Legacy systems count (red)
    - In Progress systems count (orange)
    - Modernized systems count (green)
    - Deprecated systems count (gray)
  - **Integration Statistics:**
    - Total Integrations count
    - Completed Integrations count

**FR-2.4.2: Real-time Updates**

- Statistics update automatically when nodes or edges are added/modified/deleted
- No manual refresh required

### 2.5 Legend

**FR-2.5.1: Status Legend**

- System displays legend in bottom-right corner
- Legend shows all status types with matching colors:
  - Legacy (red square)
  - In Progress (orange square)
  - Modernized (green square)
  - Deprecated (gray square)

### 2.6 Data Import/Export

**FR-2.6.1: Export Functionality**

- Users can export current visualization data as JSON file
- Export includes:
  - All nodes with complete data
  - All edges with complete data
  - Export timestamp
  - Version number
- File naming format: `modernization-map-{timestamp}.json`

**FR-2.6.2: Import Functionality**

- Users can import previously exported JSON files
- System validates JSON structure before import
- System displays success/error messages
- Import replaces current canvas data

**FR-2.6.3: Action Buttons Panel**

- System displays action buttons in top-right corner:
  - "➕ Add Node" button (purple/primary color)
  - "💾 Export Data" button (blue)
  - "📥 Import Data" button (green)
- Buttons are vertically stacked with consistent spacing

### 2.7 User Interface

**FR-2.7.1: Application Header**

- System displays header with:
  - Application title: "🏗️ Mainframe Modernization Organizer"
  - Subtitle: "Interactive visualization of systems, integrations, and migration status"
  - Gradient background (purple to violet)

**FR-2.7.2: Detail Panel Behavior**

- Detail panel slides in from right side when node/edge is selected
- Panel has close button (✕) in top-right
- Clicking canvas background closes detail panel
- Panel is scrollable for long content

**FR-2.7.3: Responsive Layout**

- Application uses full viewport (100vw × 100vh)
- Header is fixed at top
- Canvas fills remaining space
- Detail panel overlays canvas on right side

### 2.8 Data Schema

**FR-2.8.1: Node Data Structure**

- Each node contains:
  - `id`: Unique identifier
  - `label`: Display name
  - `position`: {x, y} coordinates
  - `status`: Modernization status
  - `poc`: Point of contact object (name, email, phone, department)
  - `details`: System details object (description, technology, criticality, users, migrationTarget, timeline, notes)

**FR-2.8.2: Edge Data Structure**

- Each edge contains:
  - `id`: Unique identifier
  - `source`: Source node ID
  - `target`: Target node ID
  - `integrationType`: Type of integration
  - `status`: Integration status
  - `direction`: Unidirectional or bidirectional
  - `criticality`: Importance level
  - `protocol`: Communication protocol
  - `dataFormat`: Data format used
  - `frequency`: Communication frequency
  - `notes`: Additional information

---

## 3. Non-Functional Requirements

### 3.1 Performance

**NFR-3.1.1: Responsiveness**

- Node/edge operations respond within 500ms
- Canvas panning and zooming are smooth (60 FPS)
- Detail panel opens/closes within 200ms

**NFR-3.1.2: Scalability**

- System supports at least 50 nodes without performance degradation
- System supports at least 100 edges without performance degradation

**NFR-3.1.3: Memory Management**

- Application maintains stable memory usage during extended sessions
- No memory leaks during node/edge operations

### 3.2 Usability

**NFR-3.2.1: Intuitive Interface**

- Drag-and-drop functionality for node positioning
- Clear visual distinction between node statuses
- Hover effects provide visual feedback
- No training required for basic operations

**NFR-3.2.2: Visual Design**

- Clean, modern interface with consistent styling
- Color-coded elements for quick status identification
- Readable fonts and appropriate sizing
- Proper contrast ratios for accessibility

**NFR-3.2.3: Responsive Design**

- Optimized for desktop screens (minimum 1366×768)
- Panels and controls positioned for easy access
- Scrollable content areas where needed

### 3.3 Reliability

**NFR-3.3.1: Data Integrity**

- No data loss during normal operations
- Changes are immediately reflected in UI
- Import/export maintains data fidelity

**NFR-3.3.2: Error Handling**

- Graceful error handling with user-friendly messages
- Import validation prevents corrupt data
- System remains stable after errors

**NFR-3.3.3: State Management**

- Application state is consistent across all components
- UI updates reflect actual data state
- No orphaned or inconsistent data

### 3.4 Browser Compatibility

**NFR-3.4.1: Supported Browsers**

- Chrome (latest version)
- Firefox (latest version)
- Edge (latest version)

**NFR-3.4.2: Web Standards**

- Uses modern web standards (ES6+, CSS3)
- ReactFlow library for canvas functionality
- No deprecated APIs

### 3.5 Maintainability

**NFR-3.5.1: Code Structure**

- Clean, modular React component architecture
- Separation of concerns (components, data, schema)
- Reusable components (CustomNode, CustomEdge, NodeDetailPanel)

**NFR-3.5.2: Code Quality**

- Consistent code style and formatting
- Clear component responsibilities
- Well-organized file structure

**NFR-3.5.3: Documentation**

- Code comments where necessary
- Clear component props and data structures
- Schema definitions for data validation

### 3.6 Technology Stack

**NFR-3.6.1: Frontend Framework**

- React 18.2.0
- ReactFlow 11.10.4 for canvas visualization
- Vite 5.0.8 for build tooling

**NFR-3.6.2: Development Tools**

- ESLint for code quality
- Vite dev server for development
- Modern JavaScript (ES6+ modules)

---

## 4. Out of Scope (Current Version)

The following features are not included in the current version:

- **User Authentication/Authorization**: No login or user management
- **Multi-user Collaboration**: No real-time collaboration features
- **Backend Integration**: No server-side data persistence
- **Database Storage**: Data stored in browser only (via import/export)
- **Jira Integration**: No ticket system integration
- **Advanced Search**: No search or filtering capabilities
- **Audit Logging**: No change history or audit trail
- **Role-based Access Control**: No permission system
- **Automated Reporting**: No report generation
- **Email Notifications**: No notification system
- **Version Control**: No built-in versioning for diagrams
- **Templates**: No pre-built diagram templates
- **Mobile Support**: Desktop-only application

---

## 5. Success Criteria

The application is considered successful when:

1. **Visualization**: Users can clearly visualize their modernization landscape with systems and integrations
2. **Status Tracking**: Users can easily identify system status through color coding
3. **Information Management**: Users can view and edit detailed information for systems and integrations
4. **Data Portability**: Users can export and import their diagrams reliably
5. **Performance**: Application performs smoothly with typical workloads (20-50 systems)
6. **Usability**: Users can accomplish basic tasks without documentation
7. **Stability**: Application runs without crashes or data loss
8. **Statistics**: Users can quickly understand their modernization progress through statistics

---

## 6. Assumptions and Dependencies

### 6.1 Assumptions

- Users have modern desktop browsers
- Users have basic computer skills (drag-and-drop, form filling)
- Users understand their modernization landscape
- Data is managed locally (no server required)

### 6.2 Dependencies

- ReactFlow library for canvas functionality
- Modern browser with ES6+ support
- Local storage for data persistence (via import/export)

---

## 7. Glossary

- **Node**: Visual representation of a system/application on the canvas
- **Edge**: Visual representation of an integration between systems
- **Canvas**: The main interactive area where nodes and edges are displayed
- **Detail Panel**: Side panel showing detailed information about selected node/edge
- **Status**: Current state of modernization (Legacy, In Progress, Modernized, Deprecated)
- **Integration**: Connection between two systems for data exchange
- **POC**: Point of Contact - person responsible for a system
- **Criticality**: Importance level of a system or integration (High, Medium, Low)
- **Migration Target**: Destination platform/technology for modernization
