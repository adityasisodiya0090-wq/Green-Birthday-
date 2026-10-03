import { Component, ErrorInfo, ReactNode } from 'react';
import { Button } from './Button';
import { Sprout, RotateCcw } from './Icons';

interface Props {
  children: ReactNode;
  fallback?: ReactNode;
}

interface State {
  hasError: boolean;
}

export class ErrorBoundary extends Component<Props, State> {
  public state: State = {
    hasError: false,
  };

  public static getDerivedStateFromError(_: Error): State {
    return { hasError: true };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    // Non-sensitive logging for telemetry / debugging
    console.error('ErrorBoundary caught error:', error.message);
  }

  private handleReset = () => {
    this.setState({ hasError: false });
    if (typeof window !== 'undefined') {
      window.location.href = '/';
    }
  };

  public render() {
    if (this.state.hasError) {
      if (this.props.fallback) {
        return this.props.fallback;
      }

      return (
        <div className="min-h-[50vh] flex items-center justify-center p-6 text-center">
          <div className="surface-elevated rounded-3xl p-8 sm:p-12 border border-[#DDE9D8] max-w-md mx-auto space-y-5 shadow-xs">
            <div className="w-14 h-14 rounded-2xl bg-[#DDE9D8]/70 text-[#1F4D38] flex items-center justify-center mx-auto">
              <Sprout className="w-7 h-7 text-[#1F4D38]" />
            </div>

            <div className="space-y-1.5">
              <h3 className="font-display font-extrabold text-xl text-[#1F4D38]">
                Something paused unexpectedly
              </h3>
              <p className="text-xs sm:text-sm text-[#4D6153] leading-relaxed">
                The garden encountered a momentary hitch. You can safely return to the home screen.
              </p>
            </div>

            <div className="pt-2 flex justify-center">
              <Button
                variant="primary"
                size="md"
                onClick={this.handleReset}
                icon={<RotateCcw className="w-4 h-4" />}
                iconPosition="left"
              >
                Return to Home
              </Button>
            </div>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}
