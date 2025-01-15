"use client";

import { useEffect, useState } from "react";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { Skeleton } from "@/components/ui/skeleton";
import { Badge } from "@/components/ui/badge";
import { formatDistanceToNow } from "date-fns";
import { es } from "date-fns/locale";
import { EditProjectDialog } from "@/components/projects/edit-project-dialog";

interface Project {
  id: string;
  name: string;
  description: string | null;
  status: "active" | "completed" | "archived";
  created_at: string;
}

export default function ProjectPage({ params }: { params: { id: string } }) {
  const [project, setProject] = useState<Project | null>(null);
  const [loading, setLoading] = useState(true);
  const supabase = createClientComponentClient();

  useEffect(() => {
    async function loadProject() {
      const { data, error } = await supabase
        .from("projects")
        .select("*")
        .eq("id", params.id)
        .single();

      if (!error && data) {
        setProject(data);
      }
      setLoading(false);
    }

    loadProject();
  }, [params.id, supabase]);

  if (loading) {
    return (
      <div className="space-y-6">
        <div className="space-y-2">
          <Skeleton className="h-8 w-[200px]" />
          <Skeleton className="h-4 w-[300px]" />
        </div>
        <div className="space-y-4">
          <Skeleton className="h-4 w-[100px]" />
          <Skeleton className="h-20 w-full" />
        </div>
      </div>
    );
  }

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