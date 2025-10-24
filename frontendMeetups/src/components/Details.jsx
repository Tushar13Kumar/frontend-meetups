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
    <div className="container-fluid py-5" style={{ backgroundColor: "#f5f6fa" }}>
      <div className="container">
        <Link to="/" className="btn btn-outline-secondary mb-4">
          ← Back to Events
        </Link>

        <div
          className="card border-0 shadow-lg rounded-4 overflow-hidden"
          style={{
            backgroundColor: "#fff",
            maxWidth: "1200px",
            margin: "0 auto",
          }}
        >
          <img
            src={data.image}
            alt={data.title}
            className="img-fluid w-100"
            style={{
              height: "400px",
              objectFit: "cover",
            }}
          />

          <div className="p-4 p-md-5">
            <div className="row g-5 align-items-start">
              {/* Left side — details */}
              <div className="col-12 col-lg-8">
                <h2 className="fw-bold mb-3">{data.title}</h2>

                <ul className="list-unstyled text-muted mb-4">
                  <li><strong>Host:</strong> {data.host}</li>
                  <li><strong>Location:</strong> {data.location}</li>
                  <li><strong>Date & Time:</strong> {data.duration}</li>
                  <li><strong>Dress Code:</strong> {data.dressCode}</li>
                  <li><strong>Age Restrictions:</strong> {data.ageRestrictions}</li>
                  <li><strong>Price:</strong> {data.price}</li>
                </ul>

                <div className="mb-3">
                  <strong>Tags:</strong>{" "}
                  {data.tags?.map((tag, index) => (
                    <span
                      key={index}
                      className="badge bg-secondary me-2 mb-2"
                      style={{ fontSize: "0.85rem" }}
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                <hr />

                <h5 className="fw-bold mb-2">About this Event</h5>
                <p className="text-muted lh-base">{data.details}</p>
              </div>

              {/* Right side — speakers */}
              <div className="col-12 col-lg-4">
                <div
                  className="p-4 rounded-4 shadow-sm"
                  style={{ backgroundColor: "#f9fafb" }}
                >
                  <h4 className="fw-bold mb-4 text-center">Speakers / Presenters</h4>

                  <div className="d-flex flex-column align-items-center gap-4">
                    {data.speakers?.map((speaker, index) => (
                      <div key={index} className="text-center">
                        <img
                          src={speaker.image}
                          alt={speaker.name}
                          className="rounded-circle mb-2 border border-3 border-light shadow-sm"
                          style={{
                            width: "100px",
                            height: "100px",
                            objectFit: "cover",
                          }}
                        />
                        <h6 className="fw-semibold mb-0">{speaker.name}</h6>
                        <p className="text-muted small mb-0">{speaker.position}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Details;
