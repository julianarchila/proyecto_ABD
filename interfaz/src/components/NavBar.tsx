"use client";
import Link from "next/link";
import React, { useEffect, useState } from "react";

import { Button } from "@/components/ui/button";
import { getUser } from "@/lib/auth";
import type { User } from "@/lib/auth";

function NavBar() {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const u = getUser();

    console.log({ u });
    setUser(u);
  }, []);

  return (
    <header className="w-full p-4 flex justify-between items-center bg-white shadow-md dark:bg-gray-900">
      <Link
        className="text-lg font-bold text-blue-500 dark:text-blue-300"
        href="#"
      >
        Home
      </Link>
      {user && (
        <div className="flex space-x-4">
          <Link
            className="text-lg text-blue-500 dark:text-blue-300"
            href="/transactions"
          >
            Historial de transacciones
          </Link>
          <Button
            variant="outline"
            onClick={() => {
              localStorage.removeItem("user");
              setUser(null);
            }}
          >
            Logout
          </Button>
        </div>
      )}

      {!user && (
        <div className="flex space-x-4">
          <Link
            className="text-lg text-blue-500 dark:text-blue-300"
            href="/login"
          >
            Iniciar sesión
          </Link>
          <Link
            className="text-lg text-blue-500 dark:text-blue-300"
            href="/signup"
          >
            Registrarse
          </Link>
        </div>
      )}
    </header>
  );
}

export default NavBar;
