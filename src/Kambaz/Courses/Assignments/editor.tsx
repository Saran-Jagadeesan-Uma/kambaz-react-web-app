import { useState } from 'react';

export default function AssignmentEditor() {
  const [assignmentName, setAssignmentName] = useState("A1 - ENV + HTML");
  const [description, setDescription] = useState(
    "The assignment is available online Submit a link to the landing page of your Web application running on Netlify. The landing page should include the following: Your full name and section Links to each of the lab assignments Link to the Kanbas application Links to all relevant source code repositories The Kanbas application should include a link to navigate back to the landing page."
  );
  const [points, setPoints] = useState(100);
  const [assignmentGroup, setAssignmentGroup] = useState("ASSIGNMENTS");
  const [displayGradeAs, setDisplayGradeAs] = useState("Percentage");
  const [submissionType, setSubmissionType] = useState("Online");
  const [textEntry, setTextEntry] = useState(true);
  const [websiteUrl, setWebsiteUrl] = useState(true);
  const [mediaRecordings, setMediaRecordings] = useState(false);
  const [studentAnnotation, setStudentAnnotation] = useState(false);
  const [fileUpload, setFileUpload] = useState(false);
  const [assignTo, setAssignTo] = useState("Everyone");
  const [dueDate, setDueDate] = useState("2024-05-13");
  const [availableFrom, setAvailableFrom] = useState("2024-05-06");
  const [availableUntil, setAvailableUntil] = useState("2024-05-20");

  const assignmentGroups = [
    "ASSIGNMENTS",
    "QUIZZES",
    "EXAMS",
    "PROJECTS",
    "DISCUSSIONS",
    "LABS",
  ];
  const displayGradeOptions = [
    "Percentage",
    "Points",
    "Complete/Incomplete",
    "Letter Grade",
    "GPA Scale",
  ];
  const submissionTypes = ["Online", "On Paper", "No Submission", "External Tool"];

  return (
    <div id="wd-assignments-editor">
      <label htmlFor="wd-name">Assignment Name</label>
      <input
        id="wd-name"
        value={assignmentName}
        onChange={(e) => setAssignmentName(e.target.value)}
      /><br /><br />
      <label htmlFor="wd-description">Description</label><br />
      <textarea
        id="wd-description"
        style={{ width: '500px', height: '200px' }}
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      />
      <br />
      <table>
        <tbody>
          <tr>
            <td align="right" valign="top">
              <label htmlFor="wd-points">Points</label>
            </td>
            <td>
              <input
                type="number"
                id="wd-points"
                value={points}
                onChange={(e) => setPoints(parseInt(e.target.value, 10))}
              />
            </td>
          </tr>
          <tr>
            <td align="right" valign="top">
              <label htmlFor="wd-group">Assignment Group</label>
            </td>
            <td>
              <select
                id="wd-group"
                value={assignmentGroup}
                onChange={(e) => setAssignmentGroup(e.target.value)}
              >
                {assignmentGroups.map((group) => (
                  <option key={group} value={group}>
                    {group}
                  </option>
                ))}
              </select>
            </td>
          </tr>
          <tr>
            <td align="right" valign="top">
              <label htmlFor="wd-display-grade-as">Display Grade as</label>
            </td>
            <td>
              <select
                id="wd-display-grade-as"
                value={displayGradeAs}
                onChange={(e) => setDisplayGradeAs(e.target.value)}
              >
                {displayGradeOptions.map((option) => (
                  <option key={option} value={option}>
                    {option}
                  </option>
                ))}
              </select>
            </td>
          </tr>
          <tr>
            <td align="right" valign="top">
              <label htmlFor="wd-submission-type">Submission Type</label>
            </td>
            <td>
              <select
                id="wd-submission-type"
                value={submissionType}
                onChange={(e) => setSubmissionType(e.target.value)}
              >
                {submissionTypes.map((type) => (
                  <option key={type} value={type}>
                    {type}
                  </option>
                ))}
              </select>
              <ul>
                <li>
                  <input
                    type="checkbox"
                    id="wd-text-entry"
                    checked={textEntry}
                    onChange={(e) => setTextEntry(e.target.checked)}
                  />
                  <label htmlFor="wd-text-entry">Text Entry</label>
                </li>
                <li>
                  <input
                    type="checkbox"
                    id="wd-website-url"
                    checked={websiteUrl}
                    onChange={(e) => setWebsiteUrl(e.target.checked)}
                  />
                  <label htmlFor="wd-website-url">Website URL</label>
                </li>
                <li>
                  <input
                    type="checkbox"
                    id="wd-media-recordings"
                    checked={mediaRecordings}
                    onChange={(e) => setMediaRecordings(e.target.checked)}
                  />
                  <label htmlFor="wd-media-recordings">Media Recordings</label>
                </li>
                <li>
                  <input
                    type="checkbox"
                    id="wd-student-annotation"
                    checked={studentAnnotation}
                    onChange={(e) => setStudentAnnotation(e.target.checked)}
                  />
                  <label htmlFor="wd-student-annotation">Student Annotation</label>
                </li>
                <li>
                  <input
                    type="checkbox"
                    id="wd-file-upload"
                    checked={fileUpload}
                    onChange={(e) => setFileUpload(e.target.checked)}
                  />
                  <label htmlFor="wd-file-upload">File Uploads</label>
                </li>
              </ul>
            </td>
          </tr>
          <tr>
            <td align="right" valign="top">
              <label htmlFor="wd-assign-to">Assign To</label>
            </td>
            <td>
              <input
                type="text"
                id="wd-assign-to"
                value={assignTo}
                onChange={(e) => setAssignTo(e.target.value)}
              />
            </td>
          </tr>
          <tr>
            <td align="right" valign="top">
              <label htmlFor="wd-due-date">Due</label>
            </td>
            <td>
              <input
                type="date"
                id="wd-due-date"
                value={dueDate}
                onChange={(e) => setDueDate(e.target.value)}
              />
            </td>
          </tr>
          <tr>
            <td align="right" valign="top">
              <label htmlFor="wd-available-from">Available from</label>
            </td>
            <td>
              <input
                type="date"
                id="wd-available-from"
                value={availableFrom}
                onChange={(e) => setAvailableFrom(e.target.value)}
              />
              Until{" "}
              <input
                type="date"
                id="wd-available-until"
                value={availableUntil}
                onChange={(e) => setAvailableUntil(e.target.value)}
              />
            </td>
          </tr>
        </tbody>
      </table>
      <hr />
      <button>Cancel</button>
      <button>Save</button>
    </div>
  );
}
