import './globals.css'

export const metadata = {
  title: 'Slack Daily Bot',
  description: 'Configure your Slack bot for daily messages',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}

