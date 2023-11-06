import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { SelectValue, SelectTrigger, SelectItem, SelectGroup, SelectContent, Select } from "@/components/ui/select"

export default function Home() {
  return (
    <main className="w-full h-screen flex flex-col items-center bg-gray-100 dark:bg-gray-800">
      <header className="w-full p-4 flex justify-between items-center bg-white shadow-md dark:bg-gray-900">
        <Link className="text-lg font-bold text-blue-500 dark:text-blue-300" href="#">
          Home
        </Link>
        <div className="flex space-x-4">
          <Link className="text-lg text-blue-500 dark:text-blue-300" href="#">
            Historial de transacciones
          </Link>
          <Button variant="outline">Perfil</Button>
        </div>
      </header>
      <form className="w-1/2 mt-10 flex flex-col space-y-4 bg-white p-6 rounded-md shadow-lg dark:bg-gray-700">
        <Input
          className="border border-gray-200 rounded-md p-2 dark:border-gray-600 dark:bg-gray-800"
          placeholder="Lugar de la compra"
          type="text"
        />
        <Input
          className="border border-gray-200 rounded-md p-2 dark:border-gray-600 dark:bg-gray-800"
          placeholder="Valor de la compra"
          type="number"
        />
        <Select>
          <SelectTrigger>
            <SelectValue placeholder="Selecciona el tipo de tarjeta" />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              <SelectItem value="fisical">Tarjeta Fisica</SelectItem>
              <SelectItem value="digital">Tarjeta Digital</SelectItem>
            </SelectGroup>
          </SelectContent>
        </Select>
        <Button className="bg-blue-500 hover:bg-blue-600 text-white py-2 rounded-md" type="submit">
            Enviar
        </Button>
      </form>
    </main>
  )
}

