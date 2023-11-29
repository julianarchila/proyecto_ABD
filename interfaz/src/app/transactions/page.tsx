"use client";
import {
  TransactionGet,
  TransactionPost,
  getUserTransactions,
} from "@/lib/api";
import { User, getUser } from "@/lib/auth";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";

import { Badge } from "@/components/ui/badge";
import { CardContent, Card } from "@/components/ui/card";
import NavBar from "@/components/NavBar";

function page() {
  const [user, setUser] = useState<User | null>(null);
  const router = useRouter();

  const [transactions, setTransactions] = useState<TransactionGet[]>([]);

  useEffect(() => {
    const u = getUser();

    if (!u) {
      router.push("/login");
      return;
    }

    const fetchTransactions = async () => {
      try {
        const res = await getUserTransactions(u.id);
        const data = (await res.json()) as TransactionGet[];

        if (!res.ok) {
          alert("Error al obtener las transacciones");
          return;
        }

        if (transactions.length !== 0) return;

        setTransactions(data);
        console.log({ data });
      } catch (error) {
        console.log({ error });
      }
    };

    fetchTransactions();

    console.log({ u });
    setUser(u);
  }, []);

  return (
    <div className="flex flex-col w-full">
      <NavBar />
      <h1 className="text-2xl font-semibold px-4 md:px-6">Transactions</h1>
      <div className="grid gap-4 p-4 md:gap-8 md:p-6">
        {transactions.map((transaction, i) => (
          <TransactionItem transaction={transaction} key={i} />
        ))}
      </div>
    </div>
  );
}

export default page;

function TransactionItem({ transaction }: { transaction: TransactionGet }) {
  // used_chip means that the chip was used to make the transaction, aka contactless
  // used_pin_number means that the pin number was used to make the transaction, (online purchase)
  // fraud means that the transaction was fraudulent

  return (
    <Card className={transaction.fraud ? "bg-red-400" : ""}>
      <CardContent className="grid gap-2">
        <div className="flex items-center justify-between">
          <h2 className="font-medium">{transaction.retailer}</h2>
          <Badge className="font-normal">
            {transaction.online_order ? "Online" : "Fisico"}
          </Badge>
        </div>
        <div className="text-gray-500 dark:text-gray-400">
          Location: {transaction.location}
        </div>
        <div>
          Distancia a la casa: {transaction.distance_from_home.toFixed(2)} km
        </div>

        <div className="text-gray-500 dark:text-gray-400">
          Distancia- Ultima transaccion :{" "}
          {transaction.distance_from_last_transaction.toFixed(2)} km
        </div>

        <div>
          Ratio a la compra media:{" "}
          {transaction.ratio_to_median_purchase_price.toFixed(2)}
        </div>

        <div className="font-bold text-right">${transaction.price}</div>
      </CardContent>
    </Card>
  );
}
