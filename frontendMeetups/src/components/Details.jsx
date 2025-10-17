import { useParams, Link } from "react-router-dom";
import useFetch from "../useFetch";

const Details = () => {
  const { title } = useParams();
  const { data, loading, error } = useFetch(
    `https://backend-meetup-mon7.vercel.app/meetups/${title}`
  );

  if (loading) return <p className="text-center mt-4">Loading...</p>;
  if (error) return <p className="text-center text-danger">Error: {error}</p>;
  if (!data) return <p className="text-center mt-4">Event not found.</p>;

  return (
    <div className="container-fluid px-5 py-4">
      <Link to="/" className="btn btn-outline-secondary mb-4">
        ← Back to Events
      </Link>

      <div
        className="card border-0 shadow-lg rounded-4 p-4"
        style={{
          display: "grid",
          gridTemplateColumns: "60% 40%",
          gap: "2rem",
          alignItems: "start",
        }}
      >
        {/* Left Section - Image and Event Details */}
        <div>
          <img
            src={data.image}
            alt={data.title}
            className="img-fluid rounded-4 mb-4"
            style={{ width: "100%", height: "350px", objectFit: "cover" }}
          />

          <h2 className="fw-bold mb-3">{data.title}</h2>
          <p className="text-muted mb-1"><strong>Host:</strong> {data.host}</p>
          <p className="text-muted mb-1"><strong>Location:</strong> {data.location}</p>
          <p className="text-muted mb-1">
            <strong>Date & Time:</strong>{" "}
            {new Date(data.duration).toLocaleString()}
          </p>
          <p className="text-muted mb-1"><strong>Dress Code:</strong> {data.dressCode}</p>
          <p className="text-muted mb-1"><strong>Age Restrictions:</strong> {data.ageRestrictions}</p>
          <p className="text-muted mb-1"><strong>Price:</strong> {data.price}</p>

          <div className="mt-3">
            <strong>Tags:</strong>{" "}
            {data.tags?.map((tag, index) => (
              <span key={index} className="badge bg-secondary me-2">
                {tag}
              </span>
            ))}
          </div>

          <hr className="my-4" />
          <h5 className="fw-bold mb-2">About this Event</h5>
          <p className="text-muted fs-6 lh-base">{data.details}</p>
        </div>

        {/* Right Section - Speakers */}
        <div
          className="p-3 rounded-4 shadow-sm"
          style={{
            background: "#f8f9fa",
            height: "fit-content",
          }}
        >
          <h4 className="fw-bold mb-4 text-center">Speakers / Presenters</h4>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              gap: "1.5rem",
              alignItems: "center",
            }}
          >
            {data.speakers?.map((speaker, index) => (
              <div key={index} className="text-center">
                <img
                  src={speaker.image}
                  alt={speaker.name}
                  className="rounded-circle mb-2"
                  style={{
                    width: "110px",
                    height: "110px",
                    objectFit: "cover",
                    border: "3px solid #dee2e6",
                  }}
                />
                <h6 className="fw-semibold mb-1">{speaker.name}</h6>
                <p className="text-muted small">{speaker.position}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Details;
