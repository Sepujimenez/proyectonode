import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col">
      <header className="border-b">
        <div className="container mx-auto flex h-16 items-center justify-between px-4">
          <div className="flex items-center gap-2">
            <Image
              src="/next.svg"
              alt="Logo"
              width={100}
              height={24}
              priority
            />
          </div>
          <nav className="flex items-center gap-4">
            <Link href="/login">
              <Button variant="ghost">Iniciar sesión</Button>
            </Link>
            <Link href="/register">
              <Button>Crear cuenta</Button>
            </Link>
          </nav>
        </div>
      </header>

      <main className="flex-1">
        <section className="container mx-auto px-4 py-24 text-center">
          <h1 className="mb-6 text-4xl font-bold tracking-tight sm:text-6xl">
            Gestiona tus proyectos
          </h1>
          <p className="mx-auto mb-12 max-w-2xl text-lg text-muted-foreground">
            Una plataforma moderna para gestionar tus proyectos y equipos de manera eficiente.
            Organiza, colabora y alcanza tus objetivos.
          </p>
          <div className="flex justify-center gap-4">
            <Link href="/register">
              <Button size="lg">Comenzar ahora</Button>
            </Link>
            <Link href="/login">
              <Button variant="outline" size="lg">
                Iniciar sesión
              </Button>
            </Link>
          </div>
        </section>
      </main>

      <footer className="border-t">
        <div className="container mx-auto px-4 py-6">
          <p className="text-center text-sm text-muted-foreground">
            © {new Date().getFullYear()} Tu Empresa. Todos los derechos reservados.
          </p>
        </div>
      </footer>
    </div>
  );
}
