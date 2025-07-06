import { useEffect, useState } from 'react';
import { Fade } from 'react-awesome-reveal';
import { FaFacebookF, FaInstagram, FaTwitter } from 'react-icons/fa';

export default function FeaturedGardeners() {
  const [gardeners, setGardeners] = useState([]);

  useEffect(() => {
    fetch('http://localhost:5000/gardeners?featured=true')
      .then((res) => res.json())
      .then((data) => setGardeners(data));
  }, []);

  return (
    <section className="pb-16">
      <div className="container mx-auto px-4">
        <Fade direction="up">
          <div className="text-center my-20">
            <p className="text-green-600 uppercase tracking-wide font-semibold mb-2">
              Meet Our Experts
            </p>
            <h2 className="text-3xl md:text-4xl font-bold  text-foreground">
              Featured Gardeners
            </h2>
            <p className="text-muted-foreground mt-2 max-w-xl mx-auto">
              Discover some of the most active and inspiring gardeners in our
              community. Learn from their experience and see how they grow.
            </p>
          </div>
        </Fade>

        {gardeners.length === 0 ? (
          <p className="text-center text-gray-500">
            No featured gardeners found.
          </p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {gardeners.map((gardener) => (
              <Fade direction="up" key={gardener._id || gardener.id}>
                <div className="relative group bg-white rounded-xl shadow hover:shadow-md transition overflow-hidden text-center p-6">
                  <img
                    src={gardener.image || '/default-user.png'}
                    alt={gardener.name}
                    onError={(e) => (e.currentTarget.src = '/default-user.png')}
                    className="w-28 h-28 mx-auto mb-4 rounded-full object-cover border-4 border-green-300"
                  />

                  <h3 className="text-xl font-bold text-gray-800">
                    {gardener.name}
                  </h3>

                  <div className="flex flex-wrap justify-center gap-2 mt-2 text-xs">
                    <span className="bg-green-100 text-green-700 px-3 py-1 rounded-full">
                      Age: {gardener.age}
                    </span>
                    <span className="bg-blue-100 text-blue-700 px-3 py-1 rounded-full">
                      {gardener.gender}
                    </span>
                    <span className="bg-yellow-100 text-yellow-700 px-3 py-1 rounded-full">
                      {gardener.status}
                    </span>
                  </div>

                  <p className="text-sm mt-2 text-gray-600">
                    Experience: {gardener.experience} years
                  </p>
                  <p className="text-sm text-emerald-600 font-semibold">
                    Shared Tips: {gardener.sharedTipsCount || 0}
                  </p>

                  {gardener.otherInfo && (
                    <p className="text-sm text-gray-500 italic mt-1">
                      {gardener.otherInfo}
                    </p>
                  )}

                  {/* Social Icons on Hover */}
                  <div className="absolute bottom-[-60px] left-1/2 -translate-x-1/2 group-hover:bottom-[30px] transition-all duration-500 ease-in-out flex gap-3 bg-white px-4 py-2 rounded-full shadow-md z-10">
                    <a
                      href="#"
                      className="w-8 h-8 bg-green-100 text-green-700 rounded-full flex items-center justify-center hover:bg-green-500 hover:text-white transition"
                    >
                      <FaFacebookF size={14} />
                    </a>
                    <a
                      href="#"
                      className="w-8 h-8 bg-green-100 text-green-700 rounded-full flex items-center justify-center hover:bg-green-500 hover:text-white transition"
                    >
                      <FaTwitter size={14} />
                    </a>
                    <a
                      href="#"
                      className="w-8 h-8 bg-green-100 text-green-700 rounded-full flex items-center justify-center hover:bg-green-500 hover:text-white transition"
                    >
                      <FaInstagram size={14} />
                    </a>
                  </div>
                </div>
              </Fade>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
