import { useState, useEffect, useContext } from 'react';
import { useRouter } from 'next/router';
import AuthContext from '../context/AuthContext';

export default function Account() {
  const router = useRouter();
  const { token, logout } = useContext(AuthContext);
  const [user, setUser] = useState(null);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await fetch('http://localhost:3001/account', {
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
          }
        });
    
        const data = await response.json();
        
        if (!response.ok) {
          console.error("Backend error details:", data);
          throw new Error(data.details || 'Account fetch failed');
        }
        
        setUser(data);
      } catch (err) {
        console.error("Full fetch error:", err);
        setError(err.message);
      }
    };
    if (token) {
      fetchUserData();
    } else {
      setLoading(false);
      setError('No authentication token found');
    }
  }, [token]);

  if (loading) return <div>Loading...</div>;

  return (
     // Log the user data
    <div style={{ padding: '20px', fontFamily: 'Arial' }}>
      
      
      

      

      {user && (
        <div>
          <h2>Formatted Data:</h2>
          <ul style={{ listStyle: 'none', padding: 0 }}>
            {Object.entries(user).map(([key, value]) => (
              <li key={key} style={{ marginBottom: '10px' }}>
                <strong>{key}:</strong> {value !== null ? value.toString() : 'null'}
              </li>
            ))}
          </ul>
        </div>
      )}

      <button 
        onClick={logout}
        style={{
          marginTop: '20px',
          padding: '10px 15px',
          backgroundColor: '#ff4444',
          color: 'white',
          border: 'none',
          borderRadius: '4px',
          cursor: 'pointer'
        }}
      >
        Logout
      </button>
    </div>
  );
}