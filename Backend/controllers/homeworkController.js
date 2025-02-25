import Homework from "../models/homework.js"

const getHomework = async (req, res) => {
  const { class: className, subject } = req.query;

  if (!className || !subject) {
    return res.status(400).json({ error: "Both class and subject are required" });
  }

  try {
    // Query the database for homework matching the provided class and subject.
    const homeworkList = await Homework.findAll({
      where: { className, subject },
    });

    return res.status(200).json({ homework: homeworkList });
  } catch (error) {
    console.error("Error fetching homework:", error);
    return res.status(500).json({ error: "Internal server error" });
  }
};

export { getHomework };
