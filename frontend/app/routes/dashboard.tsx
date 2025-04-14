import Background from "~/lib/assets/bg.jpg";
import Logo from "~/lib/assets/logo_1.png";
import Card from "~/components/custom/card/card";

export default function Dashboard() {
  return (
    <>
      {/* dashboard area */}
      <div
        style={{
          height: "56rem",
          backgroundImage: `linear-gradient(rgba(0, 0, 0, 0), rgba(100, 0, 0, 0.8)), url(${Background})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
        className="flex h-full"
      >
        <div className="flex flex-col justify-center w-1/2 h-full bg-gray-200 items-center gap-2 p-8">
          <img className="h-36" src={Logo} alt="Logo.png" />
          <h1 className="font-extrabold text-6xl">Welcome to Guide U!</h1>
          <p className="text-2xl">Guiding your steps at MarSU</p>
        </div>
      </div>
      {/* search area */}
      <div className="flex flex-col justify-center items-center w-full h-full">
        <div className="flex flex-col justify-center items-center w-full h-56 bg-red-950">
          <div className="flex flex-col justify-center items-center">
            <h1 className="text-4xl text-white">Loogking for department?</h1>
            <input
              type="text"
              placeholder="Search department..."
              className="mt-4 px-4 py-2 w-64 rounded-lg border-2 bg-gray-200 border-red-950 focus:outline-none focus:border-gray-300"
            />
          </div>
        </div>
      </div>
      {/* department area */}
      <div className="flex pb-16 flex-col justify-center items-center w-full h-full bg-gray-200">
        <h2 className="text-4xl text-center font-bold mt-8">Departments</h2>
        <div className="flex flex-wrap justify-center items-center gap-4 mt-4">
          <Card img="/path/to/image.jpg" title="Department 1" />
          <Card img="/path/to/image.jpg" title="Department 1" />
          <Card img="/path/to/image.jpg" title="Department 1" />
        </div>
      </div>
    </>
  );
}
