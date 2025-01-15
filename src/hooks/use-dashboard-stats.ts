import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { useEffect, useState } from "react";

interface DashboardStats {
  totalUsers: number;
  activeProjects: number;
  completedTasksPercentage: number;
}

export function useDashboardStats() {
  const [stats, setStats] = useState<DashboardStats>({
    totalUsers: 0,
    activeProjects: 0,
    completedTasksPercentage: 0
  });
  const [loading, setLoading] = useState(true);
  const supabase = createClientComponentClient();

  useEffect(() => {
    async function fetchStats() {
      const [usersCount, projectsCount, tasksStats] = await Promise.all([
        supabase.from('team_members').select('id', { count: 'exact' }),
        supabase.from('projects').select('id', { count: 'exact' }).eq('status', 'active'),
        supabase.from('tasks').select('status')
      ]);

      if (tasksStats.data) {
        const completedTasks = tasksStats.data.filter(t => t.status === 'completed').length;
        const totalTasks = tasksStats.data.length;
        const percentage = totalTasks > 0 ? Math.round((completedTasks / totalTasks) * 100) : 0;

        setStats({
          totalUsers: usersCount.count || 0,
          activeProjects: projectsCount.count || 0,
          completedTasksPercentage: percentage
        });
      }
      setLoading(false);
    }

    fetchStats();
  }, []);

  return { stats, loading };
} 