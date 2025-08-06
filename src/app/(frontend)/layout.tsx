import React from 'react'
import './styles.css'

export const metadata = {
  title: 'Data Andalan Utama',
}

export default async function RootLayout(props: { children: React.ReactNode }) {
  const { children } = props

  return (
    <html lang="en">
      <head>
        <link rel="icon" href="/favicon.svg" type="image/svg+xml" />
      </head>
      <body>
        <main>{children}</main>
      </body>
    </html>
  )
}
