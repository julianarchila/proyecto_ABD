"use client";
import {
  CardTitle,
  CardDescription,
  CardHeader,
  CardContent,
  Card,
} from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { useState } from "react";
import { login } from "@/lib/api";
import { saveUser } from "@/lib/auth";
import { useRouter } from "next/navigation";

type LoginFormData = {
  password: string;
  email: string;
};

export default function LoginPage() {
  const [formData, setFormData] = useState<LoginFormData>({
    password: "",
    email: "",
  });

  const router = useRouter();

  const handleSubmit = async () => {
    console.log(formData);

    try {
      const res = await login(formData);
      const data = await res.json();

      if (res.status !== 200) {
        if (data.detail === "Incorrect email or password") {
          alert("Correo o contraseña incorrectos");
          return;
        }
      }

      console.log({ data });
      localStorage.setItem("user", JSON.stringify(data));

      router.push("/");

      if (data)
        setFormData({
          password: "",
          email: "",
        });
    } catch (error: any) {
      console.log("Heyyyyy");
    }
  };

  return (
    <Card className="mx-auto max-w-md">
      <CardHeader className="space-y-2">
        <CardTitle className="text-3xl font-bold text-center">
          Iniciar Sesión
        </CardTitle>
        <CardDescription className="text-zinc-500 dark:text-zinc-400 text-center">
          Por favor ingresa tu correo electrónico y contraseña
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="email">Correo Electrónico</Label>
          <Input
            onChange={(e) => {
              setFormData({
                ...formData,
                email: e.target.value,
              });
            }}
            id="email"
            placeholder="m@ejemplo.com"
            required
            type="email"
            value={formData.email}
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="password">Contraseña</Label>
          <Input
            onChange={(e) => {
              setFormData({
                ...formData,
                password: e.target.value,
              });
            }}
            id="password"
            required
            type="password"
            value={formData.password}
          />
        </div>
        <Button onClick={handleSubmit} className="w-full" type="submit">
          Iniciar Sesión
        </Button>
        <p className="text-center mt-4 text-zinc-600 dark:text-zinc-300">
          ¿No tienes una cuenta?
          <Link
            className="ml-1 text-blue-500 dark:text-blue-400"
            href="/signup"
          >
            Regístrate
          </Link>
        </p>
      </CardContent>
    </Card>
  );
}
