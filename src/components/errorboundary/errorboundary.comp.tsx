import React from "react";

type ErrorBoundaryProp = {};

type ErrorBoundaryState = {
  hasError: boolean;
};

class ErrorBoundary extends React.Component<
  ErrorBoundaryProp,
  ErrorBoundaryState
> {
  constructor(props: {} | Readonly<{}>) {
    super(props);

    this.state = {
      hasError: false,
    };
  }

  static getDerivedStateFromError(error: any) {
    return { hasError: true };
  }

  componentDidCatch(error: any, errorInfo: any) {
    console.log({ error, errorInfo });
  }

  render() {
    if (this.state.hasError) {
      return (
        <div>
          <div>error image</div>
          <div>error text, something broke</div>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
