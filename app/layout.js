import './globals.css'

export const metadata = {
  title: 'Yupp!',
  description: 'Discover and Review the Best Local Businesses',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="antialiased">{children}</body>
    </html>
  )
}
