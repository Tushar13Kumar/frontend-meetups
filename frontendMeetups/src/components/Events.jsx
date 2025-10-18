import { useState } from "react";
import useFetch from "../useFetch";
import { Link } from "react-router-dom";

const Events = () => {
  const { data, loading, error } = useFetch(
    "https://backend-meetup-mon7.vercel.app/meetups"
  );

  // State for search and filter
  const [searchQuery, setSearchQuery] = useState("");
  const [filterType, setFilterType] = useState("Both");

  if (loading) return <p className="text-center mt-4">Loading...</p>;
  if (error) return <p className="text-center text-danger">Error: {error}</p>;

  // Ensure data is always an array to prevent .filter crash
  const eventsArray = Array.isArray(data) ? data : [];

  // Apply search and filter
  const filteredEvents = eventsArray.filter((event) => {
    const typeMatch = filterType === "Both" || event.eventType === filterType;
    const query = searchQuery.toLowerCase();
    const searchMatch =
      event.title.toLowerCase().includes(query) ||
      event.tags?.some((tag) => tag.toLowerCase().includes(query));
    return typeMatch && searchMatch;
  });

  return (
    <div className="container-fluid my-4 px-4">
      <h2 className="text-center mb-4 fw-bold">Meetup Events</h2>

      {/* Search & Filter Controls */}
      <div className="d-flex flex-column flex-md-row justify-content-between align-items-center mb-4 gap-3">
        <div className="input-group w-100 w-md-50">
          <input
            type="text"
            className="form-control rounded-4"
            placeholder="Search by title or tags..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>

        <div>
          <select
            className="form-select rounded-4"
            style={{ minWidth: "140px" }}
            value={filterType}
            onChange={(e) => setFilterType(e.target.value)}
          >
            <option value="Both">Both</option>
            <option value="Online">Online</option>
            <option value="Offline">Offline</option>
          </select>
        </div>
      </div>

      {/* Event Cards Grid */}
      <div
        className="event-grid"
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
          gap: "2rem",
          justifyItems: "center",
        }}
      >
        {filteredEvents.length > 0 ? (
          filteredEvents.map((event) => (
            <Link
              key={event._id || event.title}
              to={`/event/${encodeURIComponent(event.title)}`}
              className="text-decoration-none text-dark w-100"
              style={{ maxWidth: "350px" }}
            >
              <div className="card shadow-sm h-100 border-0 rounded-4">
                <img
                  src={event.thumbnail}
                  className="card-img-top rounded-top-4 img-fluid"
                  alt={event.title}
                  onError={(e) =>
                    (e.target.src =
                      "https://placehold.co/200x200?text=No+Image&font=roboto")
                  }
                />
                <div className="card-body">
                  <span
                    className={`badge ${
                      event.eventType === "Online" ? "bg-primary" : "bg-success"
                    } mb-2`}
                  >
                    {event.eventType} Event
                  </span>
                  <h5 className="card-title fw-semibold">{event.title}</h5>
                  <p className="text-muted small mb-0">
                    {new Date(event.dateTime).toDateString()}
                  </p>
                </div>
              </div>
            </Link>
          ))
        ) : (
          <p className="text-center text-muted mt-4">No events found.</p>
        )}
      </div>
    </div>
  );
};

export default Events;
