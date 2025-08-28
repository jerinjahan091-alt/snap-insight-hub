import React, { useState } from 'react';
import { PhotoUpload } from '@/components/PhotoUpload';
import { AnalysisResults } from '@/components/AnalysisResults';
import { AuthSection } from '@/components/AuthSection';
import { Button } from '@/components/ui/button';
import { Sparkles, Zap, Shield, Users } from 'lucide-react';
import heroImage from '@/assets/hero-bg.jpg';

interface AnalysisResult {
  id: string;
  label: string;
  confidence: number;
  description?: string;
}

const Index = () => {
  const [selectedPhoto, setSelectedPhoto] = useState<File | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [results, setResults] = useState<AnalysisResult[] | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [showAuth, setShowAuth] = useState(false);

  const handlePhotoSelect = (file: File) => {
    setSelectedPhoto(file);
    setResults(null);
    setError(null);
  };

  const handleRemovePhoto = () => {
    setSelectedPhoto(null);
    setResults(null);
    setError(null);
  };

  const handleAnalyze = async () => {
    if (!selectedPhoto) return;

    setIsAnalyzing(true);
    setError(null);

    try {
      // Simulate API call - replace with actual API integration
      await new Promise(resolve => setTimeout(resolve, 3000));
      
      // Mock results - replace with actual API response
      const mockResults: AnalysisResult[] = [
        {
          id: '1',
          label: 'Object Detection',
          confidence: 0.92,
          description: 'Detected multiple objects with high confidence'
        },
        {
          id: '2',
          label: 'Scene Classification',
          confidence: 0.87,
          description: 'Classified as outdoor/nature scene'
        },
        {
          id: '3',
          label: 'Color Analysis',
          confidence: 0.95,
          description: 'Dominant colors: blue, green, yellow'
        }
      ];
      
      setResults(mockResults);
    } catch (err) {
      setError('Failed to analyze image. Please try again.');
    } finally {
      setIsAnalyzing(false);
    }
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section 
        className="relative min-h-screen flex items-center justify-center overflow-hidden"
        style={{
          backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.7), rgba(0, 0, 0, 0.5)), url(${heroImage})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      >
        <div className="absolute inset-0 bg-gradient-primary opacity-20" />
        
        <div className="relative z-10 text-center px-4 max-w-4xl mx-auto">
          <div className="w-20 h-20 bg-gradient-primary rounded-full flex items-center justify-center mx-auto mb-8 animate-pulse-glow">
            <Sparkles className="h-10 w-10 text-primary-foreground" />
          </div>
          
          <h1 className="text-5xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-white to-primary-glow bg-clip-text text-transparent">
            AI Photo Analysis
          </h1>
          
          <p className="text-xl md:text-2xl text-foreground/80 mb-8 max-w-2xl mx-auto">
            Upload any photo and get instant AI-powered insights with advanced analysis and detailed results
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Button 
              size="lg" 
              className="bg-gradient-primary hover:opacity-90 text-lg px-8 py-4 shadow-glow"
              onClick={() => document.getElementById('upload-section')?.scrollIntoView({ behavior: 'smooth' })}
            >
              <Zap className="h-5 w-5 mr-2" />
              Start Analyzing
            </Button>
            
            <Button 
              size="lg" 
              variant="outline" 
              className="text-lg px-8 py-4 border-glass bg-glass backdrop-blur-sm"
              onClick={() => setShowAuth(!showAuth)}
            >
              <Users className="h-5 w-5 mr-2" />
              Sign In
            </Button>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Powerful AI Analysis
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Get detailed insights from your photos using cutting-edge AI technology
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center p-6 rounded-lg bg-glass backdrop-blur-sm border-glass">
              <div className="w-16 h-16 bg-gradient-primary rounded-full flex items-center justify-center mx-auto mb-4">
                <Sparkles className="h-8 w-8 text-primary-foreground" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Object Detection</h3>
              <p className="text-muted-foreground">
                Identify and classify objects in your images with high accuracy
              </p>
            </div>
            
            <div className="text-center p-6 rounded-lg bg-glass backdrop-blur-sm border-glass">
              <div className="w-16 h-16 bg-gradient-primary rounded-full flex items-center justify-center mx-auto mb-4">
                <Zap className="h-8 w-8 text-primary-foreground" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Instant Results</h3>
              <p className="text-muted-foreground">
                Get comprehensive analysis results in seconds, not minutes
              </p>
            </div>
            
            <div className="text-center p-6 rounded-lg bg-glass backdrop-blur-sm border-glass">
              <div className="w-16 h-16 bg-gradient-primary rounded-full flex items-center justify-center mx-auto mb-4">
                <Shield className="h-8 w-8 text-primary-foreground" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Secure & Private</h3>
              <p className="text-muted-foreground">
                Your photos are processed securely and never stored permanently
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Auth Section */}
      {showAuth && (
        <section className="py-20 px-4 bg-secondary/20">
          <div className="max-w-md mx-auto">
            <AuthSection />
          </div>
        </section>
      )}

      {/* Upload and Analysis Section */}
      <section id="upload-section" className="py-20 px-4 bg-secondary/10">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Upload & Analyze
            </h2>
            <p className="text-xl text-muted-foreground">
              Drop your photo below to get started with AI analysis
            </p>
          </div>
          
          <div className="grid lg:grid-cols-2 gap-8">
            <div className="space-y-6">
              <PhotoUpload
                onPhotoSelect={handlePhotoSelect}
                selectedPhoto={selectedPhoto}
                onRemovePhoto={handleRemovePhoto}
              />
              
              {selectedPhoto && (
                <Button
                  onClick={handleAnalyze}
                  disabled={isAnalyzing}
                  className="w-full bg-gradient-primary hover:opacity-90"
                  size="lg"
                >
                  {isAnalyzing ? (
                    <>
                      <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2" />
                      Analyzing...
                    </>
                  ) : (
                    <>
                      <Sparkles className="h-5 w-5 mr-2" />
                      Analyze Photo
                    </>
                  )}
                </Button>
              )}
            </div>
            
            <div>
              <AnalysisResults
                isAnalyzing={isAnalyzing}
                results={results}
                error={error}
              />
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 px-4 border-t border-glass">
        <div className="max-w-6xl mx-auto text-center">
          <p className="text-muted-foreground">
            Built with React, TypeScript, and Tailwind CSS. Ready for Supabase integration.
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Index;
