import { useState, useEffect, useCallback } from 'react';
import { db } from '../firebase';
import { getAuth, signOut } from 'firebase/auth';
import {
  collection,
  query,
  getDocs,
  addDoc,
  deleteDoc,
  doc,
  updateDoc,
} from 'firebase/firestore';
import {
  FiMenu, FiX, FiPlus, FiEdit2, FiTrash2, FiImage, FiCalendar,
} from 'react-icons/fi';
import './CSS/Dashboard.css';

const Dashboard = () => {
  const [dataList, setDataList] = useState([]);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newData, setNewData] = useState({
    title: '',
    message: '',
    imageUrl: '',
    timestamp: new Date(),
  });
  const [base64Image, setBase64Image] = useState('');
  const [imagePreview, setImagePreview] = useState('');
  const [activeSection, setActiveSection] = useState('EventSlider');
  const [isEditing, setIsEditing] = useState(false);
  const [editId, setEditId] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [selectedItem, setSelectedItem] = useState(null);
  const [isDetailPopupOpen, setIsDetailPopupOpen] = useState(false);

  const handleCardClick = (item) => {
    setSelectedItem(item);
    setIsDetailPopupOpen(true);
  };



  const handleLogout = () => {
    const auth = getAuth();
    signOut(auth)
      .then(() => {
        // Optionally redirect to login page
        window.location.href = '/login';
      })
      .catch((error) => {
        console.error('Logout error:', error);
        alert('Logout failed!');
      });
  };
  

  // Memoize collection name mapping
  const getCollectionName = useCallback(() => {
    const collections = {
      EventSlider: 'slider',
      Services: 'services',
      Projects: 'projects',
    };
    return collections[activeSection] || 'slider';
  }, [activeSection]);

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    // Validate file type
    if (!file.type.match('image.*')) {
      setError('Please select an image file (JPEG, PNG, etc.)');
      return;
    }

    // Validate file size
    if (file.size > 2 * 1024 * 1024) {
      setError('Image size should be less than 2MB');
      return;
    }

    const reader = new FileReader();
    reader.onloadstart = () => setIsLoading(true);
    reader.onloadend = () => {
      setBase64Image(reader.result);
      setImagePreview(reader.result);
      setIsLoading(false);
      setError(null);
    };
    reader.onerror = () => {
      setError('Error reading image file');
      setIsLoading(false);
    };
    reader.readAsDataURL(file);
  };

  // Memoized fetch function to prevent unnecessary recreations
  const fetchData = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    try {
      const q = query(collection(db, getCollectionName()));
      const querySnapshot = await getDocs(q);
      const data = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
        formattedDate: doc.data().timestamp?.seconds
          ? new Date(doc.data().timestamp.seconds * 1000).toLocaleString()
          : 'No date',
      }));
      setDataList(data);
    } catch (err) {
      console.error('Error fetching data:', err);
      setError('Failed to load data. Please try again.');
    } finally {
      setIsLoading(false);
    }
  }, [getCollectionName]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this item?')) return;
    
    try {
      setIsLoading(true);
      await deleteDoc(doc(db, getCollectionName(), id));
      setDataList((prev) => prev.filter((item) => item.id !== id));
    } catch (err) {
      console.error('Error deleting document:', err);
      setError('Failed to delete item. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewData((prev) => ({ ...prev, [name]: value }));
  };

  const resetForm = () => {
    setNewData({ title: '', message: '', imageUrl: '', timestamp: new Date() });
    setBase64Image('');
    setImagePreview('');
    setError(null);
  };

  const handleAddOrUpdate = async () => {
    // Validation
    if (!newData.title.trim()) {
      setError('Title is required');
      return;
    }
    if (!newData.message.trim()) {
      setError('Message is required');
      return;
    }
    if (!base64Image && !isEditing) {
      setError('Please upload an image');
      return;
    }

    setIsLoading(true);
    setError(null);

    try {
      const collectionName = getCollectionName();
      const dataToSave = {
        title: newData.title.trim(),
        message: newData.message.trim(),
        timestamp: new Date(),
        ...(base64Image && { imageUrl: base64Image }),
      };

      if (isEditing) {
        await updateDoc(doc(db, collectionName, editId), dataToSave);
      } else {
        await addDoc(collection(db, collectionName), dataToSave);
      }

      await fetchData();
      setIsModalOpen(false);
      setIsEditing(false);
      setEditId(null);
      resetForm();
    } catch (err) {
      console.error('Error saving data:', err);
      setError(`Failed to ${isEditing ? 'update' : 'add'} item. Please try again.`);
    } finally {
      setIsLoading(false);
    }
  };

  const handleEdit = (item) => {
    setNewData({
      title: item.title,
      message: item.message,
      imageUrl: item.imageUrl,
      timestamp: item.timestamp || new Date(),
    });
    setImagePreview(item.imageUrl);
    setBase64Image('');
    setEditId(item.id);
    setIsEditing(true);
    setIsModalOpen(true);
  };

  return (
    <div className={`dashboard-container ${isSidebarOpen ? 'sidebar-open' : 'sidebar-closed'}`}>
      <div className={`sidebar ${isSidebarOpen ? 'open' : 'closed'}`}>
        <div>
          <div className="sidebar-header">
          <h2>Dashboard</h2>
          <button 
            className="sidebar-toggle-btn" 
            onClick={() => setIsSidebarOpen(false)}
            aria-label="Close sidebar"
          >
            <FiX size={20} />
          </button>
        </div>
        <ul className="sidebar-menu">
          {['EventSlider', 'Services', 'Projects'].map((section) => (
            <li
              key={section}
              className={activeSection === section ? 'active' : ''}
              onClick={() => setActiveSection(section)}
            >
              {section}
            </li>
          ))}
        </ul>
        </div>
        

        <div className="sidebar-footer">
          <button className="logout-button" onClick={handleLogout}>
            Logout
          </button>
        </div>

      </div>

      <div className="dashboard-content">
        <div className="content-header">
          <button 
            className="toggle-sidebar" 
            onClick={() => setIsSidebarOpen(!isSidebarOpen)}
            aria-label="Toggle sidebar"
          >
            <FiMenu size={24} />
          </button>
          <h1>{activeSection} Management</h1>
        </div>

        {error && !isModalOpen && (
          <div className="error-message">
            {error}
            <button onClick={() => setError(null)}>Dismiss</button>
          </div>
        )}

        <div className="content-actions">
          <button
            type="button"
            className="add-item-button"
            onClick={() => {
              setIsModalOpen(true);
              setIsEditing(false);
              resetForm();
            }}
            disabled={isLoading}
          >
            <FiPlus size={18} /> Add {activeSection}
          </button>
        </div>

        {isLoading && dataList.length === 0 ? (
          <div className="loading-spinner">
            <div className="spinner"></div>
            <p>Loading data...</p>
          </div>
        ) : dataList.length === 0 ? (
          <div className="empty-state">
            <h3>No {activeSection.toLowerCase()} found</h3>
            <p>Click the button above to add your first item</p>
          </div>
        ) : (
          <div className="data-grid">
            {dataList.map((item) => (
              <div 
                  key={item.id} 
                  className="data-card"
                  onClick={() => handleCardClick(item)}
                >
                {item.imageUrl && (
                  <div className="card-image">
                    <img 
                      src={item.imageUrl} 
                      alt={item.title || 'No title'} 
                      loading="lazy"
                    />
                  </div>
                )}
                <div className="card-content">
                  <div className="card-header">
                    <h3>{item.title || 'Untitled'}</h3>
                    <div className="card-actions">
                      <button 
                        type="button" 
                        className="edit-button" 
                        onClick={() => handleEdit(item)}
                        disabled={isLoading}
                        aria-label={`Edit ${item.title}`}
                      >
                        <FiEdit2 size={16} />
                      </button>
                      <button
                        type="button"
                        className="delete-button"
                        onClick={() => handleDelete(item.id)}
                        disabled={isLoading}
                        aria-label={`Delete ${item.title}`}
                      >
                        <FiTrash2 size={16} />
                      </button>
                    </div>
                  </div>
                  <p>{(item.message?.length > 100 ? item.message.slice(0, 100) + '...' : item.message) || 'No description'}</p>
                  <div className="card-footer">
                    <span>
                      <FiCalendar size={14} /> {item.formattedDate}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {isModalOpen && (
  <div className="modal-overlay" onClick={() => setIsModalOpen(false)}>
    <div 
      className="modal" 
      onClick={(e) => e.stopPropagation()}
      style={{
        background: 'white',
        padding: '2rem',
        borderRadius: '8px',
        width: '90%',
        maxWidth: '600px'
      }}
    >
      <div className="modal-header">
        <h2>{isEditing ? 'Edit' : 'Add New'} {activeSection}</h2>
        <button
          type="button"
          className="close-modal"
          onClick={() => setIsModalOpen(false)}
          disabled={isLoading}
          aria-label="Close modal"
        >
          <FiX size={24} />
        </button>
      </div>
      
      <form onSubmit={(e) => {
        e.preventDefault();
        handleAddOrUpdate();
      }}>
        <div className="modal-body">
          {error && (
            <div className="error-message">
              {error}
              <button type="button" onClick={() => setError(null)}>Dismiss</button>
            </div>
          )}
          
          <div className="form-group">
            <label htmlFor="title-input">Title *</label>
            <input
              id="title-input"
              name="title"
              type="text"
              value={newData.title}
              onChange={handleInputChange}
              placeholder="Enter title"
              disabled={isLoading}
              required
              style={{ width: '100%', padding: '8px' }}
            />
          </div>
          
          <div className="form-group">
            <label htmlFor="message-input">Message *</label>
            <textarea
              id="message-input"
              name="message"
              value={newData.message}
              onChange={handleInputChange}
              placeholder="Enter message"
              disabled={isLoading}
              required
              style={{ width: '100%', padding: '8px', minHeight: '100px' }}
            />
          </div>
          
          <div className="form-group">
            <label htmlFor="image-upload" className="image-upload-label">
              <FiImage size={18} /> {imagePreview ? 'Change Image' : 'Upload Image *'}
            </label>
            <input
              id="image-upload"
              type="file"
              accept="image/*"
              onChange={handleImageUpload}
              className="image-upload-input"
              disabled={isLoading}
              required={!isEditing}
              style={{ display: 'none' }}
            />
            
            {isLoading && (
              <div className="image-loading">
                <div className="spinner small" /> Uploading image...
              </div>
            )}
            
            {imagePreview && (
              <div className="image-preview">
                <img src={imagePreview} alt="Preview" style={{ maxWidth: '100%' }} />
              </div>
            )}
          </div>
        </div>
        
        <div className="modal-footer" style={{ marginTop: '1rem' }}>
          <button
            type="button"
            className="cancel-button"
            onClick={() => setIsModalOpen(false)}
            disabled={isLoading}
            style={{ marginRight: '1rem', padding: '8px 16px' }}
          >
            Cancel
          </button>
          <button
            type="submit"
            className="confirm-button"
            disabled={isLoading}
            style={{ padding: '8px 16px' }}
          >
            {isLoading ? (
              <>
                <div className="spinner white small" />
                {isEditing ? 'Updating...' : 'Adding...'}
              </>
            ) : isEditing ? 'Update' : 'Add'}
          </button>
        </div>
      </form>
    </div>
  </div>
)}

{isDetailPopupOpen && selectedItem && (
  <div className="detail-popup-overlay" onClick={() => setIsDetailPopupOpen(false)}>
    <div className="detail-popup" onClick={(e) => e.stopPropagation()}>
      <div className="popup-header">
        <h2>{selectedItem.title}</h2>
        <button
          type="button"
          className="close-popup"
          onClick={() => setIsDetailPopupOpen(false)}
          aria-label="Close details"
        >
          <FiX size={24} />
        </button>
      </div>
      
      <div className="popup-content">
        {selectedItem.imageUrl && (
          <div className="popup-image">
            <img 
              src={selectedItem.imageUrl} 
              alt={selectedItem.title || 'No title'} 
            />
          </div>
        )}
        
        <div className="popup-details">
          <p className="popup-message">{selectedItem.message || 'No description'}</p>
          
          <div className="popup-meta">
            <span>
              <FiCalendar size={16} /> {selectedItem.formattedDate}
            </span>
          </div>
        </div>
      </div>
      
      <div className="popup-footer">
        <button
          type="button"
          className="edit-button"
          onClick={(e) => {
            e.stopPropagation();
            setIsDetailPopupOpen(false);
            handleEdit(selectedItem);
          }}
        >
          <FiEdit2 size={16} /> Edit
        </button>
        
        <button
          type="button"
          className="delete-button"
          onClick={(e) => {
            e.stopPropagation();
            setIsDetailPopupOpen(false);
            handleDelete(selectedItem.id);
          }}
        >
          <FiTrash2 size={16} /> Delete
        </button>
      </div>
    </div>
  </div>
)}


    </div>
  );
};

export default Dashboard;