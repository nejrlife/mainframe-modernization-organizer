# Mainframe Modernization Organizer

An interactive visual tool for planning and managing mainframe modernization projects. Built with React and ReactFlow, this application helps teams visualize system dependencies, track modernization progress, and manage replacement strategies.

![Mainframe Modernization Organizer](src/assets/hero.png)

## Features

### 🎯 Core Functionality

- **Interactive Canvas**: Drag-and-drop interface for organizing system nodes
- **System Visualization**: Visual representation of mainframe systems and their relationships
- **Integration Mapping**: Track connections between systems with detailed integration types
- **Modernization Tracking**: Monitor progress with status indicators (Blocked, In Progress, Completed, Not Started)
- **Modernization Targets**: Categorize systems (Keep, Upgrade, New, Decom)

### 📊 Advanced Features

- **As-Is/To-Be Views**: Toggle between current and future state visualizations
- **Replacement Planning**: Define replacement systems for decommissioned nodes
- **Animated Dotted Lines**: Visual indicators showing replacement relationships with directional animation
- **Statistics Dashboard**: Real-time project metrics and progress tracking
- **Detail Panels**: Comprehensive editing for nodes and integrations
- **JIRA Integration**: Link systems and integrations to JIRA features/capabilities
- **Persistent Storage**: Auto-save to browser localStorage

### 🎨 Visual Indicators

- **Color-coded Status**: Instant visual feedback on system status
- **Modernization Badges**: Clear indicators for each system's modernization target
- **Purple Animated Lines**: Replacement relationships with marching ants effect
- **Opacity Fading**: Context-aware visibility in As-Is/To-Be views

## Prerequisites

Before you begin, ensure you have the following installed:

- **Node.js** (v18.0.0 or higher)
- **npm** (v9.0.0 or higher) or **yarn** (v1.22.0 or higher)

## Installation

1. **Clone the repository**

   ```bash
   git clone <repository-url>
   cd mainframe-modernization-organizer
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```
   or
   ```bash
   yarn install
   ```

## Running Locally

### Development Mode

Start the development server with hot module replacement (HMR):

```bash
npm run dev
```

or

```bash
yarn dev
```

The application will be available at `http://localhost:5173` (default Vite port).

### Preview Production Build

To preview the production build locally:

```bash
npm run build
npm run preview
```

or

```bash
yarn build
yarn preview
```

## Building for Production

### Build the Application

Create an optimized production build:

```bash
npm run build
```

or

```bash
yarn build
```

The build output will be in the `dist/` directory.

### Build Output Structure

```
dist/
├── assets/
│   ├── index-[hash].js
│   ├── index-[hash].css
│   └── [other assets]
├── index.html
└── favicon.svg
```

## Deployment

### Deploy to Static Hosting

The application is a static site and can be deployed to any static hosting service:

#### Vercel

```bash
npm install -g vercel
vercel --prod
```

#### Netlify

```bash
npm install -g netlify-cli
netlify deploy --prod --dir=dist
```

#### GitHub Pages

1. Build the application: `npm run build`
2. Push the `dist/` directory to the `gh-pages` branch
3. Enable GitHub Pages in repository settings

#### AWS S3 + CloudFront

1. Build the application: `npm run build`
2. Upload `dist/` contents to S3 bucket
3. Configure CloudFront distribution
4. Set `index.html` as default root object

### Environment Configuration

The application uses browser localStorage for data persistence. No backend configuration is required for basic functionality.

## Project Structure

```
mainframe-modernization-organizer/
├── public/              # Static assets
│   ├── favicon.svg
│   └── icons.svg
├── src/
│   ├── assets/          # Images and media
│   ├── components/      # React components
│   │   ├── CustomNode.jsx
│   │   ├── CustomEdge.jsx
│   │   ├── NodeDetailPanel.jsx
│   │   ├── Statistics.jsx
│   │   ├── ViewToggle.jsx
│   │   └── Legend.jsx
│   ├── App.jsx          # Main application component
│   ├── App.css          # Application styles
│   ├── schema.js        # Data models and initial data
│   ├── main.jsx         # Application entry point
│   └── index.css        # Global styles
├── index.html           # HTML template
├── package.json         # Dependencies and scripts
├── vite.config.js       # Vite configuration
└── README.md            # This file
```

## Usage Guide

### Adding Systems

1. Click the **➕** button (bottom-right)
2. A new system node appears on the canvas
3. Click the **Edit** button (✏️) to configure

### Editing Systems

1. Click on any system node
2. Click the **Edit** button (✏️) that appears
3. Update fields:
   - Label
   - Status (Blocked, In Progress, Completed, Not Started)
   - Modernization Target (Keep, Upgrade, New, Decom)
   - Technology Stack
   - Criticality
   - Description
   - JIRA Feature/Capability
   - Point of Contact details

### Setting Replacement Systems

1. Select a system with **Decom** modernization target
2. Click **Edit** button
3. Choose replacement from **Replaced By** dropdown
4. Save changes
5. Purple animated dotted lines appear showing the replacement relationship

### Creating Integrations

1. Click and drag from one system's edge to another
2. Click on the new connection line
3. Click **Edit** button to configure:
   - Integration Type (REST, SOAP, File Transfer, Database, Message Queue, Direct)
   - Status
   - Description
   - JIRA Feature/Capability

### View Modes

- **As-Is View**: Shows current state (Keep, Upgrade, Decom systems visible)
- **To-Be View**: Shows future state (Keep, Upgrade, New systems visible)
- Toggle using the switch at the top-center

### Visual Indicators

- **Purple Dotted Lines**: Appear when clicking decom or replacer nodes
  - Lines to decom node: Animation moves backward
  - Lines to replacer node: Animation moves forward
- **Status Colors**:
  - Red: Blocked
  - Orange: In Progress
  - Green: Completed
  - Gray: Not Started

## Data Persistence

The application automatically saves:

- Node positions
- Node data (labels, status, details)
- Edge connections
- Edge data (integration types, descriptions)

Data is stored in browser localStorage and persists across sessions.

### Clearing Data

To reset the application:

1. Open browser DevTools (F12)
2. Go to Application/Storage tab
3. Clear localStorage for the site
4. Refresh the page

## Technology Stack

- **React 19.2.6**: UI framework
- **ReactFlow 11.10.4**: Flow diagram library
- **Vite 8.0.12**: Build tool and dev server
- **ESLint**: Code linting

## Browser Support

- Chrome/Edge (latest)
- Firefox (latest)
- Safari (latest)

## Troubleshooting

### Port Already in Use

If port 5173 is already in use:

```bash
npm run dev -- --port 3000
```

### Build Fails

1. Clear node_modules: `rm -rf node_modules`
2. Clear package-lock.json: `rm package-lock.json`
3. Reinstall: `npm install`
4. Rebuild: `npm run build`

### Data Not Persisting

- Check browser localStorage is enabled
- Ensure not in private/incognito mode
- Check browser storage quota

## Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/your-feature`
3. Commit changes: `git commit -am 'Add new feature'`
4. Push to branch: `git push origin feature/your-feature`
5. Submit a pull request

## License

This project is licensed under the MIT License.

## Support

For issues, questions, or contributions, please open an issue in the repository.

---

**Made with Bob** 🤖
