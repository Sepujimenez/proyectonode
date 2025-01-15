"use client";

import { useProjects } from "@/hooks/use-projects";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { formatDistanceToNow } from "date-fns";
import { es } from "date-fns/locale";
import { CreateProjectDialog } from "@/components/projects/create-project-dialog";
import Link from "next/link";

export function ProjectsTable() {
  const { projects, loading } = useProjects();

  if (loading) {
    return <div>Cargando proyectos...</div>;
  }

  return (
    <div className="space-y-4">
      <div className="flex justify-end">
        <CreateProjectDialog />
      </div>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Nombre</TableHead>
            <TableHead>Estado</TableHead>
            <TableHead>Última Actualización</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {projects.map((project) => (
            <TableRow key={project.id}>
              <TableCell className="font-medium">
                <Link 
                  href={`/dashboard/projects/${project.id}`}
                  className="hover:underline"
                >
                  {project.name}
                </Link>
              </TableCell>
              <TableCell>
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
              </TableCell>
              <TableCell>
                {formatDistanceToNow(new Date(project.created_at), {
                  addSuffix: true,
                  locale: es,
                })}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
} 