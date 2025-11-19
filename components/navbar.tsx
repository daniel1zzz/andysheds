import Link from "next/link"
import { Phone } from 'lucide-react'

export default function Navbar() {
  return (
    <header className="border-b border-border/20 backdrop-blur-sm sticky top-0 z-50 shadow-sm" style={{ backgroundColor: '#0A0A0A' }}>
      <div className="container mx-auto px-6 py-4 flex items-center justify-between">
        <Link href="/" className="flex items-center">
          <img src="/andysheds/favicon.svg" alt="Andy's Sheds Logo" width={180} height={50} className="h-12 w-auto" />
        </Link>
        <a
          href="tel:+17867956476"
          className="flex items-center gap-2 text-white hover:text-primary transition-colors font-semibold"
        >
          <Phone className="w-5 h-5" />
          <span className="hidden sm:inline">786 795-6476</span>
        </a>
      </div>
    </header>
  )
}
