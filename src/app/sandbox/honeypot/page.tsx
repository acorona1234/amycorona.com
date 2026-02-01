import Link from 'next/link';

const apps = [
  {
    id: 'home-remedies',
    name: '🌿 Home Remedies',
    description: 'AI-powered natural healing guide for families. Upload a photo of symptoms and get herbal remedy suggestions.',
    status: 'beta',
    tags: ['AI Vision', 'Health', 'Family'],
  },
  {
    id: 'email-classifier',
    name: '📧 Email Classifier',
    description: 'Smart email triage with machine learning. Automatically categorize and prioritize your inbox.',
    status: 'beta',
    tags: ['ML', 'Productivity'],
    path: '/sandbox/honeypot/apps/email-classifier',
  },
];

export default function HoneypotLabs() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 to-orange-100">
      {/* Header */}
      <header className="bg-gradient-to-r from-amber-600 to-orange-500 text-white py-12 shadow-lg">
        <div className="max-w-4xl mx-auto px-4">
          <h1 className="text-4xl font-bold">🍯 Honeypot Labs</h1>
          <p className="text-amber-100 mt-2 text-lg">Experimental apps & projects in development</p>
        </div>
      </header>

      <main className="max-w-4xl mx-auto p-6">
        {/* Intro */}
        <div className="bg-white/80 backdrop-blur rounded-xl p-6 mb-8 shadow-md">
          <p className="text-gray-700">
            Welcome to my experimental lab! These are projects I&apos;m actively building and testing. 
            Some are polished, some are rough — all are functional. Built with AI, data science, and a lot of curiosity.
          </p>
        </div>

        {/* Apps Grid */}
        <div className="grid gap-6 md:grid-cols-2">
          {apps.map((app) => (
            <Link
              key={app.id}
              href={app.path || `/sandbox/honeypot/${app.id}`}
              className="group bg-white rounded-xl shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden border border-gray-100 hover:border-amber-300"
            >
              <div className="p-6">
                <div className="flex items-start justify-between mb-3">
                  <h2 className="text-xl font-bold text-gray-800 group-hover:text-amber-600 transition-colors">
                    {app.name}
                  </h2>
                  <span className={`text-xs px-2 py-1 rounded-full font-medium ${
                    app.status === 'beta' ? 'bg-amber-100 text-amber-700' :
                    app.status === 'alpha' ? 'bg-purple-100 text-purple-700' :
                    'bg-green-100 text-green-700'
                  }`}>
                    {app.status}
                  </span>
                </div>
                <p className="text-gray-600 text-sm mb-4">{app.description}</p>
                <div className="flex flex-wrap gap-2">
                  {app.tags.map((tag) => (
                    <span key={tag} className="text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded">
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
              <div className="bg-gradient-to-r from-amber-500 to-orange-400 h-1 transform scale-x-0 group-hover:scale-x-100 transition-transform origin-left"></div>
            </Link>
          ))}
        </div>

        {/* Coming Soon */}
        <div className="mt-12 text-center">
          <h3 className="text-lg font-semibold text-gray-700 mb-4">🚧 More coming soon...</h3>
          <p className="text-gray-500 text-sm">
            Have an idea? I&apos;m always looking for interesting problems to solve.
          </p>
        </div>
      </main>

      {/* Footer */}
      <footer className="text-center py-8 text-gray-500 text-sm mt-8">
        <p>Built with 🍂 by Amy Corona</p>
        <Link href="/sandbox" className="text-amber-600 hover:underline mt-2 inline-block">
          ← Back to Sandbox
        </Link>
      </footer>
    </div>
  );
}
