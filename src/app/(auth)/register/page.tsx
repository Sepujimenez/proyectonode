import { RegisterForm } from "@/components/auth/register-form";

export default function RegisterPage() {
  return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="w-full max-w-md space-y-8 px-4">
        <div className="text-center">
          <h1 className="text-2xl font-bold">Crear cuenta</h1>
          <p className="text-muted-foreground">
            Ingresa tus datos para registrarte
          </p>
        </div>
        <RegisterForm />
      </div>
    </div>
  );
} 
