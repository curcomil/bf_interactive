import { Card } from "../../Components/Card";
import contein from "../../db/contein";
import duplicateAndShuffle from "../../Utils/Funtions";

function Home() {
  const new_array = duplicateAndShuffle(contein);

  return (
    <div className="bg-amber-950 min-h-screen">
      <h1 className="text-white">Hola mundo</h1>
      <div className="grid grid-cols-4 grid-rows-3 gap-4 place-content-center place-items-center">
        {new_array.map((i) => (
          <Card title={i.name} key={i.id} id={i.id} />
        ))}
      </div>
    </div>
  );
}

export default Home;
