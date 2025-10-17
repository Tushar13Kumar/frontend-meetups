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
    <div className="container-fluid px-4 py-5">
      <Link to="/" className="btn btn-outline-secondary mb-4">
        ← Back to Events
      </Link>

      {/* Full-width card layout */}
      <div className="card border-0 shadow-lg rounded-4 p-4 w-100">
        <div className="row g-4">
          {/* LEFT SECTION (Event Info + About) */}
          <div className="col-lg-8 col-md-12">
            <div className="mb-4">
              <img
                src={data.image}
                alt={data.title}
                className="img-fluid rounded-4 w-100"
                style={{ maxHeight: "420px", objectFit: "cover" }}
              />
            </div>

            <h2 className="fw-bold mb-3">{data.title}</h2>
            <p className="text-muted mb-1">
              <strong>Host:</strong> {data.host}
            </p>
            <p className="text-muted mb-1">
              <strong>Location:</strong> {data.location}
            </p>
            <p className="text-muted mb-1">
              <strong>Date & Time:</strong>{" "}
              {new Date(data.duration).toLocaleString()}
            </p>
            <p className="text-muted mb-1">
              <strong>Dress Code:</strong> {data.dressCode}
            </p>
            <p className="text-muted mb-1">
              <strong>Age Restrictions:</strong> {data.ageRestrictions}
            </p>
            <p className="text-muted mb-1">
              <strong>Price:</strong> {data.price}
            </p>

            <div className="mt-3 mb-4">
              <strong>Tags:</strong>{" "}
              {data.tags?.map((tag, index) => (
                <span key={index} className="badge bg-secondary me-2">
                  {tag}
                </span>
              ))}
            </div>

            <hr className="my-4" />

            <div>
              <h4 className="fw-bold mb-3">About this Event</h4>
              <p className="text-muted fs-6 lh-lg">{data.details}</p>
            </div>
          </div>

          {/* RIGHT SECTION (Speakers) */}
          <div className="col-lg-4 col-md-12">
            <div className="p-3 rounded-4 bg-light shadow-sm h-100">
              <h4 className="fw-bold mb-4 text-center">Speakers / Presenters</h4>

              <div
                className="speakers-grid"
                style={{
                  display: "grid",
                  gridTemplateColumns: "1fr",
                  gap: "1.5rem",
                  justifyItems: "center",
                }}
              >
                {data.speakers?.map((speaker, index) => (
                  <div
                    key={index}
                    className="text-center bg-white p-3 rounded-4 shadow-sm w-100"
                  >
                    <img
                      src={speaker.image}
                      alt={speaker.name}
                      className="rounded-circle mb-3"
                      style={{
                        width: "120px",
                        height: "120px",
                        objectFit: "cover",
                      }}
                    />
                    <h6 className="fw-semibold">{speaker.name}</h6>
                    <p className="text-muted small">{speaker.position}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Details;
