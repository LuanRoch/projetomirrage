import Image from "next/image";
import Link from "next/link";
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
    <Card className="bg-white shadow-md rounded-lg overflow-hidden hover:shadow-lg transition-shadow duration-300">
    
      <CardHeader className="relative h-48 flex justify-center items-center">
        <Link href={`/${product.id}`}>
          <div className="relative w-40 h-40">
            <Image
              src={product.image}
              alt={`Imagem de ${product.title}`}
              layout="fill"
              objectFit="cover"
              className="rounded-lg"
            />
          </div>
        </Link>
      </CardHeader>

    
      <CardContent className="p-4 text-center">
       
        <Link href={`/${product.id}`}>
          <h2 className="text-lg font-nunito text-gray-900 mb-2 hover:text-blue-600 transition-colors duration-300">
            {product.title}
          </h2>
        </Link>

       
      </CardContent>

      
      <CardFooter className="flex items-center justify-center p-4 bg-gray-50">
       
        <p className="text-lg font-nunito text-gray-900">
          R${product.price.toFixed(2).replace(".", ",")}
        </p>
      </CardFooter>
    </Card>
  );
};

export default ProductItem;