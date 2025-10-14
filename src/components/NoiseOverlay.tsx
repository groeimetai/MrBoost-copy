import { useMemo } from 'react';

export const NoiseOverlay = () => {
  // Generate noise texture only once using useMemo
  const noiseDataUrl = useMemo(() => {
    const noiseCanvas = document.createElement('canvas');
    const ctx = noiseCanvas.getContext('2d');
    noiseCanvas.width = 200;
    noiseCanvas.height = 200;

    if (ctx) {
      const imageData = ctx.createImageData(noiseCanvas.width, noiseCanvas.height);
      for (let i = 0; i < imageData.data.length; i += 4) {
        const value = Math.random() * 255;
        imageData.data[i] = value;
        imageData.data[i + 1] = value;
        imageData.data[i + 2] = value;
        imageData.data[i + 3] = 255;
      }
      ctx.putImageData(imageData, 0, 0);
    }

    return noiseCanvas.toDataURL();
  }, []); // Empty dependency array = only generate once

  return (
    <div
      className="fixed inset-0 pointer-events-none"
      style={{
        zIndex: 9999999,
        opacity: 0.15,
        backgroundImage: `url(${noiseDataUrl})`,
        backgroundRepeat: 'repeat',
        backgroundSize: '100px 100px',
        mixBlendMode: 'soft-light',
        willChange: 'transform',
      }}
    />
  );
};
