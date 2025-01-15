import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { useEffect, useState } from "react";

interface TeamMember {
  id: string;
  name: string;
  email: string;
  role: string;
  avatar_url: string | null;
}

export function useTeam() {
  const [members, setMembers] = useState<TeamMember[]>([]);
  const [loading, setLoading] = useState(true);
  const supabase = createClientComponentClient();

  useEffect(() => {
    async function fetchTeam() {
      const { data, error } = await supabase
        .from('team_members')
        .select('*')
        .order('created_at', { ascending: false });

      if (!error && data) {
        setMembers(data);
      }
      setLoading(false);
    }

    fetchTeam();
  }, []);

  return { members, loading };
} 