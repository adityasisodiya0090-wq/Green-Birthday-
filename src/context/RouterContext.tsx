import React, { createContext, useContext, useState, useEffect, ReactNode, AnchorHTMLAttributes } from 'react';
import { RoutePath } from '../types';

interface RouterContextType {
  currentPath: RoutePath;
  navigate: (path: RoutePath | string) => void;
  openCalculator: (initialDay?: number) => void;
  closeCalculator: () => void;
  isCalculatorOpen: boolean;
  activeCalculatorDay: number;
  savedGreenDay: number | null;
  setSavedGreenDay: (day: number | null) => void;
}

const RouterContext = createContext<RouterContextType | undefined>(undefined);

function normalizePath(rawPath: string): RoutePath {
  const clean = rawPath.split('?')[0].split('#')[0] || '/';
  const validPaths: RoutePath[] = [
    '/',
    '/how-it-works',
    '/participate',
    '/impact',
    '/community',
    '/partners',
    '/community-kit',
    '/about',
    '/privacy',
    '/contact',
    '/guidelines'
  ];
  if (validPaths.includes(clean as RoutePath)) {
    return clean as RoutePath;
  }
  return '/404';
}

export function RouterProvider({ children }: { children: ReactNode }) {
  const [currentPath, setCurrentPath] = useState<RoutePath>(() => {
    if (typeof window !== 'undefined') {
      return normalizePath(window.location.pathname);
    }
    return '/';
  });

  const [isCalculatorOpen, setIsCalculatorOpen] = useState(false);
  const [activeCalculatorDay, setActiveCalculatorDay] = useState(16);
  const [savedGreenDay, setSavedGreenDay] = useState<number | null>(() => {
    if (typeof window !== 'undefined') {
      const stored = localStorage.getItem('birthdaygreen_active_day_v1');
      if (stored) {
        const parsed = parseInt(stored, 10);
        if (parsed >= 1 && parsed <= 31) return parsed;
      }
    }
    return null;
  });

  useEffect(() => {
    const handlePopState = () => {
      setCurrentPath(normalizePath(window.location.pathname));
    };

    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  const handleSetSavedGreenDay = (day: number | null) => {
    setSavedGreenDay(day);
    if (typeof window !== 'undefined') {
      if (day) {
        localStorage.setItem('birthdaygreen_active_day_v1', day.toString());
      } else {
        localStorage.removeItem('birthdaygreen_active_day_v1');
      }
    }
  };

  const navigate = (path: RoutePath | string) => {
    const normalized = normalizePath(path);
    if (normalized !== currentPath) {
      if (typeof window !== 'undefined') {
        window.history.pushState({}, '', normalized);
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }
      setCurrentPath(normalized);
    } else {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const openCalculator = (initialDay?: number) => {
    if (initialDay && initialDay >= 1 && initialDay <= 31) {
      setActiveCalculatorDay(initialDay);
    }
    setIsCalculatorOpen(true);
  };

  const closeCalculator = () => {
    setIsCalculatorOpen(false);
  };

  return (
    <RouterContext.Provider
      value={{
        currentPath,
        navigate,
        openCalculator,
        closeCalculator,
        isCalculatorOpen,
        activeCalculatorDay,
        savedGreenDay,
        setSavedGreenDay: handleSetSavedGreenDay,
      }}
    >
      {children}
    </RouterContext.Provider>
  );
}

export function useRouter() {
  const context = useContext(RouterContext);
  if (!context) {
    throw new Error('useRouter must be used within a RouterProvider');
  }
  return context;
}

interface LinkProps extends AnchorHTMLAttributes<HTMLAnchorElement> {
  href: RoutePath | string;
  children: ReactNode;
  className?: string;
  activeClassName?: string;
}

export function Link({ href, children, className = '', activeClassName = '', onClick, ...rest }: LinkProps) {
  const { currentPath, navigate } = useRouter();
  const isActive = currentPath === href;

  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    if (onClick) {
      onClick(e);
    }
    if (!e.defaultPrevented && e.button === 0 && !e.metaKey && !e.ctrlKey && !e.altKey && !e.shiftKey) {
      e.preventDefault();
      navigate(href);
    }
  };

  return (
    <a
      href={href}
      onClick={handleClick}
      className={`${className} ${isActive ? activeClassName : ''}`.trim()}
      {...rest}
    >
      {children}
    </a>
  );
}
