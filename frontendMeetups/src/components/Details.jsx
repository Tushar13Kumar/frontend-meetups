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
    <div
      className="container-fluid p-0"
      style={{
        height: "100vh", // Full viewport height
        display: "flex",
        flexDirection: "column",
      }}
    >
      {/* Top Bar */}
      <div className="p-3 px-md-4 border-bottom bg-light d-flex align-items-center justify-content-between">
        <Link to="/" className="btn btn-outline-secondary btn-sm">
          ← Back
        </Link>
        <h5 className="fw-bold mb-0 text-center flex-grow-1">{data.title}</h5>
      </div>

      {/* Main Content Grid */}
      <div
        className="flex-grow-1 d-grid"
        style={{
          gridTemplateColumns: "1fr",
          gridTemplateRows: "50% 50%",
        }}
      >
        <style>
          {`
            @media (min-width: 768px) {
              .details-layout {
                grid-template-columns: 55% 45%;
                grid-template-rows: 100%;
              }
            }
          `}
        </style>

        <div className="details-layout h-100">
          {/* Left: Image */}
          <div
            className="d-flex align-items-center justify-content-center bg-light"
            style={{
              overflow: "hidden",
              borderRight: "1px solid #dee2e6",
            }}
          >
            <img
              src={data.image}
              alt={data.title}
              style={{
                width: "100%",
                height: "100%",
                objectFit: "contain", // show full image, no crop
              }}
            />
          </div>

          {/* Right: Info Section */}
          <div
            className="p-3 p-md-4 overflow-auto"
            style={{
              backgroundColor: "#ffffff",
            }}
          >
            <h6 className="fw-bold mb-2">{data.title}</h6>
            <p className="text-muted small mb-1">
              <strong>Host:</strong> {data.host}
            </p>
            <p className="text-muted small mb-1">
              <strong>Location:</strong> {data.location}
            </p>
            <p className="text-muted small mb-1">
              <strong>Date & Time:</strong> {data.duration}
            </p>
            <p className="text-muted small mb-1">
              <strong>Event Duration:</strong> {data.eventTime}
            </p>
            <p className="text-muted small mb-1">
              <strong>Dress Code:</strong> {data.dressCode}
            </p>
            <p className="text-muted small mb-1">
              <strong>Age Restrictions:</strong> {data.ageRestrictions}
            </p>
            <p className="text-muted small mb-1">
              <strong>Price:</strong> {data.price}
            </p>

            <div className="mt-2">
              <strong>Tags:</strong>{" "}
              {data.tags?.map((tag, index) => (
                <span key={index} className="badge bg-secondary me-1">
                  {tag}
                </span>
              ))}
            </div>

            <hr className="my-3" />
            <h6 className="fw-bold mb-1">About this Event</h6>
            <p className="text-muted small mb-3" style={{ maxHeight: "80px", overflowY: "auto" }}>
              {data.details}
            </p>

            <h6 className="fw-bold mb-2 text-center">Speakers</h6>
            <div className="d-flex flex-wrap justify-content-center gap-3">
              {data.speakers?.map((speaker, index) => (
                <div key={index} className="text-center">
                  <img
                    src={speaker.image}
                    alt={speaker.name}
                    className="rounded-circle mb-2"
                    style={{
                      width: "60px",
                      height: "60px",
                      objectFit: "cover",
                      border: "2px solid #dee2e6",
                    }}
                  />
                  <p className="small mb-0 fw-semibold">{speaker.name}</p>
                  <p className="text-muted small">{speaker.position}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Details;
