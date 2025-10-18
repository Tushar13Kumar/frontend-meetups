import React from "react";
import { useParams, Link } from "react-router-dom";
import useFetch from "../useFetch";
import "./Details.css";

const Details = () => {
  const { title } = useParams();
  const { data, loading, error } = useFetch(
    `https://backend-meetup-mon7.vercel.app/meetups/${title}`
  );

  if (loading) return <p className="text-center mt-4">Loading...</p>;
  if (error) return <p className="text-center text-danger">Error: {error}</p>;
  if (!data) return <p className="text-center mt-4">Event not found.</p>;

  return (
    <div className="page-wrap">
      <div className="container-center">
        <Link to="/" className="back-btn">← Back to Events</Link>

        <div className="event-layout">
          <div className="left-col">
            <div className="image-wrap">
              <img src={data.image} alt={data.title} className="event-image" />
            </div>

            <h1 className="event-title">{data.title}</h1>

            <div className="meta-row">
              <div><strong>Host:</strong> {data.host}</div>
              <div><strong>Location:</strong> {data.location}</div>
              <div><strong>Date & Time:</strong> {new Date(data.duration).toLocaleString()}</div>
              <div><strong>Dress Code:</strong> {data.dressCode}</div>
              <div><strong>Age Restrictions:</strong> {data.ageRestrictions}</div>
              <div><strong>Price:</strong> {data.price}</div>
            </div>

            <div className="tags-row">
              {data.tags?.map((t, i) => (
                <span key={i} className="tag-pill">{t}</span>
              ))}
            </div>

            <hr />
            <h3>Details:</h3>
            <p className="details-text">{data.details}</p>

            {(data.dressCode || data.ageRestrictions) && (
              <>
                <h4 className="mt-3">Additional Information:</h4>
                <div className="info-grid">
                  <div><strong>Dress Code:</strong> {data.dressCode}</div>
                  <div><strong>Age Restrictions:</strong> {data.ageRestrictions}</div>
                </div>
              </>
            )}
          </div>

          <aside className="right-col">
            <div className="sidebar-card">
              <div className="sidebar-top">
                <div className="sidebar-datetime">
                  <div className="dt-label">When</div>
                  <div className="dt-value">{new Date(data.duration).toLocaleString()}</div>
                </div>
                <div className="sidebar-location">
                  <div className="dt-label">Where</div>
                  <div className="dt-value">{data.location}</div>
                </div>
                <div className="sidebar-price">
                  <div className="dt-label">Price</div>
                  <div className="dt-value">{data.price}</div>
                </div>
              </div>

              <hr />

              <div className="speakers-section">
                <div className="speakers-title">
                  Speakers: ({data.speakers?.length || 0})
                </div>
                <div className="speakers-list">
                  {data.speakers?.map((s, i) => (
                    <div key={i} className="speaker-mini">
                      <img className="speaker-avatar" src={s.image} alt={s.name} />
                      <div className="speaker-info">
                        <div className="speaker-name">{s.name}</div>
                        <div className="speaker-pos">{s.position}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <button className="rsvp-btn">RSVP</button>
            </div>
          </aside>
        </div>
      </div>
    </div>
  );
};

export default Details;
