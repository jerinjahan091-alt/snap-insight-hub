import React, { useState, useCallback } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Upload, Image as ImageIcon, X } from 'lucide-react';
import { cn } from '@/lib/utils';

interface PhotoUploadProps {
  onPhotoSelect: (file: File) => void;
  selectedPhoto: File | null;
  onRemovePhoto: () => void;
}

export const PhotoUpload: React.FC<PhotoUploadProps> = ({
  onPhotoSelect,
  selectedPhoto,
  onRemovePhoto,
}) => {
  const [isDragActive, setIsDragActive] = useState(false);

  const handleDrag = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === 'dragenter' || e.type === 'dragover') {
      setIsDragActive(true);
    } else if (e.type === 'dragleave') {
      setIsDragActive(false);
    }
  }, []);

  const handleDrop = useCallback(
    (e: React.DragEvent) => {
      e.preventDefault();
      e.stopPropagation();
      setIsDragActive(false);

      if (e.dataTransfer.files && e.dataTransfer.files[0]) {
        const file = e.dataTransfer.files[0];
        if (file.type.startsWith('image/')) {
          onPhotoSelect(file);
        }
      }
    },
    [onPhotoSelect]
  );

  const handleFileInput = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      if (e.target.files && e.target.files[0]) {
        onPhotoSelect(e.target.files[0]);
      }
    },
    [onPhotoSelect]
  );

  const photoPreviewUrl = selectedPhoto ? URL.createObjectURL(selectedPhoto) : null;

  return (
    <Card className="p-8 bg-glass backdrop-blur-sm border-glass">
      {selectedPhoto ? (
        <div className="space-y-4">
          <div className="relative">
            <img
              src={photoPreviewUrl!}
              alt="Selected photo"
              className="w-full h-64 object-cover rounded-lg"
            />
            <Button
              onClick={onRemovePhoto}
              size="sm"
              variant="destructive"
              className="absolute top-2 right-2"
            >
              <X className="h-4 w-4" />
            </Button>
          </div>
          <p className="text-sm text-muted-foreground text-center">
            {selectedPhoto.name}
          </p>
        </div>
      ) : (
        <div
          className={cn(
            'border-2 border-dashed rounded-lg p-12 text-center transition-all duration-200',
            isDragActive
              ? 'border-primary bg-primary/5 scale-105'
              : 'border-muted-foreground/25 hover:border-primary/50'
          )}
          onDragEnter={handleDrag}
          onDragLeave={handleDrag}
          onDragOver={handleDrag}
          onDrop={handleDrop}
        >
          <div className="mx-auto w-16 h-16 bg-gradient-primary rounded-full flex items-center justify-center mb-4 animate-float">
            <ImageIcon className="h-8 w-8 text-primary-foreground" />
          </div>
          <h3 className="text-lg font-semibold mb-2">Upload Your Photo</h3>
          <p className="text-muted-foreground mb-6">
            Drag and drop your image here, or click to select
          </p>
          <label htmlFor="photo-upload">
            <Button asChild variant="default" className="bg-gradient-primary hover:opacity-90">
              <span className="cursor-pointer">
                <Upload className="h-4 w-4 mr-2" />
                Choose Photo
              </span>
            </Button>
          </label>
          <input
            id="photo-upload"
            type="file"
            accept="image/*"
            onChange={handleFileInput}
            className="hidden"
          />
        </div>
      )}
    </Card>
  );
};