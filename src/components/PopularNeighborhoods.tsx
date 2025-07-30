
const PopularNeighborhoods = () => {
  const neighborhoods = [
    {
      name: "Zindabazar",
      properties: "45+ Properties",
      image: "https://images.unsplash.com/photo-1449824913935-59a10b8d2000?w=600&h=400&fit=crop",
      avgPrice: "$120,000"
    },
    {
      name: "Amberkhana",
      properties: "32+ Properties",
      image: "https://images.unsplash.com/photo-1605146769289-440113cc3d00?w=600&h=400&fit=crop",
      avgPrice: "$95,000"
    },
    {
      name: "Shahjalal Upashahar",
      properties: "28+ Properties",
      image: "https://images.unsplash.com/photo-1564013799919-ab600027ffc6?w=600&h=400&fit=crop",
      avgPrice: "$150,000"
    },
    {
      name: "Bondor Bazar",
      properties: "19+ Properties",
      image: "https://images.unsplash.com/photo-1583608205776-bfd35f0d9f83?w=600&h=400&fit=crop",
      avgPrice: "$85,000"
    }
  ];

  return (
    <section className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Popular Neighborhoods in Sylhet
          </h2>
          <p className="text-xl text-gray-600">
            Explore the most sought-after areas in the city
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {neighborhoods.map((neighborhood, index) => (
            <div
              key={index}
              className="relative overflow-hidden rounded-2xl cursor-pointer group hover:scale-105 transition-all duration-300"
            >
              <img
                src={neighborhood.image}
                alt={neighborhood.name}
                className="w-full h-64 object-cover group-hover:scale-110 transition-transform duration-300"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent"></div>
              <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
                <h3 className="text-xl font-bold mb-2">{neighborhood.name}</h3>
                <p className="text-gray-200 mb-1">{neighborhood.properties}</p>
                <p className="text-orange-400 font-semibold">Avg. {neighborhood.avgPrice}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default PopularNeighborhoods;
