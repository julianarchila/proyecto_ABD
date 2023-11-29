"use client";
import { CardTitle, CardHeader, CardContent, Card } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { useState } from "react";
import { register } from "@/lib/api";
import { useRouter } from "next/navigation";

type SignupFormData = {
  email: string;
  password: string;
  latitude: string;
  longitude: string;
};

export default function SignupPage() {
  const router = useRouter();
  const [formData, setFormData] = useState<SignupFormData>({
    email: "",
    password: "",
    latitude: "",
    longitude: "",
  });

  const handleSubmit = async () => {
    console.log(formData);

    try {
      const res = await register({
        email: formData.email,
        password: formData.password,
        home_location: [Number(formData.latitude), Number(formData.longitude)],
      });

      const data = await res.json();
      if (res.status !== 200) {
        alert("Error al registrarse");
        console.log({ data });
        return;
        // if (data.detail === "User already exists") {
        //   alert("El usuario ya existe");
        //   return;
        // }
      }

      console.log({ data });
      localStorage.setItem("user", JSON.stringify(data));
      router.push("/");

      if (data)
        setFormData({
          email: "",
          password: "",
          latitude: "",
          longitude: "",
        });
    } catch (error: any) {
      console.log("Error in signup");
    }
  };

  return (
    <Card className="mx-auto max-w-md p-6 space-y-6 bg-white dark:bg-zinc-800 shadow-md rounded-xl">
      <CardHeader>
        <CardTitle className="text-2xl font-bold text-center">
          Registrarse
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="email">Correo Electrónico</Label>
            <Input
              id="email"
              placeholder="ejemplo@dominio.com"
              required
              type="email"
              value={formData.email}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  email: e.target.value,
                })
              }
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="password">Contraseña</Label>
            <Input
              id="password"
              placeholder="Contraseña Segura"
              required
              type="password"
              value={formData.password}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  password: e.target.value,
                })
              }
            />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="latitude">Latitud</Label>
              <Input
                type="number"
                id="latitude"
                placeholder="Latitud (ej., 40.7128)"
                required
                value={formData.latitude}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    latitude: e.target.value,
                  })
                }
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="longitude">Longitud</Label>
              <Input
                type="number"
                id="longitude"
                placeholder="Longitud (ej., 74.0060)"
                required
                value={formData.longitude}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    longitude: e.target.value,
                  })
                }
              />
            </div>
          </div>
        </div>
        <Button
          onClick={handleSubmit}
          className="w-full  font-bold py-2 px-4 rounded"
          type="submit"
        >
          Registrarse
        </Button>
        <div className="text-center">
          <span className="text-gray-600 dark:text-gray-300">
            ¿Ya tienes una cuenta?{" "}
          </span>
          <Link className="text-blue-500 hover:underline" href="/login">
            Iniciar sesión
          </Link>
        </div>
      </CardContent>
    </Card>
  );
}
