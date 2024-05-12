import React, { useState } from 'react';
import PropertyForm from './PropertyForm';

function MyComponent() {
  const [showAddPropertyForm, setShowAddPropertyForm] = useState(false);

  const toggleAddPropertyForm = () => {
    setShowAddPropertyForm(!showAddPropertyForm);
  };

  return (
    <div>
      {/* Other content for your main page */}
      <button onClick={toggleAddPropertyForm}>
        {showAddPropertyForm ? 'Hide Add Property Form' : 'Show Add Property Form'}
      </button>
      {showAddPropertyForm && <PropertyForm />}
    </div>
  );
}

export default MyComponent;

