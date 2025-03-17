const APODdata = ({ apod }) => {
    return (
      <div className="mx-4 space-y-4 text-center max-w-2xl">
        <h2 className="font-sans text-xl font-bold">{apod.title}</h2>
        <p className="text-justify mt-2">{apod.explanation}</p>
        {apod.copyright && (
          <p className="text-justify mt-2">
            <strong>Copyright :</strong> {apod.copyright}
          </p>
        )}
        {apod.concept_tags && (
          <p className="text-justify mt-2">
            <strong>Concept Tags :</strong> {apod.concept_tags.toString()}
          </p>
        )}
        {apod.media_type === "image" ? (
          <img
            src={apod.url}
            alt={apod.title}
            className="mt-4 rounded-lg shadow-lg w-full transition-transform transform animate-fadeIn"
          />
        ) : (
          <iframe
            src={apod.url}
            title="APOD Video"
            className="mt-4 rounded-lg shadow-lg w-full h-64"
          />
        )}
      </div>
    );
  };
  
  export default APODdata;  