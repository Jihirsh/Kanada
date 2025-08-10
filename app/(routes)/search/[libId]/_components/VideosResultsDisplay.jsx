function VideosResultsDisplay({ searchResult }) {
  const videos = searchResult?.results;

  if (!videos?.length) return <div>No videos found.</div>;

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-5">
      {videos.map((vid, idx) => (
        <a
          key={idx}
          href={vid.url}
          target="_blank"
          rel="noopener noreferrer"
          className="rounded shadow bg-gray-50 flex flex-row"
        >
          <img
            src={vid.thumbnail?.src || vid.properties?.thumbnail}
            alt={vid.title}
            className="w-32 h-20 object-cover rounded-l"
            loading="lazy"
          />
          <div className="flex flex-col justify-center p-2 flex-1">
            <div className="font-medium text-xs">{vid.title}</div>
            <div className="text-xs text-gray-500">{vid.publisher || vid.source}</div>
          </div>
        </a>
      ))}
    </div>
  );
}

export default VideosResultsDisplay;