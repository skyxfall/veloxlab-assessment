import React from 'react';
import { useParams, useLocation } from 'react-router-dom';
import PageLayout from '../design-system/templates/PageLayout';
import PageHeader from '../design-system/molecules/PageHeader';
import BackBreadcrumb from '../design-system/molecules/BackBreadcrumb';
import ItemDetailCard from '../design-system/organisms/ItemDetailCard';
import ItemDetailSkeleton from '../design-system/organisms/ItemDetailSkeleton';
import NotFoundState from '../design-system/molecules/NotFoundState';
import ErrorMessage from '../design-system/molecules/ErrorMessage';
import Skeleton from '../design-system/atoms/Skeleton';
import useItemDetail from '../hooks/useItemDetail';
import useDocumentMeta from '../hooks/useDocumentMeta';

function buildMeta(item, isNotFound) {
  if (isNotFound) {
    return { title: 'Item not found — Catalog', description: 'The item you are looking for does not exist.' };
  }
  if (!item) {
    return { title: 'Loading… — Catalog', description: 'Loading item details.' };
  }
  return {
    title: `${item.name} — Catalog`,
    description: `${item.name} in ${item.category}, $${item.price.toLocaleString()}.`,
  };
}

const TITLE_SKELETON = (
  <Skeleton className="inline-block h-9 sm:h-10 w-72 max-w-full align-middle rounded-none" />
);

function ItemDetailContent({ id }) {
  const location = useLocation();
  const seed = location.state?.item;
  const { item: fetched, error } = useItemDetail(id);

  const item = fetched || (seed && String(seed.id) === String(id) ? seed : null);
  const isNotFound = error?.status === 404 && !item;

  useDocumentMeta(buildMeta(item, isNotFound));

  let title;
  let subtitle;
  if (isNotFound) {
    title = 'Item not found';
    subtitle = "We couldn't find that item. It may have been removed.";
  } else if (item) {
    title = item.name;
    subtitle = `SKU-${String(item.id).padStart(4, '0')}`;
  } else {
    title = TITLE_SKELETON;
  }

  return (
    <PageLayout aria-labelledby="detail-heading">
      <PageHeader
        id="detail-heading"
        eyebrow={<BackBreadcrumb to="/" label="Items" />}
        title={title}
        subtitle={subtitle}
      />

      {error && !isNotFound && (
        <ErrorMessage message={`Failed to load item: ${error.message}`} />
      )}

      {isNotFound ? (
        <NotFoundState
          title="Item not found"
          description="The item you’re looking for doesn’t exist or may have been removed."
          backTo="/"
          backLabel="Back to items"
        />
      ) : item ? (
        <ItemDetailCard item={item} />
      ) : (
        <ItemDetailSkeleton />
      )}
    </PageLayout>
  );
}

function ItemDetail() {
  const { id } = useParams();
  return <ItemDetailContent key={id} id={id} />;
}

export default ItemDetail;
