export default function HowToStartGardening() {
  const steps = [
    {
      title: 'Step 1: Choose Your Plants',
      description:
        'Start with easy-to-grow plants like herbs, succulents, or vegetables that are beginner-friendly.',
      imageUrl: 'https://images.unsplash.com/photo-plant1',
    },
    {
      title: 'Step 2: Prepare Your Soil',
      description:
        'Test your soil and add organic matter or compost to create a healthy growing environment.',
      imageUrl: 'https://images.unsplash.com/photo-soil1',
    },
    {
      title: 'Step 3: Plant and Care',
      description:
        'Plant your seeds or seedlings following instructions. Water appropriately and provide enough sunlight.',
      imageUrl: 'https://images.unsplash.com/photo-watering',
    },
  ];

  return (
    <section className="py-16 bg-green-50">
      <div className="container mx-auto px-4 max-w-5xl">
        <h2 className="text-4xl font-bold text-center mb-12">
          How to Start Gardening in 3 Easy Steps
        </h2>

        <div className="space-y-16">
          {steps.map((step, idx) => {
            const isEven = idx % 2 === 0;
            return (
              <div
                key={idx}
                className={`flex flex-col md:flex-row items-center ${
                  isEven ? 'md:flex-row' : 'md:flex-row-reverse'
                } gap-8`}
              >
                {/* Image */}
                <div className="md:w-1/2">
                  <img
                    src={step.imageUrl}
                    alt={step.title}
                    className="rounded-lg shadow-lg w-full object-cover max-h-72"
                    loading="lazy"
                  />
                </div>

                {/* Text */}
                <div className="md:w-1/2">
                  <h3 className="text-3xl font-semibold mb-4">{step.title}</h3>
                  <p className="text-gray-700 text-lg">{step.description}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
