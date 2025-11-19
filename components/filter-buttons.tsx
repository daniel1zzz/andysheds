interface FilterButtonsProps {
  categories: string[]
  activeFilter: string
  onFilterChange: (category: string) => void
}

export default function FilterButtons({ categories, activeFilter, onFilterChange }: FilterButtonsProps) {
  return (
    <section className="pb-8">
      <div className="container mx-auto px-6">
        <div className="flex flex-wrap justify-center gap-3">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => onFilterChange(category)}
              className={`px-6 py-2.5 rounded-full font-medium transition-all duration-300 ${
                activeFilter === category
                  ? "bg-primary text-primary-foreground shadow-lg scale-105"
                  : "bg-card text-muted-foreground hover:bg-card/80 hover:text-foreground border border-border"
              }`}
            >
              {category}
            </button>
          ))}
        </div>
      </div>
    </section>
  )
}
