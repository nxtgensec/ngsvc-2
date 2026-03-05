import { ChangeEvent, FormEvent, useState } from 'react';
import { AlertTriangle, ArrowLeft, CheckCircle2 } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';

type RegistrationForm = {
  teamName: string;
  member1Name: string;
  member1Email: string;
  member1Contact: string;
  member1Linkedin: string;
  member1Github: string;
  member1PostLink: string;
  member2Name: string;
  member2Email: string;
  member2Contact: string;
  member2Linkedin: string;
  member2Github: string;
  member2PostLink: string;
};

const initialForm: RegistrationForm = {
  teamName: '',
  member1Name: '',
  member1Email: '',
  member1Contact: '',
  member1Linkedin: '',
  member1Github: '',
  member1PostLink: '',
  member2Name: '',
  member2Email: '',
  member2Contact: '',
  member2Linkedin: '',
  member2Github: '',
  member2PostLink: '',
};

const Field = ({
  label,
  name,
  value,
  onChange,
  placeholder,
  type = 'text',
}: {
  label: string;
  name: keyof RegistrationForm;
  value: string;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
  placeholder: string;
  type?: string;
}) => (
  <div>
    <label className="mb-2 block font-inter text-sm">{label}</label>
    <input
      name={name}
      value={value}
      onChange={onChange}
      type={type}
      required
      className="w-full rounded-lg border border-border bg-background px-4 py-3 outline-none transition-colors focus:border-primary"
      placeholder={placeholder}
    />
  </div>
);

