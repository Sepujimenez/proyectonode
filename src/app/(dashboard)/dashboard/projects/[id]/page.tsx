"use server";

import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import { Badge } from "@/components/ui/badge";
import { EditProjectDialog } from "@/components/projects/edit-project-dialog";
import { formatDistanceToNow } from "date-fns";
import { es } from "date-fns/locale";

interface Project {
  id: string;
  name: string;
  description: string | null;
  status: "active" | "completed" | "archived";
  created_at: string;
}

type Props = {
  params: {
    id: string;
  };
  searchParams: { [key: string]: string | string[] | undefined };
};

export default async function ProjectPage({ params, searchParams }: Props) {
  const supabase = createServerComponentClient({ cookies });
  
  const { data: project } = await supabase
    .from("projects")
    .select("*")
    .eq("id", params.id)
    .single();

  if (!project) {
    return <div>Proyecto no encontrado</div>;
  }

  return (
    <div className="space-y-6">
      <div className="space-y-2">
        <div className="flex items-center gap-4">
          <h2 className="text-3xl font-bold tracking-tight">{project.name}</h2>
          <EditProjectDialog 
            project={project} 
            onUpdate={() => window.location.reload()} 
          />
          <Badge
            variant={
              project.status === "active"
                ? "default"
                : project.status === "completed"
                ? "success"
                : "secondary"
            }
          >
            {project.status}
          </Badge>
        </div>
        <p className="text-muted-foreground">
          Creado {formatDistanceToNow(new Date(project.created_at), {
            addSuffix: true,
            locale: es,
          })}
        </p>
      </div>
      <div className="space-y-4">
        <h3 className="text-lg font-medium">Descripción</h3>
        <p className="text-muted-foreground">
          {project.description || "Sin descripción"}
        </p>
      </div>
    </div>
  );
} 