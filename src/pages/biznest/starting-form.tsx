import React from "react";
import { useNavigate } from "react-router-dom";
import DefaultLayout from "@/layout/default";

const StartingFrom: React.FC = () => {
  const navigate = useNavigate();
  return (
    <DefaultLayout>
      {/*   direa pag code */}
      <h1>Mardz</h1>
      <button
        onClick={() => navigate("/biznest/form")}
        className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
      >
        Go to Form
      </button>
    </DefaultLayout>
  );
};

export default StartingFrom;
