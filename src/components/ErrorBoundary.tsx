import React from 'react';
import { Link } from 'react-router-dom';

interface State {
  hasError: boolean;
}

export default class ErrorBoundary extends React.Component<React.PropsWithChildren<{}>, State> {
  state: State = { hasError: false };

  static getDerivedStateFromError(_: Error): State {
    return { hasError: true };
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen flex flex-col items-center justify-center p-4">
          <h2 className="text-2xl font-bold mb-4">Une erreur est survenue</h2>
          <Link 
            to="/"
            className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
          >
            Retour à l'accueil
          </Link>
        </div>
      );
    }

    return this.props.children;
  }
}