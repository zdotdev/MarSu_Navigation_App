import Background from "~/lib/assets/bg.jpg";
import Logo from "~/lib/assets/logo_1.png";
import Card from "~/components/custom/card/card";
import { useEffect, useState } from "react";
interface DepartmentData {
  _id?: string;
  title: string;
  description: string;
  campus_zone: string;
  image: string;
  contact_person_name: string;
  contact_person_email: string;
  contact_person_title: string;
}

export default function Dashboard() {
  const [departments, setDepartments] = useState<DepartmentData[]>([]);
  useEffect(() => {
    const fetchDepartments = async () => {
      try {
        const response = await fetch("http://localhost:6900/api/department");
        const data = await response.json();
        setDepartments(data.department || []);
      } catch (error) {
        console.error("Failed to fetch departments", error);
      }
    };
    fetchDepartments();
  }, []);
  return (
    <>
      {/* dashboard area */}
      <div
        style={{
          backgroundImage: `linear-gradient(rgba(0, 0, 0, 0), rgba(100, 0, 0, 0.8)), url(${Background})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
        className="flex min-h-[52rem] flex-col md:flex-row"
      >
        <div className="flex flex-col justify-center w-full md:w-full md:h-[50rem]  items-center gap-8 p-8 bg-transparent">
          <img
            className="h-32 md:h-48 transition-transform hover:scale-105"
            src={Logo}
            alt="Logo.png"
          />
          <div className="text-center space-y-4">
            <h1 className="font-extrabold text-5xl md:text-7xl text-white drop-shadow-lg [text-shadow:_2px_2px_0_rgb(0_0_0)]">
              Welcome to Guide U!
            </h1>
            <p className="text-2xl md:text-3xl text-gray-200 font-medium drop-shadow-md">
              Guiding your steps at MarSU
            </p>
          </div>
        </div>
      </div>
      {/* search area */}
      <div className="flex flex-col justify-center items-center w-full h-full">
        <div className="flex flex-col justify-center items-center w-full h-40 md:h-56 bg-red-950">
          <div className="flex flex-col justify-center items-center p-4">
            <h1 className="text-2xl md:text-4xl text-white text-center">
              Looking for Facility?
            </h1>
            <input
              type="text"
              placeholder="Search facility..."
              className="mt-4 px-4 py-2 w-full md:w-64 rounded-lg border-2 bg-gray-200 border-red-950 focus:outline-none focus:border-gray-300"
              onChange={(e) => {
                const searchTerm = e.target.value.toLowerCase();
                const filteredDepartments = departments.filter((dept) =>
                  dept.title.toLowerCase().includes(searchTerm)
                );
                setDepartments(filteredDepartments);
              }}
            />
          </div>
        </div>
      </div>
      {/* department area */}
      <div className="flex pb-16 flex-col justify-center items-center w-full h-full bg-gray-200">
        <h2 className="text-4xl text-center font-bold mt-8">
          Campus Facilities
        </h2>
        <div className="flex flex-wrap justify-center items-center gap-4 mt-4">
          {Object.entries(
            departments.reduce((acc, department) => {
              const zone = department.campus_zone || "Other";
              if (!acc[zone]) acc[zone] = [];
              acc[zone].push(department);
              return acc;
            }, {} as Record<string, DepartmentData[]>)
          )
            .sort(([zoneA], [zoneB]) => zoneA.localeCompare(zoneB))
            .map(([zone, zoneDepartments]) => (
              <div key={zone} className="w-full px-4">
                <h3 className="text-2xl font-semibold mb-4 text-red-950">
                  {zone}
                </h3>
                <div className="flex flex-wrap gap-4 mb-8">
                  {zoneDepartments.map((department) => (
                    <a
                      key={department._id}
                      href={`department/${department._id}`}
                    >
                      <Card img={department.image} title={department.title} />
                    </a>
                  ))}
                </div>
              </div>
            ))}
        </div>
      </div>
    </>
  );
}
