import React from 'react';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Loader2, CheckCircle, AlertCircle } from 'lucide-react';

interface AnalysisResult {
  id: string;
  label: string;
  confidence: number;
  description?: string;
}

interface AnalysisResultsProps {
  isAnalyzing: boolean;
  results: AnalysisResult[] | null;
  error: string | null;
}

export const AnalysisResults: React.FC<AnalysisResultsProps> = ({
  isAnalyzing,
  results,
  error,
}) => {
  if (!isAnalyzing && !results && !error) {
    return null;
  }

  return (
    <Card className="p-6 bg-glass backdrop-blur-sm border-glass">
      <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
        {isAnalyzing ? (
          <>
            <Loader2 className="h-5 w-5 animate-spin text-primary" />
            Analyzing Photo...
          </>
        ) : error ? (
          <>
            <AlertCircle className="h-5 w-5 text-destructive" />
            Analysis Failed
          </>
        ) : (
          <>
            <CheckCircle className="h-5 w-5 text-green-500" />
            Analysis Complete
          </>
        )}
      </h3>

      {isAnalyzing && (
        <div className="space-y-3">
          <div className="h-2 bg-secondary rounded-full overflow-hidden">
            <div className="h-full bg-gradient-primary animate-pulse w-3/4 transition-all duration-1000" />
          </div>
          <p className="text-sm text-muted-foreground">
            Processing your image with AI...
          </p>
        </div>
      )}

      {error && (
        <div className="text-destructive">
          <p>{error}</p>
        </div>
      )}

      {results && results.length > 0 && (
        <div className="space-y-4">
          {results.map((result) => (
            <div
              key={result.id}
              className="p-4 rounded-lg bg-secondary/50 border border-glass"
            >
              <div className="flex items-center justify-between mb-2">
                <h4 className="font-medium">{result.label}</h4>
                <Badge variant="secondary" className="bg-gradient-accent">
                  {Math.round(result.confidence * 100)}%
                </Badge>
              </div>
              {result.description && (
                <p className="text-sm text-muted-foreground">
                  {result.description}
                </p>
              )}
            </div>
          ))}
        </div>
      )}

      {results && results.length === 0 && (
        <p className="text-muted-foreground">
          No significant features detected in this image.
        </p>
      )}
    </Card>
  );
};