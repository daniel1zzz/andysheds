"use client"

import { useState } from "react"
import Navbar from "@/components/navbar"
import Footer from "@/components/footer"
import FilterButtons from "@/components/filter-buttons"
import ShedCard from "@/components/shed-card"
import { shedModels } from "@/lib/shed-data"

export default function Home() {
  const [activeFilter, setActiveFilter] = useState("All")

  const categories = ["All", ...Array.from(new Set(shedModels.map((shed) => shed.model)))]

  const filteredSheds = activeFilter === "All" ? shedModels : shedModels.filter((shed) => shed.model === activeFilter)

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      {/* Hero Section */}
      <section className="py-12">
        <div className="container mx-auto px-6 text-center">
          <h1 className="text-5xl md:text-6xl font-bold tracking-tight text-balance mb-2 text-foreground">Our Work</h1>
          <p className="text-xl text-muted-foreground text-pretty leading-relaxed max-w-3xl mx-auto">
            Explore our collection of custom-built structures
          </p>
        </div>
      </section>

      <FilterButtons categories={categories} activeFilter={activeFilter} onFilterChange={setActiveFilter} />

      {/* Gallery Section */}
      <section className="pb-24">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredSheds.map((shed) => (
              <ShedCard key={shed.id} shed={shed} />
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  )
}
