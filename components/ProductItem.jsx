import Image from "next/image";
import Link from "next/link";
import { FaRegBookmark } from "react-icons/fa";
import { HiOutlineHeart } from "react-icons/hi";
import { Card, CardContent, CardFooter, CardHeader } from "./ui/card";

const ProductItem = ({ product }) => {
  const truncatedDescription =
    product.description.length > 160
      ? `${product.description.substring(0, 160)}...`
      : product.description;

  const formattedDate = new Intl.DateTimeFormat("pt-BR", {
    day: "2-digit",
    month: "long",
    year: "numeric",
  }).format(new Date(product.createdAt));

  return (
    <div className="flex justify-center items-center min-h-screen-40">
      <Card className="bg-[#6a8475] flex flex-col h-full m-4 md:m-5 w-full sm:w-11/12 md:w-3/4 lg:w-1/2 xl:w-[61.3333%] max-w-2xl">
        <CardHeader>
          <Link href={`/${product.id}`}>
            <div className="relative w-full h-40 mb-4 rounded-lg overflow-hidden">
              <Image
                src={product.image}
                alt={`Imagem de ${product.title}`}
                layout="fill"
                objectFit="contain"
              />
            </div>
          </Link>
        </CardHeader>
        <CardContent className="flex-1 text-center ">
          {/* Exibe a data formatada */}
          <p className="text-xs text-gray-400">{formattedDate}</p>

          <Link href={`/${product.id}`}>
            <h2 className="my-2 text-lg font-bold leading-tight text-gray-900 dark:text-white">
              {product.title}
            </h2>
          </Link>

          {/* Descrição do produto */}
          <p className="font-light text-sm text-gray-500 dark:text-gray-400">
            {truncatedDescription}
          </p>
        </CardContent>
        <CardFooter className="flex items-center justify-center">
          {/* Preço formatado em BRL */}
          <p className="text-sm font-bold text-gray-900 dark:text-white">
            R${product.price.toFixed(2).replace(".", ",")} BRL
          </p>

          {/* Ícones de interação */}
          <div className="flex items-center ml-4">
            <div className="p-2 hover:bg-gray-100 dark:hover:bg-gray-600 cursor-pointer">
              <HiOutlineHeart className="h-6 w-6" />
            </div>

            <div className="p-2 hover:bg-gray-100 dark:hover:bg-gray-600 cursor-pointer">
              <FaRegBookmark className="h-5 w-5" />
            </div>
          </div>
        </CardFooter>
      </Card>
    </div>
  );
};

export default ProductItem;