import { Logo } from '../common/Logo';
import { Link } from '../../context/RouterContext';
import { Container } from '../common/Container';

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-[#153929] text-[#DDE9D8] border-t border-[#1F4D38] pt-8 sm:pt-14 pb-[max(2rem,var(--sab))]">
      <Container>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 sm:gap-10 pb-6 sm:pb-12 border-b border-[#1F4D38]/80">
          {/* Brand info */}
          <div className="sm:col-span-2 space-y-2.5 sm:space-y-4">
            <Logo variant="light" size="sm" className="sm:hidden" />
            <Logo variant="light" size="md" className="hidden sm:inline-flex" />
            <p className="text-xs sm:text-sm font-medium text-[#8EB892] tracking-wide uppercase">
              A community environmental initiative.
            </p>
            <p className="text-xs sm:text-sm text-[#DDE9D8]/80 max-w-md leading-relaxed">
              Your birthday gave you a date. Give that date a purpose. Turning personal birth dates into recurring monthly Green Days of planting and nurturing.
            </p>
            <div className="pt-1">
              <span className="inline-block text-[10px] sm:text-xs font-semibold tracking-wider text-[#8EB892] uppercase">
                Plant · Nurture · Repeat
              </span>
            </div>
          </div>

          {/* Primary Navigation */}
          <div>
            <h4 className="text-[10px] sm:text-xs font-bold uppercase tracking-wider text-[#8EB892] mb-2 sm:mb-4">
              Explore
            </h4>
            <ul className="space-y-1.5 sm:space-y-2.5 text-xs sm:text-sm">
              <li>
                <Link href="/" className="hover:text-white transition-colors">
                  Home
                </Link>
              </li>
              <li>
                <Link href="/how-it-works" className="hover:text-white transition-colors">
                  How It Works
                </Link>
              </li>
              <li>
                <Link href="/participate" className="hover:text-white transition-colors">
                  Participate
                </Link>
              </li>
              <li>
                <Link href="/impact" className="hover:text-white transition-colors">
                  Impact
                </Link>
              </li>
              <li>
                <Link href="/community" className="hover:text-white transition-colors">
                  Community
                </Link>
              </li>
              <li>
                <Link href="/partners" className="hover:text-white transition-colors">
                  Partners
                </Link>
              </li>
              <li>
                <Link href="/community-kit" className="hover:text-white transition-colors text-[#8EB892]">
                  Community Starter Kit
                </Link>
              </li>
              <li>
                <Link href="/about" className="hover:text-white transition-colors">
                  About
                </Link>
              </li>
            </ul>
          </div>

          {/* Community & Ethics */}
          <div>
            <h4 className="text-[10px] sm:text-xs font-bold uppercase tracking-wider text-[#8EB892] mb-2 sm:mb-4">
              Guidelines & Trust
            </h4>
            <ul className="space-y-1.5 sm:space-y-2.5 text-xs sm:text-sm">
              <li>
                <Link href="/privacy" className="hover:text-white transition-colors">
                  Privacy Reassurance
                </Link>
              </li>
              <li>
                <Link href="/guidelines" className="hover:text-white transition-colors">
                  Participation Guidelines
                </Link>
              </li>
              <li>
                <Link href="/contact" className="hover:text-white transition-colors">
                  Contact Initiative
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="pt-4 sm:pt-8 flex flex-col sm:flex-row items-center justify-between gap-2 sm:gap-4 text-[10px] sm:text-xs text-[#8EB892]/80 text-center sm:text-left">
          <p>
            © {currentYear} Birthday Green. An independent community environmental initiative.
          </p>
          <p className="text-center sm:text-right">
            Community-driven action · No accounts or fees required
          </p>
        </div>
      </Container>
    </footer>
  );
}
