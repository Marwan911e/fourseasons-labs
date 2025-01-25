import React, { useState } from "react";
import "./index.css";
import logo from "./assets/logo.png";

const App = () => {
  const [patient, setPatient] = useState({
    name: "",
    gender: "",
    age: "",
  });
  const [profiles, setProfiles] = useState([]);
  const [currentProfile, setCurrentProfile] = useState("");

  const handleAddProfile = () => {
    if (currentProfile) {
      setProfiles([
        ...profiles,
        { name: currentProfile, rows: [{ column1: "", column2: "", column3: "" }] },
      ]);
      setCurrentProfile("");
    }
  };

  const handleAddRow = (index) => {
    const updatedProfiles = [...profiles];
    updatedProfiles[index].rows.push({ column1: "", column2: "", column3: "" });
    setProfiles(updatedProfiles);
  };

  const handleProfileChange = (profileIndex, rowIndex, column, value) => {
    const updatedProfiles = [...profiles];
    updatedProfiles[profileIndex].rows[rowIndex][column] = value;
    setProfiles(updatedProfiles);
  };

  const printReport = () => {
    window.print();
  };

  return (
    <div className="app">
      {/* Logo */}
      <div className="logo">
        <img src={logo} alt="Logo" />
      </div>

      {/* Patient Details */}
      <h1 className="report-title">Laboratory Report</h1>
      <div className="patient-details">
        <label>
          Patient Name:
          <input
            type="text"
            value={patient.name}
            onChange={(e) => setPatient({ ...patient, name: e.target.value })}
          />
        </label>
        <label>
          Gender:
          <select
            value={patient.gender}
            onChange={(e) => setPatient({ ...patient, gender: e.target.value })}
          >
            <option value="">Select</option>
            <option value="Male">Male</option>
            <option value="Female">Female</option>
            <option value="Other">Other</option>
          </select>
        </label>
        <label>
          Age:
          <input
            type="number"
            value={patient.age}
            onChange={(e) => setPatient({ ...patient, age: e.target.value })}
          />
        </label>
        <label>Date: {new Date().toLocaleDateString()}</label>
      </div>

      {/* Profiles Section */}
      <div className="profiles">
        <input
          type="text"
          placeholder="Enter profile name"
          value={currentProfile}
          onChange={(e) => setCurrentProfile(e.target.value)}
        />
        <button onClick={handleAddProfile}>Add Profile</button>

        {profiles.map((profile, index) => (
          <div key={index} className="profile">
            <h2>{profile.name}</h2>
            <table>
              <thead>
                <tr>
                  <th>Test Name</th>
                  <th>Result</th>
                  <th>Reference Range</th>
                </tr>
              </thead>
              <tbody>
                {profile.rows.map((row, rowIndex) => (
                  <tr key={rowIndex}>
                    <td>
                      <input
                        type="text"
                        value={row.column1}
                        onChange={(e) =>
                          handleProfileChange(index, rowIndex, "column1", e.target.value)
                        }
                      />
                    </td>
                    <td>
                      <input
                        type="text"
                        value={row.column2}
                        onChange={(e) =>
                          handleProfileChange(index, rowIndex, "column2", e.target.value)
                        }
                      />
                    </td>
                    <td>
                      <input
                        type="text"
                        value={row.column3}
                        onChange={(e) =>
                          handleProfileChange(index, rowIndex, "column3", e.target.value)
                        }
                      />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            <button onClick={() => handleAddRow(index)}>Add Row</button>
          </div>
        ))}
      </div>

      {/* Print Button */}
      <button className="print-button" onClick={printReport}>
        Print Report
      </button>
    </div>
  );
};

export default App;
