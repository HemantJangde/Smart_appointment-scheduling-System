import { useEffect, useState } from "react";
import API from "../services/api";

function Doctors() {
  const [doctors, setDoctors] = useState([]);

  useEffect(() => {
    const fetchDoctors = async () => {
      const { data } = await API.get("/patient");

      setDoctors(data);
    };

    fetchDoctors();
  }, []);

  return (
    <div className="p-10">
      <h1 className="text-3xl font-bold mb-6">Available Doctors</h1>

      <div className="grid grid-cols-3 gap-6">
        {doctors.map((doc) => (
          <div key={doc._id} className="border p-5 rounded shadow">
            <h2 className="text-xl font-semibold">{doc.name}</h2>

            <p className="text-gray-600">{doc.qualification}</p>

            <button className="mt-3 bg-blue-500 text-white px-3 py-1 rounded">
              View Slots
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Doctors;
