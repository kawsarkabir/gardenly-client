import { Link } from 'react-router'; // if you're using react-router-dom

export default function NotFound() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-green-50 px-4 text-center">
      <h1 className="text-7xl font-extrabold text-[#52b788] mb-4">404</h1>
      <h2 className="text-3xl font-bold mb-2">Page Not Found</h2>
      <p className="text-gray-600 max-w-md mb-6">
        Sorry, the page you’re looking for doesn’t exist or has been moved.
      </p>
      <Link
        to="/"
        className="inline-block bg-green-500 text-white px-6 py-3 rounded-md font-semibold hover:bg-green-600 transition"
      >
        ⬅ Back to Home
      </Link>
    </div>
  );
}
