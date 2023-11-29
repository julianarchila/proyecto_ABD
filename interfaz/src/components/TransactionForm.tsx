// "use client";
// import React from "react";

// import type { TransactionPost } from "@/lib/api";
// import { Button } from "@/components/ui/button";
// import { Input } from "@/components/ui/input";
// import {
//   SelectValue,
//   SelectTrigger,
//   SelectItem,
//   SelectGroup,
//   SelectContent,
//   Select,
// } from "@/components/ui/select";
// import NavBar from "@/components/NavBar";

// import { useEffect, useState } from "react";
// import { User, getUser } from "@/lib/auth";
// import { useRouter } from "next/navigation";

// function TransactionForm() {
//   const router = useRouter();
//   const [user, setUser] = useState<User | null>(null);

//   useEffect(() => {
//     const u = getUser();

//     if (!u) {
//       router.push("/login");
//     }

//     console.log({ u });
//     setUser(u);
//   }, []);

//   const [formData, setFormData] = React.useState<TransactionPost>({
//     price: 0,
//     location: [0, 0],
//     online_order: false,
//     retailer: "",
//     used_chip: true,
//     used_pin_number: false,
//     user_id: user?.id || 0,
//   });

//   const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
//     e.preventDefault();
//   };

//   return (
//     <form className="w-1/2 mt-10 flex flex-col space-y-4 bg-white p-6 rounded-md shadow-lg dark:bg-gray-700">
//       <Input
//         className="border border-gray-200 rounded-md p-2 dark:border-gray-600 dark:bg-gray-800"
//         placeholder="Lugar de la compra"
//         type="text"
//       />
//       <Input
//         className="border border-gray-200 rounded-md p-2 dark:border-gray-600 dark:bg-gray-800"
//         placeholder="Valor de la compra"
//         type="number"
//       />
//       <Select>
//         <SelectTrigger>
//           <SelectValue placeholder="Selecciona el tipo de tarjeta" />
//         </SelectTrigger>
//         <SelectContent>
//           <SelectGroup>
//             <SelectItem value="fisical">Tarjeta Fisica</SelectItem>
//             <SelectItem value="digital">Tarjeta Digital</SelectItem>
//           </SelectGroup>
//         </SelectContent>
//       </Select>
//       <Button
//         className="bg-blue-500 hover:bg-blue-600 text-white py-2 rounded-md"
//         type="submit"
//       >
//         Enviar
//       </Button>
//     </form>
//   );
// }

// export default TransactionForm;
"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { getUser, User } from "@/lib/auth";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Label } from "./ui/label";

function TransactionForm() {
  const router = useRouter();
  const [user, setUser] = useState<User | null>(null);
  const [formData, setFormData] = useState({
    price: undefined,
    lat: undefined,
    long: undefined,
    online_order: false,
    retailer: "",
    used_chip: true,
    used_pin_number: false,
    user_id: 0,
  });

  useEffect(() => {
    const u = getUser();

    if (!u) {
      router.push("/login");
    }

    let user_location = u?.home_location.split(",");
    if (!user_location) user_location = ["0", "0"];

    setUser(u);
    setFormData((prevFormData) => ({
      ...prevFormData,
      user_id: u?.id || 0,
    }));
  }, []);

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    // const { name, value, type, checked } = e.target;

    const { name, value } = e.target;

    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));

    // setFormData((prevFormData) => ({
    //   ...prevFormData,
    //   [name]: type === "checkbox" ? checked : value,
    // }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    console.log({ formData });

    const bodyData = {
      ...formData,
      location: [formData.lat, formData.long],
    };

    try {
      const response = await fetch(
        process.env.NEXT_PUBLIC_API_URL + "/transactions",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(bodyData),
        }
      );

      if (response.ok) {
        const data = await response.json();
        console.log("Transaction successful:", data);

        if (data.fraud === true) alert("Transacción fraudulenta");
        else alert("Transacción no fraudulenta");

        setFormData({
          price: undefined,
          lat: undefined,
          long: undefined,
          online_order: false,
          retailer: "",
          used_chip: true,
          used_pin_number: false,
          user_id: user?.id || 0,
        });

        // Handle successful response data if needed
      } else {
        console.error("Transaction failed:", response.statusText);
        alert("Error al realizar la transacción");
        // Handle error response if needed
      }
    } catch (error) {
      alert("Ha ocurrido un error");
      console.error("Error:", error);
      // Handle other errors if needed
    }
  };

  return (
    <form
      className="w-1/2 mt-10 flex flex-col space-y-4 bg-white p-6 rounded-md shadow-lg dark:bg-gray-700"
      onSubmit={handleSubmit}
    >
      <Label htmlFor="retailer">Retailer</Label>
      <Input
        className="border border-gray-200 rounded-md p-2 dark:border-gray-600 dark:bg-gray-800"
        placeholder="Lugar de la compra"
        type="text"
        name="retailer"
        onChange={handleInputChange}
        value={formData.retailer}
      />
      <Label htmlFor="price">Price</Label>
      <Input
        className="border border-gray-200 rounded-md p-2 dark:border-gray-600 dark:bg-gray-800"
        placeholder="Valor de la compra"
        type="number"
        name="price"
        value={formData.price}
        onChange={handleInputChange}
      />
      <Label htmlFor="lat">Lat</Label>
      <Input
        className="border border-gray-200 rounded-md p-2 dark:border-gray-600 dark:bg-gray-800"
        placeholder="lat"
        type="number"
        name="lat"
        value={formData.lat}
        onChange={handleInputChange}
      />

      <Label htmlFor="long">Long</Label>
      <Input
        className="border border-gray-200 rounded-md p-2 dark:border-gray-600 dark:bg-gray-800"
        placeholder="long"
        type="number"
        name="long"
        value={formData.long}
        onChange={handleInputChange}
      />

      {/* usedChip */}
      <Label htmlFor="used_chip">Uso chip?</Label>
      <Input
        type="number"
        placeholder="1 = true, 0 = false"
        name="used_chip"
        checked={formData.used_chip}
        onChange={handleInputChange}
      />

      {/* used pin number */}
      <Label htmlFor="used_pin_number">Uso pin number?</Label>
      <Input
        type="number"
        placeholder="1 = true, 0 = false"
        name="used_pin_number"
        checked={formData.used_pin_number}
        onChange={handleInputChange}
      />

      {/* Online order */}
      <Label htmlFor="online_order">Compra online?</Label>
      <Input
        type="number"
        placeholder="1 = true, 0 = false"
        name="online_order"
        checked={formData.online_order}
        onChange={handleInputChange}
      />

      {/* Add other input fields as needed */}
      <Button
        className="bg-blue-500 hover:bg-blue-600 text-white py-2 rounded-md"
        type="submit"
      >
        Enviar
      </Button>
    </form>
  );
}

export default TransactionForm;
