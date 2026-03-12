import React from "react";

export default function NewsPage() {
  return (
    <div className="max-w-2xl mx-auto py-16 px-4">
      <h1 className="text-4xl font-bold mb-4">Subscribe to My Newsletter</h1>
      <p className="mb-6 text-lg text-gray-600 dark:text-gray-300">
        Get updates on my latest projects, blog posts, and exclusive content delivered straight to your inbox.
      </p>
      <form className="flex flex-col gap-4">
        <input
          type="email"
          placeholder="Your email address"
          required
          className="border rounded px-4 py-2 text-lg"
        />
        <button
          type="submit"
          className="bg-blue-600 text-white rounded px-4 py-2 font-semibold hover:bg-blue-700 transition"
        >
          Subscribe
        </button>
      </form>
    </div>
  );
}
