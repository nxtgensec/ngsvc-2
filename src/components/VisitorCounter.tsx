import { useEffect, useState } from 'react';
import { Eye } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';

const VisitorCounter = () => {
  const [visitorCount, setVisitorCount] = useState<number>(4);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const trackAndFetch = async () => {
      try {
        const { data, error } = await supabase.functions.invoke('track-visitor', {
          method: 'POST',
        });

        if (error) {
          setIsLoading(false);
          return;
        }

        if (data?.count) {
          setVisitorCount(data.count);
        }
        setIsLoading(false);
      } catch {
        setIsLoading(false);
      }
    };

    trackAndFetch();
  }, []);

  return (
    <div className="fixed bottom-6 left-6 z-50">
      <div className="px-4 py-2 rounded-full bg-card/90 backdrop-blur-lg border border-primary/30 shadow-lg flex items-center gap-2">
        <Eye className="w-4 h-4 text-primary" />
        <p className="font-orbitron text-base font-bold text-primary leading-none">
          {isLoading ? <span className="animate-pulse">...</span> : visitorCount.toLocaleString()}
        </p>
      </div>
    </div>
  );
};

export default VisitorCounter;
