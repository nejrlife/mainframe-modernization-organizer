import React, { useState } from 'react';

const NodeDetailPanel = ({ node, onClose, onUpdate, onDelete }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editedData, setEditedData] = useState(node.data);

  const handleSave = () => {
    onUpdate(node.id, editedData);
    setIsEditing(false);
  };

  const handleCancel = () => {
    setEditedData(node.data);
    setIsEditing(false);
  };

  const handleChange = (section, field, value) => {
    setEditedData(prev => ({
      ...prev,
      [section]: {
        ...prev[section],
        [field]: value
      }
    }));
  };

  const handleLabelChange = (value) => {
    setEditedData(prev => ({
      ...prev,
      label: value
    }));
  };

  const handleStatusChange = (value) => {
    setEditedData(prev => ({
      ...prev,
      status: value
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
          <h2 style={{ margin: 0, fontSize: '20px', color: '#1f2937' }}>System Details</h2>
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

      {/* System Name */}
      <div style={{ marginBottom: '20px' }}>
        <label style={{ display: 'block', fontWeight: 'bold', marginBottom: '5px', color: '#374151' }}>
          System Name
        </label>
        {isEditing ? (
          <input
            type="text"
            value={editedData.label}
            onChange={(e) => handleLabelChange(e.target.value)}
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
            {editedData.label}
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
            value={editedData.status}
            onChange={(e) => handleStatusChange(e.target.value)}
            style={{
              width: '100%',
              padding: '8px',
              border: '1px solid #d1d5db',
              borderRadius: '4px',
              fontSize: '14px'
            }}
          >
            <option value="legacy">Legacy</option>
            <option value="in-progress">In Progress</option>
            <option value="modernized">Modernized</option>
            <option value="deprecated">Deprecated</option>
          </select>
        ) : (
          <div style={{ padding: '8px', backgroundColor: '#f9fafb', borderRadius: '4px', textTransform: 'capitalize' }}>
            {editedData.status.replace('-', ' ')}
          </div>
        )}
      </div>

      {/* Point of Contact Section */}
      <div style={{ marginBottom: '20px' }}>
        <h3 style={{ fontSize: '16px', fontWeight: 'bold', marginBottom: '10px', color: '#1f2937' }}>
          Point of Contact
        </h3>
        
        <div style={{ marginBottom: '10px' }}>
          <label style={{ display: 'block', fontSize: '12px', fontWeight: '500', marginBottom: '3px', color: '#6b7280' }}>
            Name
          </label>
          {isEditing ? (
            <input
              type="text"
              value={editedData.poc?.name || ''}
              onChange={(e) => handleChange('poc', 'name', e.target.value)}
              style={{
                width: '100%',
                padding: '6px',
                border: '1px solid #d1d5db',
                borderRadius: '4px',
                fontSize: '13px'
              }}
            />
          ) : (
            <div style={{ padding: '6px', backgroundColor: '#f9fafb', borderRadius: '4px', fontSize: '13px' }}>
              {editedData.poc?.name || 'N/A'}
            </div>
          )}
        </div>

        <div style={{ marginBottom: '10px' }}>
          <label style={{ display: 'block', fontSize: '12px', fontWeight: '500', marginBottom: '3px', color: '#6b7280' }}>
            Email
          </label>
          {isEditing ? (
            <input
              type="email"
              value={editedData.poc?.email || ''}
              onChange={(e) => handleChange('poc', 'email', e.target.value)}
              style={{
                width: '100%',
                padding: '6px',
                border: '1px solid #d1d5db',
                borderRadius: '4px',
                fontSize: '13px'
              }}
            />
          ) : (
            <div style={{ padding: '6px', backgroundColor: '#f9fafb', borderRadius: '4px', fontSize: '13px' }}>
              {editedData.poc?.email || 'N/A'}
            </div>
          )}
        </div>

        <div style={{ marginBottom: '10px' }}>
          <label style={{ display: 'block', fontSize: '12px', fontWeight: '500', marginBottom: '3px', color: '#6b7280' }}>
            Phone
          </label>
          {isEditing ? (
            <input
              type="tel"
              value={editedData.poc?.phone || ''}
              onChange={(e) => handleChange('poc', 'phone', e.target.value)}
              style={{
                width: '100%',
                padding: '6px',
                border: '1px solid #d1d5db',
                borderRadius: '4px',
                fontSize: '13px'
              }}
            />
          ) : (
            <div style={{ padding: '6px', backgroundColor: '#f9fafb', borderRadius: '4px', fontSize: '13px' }}>
              {editedData.poc?.phone || 'N/A'}
            </div>
          )}
        </div>

        <div style={{ marginBottom: '10px' }}>
          <label style={{ display: 'block', fontSize: '12px', fontWeight: '500', marginBottom: '3px', color: '#6b7280' }}>
            Department
          </label>
          {isEditing ? (
            <input
              type="text"
              value={editedData.poc?.department || ''}
              onChange={(e) => handleChange('poc', 'department', e.target.value)}
              style={{
                width: '100%',
                padding: '6px',
                border: '1px solid #d1d5db',
                borderRadius: '4px',
                fontSize: '13px'
              }}
            />
          ) : (
            <div style={{ padding: '6px', backgroundColor: '#f9fafb', borderRadius: '4px', fontSize: '13px' }}>
              {editedData.poc?.department || 'N/A'}
            </div>
          )}
        </div>
      </div>

      {/* System Details Section */}
      <div style={{ marginBottom: '20px' }}>
        <h3 style={{ fontSize: '16px', fontWeight: 'bold', marginBottom: '10px', color: '#1f2937' }}>
          System Details
        </h3>

        <div style={{ marginBottom: '10px' }}>
          <label style={{ display: 'block', fontSize: '12px', fontWeight: '500', marginBottom: '3px', color: '#6b7280' }}>
            Description
          </label>
          {isEditing ? (
            <textarea
              value={editedData.details?.description || ''}
              onChange={(e) => handleChange('details', 'description', e.target.value)}
              rows={3}
              style={{
                width: '100%',
                padding: '6px',
                border: '1px solid #d1d5db',
                borderRadius: '4px',
                fontSize: '13px',
                resize: 'vertical'
              }}
            />
          ) : (
            <div style={{ padding: '6px', backgroundColor: '#f9fafb', borderRadius: '4px', fontSize: '13px' }}>
              {editedData.details?.description || 'N/A'}
            </div>
          )}
        </div>

        <div style={{ marginBottom: '10px' }}>
          <label style={{ display: 'block', fontSize: '12px', fontWeight: '500', marginBottom: '3px', color: '#6b7280' }}>
            Technology Stack
          </label>
          {isEditing ? (
            <input
              type="text"
              value={editedData.details?.technology || ''}
              onChange={(e) => handleChange('details', 'technology', e.target.value)}
              style={{
                width: '100%',
                padding: '6px',
                border: '1px solid #d1d5db',
                borderRadius: '4px',
                fontSize: '13px'
              }}
            />
          ) : (
            <div style={{ padding: '6px', backgroundColor: '#f9fafb', borderRadius: '4px', fontSize: '13px' }}>
              {editedData.details?.technology || 'N/A'}
            </div>
          )}
        </div>

        <div style={{ marginBottom: '10px' }}>
          <label style={{ display: 'block', fontSize: '12px', fontWeight: '500', marginBottom: '3px', color: '#6b7280' }}>
            Criticality Level
          </label>
          {isEditing ? (
            <select
              value={editedData.details?.criticality || 'medium'}
              onChange={(e) => handleChange('details', 'criticality', e.target.value)}
              style={{
                width: '100%',
                padding: '6px',
                border: '1px solid #d1d5db',
                borderRadius: '4px',
                fontSize: '13px'
              }}
            >
              <option value="high">High</option>
              <option value="medium">Medium</option>
              <option value="low">Low</option>
            </select>
          ) : (
            <div style={{ padding: '6px', backgroundColor: '#f9fafb', borderRadius: '4px', fontSize: '13px', textTransform: 'capitalize' }}>
              {editedData.details?.criticality || 'N/A'}
            </div>
          )}
        </div>

        <div style={{ marginBottom: '10px' }}>
          <label style={{ display: 'block', fontSize: '12px', fontWeight: '500', marginBottom: '3px', color: '#6b7280' }}>
            User Count
          </label>
          {isEditing ? (
            <input
              type="number"
              value={editedData.details?.users || ''}
              onChange={(e) => handleChange('details', 'users', parseInt(e.target.value) || 0)}
              style={{
                width: '100%',
                padding: '6px',
                border: '1px solid #d1d5db',
                borderRadius: '4px',
                fontSize: '13px'
              }}
            />
          ) : (
            <div style={{ padding: '6px', backgroundColor: '#f9fafb', borderRadius: '4px', fontSize: '13px' }}>
              {editedData.details?.users || 'N/A'}
            </div>
          )}
        </div>

        <div style={{ marginBottom: '10px' }}>
          <label style={{ display: 'block', fontSize: '12px', fontWeight: '500', marginBottom: '3px', color: '#6b7280' }}>
            Migration Target
          </label>
          {isEditing ? (
            <input
              type="text"
              value={editedData.details?.migrationTarget || ''}
              onChange={(e) => handleChange('details', 'migrationTarget', e.target.value)}
              style={{
                width: '100%',
                padding: '6px',
                border: '1px solid #d1d5db',
                borderRadius: '4px',
                fontSize: '13px'
              }}
            />
          ) : (
            <div style={{ padding: '6px', backgroundColor: '#f9fafb', borderRadius: '4px', fontSize: '13px' }}>
              {editedData.details?.migrationTarget || 'N/A'}
            </div>
          )}
        </div>

        <div style={{ marginBottom: '10px' }}>
          <label style={{ display: 'block', fontSize: '12px', fontWeight: '500', marginBottom: '3px', color: '#6b7280' }}>
            Timeline
          </label>
          {isEditing ? (
            <input
              type="text"
              value={editedData.details?.timeline || ''}
              onChange={(e) => handleChange('details', 'timeline', e.target.value)}
              style={{
                width: '100%',
                padding: '6px',
                border: '1px solid #d1d5db',
                borderRadius: '4px',
                fontSize: '13px'
              }}
            />
          ) : (
            <div style={{ padding: '6px', backgroundColor: '#f9fafb', borderRadius: '4px', fontSize: '13px' }}>
              {editedData.details?.timeline || 'N/A'}
            </div>
          )}
        </div>

        <div style={{ marginBottom: '10px' }}>
          <label style={{ display: 'block', fontSize: '12px', fontWeight: '500', marginBottom: '3px', color: '#6b7280' }}>
            Notes
          </label>
          {isEditing ? (
            <textarea
              value={editedData.details?.notes || ''}
              onChange={(e) => handleChange('details', 'notes', e.target.value)}
              rows={3}
              style={{
                width: '100%',
                padding: '6px',
                border: '1px solid #d1d5db',
                borderRadius: '4px',
                fontSize: '13px',
                resize: 'vertical'
              }}
            />
          ) : (
            <div style={{ padding: '6px', backgroundColor: '#f9fafb', borderRadius: '4px', fontSize: '13px' }}>
              {editedData.details?.notes || 'N/A'}
            </div>
          )}
        </div>
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
                if (window.confirm('Are you sure you want to delete this node?')) {
                  onDelete(node.id);
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

export default NodeDetailPanel;

// Made with Bob
