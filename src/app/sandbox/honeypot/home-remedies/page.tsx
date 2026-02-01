'use client';

import { useState } from 'react';

export default function HomeRemedies() {
  const [image, setImage] = useState<string | null>(null);
  const [description, setDescription] = useState('');
  const [loading, setLoading] = useState(false);
  const [results, setResults] = useState<any>(null);
  const [error, setError] = useState<string | null>(null);

  const API_URL = process.env.NEXT_PUBLIC_REMEDIES_API || 'https://remedies.amycorona.com';

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setImage(e.target?.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const analyzeImage = async () => {
    if (!image) {
      setError('Please select an image first');
      return;
    }

    setLoading(true);
    setError(null);
    setResults(null);

    try {
      const base64Data = image.split(',')[1];
      const response = await fetch(`${API_URL}/api/analyze`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ image: base64Data, description }),
      });

      if (!response.ok) throw new Error('Analysis failed');
      
      const data = await response.json();
      setResults(data);
    } catch (err) {
      setError('Could not connect to the analysis server. Make sure the backend is running.');
    } finally {
      setLoading(false);
    }
  };

  const getRemedyEmoji = (type: string) => {
    const emojis: Record<string, string> = {
      tea: '🍵',
      essential_oil: '💧',
      herbal: '🌿',
      home: '🏠',
    };
    return emojis[type] || '✨';
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-emerald-100">
      {/* Header */}
      <header className="bg-gradient-to-r from-emerald-800 to-green-700 text-white py-8 shadow-lg">
        <div className="max-w-4xl mx-auto px-4">
          <h1 className="text-4xl font-bold">🌿 Home Remedies</h1>
          <p className="text-green-100 mt-2 text-lg">Natural healing guide for families</p>
        </div>
      </header>

      <main className="max-w-4xl mx-auto p-4 mt-6">
        {/* Disclaimer */}
        <div className="bg-amber-50 border-l-4 border-amber-400 p-4 mb-6 rounded-r-lg">
          <p className="text-amber-800 text-sm">
            <strong>⚠️ Disclaimer:</strong> This tool is for informational purposes only and does not provide medical advice, diagnosis, or treatment. 
            Always consult a healthcare provider for medical concerns.
          </p>
        </div>

        {/* Upload Section */}
        <div className="bg-white/95 backdrop-blur rounded-2xl shadow-xl p-6 mb-6">
          <h2 className="text-xl font-semibold text-gray-800 mb-4">📸 What&apos;s bothering your little one?</h2>
          
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Upload a photo</label>
              <input
                type="file"
                accept="image/*"
                onChange={handleImageChange}
                className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 
                  file:rounded-full file:border-0 file:text-sm file:font-semibold 
                  file:bg-green-50 file:text-green-700 hover:file:bg-green-100 cursor-pointer"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Describe the symptoms (optional)</label>
              <textarea
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                rows={2}
                placeholder="e.g., Started yesterday, seems itchy, no fever..."
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent text-gray-800 bg-white"
              />
            </div>

            {image && (
              <div className="flex justify-center">
                <img src={image} alt="Preview" className="max-h-64 rounded-lg" />
              </div>
            )}

            <button
              onClick={analyzeImage}
              disabled={loading || !image}
              className="w-full bg-green-600 text-white py-3 px-6 rounded-lg font-semibold 
                hover:bg-green-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? '🔄 Analyzing...' : '🔍 Analyze & Find Remedies'}
            </button>
          </div>
        </div>

        {/* Error */}
        {error && (
          <div className="bg-red-50 border-l-4 border-red-500 p-4 mb-6 rounded-r-lg">
            <p className="text-red-800">{error}</p>
          </div>
        )}

        {/* Results */}
        {results && (
          <div className="space-y-6">
            {/* Analysis Card */}
            <div className="bg-white/95 backdrop-blur rounded-2xl shadow-xl p-6">
              <h3 className="text-lg font-semibold text-gray-800 mb-3">🩺 Analysis</h3>
              <div className="space-y-2">
                <p><strong>Identified as:</strong> {results.analysis.condition_name}</p>
                <p><strong>Observations:</strong> {results.analysis.observations}</p>
                <p>
                  <strong>Confidence:</strong>{' '}
                  <span className={`px-2 py-1 rounded text-sm ${
                    results.analysis.confidence === 'high' ? 'bg-green-100 text-green-800' :
                    results.analysis.confidence === 'medium' ? 'bg-yellow-100 text-yellow-800' :
                    'bg-red-100 text-red-800'
                  }`}>
                    {results.analysis.confidence}
                  </span>
                </p>
              </div>
            </div>

            {/* Doctor Warning */}
            {results.analysis.see_doctor && (
              <div className="bg-red-50 border-l-4 border-red-500 p-4 rounded-r-lg">
                <p className="text-red-800 font-semibold">⚠️ Please consult a doctor</p>
                <p className="text-red-700 text-sm mt-1">{results.analysis.see_doctor_reason}</p>
              </div>
            )}

            {/* Remedies Card */}
            <div className="bg-white/95 backdrop-blur rounded-2xl shadow-xl p-6">
              <h3 className="text-lg font-semibold text-gray-800 mb-4">🌿 Suggested Remedies</h3>
              <div className="space-y-4">
                {results.remedies?.length > 0 ? (
                  results.remedies.map((remedy: any, idx: number) => (
                    <div key={idx} className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow">
                      <div className="flex justify-between items-start">
                        <div>
                          <h4 className="font-semibold text-gray-800">
                            {getRemedyEmoji(remedy.type)} {remedy.name}
                          </h4>
                          <p className="text-sm text-gray-600 mt-1">{remedy.preparation}</p>
                          <p className="text-xs text-gray-500 mt-2 italic">{remedy.notes}</p>
                        </div>
                        {remedy.amazon_link && (
                          <a
                            href={remedy.amazon_link}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="shrink-0 ml-4 px-3 py-1 bg-amber-100 text-amber-800 rounded-full text-sm hover:bg-amber-200 transition-colors"
                          >
                            🛒 Buy
                          </a>
                        )}
                      </div>
                    </div>
                  ))
                ) : (
                  <p className="text-gray-500">No specific remedies found. Please consult a healthcare provider.</p>
                )}
              </div>
            </div>

            {/* When to See Doctor */}
            {results.when_to_see_doctor?.length > 0 && (
              <div className="bg-white/95 backdrop-blur rounded-2xl shadow-xl p-6">
                <h3 className="text-lg font-semibold text-gray-800 mb-3">🏥 When to See a Doctor</h3>
                <ul className="list-disc list-inside text-gray-600 space-y-1">
                  {results.when_to_see_doctor.map((item: string, idx: number) => (
                    <li key={idx}>{item}</li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        )}

        {/* Loading */}
        {loading && (
          <div className="text-center py-12">
            <div className="inline-block animate-spin rounded-full h-12 w-12 border-4 border-green-500 border-t-transparent"></div>
            <p className="mt-4 text-gray-600">Analyzing image...</p>
          </div>
        )}
      </main>

      {/* Footer */}
      <footer className="text-center py-6 text-gray-500 text-sm mt-8">
        <p>Made with 🍂 by Hazel</p>
        <p className="mt-1">For educational purposes only. Not medical advice.</p>
      </footer>
    </div>
  );
}
