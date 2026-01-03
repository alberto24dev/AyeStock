import Link from "next/link";

export default function Home() {
  return (
    <main className="flex flex-col items-center justify-center min-h-screen p-8 bg-gray-100">
      <div className="bg-white p-8 rounded-2xl shadow-lg w-full max-w-md">
        <h1 className="text-5xl font-bold mb-8 text-center text-gray-800">Welcome to AyeStock</h1>
        <nav className="flex flex-col gap-4">
          <Link href="/" className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 text-center transition-colors duration-300">Home</Link>
          <Link href="/create" className="px-6 py-3 bg-purple-600 text-white rounded-lg hover:bg-purple-700 text-center transition-colors duration-300">Create</Link>
          <Link href="/items" className="px-6 py-3 bg-yellow-600 text-white rounded-lg hover:bg-yellow-700 text-center transition-colors duration-300">Items</Link>
        </nav>
        <p className="mt-8 text-gray-500 text-center">Select a page to get started.</p>
      </div>
    </main>
  );
}
