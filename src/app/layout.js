import localFont from 'next/font/local'
import 'bootstrap/dist/css/bootstrap.min.css'
import "./globals.css"

const productSans = localFont({
  src: '../../public/assets/fonts/ProductSans.ttf',
  variable: '--font-product-sans',
  display: 'swap',
})

export const metadata = {
  title: "Harmony Garden AI",
  description: "Harmony Garden AI Search Engine",
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={productSans.className}>
        {children}
      </body>
    </html>
  )
}