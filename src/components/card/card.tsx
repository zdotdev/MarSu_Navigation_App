import { CardProps } from "../../interface/card_props";

function Card({ name, description }: CardProps) {
  return (
    <div className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow duration-300">
      <h2 className="text-2xl font-bold mb-2 text-gray-800">{name}</h2>
      <p className="text-gray-600">{description}</p>
    </div>
  );
}

export default Card;
