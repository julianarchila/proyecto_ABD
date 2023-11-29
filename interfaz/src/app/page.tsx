import NavBar from "@/components/NavBar";

import TransactionForm from "@/components/TransactionForm";

export default function Home() {
  return (
    <main className="w-full h-screen flex flex-col items-center bg-gray-100 dark:bg-gray-800">
      <NavBar />
      <TransactionForm />
    </main>
  );
}
