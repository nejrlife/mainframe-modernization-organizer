import { useState, useEffect } from 'react';
import { NODE_STATUSES, INTEGRATION_TYPES_ARRAY, INTEGRATION_STATUSES, CRITICALITY_LEVELS, MODERNIZATION_TARGETS } from '../schema';

/**
 * NodeDetailPanel Component
 * Provides CRUD operations for nodes and edges
 * Requirements: FR-2.3.1, FR-2.3.2, FR-2.3.3, FR-2.3.4
 */
const NodeDetailPanel = ({ 
  selectedElement, 
  onUpdate, 
  onDelete, 
  onClose,
  elementType // 'node' or 'edge'
}) => {
  const [formData, setFormData] = useState({});

  useEffect(() => {
    if (selectedElement) {
      if (elementType === 'node') {
        setFormData({
          label: selectedElement.data.label || '',
          status: selectedElement.data.status || 'Blocked',
          modernizationTarget: selectedElement.data.modernizationTarget || 'Keep',
          technology: selectedElement.data.details?.technology || '',
          criticality: selectedElement.data.details?.criticality || 'Medium',
          description: selectedElement.data.details?.description || '',
          pocName: selectedElement.data.poc?.name || '',
          pocEmail: selectedElement.data.poc?.email || '',
          pocRole: selectedElement.data.poc?.role || ''
        });
      } else {
        setFormData({
          integrationType: selectedElement.data?.integrationType || 'REST',
          status: selectedElement.data?.status || 'Not Started',
          description: selectedElement.data?.description || '',
          frequency: selectedElement.data?.frequency || '',
          dataVolume: selectedElement.data?.dataVolume || ''
        });
      }
    }
  }, [selectedElement, elementType]);

  const handleChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (elementType === 'node') {
      const updatedNode = {
        ...selectedElement,
        data: {
          ...selectedElement.data,
          label: formData.label,
          status: formData.status,
          modernizationTarget: formData.modernizationTarget,
          details: {
            ...selectedElement.data.details,
            technology: formData.technology,
            criticality: formData.criticality,
            description: formData.description
          },
          poc: {
            name: formData.pocName,
            email: formData.pocEmail,
            role: formData.pocRole
          }
        }
      };
      onUpdate(updatedNode);
    } else {
      const updatedEdge = {
        ...selectedElement,
        data: {
          ...selectedElement.data,
          integrationType: formData.integrationType,
          status: formData.status,
          description: formData.description,
          frequency: formData.frequency,
          dataVolume: formData.dataVolume
        }
      };
      onUpdate(updatedEdge);
    }
  };

  const handleDelete = () => {
    if (window.confirm(`Are you sure you want to delete this ${elementType}?`)) {
      onDelete(selectedElement.id);
    }
  };

  if (!selectedElement) return null;

  return (
    <div style={{
      position: 'fixed',
      right: '20px',
      top: '20px',
      bottom: '20px',
      width: '350px',
      overflowY: 'auto',
      background: 'white',
      borderRadius: '12px',
      boxShadow: '0 10px 40px rgba(0, 0, 0, 0.2)',
      padding: '20px',
      zIndex: 1000,
      display: 'flex',
      flexDirection: 'column'
    }}>
      <div style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: '20px'
      }}>
        <h3 style={{ margin: 0, fontSize: '18px', fontWeight: '600' }}>
          {elementType === 'node' ? 'Edit System' : 'Edit Integration'}
        </h3>
        <button
          onClick={onClose}
          style={{
            background: 'none',
            border: 'none',
            fontSize: '24px',
            cursor: 'pointer',
            color: '#6b7280',
            padding: '0',
            width: '30px',
            height: '30px'
          }}
        >
          ×
        </button>
      </div>

      <form onSubmit={handleSubmit}>
        {elementType === 'node' ? (
          <>
            {/* Node Fields */}
            <div style={{ marginBottom: '16px' }}>
              <label style={{ display: 'block', marginBottom: '6px', fontSize: '14px', fontWeight: '500' }}>
                System Name *
              </label>
              <input
                type="text"
                value={formData.label}
                onChange={(e) => handleChange('label', e.target.value)}
                required
                style={{
                  width: '100%',
                  padding: '8px 12px',
                  border: '1px solid #d1d5db',
                  borderRadius: '6px',
                  fontSize: '14px'
                }}
              />
            </div>

            <div style={{ marginBottom: '16px' }}>
              <label style={{ display: 'block', marginBottom: '6px', fontSize: '14px', fontWeight: '500' }}>
                Status *
              </label>
              <select
                value={formData.status}
                onChange={(e) => handleChange('status', e.target.value)}
                required
                style={{
                  width: '100%',
                  padding: '8px 12px',
                  border: '1px solid #d1d5db',
                  borderRadius: '6px',
                  fontSize: '14px'
                }}
              >
                {NODE_STATUSES.map(status => (
                  <option key={status} value={status}>{status}</option>
                ))}
              </select>
            </div>

            <div style={{ marginBottom: '16px' }}>
              <label style={{ display: 'block', marginBottom: '6px', fontSize: '14px', fontWeight: '500' }}>
                Modernization Target *
              </label>
              <select
                value={formData.modernizationTarget}
                onChange={(e) => handleChange('modernizationTarget', e.target.value)}
                required
                style={{
                  width: '100%',
                  padding: '8px 12px',
                  border: '1px solid #d1d5db',
                  borderRadius: '6px',
                  fontSize: '14px'
                }}
              >
                {MODERNIZATION_TARGETS.map(target => (
                  <option key={target} value={target}>{target}</option>
                ))}
              </select>
            </div>

            <div style={{ marginBottom: '16px' }}>
              <label style={{ display: 'block', marginBottom: '6px', fontSize: '14px', fontWeight: '500' }}>
                Technology Stack
              </label>
              <input
                type="text"
                value={formData.technology}
                onChange={(e) => handleChange('technology', e.target.value)}
                placeholder="e.g., COBOL, DB2, CICS"
                style={{
                  width: '100%',
                  padding: '8px 12px',
                  border: '1px solid #d1d5db',
                  borderRadius: '6px',
                  fontSize: '14px'
                }}
              />
            </div>

            <div style={{ marginBottom: '16px' }}>
              <label style={{ display: 'block', marginBottom: '6px', fontSize: '14px', fontWeight: '500' }}>
                Criticality *
              </label>
              <select
                value={formData.criticality}
                onChange={(e) => handleChange('criticality', e.target.value)}
                required
                style={{
                  width: '100%',
                  padding: '8px 12px',
                  border: '1px solid #d1d5db',
                  borderRadius: '6px',
                  fontSize: '14px'
                }}
              >
                {CRITICALITY_LEVELS.map(level => (
                  <option key={level} value={level}>{level}</option>
                ))}
              </select>
            </div>

            <div style={{ marginBottom: '16px' }}>
              <label style={{ display: 'block', marginBottom: '6px', fontSize: '14px', fontWeight: '500' }}>
                Description
              </label>
              <textarea
                value={formData.description}
                onChange={(e) => handleChange('description', e.target.value)}
                rows={3}
                style={{
                  width: '100%',
                  padding: '8px 12px',
                  border: '1px solid #d1d5db',
                  borderRadius: '6px',
                  fontSize: '14px',
                  resize: 'vertical'
                }}
              />
            </div>

            <div style={{ 
              borderTop: '1px solid #e5e7eb', 
              paddingTop: '16px', 
              marginTop: '16px',
              marginBottom: '16px'
            }}>
              <h4 style={{ margin: '0 0 12px 0', fontSize: '14px', fontWeight: '600' }}>
                Point of Contact
              </h4>
              
              <div style={{ marginBottom: '12px' }}>
                <label style={{ display: 'block', marginBottom: '6px', fontSize: '13px', fontWeight: '500' }}>
                  Name
                </label>
                <input
                  type="text"
                  value={formData.pocName}
                  onChange={(e) => handleChange('pocName', e.target.value)}
                  style={{
                    width: '100%',
                    padding: '8px 12px',
                    border: '1px solid #d1d5db',
                    borderRadius: '6px',
                    fontSize: '14px'
                  }}
                />
              </div>

              <div style={{ marginBottom: '12px' }}>
                <label style={{ display: 'block', marginBottom: '6px', fontSize: '13px', fontWeight: '500' }}>
                  Email
                </label>
                <input
                  type="email"
                  value={formData.pocEmail}
                  onChange={(e) => handleChange('pocEmail', e.target.value)}
                  style={{
                    width: '100%',
                    padding: '8px 12px',
                    border: '1px solid #d1d5db',
                    borderRadius: '6px',
                    fontSize: '14px'
                  }}
                />
              </div>

              <div style={{ marginBottom: '12px' }}>
                <label style={{ display: 'block', marginBottom: '6px', fontSize: '13px', fontWeight: '500' }}>
                  Role
                </label>
                <input
                  type="text"
                  value={formData.pocRole}
                  onChange={(e) => handleChange('pocRole', e.target.value)}
                  style={{
                    width: '100%',
                    padding: '8px 12px',
                    border: '1px solid #d1d5db',
                    borderRadius: '6px',
                    fontSize: '14px'
                  }}
                />
              </div>
            </div>
          </>
        ) : (
          <>
            {/* Edge Fields */}
            <div style={{ marginBottom: '16px' }}>
              <label style={{ display: 'block', marginBottom: '6px', fontSize: '14px', fontWeight: '500' }}>
                Integration Type *
              </label>
              <select
                value={formData.integrationType}
                onChange={(e) => handleChange('integrationType', e.target.value)}
                required
                style={{
                  width: '100%',
                  padding: '8px 12px',
                  border: '1px solid #d1d5db',
                  borderRadius: '6px',
                  fontSize: '14px'
                }}
              >
                {INTEGRATION_TYPES_ARRAY.map(type => (
                  <option key={type} value={type}>{type}</option>
                ))}
              </select>
            </div>

            <div style={{ marginBottom: '16px' }}>
              <label style={{ display: 'block', marginBottom: '6px', fontSize: '14px', fontWeight: '500' }}>
                Status *
              </label>
              <select
                value={formData.status}
                onChange={(e) => handleChange('status', e.target.value)}
                required
                style={{
                  width: '100%',
                  padding: '8px 12px',
                  border: '1px solid #d1d5db',
                  borderRadius: '6px',
                  fontSize: '14px'
                }}
              >
                {INTEGRATION_STATUSES.map(status => (
                  <option key={status} value={status}>{status}</option>
                ))}
              </select>
            </div>

            <div style={{ marginBottom: '16px' }}>
              <label style={{ display: 'block', marginBottom: '6px', fontSize: '14px', fontWeight: '500' }}>
                Description
              </label>
              <textarea
                value={formData.description}
                onChange={(e) => handleChange('description', e.target.value)}
                rows={3}
                style={{
                  width: '100%',
                  padding: '8px 12px',
                  border: '1px solid #d1d5db',
                  borderRadius: '6px',
                  fontSize: '14px',
                  resize: 'vertical'
                }}
              />
            </div>

            <div style={{ marginBottom: '16px' }}>
              <label style={{ display: 'block', marginBottom: '6px', fontSize: '14px', fontWeight: '500' }}>
                Frequency
              </label>
              <input
                type="text"
                value={formData.frequency}
                onChange={(e) => handleChange('frequency', e.target.value)}
                placeholder="e.g., Real-time, Daily, Hourly"
                style={{
                  width: '100%',
                  padding: '8px 12px',
                  border: '1px solid #d1d5db',
                  borderRadius: '6px',
                  fontSize: '14px'
                }}
              />
            </div>

            <div style={{ marginBottom: '16px' }}>
              <label style={{ display: 'block', marginBottom: '6px', fontSize: '14px', fontWeight: '500' }}>
                Data Volume
              </label>
              <input
                type="text"
                value={formData.dataVolume}
                onChange={(e) => handleChange('dataVolume', e.target.value)}
                placeholder="e.g., 1000 records/day"
                style={{
                  width: '100%',
                  padding: '8px 12px',
                  border: '1px solid #d1d5db',
                  borderRadius: '6px',
                  fontSize: '14px'
                }}
              />
            </div>
          </>
        )}

        <div style={{ 
          display: 'flex', 
          gap: '10px', 
          marginTop: '20px',
          paddingTop: '20px',
          borderTop: '1px solid #e5e7eb'
        }}>
          <button
            type="submit"
            style={{
              flex: 1,
              padding: '10px',
              background: '#3b82f6',
              color: 'white',
              border: 'none',
              borderRadius: '6px',
              fontSize: '14px',
              fontWeight: '500',
              cursor: 'pointer'
            }}
          >
            Save Changes
          </button>
          <button
            type="button"
            onClick={handleDelete}
            style={{
              flex: 1,
              padding: '10px',
              background: '#ef4444',
              color: 'white',
              border: 'none',
              borderRadius: '6px',
              fontSize: '14px',
              fontWeight: '500',
              cursor: 'pointer'
            }}
          >
            Delete
          </button>
        </div>
      </form>
    </div>
  );
};

export default NodeDetailPanel;

// Made with Bob