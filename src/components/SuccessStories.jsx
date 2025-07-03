export default function SuccessStories() {
  const stories = [
    {
      name: 'Anika Rahman',
      location: 'Dhaka, Bangladesh',
      feedback:
        'Using Gardenly tips, I grew vegetables on my rooftop for the first time!',
      image: 'https://i.ibb.co/pPssNMP/user1.jpg',
    },
    {
      name: 'Mahmudul Hasan',
      location: 'Rajshahi',
      feedback:
        'Vertical herb wall saved space in my small apartment. Amazing resource!',
      image: 'https://i.ibb.co/vPBcD3B/user2.jpg',
    },
    {
      name: 'Rina Akter',
      location: 'Chittagong',
      feedback:
        'I followed composting guides and now make my own organic fertilizer.',
      image: 'https://i.ibb.co/fXtwzPM/user3.jpg',
    },
  ];

  return (
    <section className="bg-green-50 py-10 px-4">
      <h2 className="text-3xl font-bold text-center text-green-900 mb-8">
        🌿 Gardenly Success Stories
      </h2>
      <div className="max-w-6xl mx-auto grid md:grid-cols-3 gap-6">
        {stories.map((story, idx) => (
          <div
            key={idx}
            className="bg-white rounded-xl p-6 shadow-md hover:shadow-lg transition"
          >
            <img
              src={story.image}
              alt={story.name}
              className="w-20 h-20 object-cover rounded-full mx-auto mb-4"
            />
            <p className="italic text-center text-gray-700 mb-3">
              "{story.feedback}"
            </p>
            <h4 className="text-center font-semibold text-green-700">
              {story.name}
            </h4>
            <p className="text-center text-sm text-gray-500">
              {story.location}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}
