import { useEffect, useState } from "react";
import API from "../../services/api";

function AdminDashboard() {
  const [stats, setStats] = useState({});

  useEffect(() => {
    const fetchData = async () => {
      const { data } = await API.get("/admin/dashboard");

      setStats(data);
    };

    fetchData();
  }, []);

  return (
    <div className="p-10">
      <h1 className="text-3xl font-bold mb-6">Admin Dashboard</h1>

      <div className="grid grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded shadow">
          <h2 className="text-xl">Total Doctors</h2>
          <p className="text-2xl font-bold">{stats.doctors}</p>
        </div>

        <div className="bg-white p-6 rounded shadow">
          <h2 className="text-xl">Total Patients</h2>
          <p className="text-2xl font-bold">{stats.patients}</p>
        </div>

        <div className="bg-white p-6 rounded shadow">
          <h2 className="text-xl">Total Appointments</h2>
          <p className="text-2xl font-bold">{stats.appointments}</p>
        </div>
      </div>
    </div>
  );
}

export default AdminDashboard;
