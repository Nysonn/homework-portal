import { useState, useEffect } from "react";
import { fetchHomework } from "../api/homeworkAPI";

const useHomework = (className, subjectName) => {
  const [homework, setHomework] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const homeworkData = await fetchHomework(className, subjectName);
        setHomework(homeworkData);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [className, subjectName]);

  return { homework, setHomework, loading, error };
};

export default useHomework;
