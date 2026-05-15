import React from 'react';
import PageLayout from '../design-system/templates/PageLayout';
import NotFoundState from '../design-system/molecules/NotFoundState';
import useDocumentMeta from '../hooks/useDocumentMeta';

const PAGE_META = {
  title: 'Page not found — Catalog',
  description: 'The page you are looking for does not exist.',
};

function NotFound() {
  useDocumentMeta(PAGE_META);
  return (
    <PageLayout>
      <NotFoundState
        title="Page not found"
        description="The page you’re looking for doesn’t exist or may have been moved."
        backTo="/"
        backLabel="Back to items"
      />
    </PageLayout>
  );
}

export default NotFound;
