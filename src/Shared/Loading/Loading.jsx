import React from 'react';
import { Loader2 } from 'lucide-react';

const Loading = () => {
  return (
    <div className="flex flex-col items-center justify-center h-screen bg-base-200">
      <div className="flex items-center gap-3 animate-pulse">
        <Loader2 className="w-10 h-10 text-primary animate-spin" />
        <span className="text-xl font-semibold text-gray-700">Loading...</span>
      </div>
    </div>
  );
};

export default Loading;