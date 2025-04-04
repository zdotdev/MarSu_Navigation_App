import "./App.css";

import Card from "./components/card/card";


const data = [
  {
    name: "John Doe",
    description: "A software developer with 5 years of experience"
  },
  {
    name: "Jane Smith",
    description: "UI/UX designer specializing in web applications"
  }
]

function App() {
  return (
    <div className="min-h-screen py-8">
      <div className="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-6 px-4">
      {data.map((item, index) => (
        <Card
        key={index}
        name={item.name}
        description={item.description}
        />
      ))}
      </div>
    </div>
  );
}

export default App;
