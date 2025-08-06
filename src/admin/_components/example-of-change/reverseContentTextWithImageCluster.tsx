'use client'
import React from 'react'
import Image from 'next/image'
import { useField } from '@payloadcms/ui'

const ReverseContentTextWithImageCluster = ({ path }: { path: string }) => {
  const { value, setValue } = useField<boolean>({ path })

  const darkenStyle = {
    filter: 'brightness(30%)',
    transition: 'filter 0.3s ease',
  }

  return (
    <div>
      <p>Without reverse layout:</p>
      <Image
        src="/skeleton/textWithImageCluster.svg"
        alt="Text With Image Cluster"
        width={300}
        height={130}
        style={!value ? {} : darkenStyle}
      />
      <br />
      <p>With reverse layout:</p>
      <Image
        src="/skeleton/revTextWithImageCluster.svg"
        alt="Reversed Text With Image Cluster"
        width={300}
        height={130}
        style={value ? {} : darkenStyle}
      />
      <br />
      <div className="flex items-center space-x-2">
        <input
          type="checkbox"
          id="reverseLayout"
          checked={value || false}
          onChange={(e) => setValue(e.target.checked)}
          className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500"
        />
        <label htmlFor="reverseLayout" className="text-sm font-medium text-gray-700">
          Enable Reverse Layout
        </label>
      </div>
    </div>
  )
}

export default ReverseContentTextWithImageCluster
