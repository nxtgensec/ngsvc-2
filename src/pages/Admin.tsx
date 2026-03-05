import { FormEvent, useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, Shield } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { supabase } from '@/integrations/supabase/client';

type RegistrationRecord = {
  id: string
  team_name: string
  member1_name: string
  member1_email: string
  member1_contact: string
  member1_linkedin: string
  member1_github: string
  member1_post_link: string
  member2_name: string
  member2_email: string
  member2_contact: string
  member2_linkedin: string
  member2_github: string
  member2_post_link: string
  created_at: string
}

const Admin = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [records, setRecords] = useState<RegistrationRecord[]>([]);
  const [loading, setLoading] = useState(false);
  const [loggedIn, setLoggedIn] = useState(false);

  const loadRecords = async (currentEmail: string, currentPassword: string) => {
    const { data, error: fnError } = await supabase.functions.invoke('admin-registrations', {
      method: 'POST',
      body: { email: currentEmail, password: currentPassword, action: 'list' },
    });
    if (fnError || data?.error) {
      throw new Error(data?.error || 'Unable to load records')
    }
    setRecords((data?.records ?? []) as RegistrationRecord[]);
  };

  const onLogin = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError(null);
    setLoading(true);
    try {
      await loadRecords(email, password);
      setLoggedIn(true);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Login failed');
    } finally {
      setLoading(false);
    }
  };

  const onDelete = async (id: string) => {
    setError(null);
    setLoading(true);
    try {
      const { data, error: fnError } = await supabase.functions.invoke('admin-registrations', {
        method: 'POST',
        body: { email, password, action: 'delete', id },
      });
      if (fnError || data?.error) {
        throw new Error(data?.error || 'Delete failed')
      }
      setRecords((data?.records ?? []) as RegistrationRecord[]);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Delete failed');
    } finally {
      setLoading(false);
    }
  };

  const onExport = () => {
    const headers = [
      'Team Name',
      'Person 1 Name',
      'Person 1 Email',
      'Person 1 Contact',
      'Person 1 LinkedIn',
      'Person 1 GitHub',
      'Person 1 LinkedIn Post URL',
      'Person 2 Name',
      'Person 2 Email',
      'Person 2 Contact',
      'Person 2 LinkedIn',
      'Person 2 GitHub',
      'Person 2 LinkedIn Post URL',
      'Submitted At (IST)',
    ];

    const escapeCsv = (value: string) => `"${value.replace(/"/g, '""')}"`;
    const rows = records.map((record) => [
      record.team_name,
      record.member1_name,
      record.member1_email,
      record.member1_contact,
      record.member1_linkedin,
      record.member1_github,
      record.member1_post_link,
      record.member2_name,
      record.member2_email,
      record.member2_contact,
      record.member2_linkedin,
      record.member2_github,
      record.member2_post_link,
      new Date(record.created_at).toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' }),
    ]);

    const csv = [headers, ...rows].map((row) => row.map((cell) => escapeCsv(String(cell || ''))).join(',')).join('\n');
    const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `vibecoding-registrations-${new Date().toISOString().slice(0, 10)}.csv`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  return (
    <div className="min-h-screen bg-background py-10 px-4">
      <div className="max-w-5xl mx-auto">
        <Link to="/" className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-primary mb-6">
          <ArrowLeft className="w-4 h-4" />
          Back to Home
        </Link>

        <div className="rounded-2xl border border-border bg-card p-6 md:p-8">
          <div className="flex items-center gap-2 mb-4">
            <Shield className="w-5 h-5 text-primary" />
            <h1 className="font-orbitron text-3xl md:text-4xl font-bold">Admin Access</h1>
          </div>

          {!loggedIn ? (
            <form onSubmit={onLogin} className="grid gap-4 max-w-lg">
              <div>
                <label className="block text-sm mb-2">Email</label>
                <input
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="w-full rounded-lg border border-border bg-background px-4 py-3"
                  placeholder="Enter admin email"
                />
              </div>
              <div>
                <label className="block text-sm mb-2">Password</label>
                <input
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  type="password"
                  className="w-full rounded-lg border border-border bg-background px-4 py-3"
                  placeholder="Enter password"
                />
              </div>
              {error && <p className="text-sm text-destructive">{error}</p>}
              <Button type="submit" variant="hero" size="lg" disabled={loading}>
                {loading ? 'Checking...' : 'Login'}
              </Button>
            </form>
          ) : (
            <div>
              <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
                <p className="text-sm text-muted-foreground">Total registrations: {records.length}</p>
                <div className="flex items-center gap-2">
                  <Button variant="heroOutline" size="sm" onClick={() => loadRecords(email, password)}>
                    Refresh
                  </Button>
                  <Button variant="hero" size="sm" onClick={onExport} disabled={records.length === 0}>
                    Download Excel (CSV)
                  </Button>
                </div>
              </div>
              {error && <p className="text-sm text-destructive mb-3">{error}</p>}
              <div className="space-y-3">
                {records.map((record) => (
                  <article key={record.id} className="rounded-xl border border-border p-4">
                    <div className="flex flex-wrap items-start justify-between gap-3 mb-3">
                      <p className="font-orbitron font-bold">{record.team_name}</p>
                      <Button variant="destructive" size="sm" onClick={() => onDelete(record.id)} disabled={loading}>
                        Delete
                      </Button>
                    </div>
                    <p className="text-sm">Member 1: {record.member1_name} ({record.member1_email})</p>
                    <p className="text-sm">Lead Contact: {record.member1_contact}</p>
                    <p className="text-sm">Lead LinkedIn: {record.member1_linkedin}</p>
                    <p className="text-sm">Lead GitHub: {record.member1_github}</p>
                    <p className="text-sm">Lead Post: {record.member1_post_link}</p>
                    <p className="text-sm mt-2">Member 2: {record.member2_name} ({record.member2_email})</p>
                    <p className="text-sm">Member 2 Contact: {record.member2_contact}</p>
                    <p className="text-sm">Member 2 LinkedIn: {record.member2_linkedin}</p>
                    <p className="text-sm">Member 2 GitHub: {record.member2_github}</p>
                    <p className="text-sm">Member 2 Post: {record.member2_post_link}</p>
                    <p className="text-xs text-muted-foreground mt-2">
                      Submitted: {new Date(record.created_at).toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' })}
                    </p>
                  </article>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Admin;
