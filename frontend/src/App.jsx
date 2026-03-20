import { useState, useEffect } from 'react';
import { Search, User, BookOpen, Tag } from 'lucide-react';
import './App.css';

function App() {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState([]);
  const [selectedStudent, setSelectedStudent] = useState(null);
  const [isSearching, setIsSearching] = useState(false);

  useEffect(() => {
    // Lazy Load Constraint: Only search after 3 characters
    if (query.length < 3) {
      setResults([]);
      return;
    }

    setIsSearching(true);

    // Debounce Implementation: Wait 400ms after user stops typing
    const debounceTimer = setTimeout(async () => {
      try {
        const response = await fetch(`http://localhost:5000/api/search?q=${encodeURIComponent(query)}`);
        const data = await response.json();
        setResults(data);
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setIsSearching(false);
      }
    }, 400);

    return () => clearTimeout(debounceTimer);
  }, [query]);

  // Helper to safely highlight text 
  const highlightText = (text, highlight) => {
    if (!highlight.trim()) return text;
    const escapedHighlight = highlight.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
    const parts = text.split(new RegExp(`(${escapedHighlight})`, 'gi'));
    
    return (
      <span>
        {parts.map((part, i) => 
          part.toLowerCase() === highlight.toLowerCase() ? 
          <b key={i} className="text-highlight">{part}</b> : part
        )}
      </span>
    );
  };

  const handleSelect = (student) => {
    setSelectedStudent(student);
    setQuery(''); // Clear search after selection
    setResults([]);
  };

  // Helper to get initials for the avatar
  const getInitials = (name) => {
    return name.split(' ').map(n => n[0]).join('').substring(0, 2).toUpperCase();
  };

  return (
    <div className="container">
      <div className="header-section">
        <h1>Student Directory</h1>
      </div>
      
      <div className="search-wrapper">
        <div className="search-bar">
          <Search className="search-icon" size={20} />
          <input
            type="text"
            placeholder="Search student by name (min 3 chars)..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
        </div>

        {/* Dropdown Results */}
        {results.length > 0 && (
          <ul className="dropdown">
            {results.map((student) => (
              <li key={student.rollNumber} onClick={() => handleSelect(student)}>
                <span className="dropdown-name">{highlightText(student.name, query)}</span>
              </li>
            ))}
          </ul>
        )}
        {query.length >= 3 && results.length === 0 && !isSearching && (
          <ul className="dropdown">
            <li className="no-results">No students found.</li>
          </ul>
        )}
      </div>

      {/* Selected Student Display */}
      {selectedStudent && (
        <div className="profile-card">
          <div className="profile-subtitle">
            STUDENT PROFILE DETAILS <span className="dot">•</span>
          </div>
          
          <div className="profile-body">
            <div className="avatar">
              {getInitials(selectedStudent.name)}
            </div>
            
            <div className="details-container">
              <div className="detail-row">
                <User size={18} className="detail-icon" />
                <span className="detail-label">Name -</span>
                <span className="detail-value name-value">{selectedStudent.name}</span>
              </div>
              
              <div className="detail-row">
                <BookOpen size={18} className="detail-icon" />
                <span className="detail-label">Class -</span>
                <span className="detail-value">{selectedStudent.class}</span>
              </div>
              
              <div className="detail-row">
                <Tag size={18} className="detail-icon" />
                <span className="detail-label">Roll Number -</span>
                <span className="detail-value">
                  <span className="badge">{selectedStudent.rollNumber}</span>
                </span>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;