import React from "react";
import Clients from "../components/global/Clients";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faChevronRight,
  faStarHalfStroke,
  faStar,
  faHeart,
  faCartShopping,
  faEye,
} from "@fortawesome/free-solid-svg-icons";
import { Carousel, CarouselItem, CarouselControl } from "reactstrap";
import { useEffect, useState } from "react";
import { data } from "../data/data";
import { useParams } from "react-router";
import { API } from "../api/api";
import { addToCart } from "../store/actions/ShoppingCard/shoppingCardAction";
import { useDispatch } from "react-redux";
import ProductDetailCard from "../components/productPage/ProductDetailCard";

export default function ProductPage() {
  const { productCards } = data.productPageCards;
  const [product, setProduct] = useState({});
  const { id } = useParams();
  const dispatch = useDispatch();

  const addToCartHandle = () => {
    dispatch(addToCart(product));
  };

  useEffect(() => {
    API.get(`/products/${id}`).then((res) => {
      setProduct(res.data);
    });
  }, [id]);
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const { name, availability, slides, detailImage } = data.productPage;
  const [activeIndex, setActiveIndex] = useState(0);
  const [animating, setAnimating] = useState(false);

  const next = () => {
    if (animating) return;
    const nextIndex = activeIndex === slides.length - 1 ? 0 : activeIndex + 1;
    setActiveIndex(nextIndex);
  };

  const previous = () => {
    if (animating) return;
    const nextIndex = activeIndex === 0 ? slides.length - 1 : activeIndex - 1;
    setActiveIndex(nextIndex);
  };

  const goToIndex = (newIndex) => {
    if (animating) return;
    setActiveIndex(newIndex);
  };

  const newSlides = slides.map((item, index) => {
    return (
      <CarouselItem
        onExiting={() => setAnimating(true)}
        onExited={() => setAnimating(false)}
        key={index}
      >
        {product && product.image && (
          <img
            src={product.image}
            alt={name}
            className="w-full h-[500px] object-cover object-center" //object-contain ile sığdır.
          />
        )}
      </CarouselItem>
    );
  });
  return (
    <div className="w-[75%] mx-auto flex flex-col gap-10">
      <nav className="flex items-center justify-center sm:justify-start gap-2">
        <div className="text-slate-800 text-sm font-bold">Home</div>
        <FontAwesomeIcon
          icon={faChevronRight}
          size="sm"
          className="text-[#BDBDBD] mt-1"
        />
        <div className="text-slate-400 text-sm font-bold">Shop</div>
      </nav>
      <div className="flex flex-col sm:flex-row gap-8">
        <div className="w-full sm:w-1/2">
          <div className="flex flex-col gap-2">
            <Carousel
              activeIndex={activeIndex}
              next={next}
              previous={previous}
              className="h-full flex align-middle justify-center"
            >
              {newSlides}
              <CarouselControl
                direction="prev"
                directionText="Previous"
                onClickHandler={previous}
              />
              <CarouselControl
                direction="next"
                directionText="Next"
                onClickHandler={next}
              />
            </Carousel>
            <div className="flex gap-3">
              <React.Fragment>
                <img
                  key={`-opacity`}
                  src={product.image}
                  className="w-28 h-24 object-contain hover:scale-105 hover:ease-out hover:duration-300 ease-out duration-300 opacity-50"
                  onClick={() => setActiveIndex(index)}
                />
              </React.Fragment>
            </div>
          </div>
        </div>
        <div className="w-full sm:w-1/2 flex flex-col items-start gap-3">
          <h4 className="text-slate-800 text-xl font-normal leading-[30px]">
            {product.name}
          </h4>
          <div className="flex items-center gap-3">
            <div className="flex gap-1">
              <FontAwesomeIcon
                icon={faStar}
                className="text-yellow-300"
                size="lg"
              />
              <FontAwesomeIcon
                icon={faStar}
                className="text-yellow-300"
                size="lg"
              />
              <FontAwesomeIcon
                icon={faStar}
                className="text-yellow-300"
                size="lg"
              />
              <FontAwesomeIcon
                icon={faStar}
                className="text-yellow-300"
                size="lg"
              />
              <FontAwesomeIcon
                icon={faStarHalfStroke}
                className="text-yellow-300"
                size="lg"
              />
            </div>
            <span className="text-neutral-500 text-sm font-bold">
              {product.rating}
            </span>
          </div>
          <div className="flex flex-col items-start ">
            <h5 className="text-slate-800 text-2xl font-bold">
              ${product.price}
            </h5>
            <h6 className="text-neutral-500 text-sm font-bold">
              Availability :{" "}
              <span className="text-sky-500 text-sm font-bold">
                {availability}
              </span>
            </h6>
          </div>
          <p className="text-[#858585] w-[80%] sm:w-[60%] text-sm font-normal leading-tight tracking-tight">
            {product.description}
          </p>
          <div className="w-full border-t border-[#ECECEC] mb-3"></div>
          <div className="flex gap-2">
            <div className="w-[30px] h-[30px] bg-sky-500 rounded-full shadow-sm hover:bg-sky-200 cursor-pointer" />
            <div className="w-[30px] h-[30px] bg-green-500 rounded-full shadow-sm hover:bg-green-200 cursor-pointer" />
            <div className="w-[30px] h-[30px] bg-orange-400 rounded-full shadow-sm hover:bg-orange-200 cursor-pointer" />
            <div className="w-[30px] h-[30px] bg-slate-800 rounded-full shadow-sm hover:bg-slate-200 cursor-pointer" />
          </div>
          <div className="flex  gap-2 mt-[19%]">
            <button className="text-white text-sm font-bold rounded-sm bg-sky-500 px-[15px] py-[8px] sm:px-[20px] sm:py-[10px] hover:scale-105">
              Select Options
            </button>
            <div className="flex gap-2 ml-4 cursor-pointer">
              <div className="productIcon">
                <FontAwesomeIcon
                  icon={faHeart}
                  className="text-[#252B42] hover:text-red-600"
                />
              </div>
              <div className="productIcon">
                <button onClick={addToCartHandle}>
                  <FontAwesomeIcon
                    icon={faCartShopping}
                    className="text-[#252B42] active:text-sky-500 hover:text-sky-500"
                  />
                </button>
              </div>
              <div className="productIcon">
                <FontAwesomeIcon
                  icon={faEye}
                  className="text-[#252B42] hover:scale-110"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="">
        {/* NavLinks */}
        <nav className="flex justify-center gap-8 ">
          <p className="navBar-product">Description</p>
          <p className="navBar-product">Additional Information</p>
          <p className="navBar-product ">
            Reviews<span className="text-[#23856D] font-bold pl-1">(0)</span>
          </p>
        </nav>
        <hr className="border border-gray-200 " />
      </div>
      {/* Section */}
      <div className="flex  flex-col sm:flex-row justify-between gap-[30px]">
        <div className="w-[99%] sm:w-[45%] relative bg-gray-100 rounded-md">
          <img
            className="w-[500px] h-[400px] rounded-md shadow-lg sm:absolute top-0 left-0 object-cover"
            src={detailImage}
          />
        </div>
        <div className="sm:w-[30%] w-[99%] flex flex-col gap-[30px] ">
          <h5 className=" text-slate-800 text-2xl font-bold tracking-tight">
            the quick fox jumps over
          </h5>
          <h6 className="product-h6">
            Met minim Mollie non desert Alamo est sit cliquey dolor do met sent.
            RELIT official consequent door ENIM RELIT Mollie. Excitation venial
            consequent sent nostrum met.
          </h6>
          <h6 className="product-h6">
            Met minim Mollie non desert Alamo est sit cliquey dolor do met sent.
            RELIT official consequent door ENIM RELIT Mollie. Excitation venial
            consequent sent nostrum met.
          </h6>
          <h6 className="product-h6">
            Met minim Mollie non desert Alamo est sit cliquey dolor do met sent.
            RELIT official consequent door ENIM RELIT Mollie. Excitation venial
            consequent sent nostrum met.
          </h6>
        </div>
        <div className="flex flex-col w-[99%] sm:w-[30%] gap-6">
          <div className="flex flex-col gap-4">
            <h5 className=" text-slate-800 text-2xl font-bold tracking-tight">
              the quick fox jumps over
            </h5>
            <div className="flex flex-col gap-2">
              <div className="quick-div">
                <FontAwesomeIcon
                  icon={faChevronRight}
                  size="lg"
                  className="text-gray-300"
                />
                <h6 className="quick-product">
                  the quick fox jumps over the lazy dog
                </h6>
              </div>
              <div className="quick-div">
                <FontAwesomeIcon
                  icon={faChevronRight}
                  size="lg"
                  className="text-gray-300"
                />
                <h6 className="quick-product">
                  the quick fox jumps over the lazy dog
                </h6>
              </div>
              <div className="quick-div">
                <FontAwesomeIcon
                  icon={faChevronRight}
                  size="lg"
                  className="text-gray-300"
                />
                <h6 className="quick-product">
                  the quick fox jumps over the lazy dog
                </h6>
              </div>
              <div className="quick-div">
                <FontAwesomeIcon
                  icon={faChevronRight}
                  size="lg"
                  className="text-gray-300"
                />
                <h6 className="quick-product">
                  the quick fox jumps over the lazy dog
                </h6>
              </div>
            </div>
          </div>
          <div className="flex flex-col gap-6">
            <h5 className=" text-slate-800 text-2xl font-bold  tracking-tight">
              the quick fox jumps over
            </h5>
            <div className="flex flex-col gap-2">
              <div className="quick-div">
                <FontAwesomeIcon
                  icon={faChevronRight}
                  size="lg"
                  className="text-gray-300"
                />
                <h6 className="quick-product">
                  the quick fox jumps over the lazy dog
                </h6>
              </div>
              <div className="quick-div">
                <FontAwesomeIcon
                  icon={faChevronRight}
                  size="lg"
                  className="text-gray-300"
                />
                <h6 className="quick-product">
                  the quick fox jumps over the lazy dog
                </h6>
              </div>
              <div className="quick-div">
                <FontAwesomeIcon
                  icon={faChevronRight}
                  size="lg"
                  className="text-gray-300"
                />
                <h6 className="quick-product">
                  the quick fox jumps over the lazy dog
                </h6>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* ProductDetailCard Componenti Kullanıldı */}
      <h3 className="text-slate-800 ml-6 text-2xl font-bold leading-loose tracking-tight">
        BESTSELLER PRODUCTS
      </h3>
      <hr className="py-0.1 border border-gray-200" />
      <div className="flex gap-4 justify-center flex-col sm:flex-row flex-wrap pb-[80px]">
        {productCards.map((item, index) => (
          <ProductDetailCard key={index} item={item} />
        ))}
      </div>{" "}
      {/* Clients Componenti Kullanıldı */}
      <div>
        <Clients />
      </div>
    </div>
  );
}
