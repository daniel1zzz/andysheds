import { Card, CardContent } from "@/components/ui/card"
import Image from "next/image"
import Link from "next/link"

interface ShedCardProps {
  shed: {
    id: number
    title: string
    subtitle: string
    image: string
    size: string
    model: string
  }
}

export default function ShedCard({ shed }: ShedCardProps) {
  return (
    <Link href={`/gallery/${shed.id}`}>
      <Card className="group overflow-hidden hover:shadow-2xl transition-all duration-500 border-border/50 hover:border-primary/20 p-0 cursor-pointer">
        <div className="relative aspect-4/3 overflow-hidden bg-muted rounded-t-lg">
          <Image
            src={shed.image || "/placeholder.svg"}
            alt={shed.title}
            fill
            className="object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
          />
          <div className="absolute inset-0 bg-linear-to-t from-black/70 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
          <div className="absolute top-5 left-5 bg-primary/95 backdrop-blur-sm px-4 py-1.5 rounded-full text-xs font-bold text-white shadow-xl border border-primary/50 uppercase tracking-wide">
            {shed.model}
          </div>
        </div>
        <CardContent className="p-5 pt-0 pb-7">
          <h3 className="text-2xl font-bold mb-2 text-foreground group-hover:text-primary transition-colors duration-300 text-balance">
            {shed.title}
          </h3>
          <p className="text-muted-foreground leading-relaxed text-pretty text-sm line-clamp-2">{shed.subtitle}</p>
        </CardContent>
      </Card>
    </Link>
  )
}
