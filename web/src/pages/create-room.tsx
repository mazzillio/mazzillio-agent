import { useQuery } from "@tanstack/react-query";
import { Link } from "react-router-dom";

type GetRoomsResponse = Array<{
  id: string;
  name: string;
}>;

export function CreateRoom() {
  const { data: rooms, isLoading } = useQuery({
    queryKey: ["get-rooms"],
    queryFn: async () => {
      const response = await fetch("http://localhost:3333/rooms");
      const data: GetRoomsResponse = await response.json();
      return data;
    },
  });
  return (
    <div>
      <h1>Create Room</h1>
      {isLoading && <p>Carregando...</p>}
      <div className="flex flex-col gap-2">
        {rooms?.map((room) => (
          <Link key={room.id} to={`/room/${room.id}`}>
            {room.name}
          </Link>
        ))}
      </div>
    </div>
  );
}
