import React, { useState } from 'react';

const IntegrationDetailPanel = ({ edge, onClose, onUpdate, onDelete }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editedData, setEditedData] = useState(edge.data);

  const handleSave = () => {
    onUpdate(edge.id, editedData);
    setIsEditing(false);
  };

  const handleCancel = () => {
    setEditedData(edge.data);
    setIsEditing(false);
  };

  const handleChange = (field, value) => {
    setEditedData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  return (
    <div
      style={{
        position: 'fixed',
        right: 0,
        top: 0,
        width: '400px',
        height: '100vh',
        backgroundColor: 'white',
        boxShadow: '-4px 0 6px rgba(0, 0, 0, 0.1)',
        overflowY: 'auto',
        zIndex: 1000,
        padding: '20px'
      }}
    >
      {/* Header */}
      <div style={{ marginBottom: '20px', borderBottom: '2px solid #e5e7eb', paddingBottom: '15px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <h2 style={{ margin: 0, fontSize: '20px', color: '#1f2937' }}>Integration Details</h2>
          <button
            onClick={onClose}
            style={{
              background: 'none',
              border: 'none',
              fontSize: '24px',
              cursor: 'pointer',
              color: '#6b7280'
            }}
          >
            ✕
          </button>
        </div>
      </div>

      {/* Integration Type */}
      <div style={{ marginBottom: '20px' }}>
        <label style={{ display: 'block', fontWeight: 'bold', marginBottom: '5px', color: '#374151' }}>
          Integration Type
        </label>
        {isEditing ? (
          <select
            value={editedData.integrationType || 'api'}
            onChange={(e) => handleChange('integrationType', e.target.value)}
            style={{
              width: '100%',
              padding: '8px',
              border: '1px solid #d1d5db',
              borderRadius: '4px',
              fontSize: '14px'
            }}
          >
            <option value="api">API</option>
            <option value="file-transfer">File Transfer</option>
            <option value="database">Database</option>
            <option value="message-queue">Message Queue</option>
            <option value="batch">Batch</option>
            <option value="direct">Direct</option>
          </select>
        ) : (
          <div style={{ padding: '8px', backgroundColor: '#f9fafb', borderRadius: '4px', textTransform: 'capitalize' }}>
            {editedData.integrationType?.replace('-', ' ') || 'N/A'}
          </div>
        )}
      </div>

      {/* Status */}
      <div style={{ marginBottom: '20px' }}>
        <label style={{ display: 'block', fontWeight: 'bold', marginBottom: '5px', color: '#374151' }}>
          Status
        </label>
        {isEditing ? (
          <select
            value={editedData.status || 'not-started'}
            onChange={(e) => handleChange('status', e.target.value)}
            style={{
              width: '100%',
              padding: '8px',
              border: '1px solid #d1d5db',
              borderRadius: '4px',
              fontSize: '14px'
            }}
          >
            <option value="not-started">Not Started</option>
            <option value="in-progress">In Progress</option>
            <option value="completed">Completed</option>
            <option value="blocked">Blocked</option>
          </select>
        ) : (
          <div style={{ padding: '8px', backgroundColor: '#f9fafb', borderRadius: '4px', textTransform: 'capitalize' }}>
            {editedData.status?.replace('-', ' ') || 'N/A'}
          </div>
        )}
      </div>

      {/* Direction */}
      <div style={{ marginBottom: '20px' }}>
        <label style={{ display: 'block', fontWeight: 'bold', marginBottom: '5px', color: '#374151' }}>
          Direction
        </label>
        {isEditing ? (
          <select
            value={editedData.direction || 'unidirectional'}
            onChange={(e) => handleChange('direction', e.target.value)}
            style={{
              width: '100%',
              padding: '8px',
              border: '1px solid #d1d5db',
              borderRadius: '4px',
              fontSize: '14px'
            }}
          >
            <option value="unidirectional">Unidirectional</option>
            <option value="bidirectional">Bidirectional</option>
          </select>
        ) : (
          <div style={{ padding: '8px', backgroundColor: '#f9fafb', borderRadius: '4px', textTransform: 'capitalize' }}>
            {editedData.direction || 'N/A'}
          </div>
        )}
      </div>

      {/* Criticality */}
      <div style={{ marginBottom: '20px' }}>
        <label style={{ display: 'block', fontWeight: 'bold', marginBottom: '5px', color: '#374151' }}>
          Criticality Level
        </label>
        {isEditing ? (
          <select
            value={editedData.criticality || 'medium'}
            onChange={(e) => handleChange('criticality', e.target.value)}
            style={{
              width: '100%',
              padding: '8px',
              border: '1px solid #d1d5db',
              borderRadius: '4px',
              fontSize: '14px'
            }}
          >
            <option value="high">High</option>
            <option value="medium">Medium</option>
            <option value="low">Low</option>
          </select>
        ) : (
          <div style={{ padding: '8px', backgroundColor: '#f9fafb', borderRadius: '4px', textTransform: 'capitalize' }}>
            {editedData.criticality || 'N/A'}
          </div>
        )}
      </div>

      {/* Protocol */}
      <div style={{ marginBottom: '20px' }}>
        <label style={{ display: 'block', fontWeight: 'bold', marginBottom: '5px', color: '#374151' }}>
          Protocol
        </label>
        {isEditing ? (
          <input
            type="text"
            value={editedData.protocol || ''}
            onChange={(e) => handleChange('protocol', e.target.value)}
            placeholder="e.g., REST API, SOAP, JDBC"
            style={{
              width: '100%',
              padding: '8px',
              border: '1px solid #d1d5db',
              borderRadius: '4px',
              fontSize: '14px'
            }}
          />
        ) : (
          <div style={{ padding: '8px', backgroundColor: '#f9fafb', borderRadius: '4px' }}>
            {editedData.protocol || 'N/A'}
          </div>
        )}
      </div>

      {/* Data Format */}
      <div style={{ marginBottom: '20px' }}>
        <label style={{ display: 'block', fontWeight: 'bold', marginBottom: '5px', color: '#374151' }}>
          Data Format
        </label>
        {isEditing ? (
          <input
            type="text"
            value={editedData.dataFormat || ''}
            onChange={(e) => handleChange('dataFormat', e.target.value)}
            placeholder="e.g., JSON, XML, CSV"
            style={{
              width: '100%',
              padding: '8px',
              border: '1px solid #d1d5db',
              borderRadius: '4px',
              fontSize: '14px'
            }}
          />
        ) : (
          <div style={{ padding: '8px', backgroundColor: '#f9fafb', borderRadius: '4px' }}>
            {editedData.dataFormat || 'N/A'}
          </div>
        )}
      </div>

      {/* Frequency */}
      <div style={{ marginBottom: '20px' }}>
        <label style={{ display: 'block', fontWeight: 'bold', marginBottom: '5px', color: '#374151' }}>
          Frequency
        </label>
        {isEditing ? (
          <input
            type="text"
            value={editedData.frequency || ''}
            onChange={(e) => handleChange('frequency', e.target.value)}
            placeholder="e.g., Real-time, Hourly, Daily"
            style={{
              width: '100%',
              padding: '8px',
              border: '1px solid #d1d5db',
              borderRadius: '4px',
              fontSize: '14px'
            }}
          />
        ) : (
          <div style={{ padding: '8px', backgroundColor: '#f9fafb', borderRadius: '4px' }}>
            {editedData.frequency || 'N/A'}
          </div>
        )}
      </div>

      {/* Notes */}
      <div style={{ marginBottom: '20px' }}>
        <label style={{ display: 'block', fontWeight: 'bold', marginBottom: '5px', color: '#374151' }}>
          Notes
        </label>
        {isEditing ? (
          <textarea
            value={editedData.notes || ''}
            onChange={(e) => handleChange('notes', e.target.value)}
            rows={4}
            placeholder="Additional information about this integration"
            style={{
              width: '100%',
              padding: '8px',
              border: '1px solid #d1d5db',
              borderRadius: '4px',
              fontSize: '14px',
              resize: 'vertical'
            }}
          />
        ) : (
          <div style={{ padding: '8px', backgroundColor: '#f9fafb', borderRadius: '4px', minHeight: '60px' }}>
            {editedData.notes || 'N/A'}
          </div>
        )}
      </div>

      {/* Action Buttons */}
      <div style={{ display: 'flex', gap: '10px', marginTop: '20px', paddingTop: '20px', borderTop: '2px solid #e5e7eb' }}>
        {isEditing ? (
          <>
            <button
              onClick={handleSave}
              style={{
                flex: 1,
                padding: '10px',
                backgroundColor: '#10b981',
                color: 'white',
                border: 'none',
                borderRadius: '6px',
                cursor: 'pointer',
                fontWeight: '500'
              }}
            >
              Save
            </button>
            <button
              onClick={handleCancel}
              style={{
                flex: 1,
                padding: '10px',
                backgroundColor: '#6b7280',
                color: 'white',
                border: 'none',
                borderRadius: '6px',
                cursor: 'pointer',
                fontWeight: '500'
              }}
            >
              Cancel
            </button>
          </>
        ) : (
          <>
            <button
              onClick={() => setIsEditing(true)}
              style={{
                flex: 1,
                padding: '10px',
                backgroundColor: '#3b82f6',
                color: 'white',
                border: 'none',
                borderRadius: '6px',
                cursor: 'pointer',
                fontWeight: '500'
              }}
            >
              Edit
            </button>
            <button
              onClick={() => {
                if (window.confirm('Are you sure you want to delete this integration?')) {
                  onDelete(edge.id);
                }
              }}
              style={{
                flex: 1,
                padding: '10px',
                backgroundColor: '#ef4444',
                color: 'white',
                border: 'none',
                borderRadius: '6px',
                cursor: 'pointer',
                fontWeight: '500'
              }}
            >
              Delete
            </button>
          </>
        )}
      </div>
    </div>
  );
};

export default IntegrationDetailPanel;

// Made with Bob
