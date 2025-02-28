export const fetchHomework = async (className, subjectName) => {
    const response = await fetch(
      `http://localhost:3001/api/homework?class=${className}&subject=${subjectName}`
    );
    const data = await response.json();
    if (!response.ok) {
      throw new Error(data.error || "Failed to fetch homework");
    }
    return data.homework;
  };
  
  export const uploadHomework = async (formData, className, subjectName) => {
    const response = await fetch(
      `http://localhost:3001/api/homework?class=${className}&subject=${subjectName}`,
      {
        method: "POST",
        body: formData,
      }
    );
    const data = await response.json();
    if (!response.ok) {
      throw new Error(data.error || "Upload failed.");
    }
    return data.homework;
  };
  
  export const deleteHomework = async (homeworkId) => {
    const response = await fetch(
      `http://localhost:3001/api/homework/${homeworkId}`,
      { method: "DELETE" }
    );
    const data = await response.json();
    if (!response.ok) {
      throw new Error(data.error || "Deletion failed.");
    }
    return data;
  };
  
  export const downloadHomework = async (fileUrl, fileName = "homework.pdf") => {
    const response = await fetch(fileUrl);
    if (!response.ok) {
      throw new Error("File not found");
    }
    const blob = await response.blob();
    const downloadUrl = window.URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = downloadUrl;
    link.download = fileName;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    window.URL.revokeObjectURL(downloadUrl);
  };
  