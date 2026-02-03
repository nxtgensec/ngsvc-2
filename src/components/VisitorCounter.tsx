import { useEffect, useState } from 'react';
import { Users } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';

const VisitorCounter = () => {
  const [visitorCount, setVisitorCount] = useState<number>(4);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Track this visitor and get count
    const trackAndFetch = async () => {
      try {
        const { data, error } = await supabase.functions.invoke('track-visitor');
        
        if (error) {
          console.error('Error tracking visitor:', error);
          setIsLoading(false);
          return;
        }

        if (data?.count) {
          setVisitorCount(data.count);
        }
        setIsLoading(false);
      } catch (err) {
        console.error('Error:', err);
        setIsLoading(false);
      }
    };

    trackAndFetch();

    // Subscribe to realtime updates for new visitors
    const channel = supabase
      .channel('visitors-realtime')
      .on(
        'postgres_changes',
        {
          event: 'INSERT',
          schema: 'public',
          table: 'visitors',
        },
        (payload) => {
          console.log('New visitor detected:', payload);
          // Increment count when new visitor is added
          setVisitorCount((prev) => prev + 1);
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, []);

  return (
    <div className="fixed bottom-6 right-6 z-50">
      <div className="px-4 py-3 rounded-xl bg-card/90 backdrop-blur-lg border border-primary/30 shadow-lg">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
            <Users className="w-5 h-5 text-primary" />
          </div>
          <div>
            <p className="font-inter text-xs text-muted-foreground">Unique Visitors</p>
            <p className="font-orbitron text-lg font-bold text-primary">
              {isLoading ? (
                <span className="animate-pulse">...</span>
              ) : (
                visitorCount.toLocaleString()
              )}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VisitorCounter;
