import { useNavigate } from "react-router-dom";

function PatientDashboard(){

const navigate = useNavigate();

        return(

            <div className="p-10">

                    <h1 className="text-3xl font-bold mb-6">
                    Patient Dashboard
                    </h1>

                    <button
                    onClick={()=>navigate("/doctors")}
                    className="bg-green-500 text-white px-4 py-2 rounded"
                    >

                    View Doctors

                    </button>

            </div>

        )

}

export default PatientDashboard