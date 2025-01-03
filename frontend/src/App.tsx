import { memo, useCallback, useState } from 'react';
import { Header } from './components/Header';
import { PromptInput } from './components/PromptInput';
import { Workspace } from './components/Workspace';
import { Sparkles } from 'lucide-react';

const MemoizedWorkspace = memo(Workspace);

export default function App() {
  const [isBuilding, setIsBuilding] = useState(false);
  const [prompt, setPrompt] = useState('');

  const handleBuild = useCallback((inputPrompt: string) => {
    if (inputPrompt && !isBuilding) {
      setPrompt(inputPrompt);
      setIsBuilding(true);
    }
  }, [isBuilding]);

  const LandingPage = (
    <>
          <Header />
          <main className="pt-32 pb-16 px-4">
            <div className="max-w-3xl mx-auto space-y-36">
              {/* Hero Section */}
              <div className="text-center space-y-12">
                <div className="inline-flex items-center px-4 py-2 rounded-full bg-blue-900/50 text-blue-400">
                  <Sparkles className="h-4 w-4 mr-2" />
                  Build websites with AI
                </div>
                <h1 className="text-4xl sm:text-5xl font-bold text-white">
                  Describe your website.
                  <br />
                  We'll build it instantly.
                </h1>
                <p className="text-lg text-gray-400">
                  Just describe what you want to build, and we'll generate a complete website 
                  for you in seconds. No coding required.
                </p>
              </div>

              {/* Prompt Input */}
              <PromptInput onBuild={handleBuild} />
              
            </div>
          </main>
        </>
  )

  return (
    <div className="min-h-screen bg-gray-900">
      {!isBuilding ? LandingPage : <MemoizedWorkspace key={prompt} prompt={prompt} />}
    </div>
  );
}