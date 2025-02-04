import Link from 'next/link'

export default function Home() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-4">
      <div className="max-w-xl text-center">
        <h1 className="mb-6 text-4xl font-bold">
          LLM Tool Template
        </h1>

        <p className="mb-12 text-lg text-gray-600">
          This template provides a boilerplate for building AI chat applications, with baseline implementations using Vercel AI SDK and Flowise integrations.
        </p>

        <div className="space-y-4">
          <Link
            href="/vercel-ai"
            className="block p-4 bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow"
          >
            <h2 className="text-xl font-semibold mb-2">Vercel AI Example</h2>
            <p className="text-gray-600">
              Implementation using Vercel AI SDK with support for streaming, function calling, and RAG.
            </p>
          </Link>

          <Link
            href="/flowise"
            className="block p-4 bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow"
          >
            <h2 className="text-xl font-semibold mb-2">Flowise Example</h2>
            <p className="text-gray-600">
              Implementation using Flowise for visual development of AI workflows.
            </p>
          </Link>
        </div>
      </div>
    </div>
  )
}
