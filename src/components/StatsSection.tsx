const stats = [
  { value: "50+", label: "AI/ML Engineers" },
  { value: "95%", label: "Client Satisfaction Rate" },
  { value: "2-3", label: "Weeks to MVP Launch" },
  { value: "100+", label: "AI Projects Delivered" },
];

export default function StatsSection() {
  return (
    <section className="bg-white py-12 sm:py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8 lg:gap-12">
          {stats.map((stat) => (
            <div key={stat.label} className="text-center">
              <div className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-medium text-gray-900 mb-2">
                {stat.value}
              </div>
              <div className="text-sm sm:text-base text-gray-600 font-normal">
                {stat.label}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
