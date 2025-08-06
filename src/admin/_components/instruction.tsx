import React from 'react';

const PageFieldInstructions: React.FC = () => {
  const domain = "localhost:3000"
  return (
    <div>
      <ul style={{ paddingLeft: '20px', marginTop: '10px' }}>
        <li><strong>Page Name:</strong> Required and must be unique. It will be used as the identifier for the page.</li>
        <li><strong>Page Default:</strong> Enable this if the page will be located at <code>https://{domain}/</code>. There should only be one default page in the system.</li>
        <li><strong>Page Key:</strong> This is automatically generated after saving. Used internally for routing or referencing.</li>
        <li><strong>Page Group:</strong> Optional. If provided, the final URL will follow this structure: <code>https://(domain)/(Group)/(This Page)</code>.</li>
        <li><strong>Page Sections:</strong> Choose the layout blocks to compose the page. Each block type (e.g., Hero, Services, etc.) can only be used once per page.</li>
      </ul>
    </div>
  );
};

export default PageFieldInstructions;

