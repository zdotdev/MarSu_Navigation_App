import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

interface DepartmentData {
  _id?: string;
  title: string;
  description: string;
  image: string;
  contact_person_name: string;
  contact_person_email: string;
  contact_person_title: string;
}

export default function Department() {
  const { id } = useParams();
  const [departments, setDepartments] = useState<DepartmentData>(
    {} as DepartmentData
  );

  if (!id) return;

  const fetchDepartments = async () => {
    try {
      const response = await fetch(
        `http://localhost:6900/api/department/${id}`
      );
      const data = await response.json();
      setDepartments(data.department || {});
    } catch (error) {
      console.error("Failed to fetch departments", error);
    }
  };

  fetchDepartments();

  console.log(departments);

  return (
    <>
      <div className="min-h-screen bg-gradient-to-b from-blue-50 to-gray-100">
        <div className="w-full h-full bg-gray-100 overflow-hidden">
          <div className="relative h-[50vh]">
            <img
              src={departments.image}
              alt={departments.title}
              className="absolute w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-black/30">
              <div className="absolute bottom-8 left-8 right-8">
                <h2 className="text-3xl sm:text-4xl font-bold text-white mb-2">
                  {departments.title}
                </h2>
              </div>
            </div>
          </div>

          <div className="p-8">
            <p className="text-lg text-gray-700 leading-relaxed mb-10">
              {departments.description}
            </p>

            <div className="bg-blue-50 p-6 rounded-lg border border-blue-100">
              <h3 className="text-xl font-semibold text-gray-900 mb-6">
                Contact Information
              </h3>
              <div className="space-y-4">
                <div className="flex items-center text-gray-700">
                  <svg
                    className="w-6 h-6 mr-3 text-blue-600"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" />
                  </svg>
                  <div>
                    <div className="font-medium">
                      {departments.contact_person_name}
                    </div>
                    <div className="text-sm text-gray-500">
                      {departments.contact_person_title}
                    </div>
                  </div>
                </div>
                <div className="flex items-center text-gray-700">
                  <svg
                    className="w-6 h-6 mr-3 text-blue-600"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
                    <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
                  </svg>
                  <a
                    href={`mailto:${departments.contact_person_email}`}
                    className="hover:text-blue-600 transition-colors"
                  >
                    {departments.contact_person_email}
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
