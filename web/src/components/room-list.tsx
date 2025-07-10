import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import { useRoom } from "../http/use-room";
import { formatRelativeDate } from "../lib/format-relative-date";
import { Badge } from "./ui/badge";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "./ui/card";

export function RoomList() {
  const { data: rooms, isLoading } = useRoom();

  return (
    <Card>
      <CardHeader>
        <CardTitle>Salas recentes</CardTitle>
        <CardDescription>Acesso rápido às salas mais recentes</CardDescription>
      </CardHeader>
      <CardContent className="gap3 flex flex-col">
        {isLoading && (
          <p className="text-muted-foreground text-sm">Carregando salas...</p>
        )}
        {rooms?.map((room) => {
          return (
            <Link
              className="flex items-center justify-between rounded-lg border p-3 hover:bg-accent/50"
              key={room.id}
              to={`/room/${room.id}`}
            >
              <div className="flex flex-1 flex-col gap-1">
                <h3 className="font-medium">{room.name}</h3>
                <div className="flex items-center gap-2">
                  <Badge className="text-xs" variant="secondary">
                    {formatRelativeDate(room.createdAt)}
                  </Badge>
                  <Badge className="text-xs" variant="secondary">
                    {room.questionsCount} pergunta(s)
                  </Badge>
                </div>
              </div>
              <span className="flex items-center gap-1 text-sm ">
                Entrar
                <ArrowRight className="size-3" />
              </span>
            </Link>
          );
        })}
      </CardContent>
    </Card>
  );
}
