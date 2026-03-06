import { useEffect, useState } from 'react';
import { Users } from 'lucide-react';
import { Link } from 'react-router-dom';
import { supabase } from '@/integrations/supabase/client';

const RegisteredTeamsSection = () => {
  const [teams, setTeams] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const load = async () => {
      const { data, error } = await supabase.functions.invoke('list-team-names', {
        method: 'GET',
      });

      if (!error && Array.isArray(data?.teams) && data.teams.length > 0) {
        setTeams((data.teams as string[]).filter(Boolean));
        setLoading(false);
        return;
      }

      const { data: rows, error: dbError } = await supabase
        .from('team_registrations')
        .select('team_name')
        .order('created_at', { ascending: false });

      if (!dbError && Array.isArray(rows)) {
        setTeams(rows.map((row) => row.team_name).filter(Boolean));
      }

      setLoading(false);
    };

    load();
  }, []);

  return (
    <section id="registered-teams" className="relative py-24 overflow-hidden">
      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-10">
            <h2 className="font-orbitron text-3xl md:text-4xl font-bold mb-4">
              <span className="text-foreground">Registered </span>
              <span className="text-gradient-accent">Teams</span>
            </h2>
            <p className="font-inter text-muted-foreground">Only team names are shown publicly.</p>
          </div>

          <div className="rounded-2xl border border-border bg-card p-6 md:p-8">
            {loading ? (
              <p className="font-inter text-muted-foreground">Loading teams...</p>
            ) : teams.length === 0 ? (
              <p className="font-inter text-muted-foreground">No teams registered yet.</p>
            ) : (
              <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
                {teams.map((team) => (
                  <article key={team} className="rounded-xl border border-border p-4">
                    <div className="flex items-center gap-2">
                      <Users className="h-4 w-4 text-primary" />
                      <p className="font-orbitron text-sm font-bold">{team}</p>
                    </div>
                  </article>
                ))}
              </div>
            )}

            <div className="mt-6">
              <Link to="/registered-teams" className="font-inter text-sm text-primary hover:underline">
                Open full registered teams page
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default RegisteredTeamsSection;
