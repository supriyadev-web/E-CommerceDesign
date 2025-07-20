import React, { useContext, useEffect, useState } from "react";
import Layout from "../layout/Layout";
import { useParams } from "react-router-dom";
import { ShopContext } from "../context/ShopContext";
import { assets } from "../assets/assets";
import RelatedProducts from "../components/RelatedProducts";

const Product = () => {
  const { productId } = useParams();
  const { products, currency, addToCart } = useContext(ShopContext);
  const [productData, setProductData] = useState(null);
  const [image, setImage] = useState("");
  const [size, setSize] = useState("");

  useEffect(() => {
    const foundProduct = products.find((item) => item._id === productId);
    if (foundProduct) {
      setProductData(foundProduct);
      setImage(foundProduct.image[0]);
    }
  }, [productId, products]);

  if (!productData) {
    return <div className="text-center py-10 text-gray-500">Loading...</div>;
  }

  return (
    <Layout title="Fashion - Product">
      <div className="border-t-2 pt-10 transition-opacity ease-in duration-500 opacity-100">
        {/* Product Section */}
        <div className="flex gap-12 sm:gap-12 flex-col sm:flex-row">
          {/* Image Gallery */}
          <div className="flex-1 flex flex-col-reverse gap-3 sm:flex-row">
            <div className="flex sm:flex-col overflow-x-auto sm:overflow-y-scroll justify-between sm:justify-normal sm:w-[18.7%] w-full">
              {productData.image?.map((img, index) => (
                <img
                  key={index}
                  onClick={() => setImage(img)}
                  src={img}
                  alt={`Product thumbnail ${index + 1}`}
                  className="w-[24%] sm:w-full sm:mb-3 flex-shrink-0 cursor-pointer"
                />
              ))}
            </div>
            <div className="w-full sm:w-[80%]">
              <img
                src={image}
                alt="Selected Product"
                className="w-full h-auto"
              />
            </div>
          </div>

          {/* Product Info */}
          <div className="flex-1">
            <h1 className="font-semibold text-3xl">{productData.name}</h1>
            <div className="flex items-center gap-2 mt-3">
              {[...Array(4)].map((_, i) => (
                <img
                  key={i}
                  src={assets.star_icon}
                  alt="star"
                  className="w-4"
                />
              ))}
              <img src={assets.star_dull_icon} alt="star" className="w-4" />
              <span className="text-gray-500 text-sm pl-2">(122 reviews)</span>
            </div>
            <p className="text-4xl font-semibold mt-6">
              {currency}
              {productData.price}
            </p>
            <p className="mt-4 text-gray-600 leading-relaxed">
              {productData.description}
            </p>

            {/* Size Selector */}
            {productData.sizes && productData.sizes.length > 0 && (
              <div className="mt-8">
                <p className="text-lg font-medium mb-2">Select Size</p>
                <div className="flex gap-3">
                  {productData.sizes.map((item, index) => (
                    <button
                      key={index}
                      onClick={() => setSize(item)}
                      className={`py-2 px-5 rounded-md border ${
                        item === size
                          ? "border-orange-500 bg-gray-100"
                          : "border-gray-300"
                      } transition-colors`}
                    >
                      {item}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Add to Cart Button */}
            <button
              onClick={() => addToCart(productData._id, size)}
              className="bg-black text-white mt-8 py-3 px-10 text-sm rounded-md hover:bg-gray-800 transition duration-300"
            >
              ADD TO CART
            </button>

            {/* Additional Info */}
            <hr className="mt-8 w-full sm:w-3/4" />
            <div className="text-sm text-gray-500 mt-5 space-y-1">
              <p>100% Original Product</p>
              <p>Cash on delivery available on this product.</p>
              <p>Easy return and exchange policy within 7 days.</p>
            </div>
          </div>
        </div>

        {/* Description & Review */}
        <div className="mt-16">
          <div className="flex border-b border-gray-300">
            <button className="px-5 py-3 text-sm font-semibold border-b-2 border-transparent hover:border-black">
              Description
            </button>
            <button className="px-5 py-3 text-sm font-semibold border-b-2 border-transparent hover:border-black">
              Reviews
            </button>
          </div>
          <div className="px-6 py-8 text-gray-700 text-sm leading-relaxed space-y-4">
            <p>
              Lorem ipsum dolor sit amet, consectetur adipisicing elit.
              Incidunt, error similique. Quam ab id rerum cupiditate, mollitia
              aut eum natus.
            </p>
            <p>
              Lorem ipsum dolor sit amet consectetur adipisicing elit.
              Consectetur in vitae nostrum fugit necessitatibus fugiat
              voluptates rem voluptate molestias eius.
            </p>
          </div>
        </div>

        {/* Related Products */}
        <RelatedProducts
          category={productData.category}
          subcategory={productData.subcategory}
        />
      </div>
    </Layout>
  );
};

export default Product;
