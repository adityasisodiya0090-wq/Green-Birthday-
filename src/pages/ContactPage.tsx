import { useState, FormEvent } from 'react';
import { Container } from '../components/common/Container';
import { SectionHeading } from '../components/common/SectionHeading';
import { Button } from '../components/common/Button';
import { ScrollReveal } from '../components/common/ScrollReveal';
import { StatusMessage } from '../components/common/StatusMessage';
import { useRouter } from '../context/RouterContext';
import { Send, CheckCircle2, ArrowRight, Sparkles, Building2 } from '../components/common/Icons';

export function ContactPage() {
  const { navigate } = useRouter();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [subject, setSubject] = useState('General Question');
  const [message, setMessage] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!email || !email.includes('@')) {
      setError('Please provide a valid email address.');
      return;
    }
    if (!message || message.trim().length < 5) {
      setError('Please share your question or note (at least 5 characters).');
      return;
    }

    setError(null);
    setSubmitted(true);
  };

  return (
    <div className="py-14 sm:py-20 surface-base">
      <Container size="narrow">
        <ScrollReveal>
          <div className="text-center mb-12">
            <SectionHeading
              eyebrow="Community Inquiry"
              title="Want to get in touch?"
              description="«Partnership requests and project questions can be submitted through the relevant form.»"
            />
          </div>
        </ScrollReveal>

        {/* Section 41 Partner Prompt Callout */}
        <ScrollReveal delayMs={80}>
          <div className="mb-10 surface-elevated rounded-3xl p-6 sm:p-8 border border-[#DDE9D8] text-center space-y-4 shadow-2xs">
            <div className="w-12 h-12 rounded-2xl bg-[#DDE9D8]/70 flex items-center justify-center mx-auto text-[#1F4D38]">
              <Building2 className="w-6 h-6" />
            </div>
            <h3 className="font-display font-extrabold text-xl text-[#1F4D38]">
              Bringing Birthday Green to a School or Society?
            </h3>
            <p className="text-xs sm:text-sm text-[#4D6153] max-w-md mx-auto leading-relaxed">
              If you represent an academic campus, residential complex, or civic group, our dedicated collaboration flow helps you coordinate seamlessly.
            </p>
            <div className="pt-1 flex justify-center">
              <Button
                variant="secondary"
                size="md"
                onClick={() => navigate('/partners')}
                icon={<ArrowRight className="w-4 h-4" />}
              >
                Become a Birthday Green Partner →
              </Button>
            </div>
          </div>
        </ScrollReveal>

        {/* General Project Inquiries Form */}
        <ScrollReveal delayMs={150}>
          <div className="surface-glass rounded-3xl p-7 sm:p-12 border border-white/90 shadow-xl shadow-[#1F4D38]/5">
            {submitted ? (
              <div className="text-center py-10 space-y-4 animate-hero-center">
                <div className="w-16 h-16 rounded-full bg-[#DDE9D8] text-[#1F4D38] flex items-center justify-center mx-auto">
                  <CheckCircle2 className="w-8 h-8 text-[#1F4D38]" />
                </div>
                <h3 className="font-display font-extrabold text-2xl text-[#1F4D38]">
                  Note Received
                </h3>
                <p className="text-xs sm:text-sm text-[#4D6153] max-w-md mx-auto leading-relaxed">
                  Thank you for reaching out. We will review your question and respond to your email.
                </p>
                <div className="pt-4">
                  <Button
                    variant="outline"
                    size="md"
                    onClick={() => {
                      setSubmitted(false);
                      setMessage('');
                    }}
                  >
                    Send Another Note
                  </Button>
                </div>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-5" noValidate>
                <div className="pb-3 border-b border-[#DDE9D8]">
                  <h4 className="font-display font-bold text-lg text-[#1F4D38]">
                    Send a Project Question
                  </h4>
                  <p className="text-xs text-[#7A8E80]">
                    We use your email strictly to answer your question. Never for marketing or tracking.
                  </p>
                </div>

                {error && (
                  <StatusMessage type="note">
                    {error}
                  </StatusMessage>
                )}

                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-[#1F4D38] mb-1.5">
                    Your Name (Optional)
                  </label>
                  <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="e.g. Aditi"
                    className="w-full px-4 py-3 rounded-2xl tactile-control-inset text-sm text-[#1C2821] focus:outline-none focus:ring-2 focus:ring-[#1F4D38]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-[#1F4D38] mb-1.5">
                    Email Address *
                  </label>
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="your.email@example.com"
                    className="w-full px-4 py-3 rounded-2xl tactile-control-inset text-sm text-[#1C2821] focus:outline-none focus:ring-2 focus:ring-[#1F4D38]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-[#1F4D38] mb-1.5">
                    Topic
                  </label>
                  <select
                    value={subject}
                    onChange={(e) => setSubject(e.target.value)}
                    className="w-full px-4 py-3 rounded-2xl tactile-control-inset text-sm font-semibold text-[#1C2821] focus:outline-none focus:ring-2 focus:ring-[#1F4D38] cursor-pointer"
                  >
                    <option value="General Question">General Question</option>
                    <option value="Feedback on the Initiative">Feedback on the Initiative</option>
                    <option value="Idea for Community Care">Idea for Community Care</option>
                    <option value="Other">Other</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-[#1F4D38] mb-1.5">
                    Your Message *
                  </label>
                  <textarea
                    required
                    rows={4}
                    maxLength={500}
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder="Write your question or note here..."
                    className="w-full px-4 py-3 rounded-2xl tactile-control-inset text-sm text-[#1C2821] focus:outline-none focus:ring-2 focus:ring-[#1F4D38]"
                  />
                  <span className="text-[11px] text-[#7A8E80] block text-right mt-1">
                    {message.length} / 500
                  </span>
                </div>

                <div className="pt-2">
                  <Button
                    type="submit"
                    variant="primary"
                    size="lg"
                    fullWidth
                    icon={<Send className="w-4 h-4" />}
                  >
                    Submit Question
                  </Button>
                </div>
              </form>
            )}
          </div>
        </ScrollReveal>
      </Container>
    </div>
  );
}
