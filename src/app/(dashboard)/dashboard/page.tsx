"use client";

import { StatCard } from "@/components/dashboard/stat-card";
import { ProjectsTable } from "@/components/dashboard/projects-table";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/hooks/use-auth";
import { useDashboardStats } from "@/hooks/use-dashboard-stats";
import { Users, FileText, CheckCircle } from "lucide-react";

export default function DashboardPage() {
  const { signOut } = useAuth();
  const { stats, loading } = useDashboardStats();

  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-3xl font-bold tracking-tight">Dashboard</h2>
        <p className="text-muted-foreground">
          Bienvenido a tu panel de control
        </p>
      </div>
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        <StatCard
          title="Total Usuarios"
          value={loading ? "Cargando..." : stats.totalUsers.toString()}
          icon={<Users className="h-4 w-4 text-muted-foreground" />}
        />
        <StatCard
          title="Proyectos Activos"
          value={loading ? "Cargando..." : stats.activeProjects.toString()}
          icon={<FileText className="h-4 w-4 text-muted-foreground" />}
        />
        <StatCard
          title="Tareas Completadas"
          value={loading ? "Cargando..." : `${stats.completedTasksPercentage}%`}
          icon={<CheckCircle className="h-4 w-4 text-muted-foreground" />}
        />
      </div>
      <div className="rounded-lg border">
        <div className="p-6">
          <h3 className="text-lg font-medium">Proyectos Recientes</h3>
          <ProjectsTable />
        </div>
      </div>
      <Button onClick={signOut} variant="outline">
        Cerrar sesión
      </Button>
    </div>
  );
}
