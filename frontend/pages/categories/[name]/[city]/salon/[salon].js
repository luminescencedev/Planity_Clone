import { useRouter } from "next/router";
import { useEffect, useState, useContext } from "react";
import AuthContext from "../../../../../context/AuthContext";

export default function SalonPage() {
  const router = useRouter();
  const { salon, name, city } = router.query;
  const { token } = useContext(AuthContext);
  const [salonData, setSalonData] = useState(null);
  const [error, setError] = useState(null);
  const [reviewForm, setReviewForm] = useState({
    rating: 5,
    description: "",
  });
  const [reviewError, setReviewError] = useState("");
  const [reviewSuccess, setReviewSuccess] = useState("");

  const fetchSalonData = async () => {
    if (salon && token) {
      try {
        const salonName = encodeURIComponent(salon);
        const response = await fetch(
          `http://localhost:3001/salon/${salonName}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        if (!response.ok) throw new Error("Error fetching salon data");
        const data = await response.json();
        setSalonData(data);
      } catch (error) {
        console.error("Error:", error);
        setError("Error loading salon data");
      }
    }
  };

  useEffect(() => {
    fetchSalonData();
  }, [salon, token, reviewSuccess]);

  const handleReservation = (serviceId) => {
    if (serviceId) {
      const encodedName = encodeURIComponent(name);
      const encodedCity = encodeURIComponent(city);
      const encodedSalon = encodeURIComponent(salon);
      const url = `/categories/${encodedName}/${encodedCity}/salon/${encodedSalon}/reservation/${encodeURIComponent(
        serviceId
      )}`;
      router.push(url);
    }
  };

  const handleReviewChange = (e) => {
    const { name, value } = e.target;
    setReviewForm((prev) => ({
      ...prev,
      [name]: name === "rating" ? parseInt(value) : value,
    }));
  };

  const handleReviewSubmit = async (e) => {
    e.preventDefault();
    setReviewError("");
    setReviewSuccess("");
  
    try {
      const response = await fetch(
        `http://localhost:3001/salon/${salonData.id_salon}/reviews`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            rating: reviewForm.rating,
            description: reviewForm.description,
          }),
        }
      );
  
      const data = await response.json();
  
      if (!response.ok) {
        throw new Error(data.error || "Failed to submit review");
      }
  
      setReviewSuccess("Review submitted successfully!");
      setReviewForm({
        rating: 5,
        description: "",
      });
  
      // Refresh salon data to show the new review
      await fetchSalonData();
    } catch (error) {
      console.error("Error submitting review:", error);
      setReviewError(error.message);
    }
  };
 

  if (!salon || !token) return <p>Loading...</p>;
  if (error) return <p style={{ color: "red" }}>{error}</p>;
  if (!salonData) return <p>Loading salon data...</p>;

  return (
    <div>
      <h1>{salonData.name}</h1>
      <h1>{salonData.id_salon}</h1>
      <p>{salonData.address}</p>
      <p>{salonData.city}</p>
      <img
        src={salonData.picture}
        alt={salonData.name}
        style={{ width: "200px", height: "200px" }}
      />
      <p>{salonData.description}</p>

      {salonData.moyenne_rating && (
        <h3>
          Average Rating: {Number(salonData.moyenne_rating).toFixed(1)} / 5
        </h3>
      )}

<div style={{ margin: "20px 0" }}>
  <h3>Add a Review</h3>
  <form onSubmit={handleReviewSubmit}>  {/* This was missing */}
    <div style={{ marginBottom: "10px" }}>
      <label>
        Rating (1-5):
        <select
          name="rating"
          value={reviewForm.rating}
          onChange={handleReviewChange}
          style={{ marginLeft: "10px" }}
        >
          {[1, 2, 3, 4, 5].map((num) => (
            <option key={`rating-${num}`} value={num}>
              {num}
            </option>
          ))}
        </select>
      </label>
    </div>
    <div style={{ marginBottom: "10px" }}>
      <textarea
        name="description"
        value={reviewForm.description}
        onChange={handleReviewChange}
        placeholder="Your review..."
        style={{ width: "100%", minHeight: "100px", padding: "8px" }}
        required
      />
    </div>
    {reviewError && <p style={{ color: "red" }}>{reviewError}</p>}
    {reviewSuccess && <p style={{ color: "green" }}>{reviewSuccess}</p>}
    <button
      type="submit"
      style={{
        padding: "8px 16px",
        background: "#0070f3",
        color: "white",
        border: "none",
        borderRadius: "4px",
        cursor: "pointer",
      }}
    >
      Submit Review
    </button>
  </form>
</div>

      <h3>Reviews:</h3>
      {salonData.reviews?.length === 0 ? (
        <p>No reviews available for this salon.</p>
      ) : (
        <ul style={{ listStyle: "none", padding: 0 }}>
          {salonData.reviews?.map((review) => (
            <li
              key={`review-${review.id_review}`}
              style={{
                marginBottom: "15px",
                padding: "10px",
                borderBottom: "1px solid #eee",
              }}
            >
              <strong>{review.rating}/5</strong> - {review.description}
              <p style={{ color: "#666", fontSize: "0.8em" }}>
                {new Date(review.created_at).toLocaleDateString()}
              </p>
            </li>
          ))}
        </ul>
      )}

      <h3>Services:</h3>
      {salonData.services?.length === 0 ? (
        <p>No services available for this salon.</p>
      ) : (
        <ul style={{ listStyle: "none", padding: 0 }}>
          {salonData.services?.map((service) => (
            <li
              key={`service-${service.id_service}`}
              style={{
                marginBottom: "10px",
                padding: "10px",
                borderBottom: "1px solid #eee",
              }}
            >
              <strong>{service.description}</strong>: {service.price} € -{" "}
              {service.time} minutes
              <button
                onClick={() => handleReservation(service.id_service)}
                style={{
                  marginLeft: "10px",
                  padding: "5px 10px",
                  cursor: "pointer",
                  background: "#0070f3",
                  color: "white",
                  border: "none",
                  borderRadius: "4px",
                }}
              >
                Book
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
