import React, { Component, ErrorInfo, ReactNode } from 'react';
import { AlertTriangle, RefreshCw, Home } from 'lucide-react';

interface Props {
  children: ReactNode;
}

interface State {
  hasError: boolean;
  error?: Error;
}

/**
 * Error boundary component to catch and handle React errors gracefully
 * Provides fallback UI and recovery options when the app encounters errors
 */
export class ErrorBoundary extends Component<Props, State> {
  public state: State = {
    hasError: false
  };

  public static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('Error caught by boundary:', error, errorInfo);
    
    // Log error to monitoring service in production
    if (process.env.NODE_ENV === 'production') {
      // Example: Sentry.captureException(error, { extra: errorInfo });
    }
  }

  private handleReload = () => {
    window.location.reload();
  };

  private handleGoHome = () => {
    window.location.href = '/';
  };

  public render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl p-8 text-center max-w-md w-full shadow-xl">
            {/* Error Icon */}
            <div className="w-16 h-16 bg-red-100 rounded-2xl flex items-center justify-center mx-auto mb-6">
              <AlertTriangle size={32} className="text-red-600" />
            </div>
            
            {/* Error Message */}
            <h1 className="text-2xl font-bold text-gray-900 mb-2">Something went wrong</h1>
            <p className="text-gray-600 mb-6">
              We're sorry, but something unexpected happened. Please try reloading the page.
            </p>
            
            {/* Error Details (development only) */}
            {process.env.NODE_ENV === 'development' && this.state.error && (
              <div className="bg-red-50 border border-red-200 rounded-xl p-4 mb-6 text-left">
                <h3 className="font-medium text-red-900 mb-2">Error Details:</h3>
                <code className="text-xs text-red-800 break-all">
                  {this.state.error.message}
                </code>
              </div>
            )}
            
            {/* Action Buttons */}
            <div className="space-y-3">
              <button
                onClick={this.handleReload}
                className="w-full bg-black hover:bg-gray-800 text-white font-semibold py-3 px-6 rounded-xl transition-all duration-150 flex items-center justify-center space-x-2 active:scale-95"
              >
                <RefreshCw size={18} />
                <span>Reload Page</span>
              </button>
              
              <button
                onClick={this.handleGoHome}
                className="w-full bg-gray-100 hover:bg-gray-200 text-gray-700 font-medium py-3 px-6 rounded-xl transition-all duration-150 flex items-center justify-center space-x-2 active:scale-95"
              >
                <Home size={18} />
                <span>Go to Home</span>
              </button>
            </div>
            
            {/* Contact Information */}
            <p className="text-xs text-gray-400 mt-6">
              If this problem persists, please contact our support team.
            </p>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}