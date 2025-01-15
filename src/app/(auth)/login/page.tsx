import { LoginForm } from "@/components/auth/login-form";

export default function LoginPage() {
  return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="w-full max-w-md space-y-8 px-4">
        <div className="text-center">
          <h1 className="text-2xl font-bold">Iniciar sesión</h1>
          <p className="text-muted-foreground">
            Ingresa tus credenciales para continuar
          </p>
        </div>
        <LoginForm />
      </div>
    </div>
  );
}
