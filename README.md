# Mainframe Modernization Organizer (MMO)

An interactive visualization tool designed to help organizations track and manage their mainframe modernization initiatives.

## Features

- **Visual Canvas**: Interactive drag-and-drop canvas for mapping systems and integrations
- **System Nodes**: Color-coded nodes representing systems at different modernization stages
  - Legacy (Red)
  - In Progress (Orange)
  - Modernized (Green)
  - Deprecated (Gray)
- **Integration Management**: Visual representation of system integrations with detailed metadata
- **Statistics Dashboard**: Real-time statistics showing modernization progress
- **Detail Panels**: Comprehensive information panels for systems and integrations
- **Import/Export**: Save and load your modernization maps as JSON files

## Technology Stack

- React 18.2.0
- ReactFlow 11.10.4
- Vite 5.0.8

## Installation

1. Install dependencies:

```bash
npm install
```

## Running the Application

Start the development server:

```bash
npm run dev
```

The application will open in your browser at `http://localhost:3000`

## Building for Production

Build the application:

```bash
npm run build
```

Preview the production build:

```bash
npm run preview
```

## Usage

### Adding Systems

1. Click the "➕ Add Node" button in the top-right corner
2. A new system node will appear on the canvas
3. Click the node to open the detail panel and edit its information

### Creating Integrations

1. Drag from one node's connection point to another node
2. Click the integration line to view and edit its details

### Editing Systems/Integrations

1. Click on any node or integration line
2. Click the "Edit" button in the detail panel
3. Modify the information and click "Save"

### Exporting Data

1. Click the "💾 Export Data" button
2. A JSON file will be downloaded with your current visualization

### Importing Data

1. Click the "📥 Import Data" button
2. Select a previously exported JSON file
3. Your visualization will be restored

## Project Structure

```
MMO/
├── src/
│   ├── components/
│   │   ├── ActionButtons.jsx      # Import/Export/Add Node buttons
│   │   ├── CustomEdge.jsx         # Custom integration edge component
│   │   ├── CustomNode.jsx         # Custom system node component
│   │   ├── IntegrationDetailPanel.jsx  # Integration details panel
│   │   ├── Legend.jsx             # Status legend
│   │   ├── NodeDetailPanel.jsx    # System details panel
│   │   └── StatisticsPanel.jsx    # Statistics dashboard
│   ├── data/
│   │   └── initialData.js         # Sample data
│   ├── App.jsx                    # Main application component
│   ├── main.jsx                   # Application entry point
│   └── index.css                  # Global styles
├── index.html                     # HTML template
├── vite.config.js                 # Vite configuration
└── package.json                   # Project dependencies
```

## License

ISC
