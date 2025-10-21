import { useState } from "react";
import useFetch from "../useFetch";
import { Link } from "react-router-dom";

const Events = () => {
  const { data, loading, error } = useFetch(
    `https://backend-meetup-mon7.vercel.app/meetups`
  );

  const [searchQuery, setSearchQuery] = useState("");

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error loading events.</p>;

  // ✅ Keep same layout, only hide unmatched cards (not shrink grid)
  const filteredData = data.filter((event) =>
    event.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="events-container" style={{ padding: "20px" }}>
      {/* ✅ Search input */}
      <div style={{ textAlign: "center", marginBottom: "20px" }}>
        <input
          type="text"
          placeholder="Search meetups..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          style={{
            padding: "10px 15px",
            width: "300px",
            borderRadius: "10px",
            border: "1px solid #ccc",
          }}
        />
      </div>

      {/* ✅ Keep your old 3-column grid */}
      <div
        className="events-grid"
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(3, 1fr)",
          gap: "20px",
        }}
      >
        {filteredData.length > 0 ? (
          filteredData.map((event) => (
            <div
              key={event._id}
              className="event-card"
              style={{
                background: "#fff",
                borderRadius: "10px",
                boxShadow: "0 4px 8px rgba(0,0,0,0.1)",
                overflow: "hidden",
                textAlign: "center",
              }}
            >
              <img
                src={event.image}
                alt={event.title}
                style={{ width: "100%", height: "200px", objectFit: "cover" }}
              />
              <div style={{ padding: "15px" }}>
                <h3>{event.title}</h3>
                <p>{event.host}</p>
                <Link
                  to={`/details/${encodeURIComponent(event.title)}`}
                  style={{
                    display: "inline-block",
                    marginTop: "10px",
                    padding: "8px 16px",
                    background: "#007BFF",
                    color: "#fff",
                    borderRadius: "6px",
                    textDecoration: "none",
                  }}
                >
                  View Details
                </Link>
              </div>
            </div>
          ))
        ) : (
          <p style={{ gridColumn: "1 / -1", textAlign: "center" }}>
            No meetups found.
          </p>
        )}
      </div>
    </div>
  );
};

export default Events;
