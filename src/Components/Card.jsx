export const Card = ({ title, id }) => {
  return (
    <div className="text-white bg-gray-700 w-60 h-70">
      <p>{title || "title"}</p>
      <p>{id || "id"}</p>
    </div>
  );
};
