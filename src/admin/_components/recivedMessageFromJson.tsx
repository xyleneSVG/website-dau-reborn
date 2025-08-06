'use client'

import React from 'react'
import { type DefaultServerCellComponentProps } from 'payload'

const formatLabel = (key: string): string => {
  return key
    .replace(/([A-Z])/g, ' $1')
    .replace(/[_-]/g, ' ')
    .replace(/\s+/g, ' ')
    .trim()
    .replace(/\b\w/g, (c) => c.toUpperCase())
}

const RecivedMessageFromJSON: React.FC<DefaultServerCellComponentProps> = ({ cellData }) => {
  if (!cellData || typeof cellData !== 'object') {
    return <div>No Message</div>
  }

  return (
    <div>
      {Object.entries(cellData).map(([key, value]) => (
        <p key={key}>
          <strong>{formatLabel(key)}:</strong> {String(value)}
        </p>
      ))}
    </div>
  )
}

export default RecivedMessageFromJSON
