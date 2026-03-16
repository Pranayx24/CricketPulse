import React from 'react';

type AdProps = {
  type: 'banner' | 'square' | 'sticky-bottom';
  className?: string;
};

export default function AdSlot({ type, className = '' }: AdProps) {
  // In a real application, you would render an AdSense or GAM snippet here.
  // For the purpose of this monetizable app boilerplate, we'll use placeholder blocks
  // that vividly denote where the ads go. You can drop <ins class="adsbygoogle" ... /> here later.

  const getAdStyles = () => {
    switch (type) {
      case 'sticky-bottom':
        return 'fixed bottom-0 left-0 right-0 z-40 bg-gray-900 border-t border-gray-700 p-2 flex justify-center shadow-[0_-4px_6px_-1px_rgba(0,0,0,0.5)]';
      case 'banner':
        return 'w-full h-[90px] md:h-[120px] bg-slate-800 rounded-lg flex items-center justify-center my-6 border border-dashed border-gray-600 relative overflow-hidden group';
      case 'square':
        return 'w-full aspect-square max-w-[300px] mx-auto bg-slate-800 rounded-lg flex items-center justify-center my-4 border border-dashed border-gray-600 relative overflow-hidden group';
      default:
        return 'bg-slate-800 p-4';
    }
  };

  const getPlaceholderDimensions = () => {
    switch (type) {
      case 'sticky-bottom': return '320x50 / 728x90';
      case 'banner': return 'Responsive Banner';
      case 'square': return '300x250';
      default: return 'Ad';
    }
  };

  if (type === 'sticky-bottom') {
    return (
      <div className={getAdStyles() + ' ' + className}>
        <div className="w-[320px] h-[50px] md:w-[728px] md:h-[90px] bg-slate-800 border border-gray-600 border-dashed flex items-center justify-center text-gray-500 text-xs tracking-wider">
          ADVERTISEMENT [{getPlaceholderDimensions()}]
        </div>
      </div>
    );
  }

  return (
    <div className={getAdStyles() + ' ' + className}>
      <span className="text-gray-500 text-xs font-medium tracking-wider uppercase opacity-80 group-hover:opacity-100 transition-opacity">
        Advertisement - {getPlaceholderDimensions()}
      </span>
      <div className="absolute top-1 right-2 text-[10px] text-gray-600 uppercase">Ad</div>
    </div>
  );
}
