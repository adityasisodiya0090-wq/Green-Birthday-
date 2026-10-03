/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { RouterProvider, useRouter } from './context/RouterContext';
import { ImpactProvider } from './context/ImpactContext';
import { GreenDayProvider } from './context/GreenDayContext';
import { Header } from './components/navigation/Header';
import { Footer } from './components/navigation/Footer';
import { GreenDayModal } from './components/calculator/GreenDayModal';
import { HowToNurtureModal } from './components/common/HowToNurtureModal';

// Pages
import { HomePage } from './pages/HomePage';
import { HowItWorksPage } from './pages/HowItWorksPage';
import { ParticipatePage } from './pages/ParticipatePage';
import { ImpactPage } from './pages/ImpactPage';
import { CommunityPage } from './pages/CommunityPage';
import { PartnersPage } from './pages/PartnersPage';
import { CommunityKitPage } from './pages/CommunityKitPage';
import { AboutPage } from './pages/AboutPage';
import { PrivacyPage } from './pages/PrivacyPage';
import { ContactPage } from './pages/ContactPage';
import { GuidelinesPage } from './pages/GuidelinesPage';
import { NotFoundPage } from './pages/NotFoundPage';
import { ErrorBoundary } from './components/common/ErrorBoundary';

function AppContent() {
  const { currentPath } = useRouter();

  const renderCurrentRoute = () => {
    switch (currentPath) {
      case '/':
        return <HomePage />;
      case '/how-it-works':
        return <HowItWorksPage />;
      case '/participate':
        return <ParticipatePage />;
      case '/impact':
        return <ImpactPage />;
      case '/community':
        return <CommunityPage />;
      case '/partners':
        return <PartnersPage />;
      case '/community-kit':
        return <CommunityKitPage />;
      case '/about':
        return <AboutPage />;
      case '/privacy':
        return <PrivacyPage />;
      case '/contact':
        return <ContactPage />;
      case '/guidelines':
        return <GuidelinesPage />;
      case '/404':
      default:
        return <NotFoundPage />;
    }
  };

  return (
    <div className="min-h-screen flex flex-col surface-base text-[#1C2821] antialiased selection:bg-[#DDE9D8] selection:text-[#1F4D38]">
      {/* Top Bar Navigation */}
      <Header />

      {/* Main Page Content with Subtle Page Transition */}
      <main key={currentPath} className="flex-1 w-full page-transition">
        {renderCurrentRoute()}
      </main>

      {/* Footer */}
      <Footer />

      {/* Interactive Global Green Day Dialog */}
      <GreenDayModal />

      {/* Interactive Global How to Nurture Dialog */}
      <HowToNurtureModal />
    </div>
  );
}

export default function App() {
  return (
    <ErrorBoundary>
      <RouterProvider>
        <GreenDayProvider>
          <ImpactProvider>
            <AppContent />
          </ImpactProvider>
        </GreenDayProvider>
      </RouterProvider>
    </ErrorBoundary>
  );
}
