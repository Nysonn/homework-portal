import { useState, useEffect } from "react";
import axios from "axios";

// A hook that debounces calls to the recommendation API based on the homework title
const useAiRecommendation = (title) => {
  const [recommendation, setRecommendation] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!title) {
      setRecommendation("");
      return;
    }
    const timer = setTimeout(() => {
      setLoading(true);
      axios
        .post("/api/ai-recommendation", { title })
        .then((response) => {
          setRecommendation(response.data.recommendation);
          setLoading(false);
        })
        .catch((err) => {
          setError(err.message);
          setLoading(false);
        });
    }, 500); // Debounce delay to avoid excessive API calls

    return () => clearTimeout(timer);
  }, [title]);

  return { recommendation, loading, error };
};

export default useAiRecommendation;
