'use client';

import { SettingsForm } from "@/components/settings/settings-form";

export default function SettingsPage() {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-3xl font-bold tracking-tight">Configuración</h2>
        <p className="text-muted-foreground">
          Administra tu cuenta y preferencias
        </p>
      </div>
      <div className="grid gap-6">
        <SettingsForm />
      </div>
    </div>
  );
} 