const Register = () => {
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [saving, setSaving] = useState(false);
  const [form, setForm] = useState<RegistrationForm>(initialForm);

  const onChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const validate = () => {
    if (form.teamName.trim().length < 3) {
      return 'Team name must be at least 3 characters.';
    }
    return null;
  };

  const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError(null);
    const validationError = validate();
    if (validationError) {
      setError(validationError);
      return;
    }

    setSaving(true);
    const functionUrl = `${import.meta.env.VITE_SUPABASE_URL}/functions/v1/submit-team-registration`;
    const apiKey = import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY;

    try {
      const res = await fetch(functionUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          apikey: apiKey,
          Authorization: `Bearer ${apiKey}`,
        },
        body: JSON.stringify(form),
      });

      if (!res.ok) {
        let message = `Registration failed (HTTP ${res.status}).`;
        try {
          const body = (await res.json()) as { error?: string };
          if (body?.error) {
            message = body.error;
          }
        } catch {
          // Ignore parse failures and use status-based message.
        }
        setError(message);
        return;
      }
    } catch {
      setError('Request could not reach server. Please refresh and retry.');
      return;
    } finally {
      setSaving(false);
    }

    setForm(initialForm);
    setSubmitted(true);
  };

  return (
    <div className="min-h-screen bg-background py-10 px-4">
      <div className="max-w-7xl mx-auto">
        <Link to="/" className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-primary mb-6">
          <ArrowLeft className="w-4 h-4" />
          Back to Home
        </Link>

        <div className="rounded-2xl border border-border bg-card p-6 md:p-8">
          <h1 className="font-orbitron text-3xl md:text-4xl font-bold mb-2">Team Registration</h1>
          <p className="font-inter text-muted-foreground mb-8">
            March edition registration is free. Team-based entry only. Maximum 2 members per team.
          </p>
          <div className="mb-8 rounded-xl border border-amber-400/30 bg-amber-400/10 p-4 text-sm text-amber-100">
            <p>Note: Both members must share this hackathon on LinkedIn and submit the post URLs below.</p>
            <p className="mt-2">All details are manually verified. If faulty details are found, the team can be disqualified.</p>
          </div>

          {!submitted ? (
            <form onSubmit={onSubmit} className="grid gap-6">
              <div>
                <label className="mb-2 block font-inter text-sm">Team Name</label>
                <input
                  name="teamName"
                  value={form.teamName}
                  onChange={onChange}
                  required
                  className="w-full rounded-lg border border-border bg-background px-4 py-3 outline-none transition-colors focus:border-primary"
                  placeholder="Enter team name"
                />
              </div>

              <div className="grid gap-8 lg:grid-cols-2">
                <div className="rounded-xl border border-border p-5 md:p-6">
                  <h2 className="font-orbitron text-xl font-semibold mb-5">Team Lead (Person 1)</h2>
                  <div className="space-y-4">
                    <Field label="Name" name="member1Name" value={form.member1Name} onChange={onChange} placeholder="Full name" />
                    <Field label="Email" name="member1Email" value={form.member1Email} onChange={onChange} placeholder="name@email.com" type="email" />
                    <Field label="Contact" name="member1Contact" value={form.member1Contact} onChange={onChange} placeholder="+91..." />
                    <Field label="LinkedIn" name="member1Linkedin" value={form.member1Linkedin} onChange={onChange} placeholder="https://linkedin.com/in/..." type="url" />
                    <Field label="GitHub" name="member1Github" value={form.member1Github} onChange={onChange} placeholder="https://github.com/..." type="url" />
                    <Field label="LinkedIn Post URL" name="member1PostLink" value={form.member1PostLink} onChange={onChange} placeholder="https://linkedin.com/posts/..." type="url" />
                  </div>
                </div>

                <div className="rounded-xl border border-border p-5 md:p-6">
                  <h2 className="font-orbitron text-xl font-semibold mb-5">Team Mate (Person 2)</h2>
                  <div className="space-y-4">
                    <Field label="Name" name="member2Name" value={form.member2Name} onChange={onChange} placeholder="Full name" />
                    <Field label="Email" name="member2Email" value={form.member2Email} onChange={onChange} placeholder="name@email.com" type="email" />
                    <Field label="Contact" name="member2Contact" value={form.member2Contact} onChange={onChange} placeholder="+91..." />
                    <Field label="LinkedIn" name="member2Linkedin" value={form.member2Linkedin} onChange={onChange} placeholder="https://linkedin.com/in/..." type="url" />
                    <Field label="GitHub" name="member2Github" value={form.member2Github} onChange={onChange} placeholder="https://github.com/..." type="url" />
                    <Field label="LinkedIn Post URL" name="member2PostLink" value={form.member2PostLink} onChange={onChange} placeholder="https://linkedin.com/posts/..." type="url" />
                  </div>
                </div>
              </div>

              {error && (
                <div className="rounded-lg border border-destructive/40 bg-destructive/10 p-4 text-sm text-destructive">
                  <div className="flex items-start gap-2">
                    <AlertTriangle className="mt-0.5 h-4 w-4 shrink-0" />
                    <p>{error}</p>
                  </div>
                </div>
              )}

              <div className="rounded-lg border border-border bg-background/50 p-3 text-xs text-muted-foreground">
                <p>
                  Make sure Team Name is unique. If this team name already exists in records, submit will be rejected.
                </p>
              </div>

              <div className="pt-1">
                <Button type="submit" variant="hero" size="xl" className="w-full" disabled={saving}>
                  {saving ? 'Submitting Registration...' : 'Submit Team Registration'}
                </Button>
              </div>
            </form>
          ) : (
            <div className="rounded-xl border border-secondary/40 bg-secondary/10 p-6 text-center">
              <CheckCircle2 className="w-10 h-10 text-secondary mx-auto mb-3" />
              <p className="font-orbitron text-xl font-bold mb-2">Team Registration Received</p>
              <p className="font-inter text-muted-foreground mb-5">
                Kickoff details and challenge release timing will be shared before March 13.
              </p>
              <div className="flex flex-col sm:flex-row gap-3 justify-center">
                <Link to="/registered-teams">
                  <Button variant="hero">View Registered Teams</Button>
                </Link>
                <Link to="/">
                  <Button variant="heroOutline">Return Home</Button>
                </Link>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Register;
