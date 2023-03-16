import ErrorComponent from 'next/error';

export default function Error({ statusCode }) {
    return <ErrorComponent statusCode={statusCode} hideAlert />;
  }