// src/components/AllProducts/Widget.tsx

import React from "react";

const Widget: React.FC = () => {
  return (
    <div className="widget">
      <div className="widget-content">
        <div className="widget-text">
          <h2>Discover Our Latest Collection</h2>
          <p>Explore our exclusive range of products curated just for you.</p>

        </div>
        <div className="widget-image">
          <img src="https://freepngimg.com/thumb/categories/1342.png" alt="Widget Image" />
        </div>
      </div>
    </div>
  );
};

export default Widget;
