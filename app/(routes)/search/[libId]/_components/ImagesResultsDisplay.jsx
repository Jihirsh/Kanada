function ImagesResultsDisplay({ searchResult }) {
  const images = searchResult?.results;

  if (!images?.length) return <div>No images found.</div>;

  return (
    <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mt-5">
      {images.map((img, idx) => (
        <a
          key={idx}
          href={img.url || img.source}
          target="_blank"
          rel="noopener noreferrer"
          className="rounded shadow bg-gray-50"
        >
          <img
            src={img.thumbnailUrl || img.image || img.url}
            alt={img.title || "Image result"}
            className="w-full h-40 object-cover rounded"
            loading="lazy"
          />
          <div className="text-xs text-center mt-1 px-1">
            {img.title || img.source || ""}
          </div>
        </a>
      ))}
    </div>
  );
}

export default ImagesResultsDisplay;
