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
    month: "long", // Full month name
    day: "2-digit", // Two-digit day
    year: "numeric", // Full year
  }).format(new Date(product.createdAt));

  return (
    <Card className="flex flex-col h-full m-4 md:m-0">
      <CardHeader>
        <Link href={`/${product.id}`}>
          <div className="relative w-full h-40 mb-4">
            <Image
              src={product.image}
              alt={`${product.title} Image`}
              layout="fill"
              objectFit="contain"
            />
          </div>
        </Link>
      </CardHeader>
      <CardContent className="flex-1">
        <p className="text-xs text-gray-400">{formattedDate}</p>

        <Link href={`/${product.id}`}>
          <h2 className="my-2 text-lg font-bold leading-tight text-gray-900 dark:text-white">
            {product.title}
          </h2>
        </Link>

        <p className="font-light text-sm text-gray-500 dark:text-gray-400">
          {truncatedDescription}
        </p>
      </CardContent>
      <CardFooter className="flex items-center justify-between">
        <p className="text-sm font-bold text-gray-900 dark:text-white">
          R${product.price} BRL
        </p>

        <div className="flex items-center">
          <div className="p-2 hover:bg-gray-100 dark:hover:bg-gray-600 cursor-pointer">
            <HiOutlineHeart className="h-6 w-6" />
          </div>

          <div className="p-2 hover:bg-gray-100 dark:hover:bg-gray-600 cursor-pointer">
            <FaRegBookmark className="h-5 w-5" />
          </div>
        </div>
      </CardFooter>
    </Card>
  );
};

export default ProductItem;
