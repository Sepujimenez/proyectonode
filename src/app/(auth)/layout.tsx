import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="grid lg:grid-cols-2 min-h-screen">
      {/* Lado izquierdo - Contenido */}
      <div className="flex items-center justify-center p-8">
        {children}
      </div>

      {/* Lado derecho - Banner */}
      <div className="hidden lg:flex flex-col justify-between p-8 bg-muted">
        <div className="flex justify-end">
          <Button variant="ghost" asChild>
            <Link href="/">Volver al inicio</Link>
          </Button>
        </div>
        <div className="space-y-4">
          <h1 className="text-3xl font-bold">
            Bienvenido a nuestra plataforma
          </h1>
          <p className="text-muted-foreground">
            Gestiona tus proyectos de manera eficiente y segura
          </p>
        </div>
        <p className="text-sm text-muted-foreground">
          &copy; {new Date().getFullYear()} Tu Empresa. Todos los derechos reservados.
        </p>
      </div>
    </div>
  );
} 
