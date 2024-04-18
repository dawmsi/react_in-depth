import { Component, ErrorInfo, PropsWithChildren } from 'react';
import { Error } from './routes/Error';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export default class ErrorBoundary extends Component<PropsWithChildren<any>> {
  state: { hasError: boolean };

  constructor(props: { children: JSX.Element }) {
    super(props);
    this.state = {
      hasError: false,
    };
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  componentDidCatch(error: Error, _errorInfo: ErrorInfo): void {
    alert(error);
  }

  static getDerivedStateFromError() {
    return { hasError: true };
  }
  render() {
    if (this.state.hasError) {
      return <Error />;
    }

    return this.props.children;
  }
}
