"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { useTeam } from "@/hooks/use-team";

export default function TeamPage() {
  const { members, loading } = useTeam();

  if (loading) {
    return <div>Cargando equipo...</div>;
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">Equipo</h2>
          <p className="text-muted-foreground">
            Gestiona los miembros de tu equipo
          </p>
        </div>
        <Button>
          <Plus className="mr-2 h-4 w-4" />
          Invitar Miembro
        </Button>
      </div>
      <div className="divide-y rounded-lg border">
        {members.map((member) => (
          <div
            key={member.id}
            className="flex items-center justify-between p-4"
          >
            <div className="flex items-center space-x-4">
              <Avatar>
                <AvatarImage src={member.avatar_url || ""} alt={member.name} />
                <AvatarFallback>
                  {member.name.split(" ").map((n) => n[0]).join("")}
                </AvatarFallback>
              </Avatar>
              <div>
                <p className="text-sm font-medium">{member.name}</p>
                <p className="text-sm text-muted-foreground">{member.email}</p>
              </div>
            </div>
            <div className="text-sm text-muted-foreground">{member.role}</div>
          </div>
        ))}
      </div>
    </div>
  );
} 