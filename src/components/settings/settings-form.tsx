"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { useAuth } from "@/hooks/use-auth";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";

const profileSchema = z.object({
  name: z.string().min(2, "El nombre debe tener al menos 2 caracteres"),
});

const passwordSchema = z.object({
  currentPassword: z.string().min(6, "La contraseña debe tener al menos 6 caracteres"),
  newPassword: z.string().min(6, "La contraseña debe tener al menos 6 caracteres"),
}).refine((data) => data.currentPassword !== data.newPassword, {
  message: "La nueva contraseña debe ser diferente a la actual",
  path: ["newPassword"],
});

export function SettingsForm() {
  const { updateProfile, updatePassword } = useAuth();
  const [error, setError] = useState("");

  const profileForm = useForm({
    resolver: zodResolver(profileSchema),
    defaultValues: {
      name: "",
    },
  });

  const passwordForm = useForm({
    resolver: zodResolver(passwordSchema),
    defaultValues: {
      currentPassword: "",
      newPassword: "",
    },
  });

  async function onProfileSubmit(data: z.infer<typeof profileSchema>) {
    try {
      await updateProfile(data);
      setError("");
    } catch (error) {
      setError("Error al actualizar el perfil");
    }
  }

  async function onPasswordSubmit(data: z.infer<typeof passwordSchema>) {
    try {
      await updatePassword(data.newPassword);
      passwordForm.reset();
      setError("");
    } catch (error) {
      setError("Error al actualizar la contraseña");
    }
  }

  return (
    <div className="space-y-6">
      {error && (
        <div className="p-3 bg-destructive/15 text-destructive text-sm rounded-md">
          {error}
        </div>
      )}
      
      <Form {...profileForm}>
        <form onSubmit={profileForm.handleSubmit(onProfileSubmit)} className="space-y-4">
          <FormField
            control={profileForm.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Nombre</FormLabel>
                <FormControl>
                  <Input {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button type="submit">Guardar cambios</Button>
        </form>
      </Form>

      <Form {...passwordForm}>
        <form onSubmit={passwordForm.handleSubmit(onPasswordSubmit)} className="space-y-4">
          <FormField
            control={passwordForm.control}
            name="currentPassword"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Contraseña actual</FormLabel>
                <FormControl>
                  <Input type="password" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={passwordForm.control}
            name="newPassword"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Nueva contraseña</FormLabel>
                <FormControl>
                  <Input type="password" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button type="submit">Actualizar contraseña</Button>
        </form>
      </Form>
    </div>
  );
} 