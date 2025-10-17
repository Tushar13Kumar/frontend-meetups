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

      <div className="card border-0 shadow-lg rounded-4 p-4 w-100">
        <div className="row g-4 align-items-center">
          {/* Left: Image */}
          <div className="col-lg-6">
            <img
              src={data.image}
              alt={data.title}
              className="img-fluid rounded-4 w-100"
              style={{ maxHeight: "500px", objectFit: "cover" }}
            />
          </div>

          {/* Right: Event Info */}
          <div className="col-lg-6">
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

            <div className="mt-3">
              <strong>Tags:</strong>{" "}
              {data.tags?.map((tag, index) => (
                <span key={index} className="badge bg-secondary me-2">
                  {tag}
                </span>
              ))}
            </div>
          </div>
        </div>

        <hr className="my-5" />

        <h4 className="fw-bold">About this Event</h4>
        <p className="text-muted">{data.details}</p>

        <hr className="my-5" />

        <h4 className="fw-bold">Speakers / Presenters</h4>
        <div className="row">
          {data.speakers?.map((speaker, index) => (
            <div className="col-sm-6 col-md-4 text-center mb-4" key={index}>
              <img
                src={speaker.image}
                alt={speaker.name}
                className="rounded-circle mb-2"
                style={{
                  width: "130px",
                  height: "130px",
                  objectFit: "cover",
                }}
              />
              <h6 className="fw-semibold">{speaker.name}</h6>
              <p className="text-muted small mb-0">{speaker.position}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Details;
