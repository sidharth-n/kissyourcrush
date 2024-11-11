import React from "react"
import { Play, ArrowRight } from "lucide-react"

const examples = [
  {
    id: 1,
    before:
      "https://images.unsplash.com/photo-1522098635833-216c03d81fbe?w=800",
    after: "https://images.unsplash.com/photo-1516589178581-6cd7833ae3b2?w=800",
  },
  {
    id: 2,
    before:
      "https://images.unsplash.com/photo-1621184455862-c163dfb30e0f?w=800",
    after: "https://images.unsplash.com/photo-1622495966027-e0173192c728?w=800",
  },
  {
    id: 3,
    before:
      "https://images.unsplash.com/photo-1519671482749-fd09be7ccebf?w=800",
    after: "https://images.unsplash.com/photo-1518991669955-9c7e78ec80ca?w=800",
  },
]

const ExamplesGallery = () => {
  const [activeIndex, setActiveIndex] = React.useState(0)
  const scrollRef = React.useRef<HTMLDivElement>(null)

  React.useEffect(() => {
    const scrollContainer = scrollRef.current
    if (!scrollContainer) return

    const handleScroll = () => {
      const scrollLeft = scrollContainer.scrollLeft
      const itemWidth = scrollContainer.offsetWidth
      const newIndex = Math.round(scrollLeft / itemWidth)
      setActiveIndex(newIndex)
    }

    scrollContainer.addEventListener("scroll", handleScroll)
    return () => scrollContainer.removeEventListener("scroll", handleScroll)
  }, [])

  return (
    <section className="bg-white py-10 px-4">
      <div className="max-w-6xl mx-auto">
        <h2 className="font-playfair text-3xl md:text-4xl text-center mb-12">
          See The Magic In Action
        </h2>

        <div ref={scrollRef} className="flex overflow-x-auto gap-6 pb-6 snap-x">
          {examples.map(example => (
            <div
              key={example.id}
              className="flex-none w-72 snap-center card-hover rounded-2xl"
            >
              <div className="relative rounded-lg overflow-hidden shadow-lg">
                <img
                  src={example.before}
                  alt="Before"
                  className="w-full h-48 object-cover"
                />
                <div className="absolute inset-0 bg-black bg-opacity-30 flex items-center justify-center">
                  <Play className="w-12 h-12 text-white" />
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center mt-8">
          <div className="flex items-center justify-center gap-2">
            {examples.map((_, index) => (
              <div
                key={index}
                className={`w-2.5 h-2.5 rounded-full transition-colors duration-300 ${
                  index === activeIndex ? "bg-deep-pink" : "bg-gray-300"
                }`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

export default ExamplesGallery
