import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { BsCartCheck } from "react-icons/bs";
import { MdOutlineLocalShipping } from "react-icons/md";
import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Typography,
  Button,
} from "@material-tailwind/react";
import { addToCart } from "../../store/actions/ShoppingCard/shoppingCardAction";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar, faStarHalfStroke } from "@fortawesome/free-solid-svg-icons";
import { useEffect, useState } from "react";

export default function ProductCard(props) {
  const { name, price, description, image, rating, category_id, id } =
    props.data || {};
  const categories = useSelector((store) => store.global.categories);
  const nameSlug = name.toLowerCase().replaceAll(" ", "").replaceAll("-", "");
  const catCode = categories.find((c) => c.id == category_id)?.code;
  const gender = catCode?.slice(0, 1) == "k" ? "kadin" : "erkek";
  const category = catCode?.slice(2);
  const dispatch = useDispatch();
  const [showOverlay, setShowOverlay] = useState(false);

  const handleAddToCart = () => {
    dispatch(addToCart(props.data));
    setShowOverlay(true);
  };

  // Adres metnini belirli bir uzunluğa kadar kesmek ve "..." ile bitirmek
  const truncateDescription = (description, maxLength = 45) => {
    if (description.length > maxLength) {
      return description.slice(0, maxLength) + "...";
    }
    return description;
  };

  useEffect(() => {
    if (showOverlay) {
      setTimeout(() => {
        setShowOverlay(false);
      }, 2000);
    }
  }, [showOverlay]);

  const renderRatingStars = (rating) => {
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 !== 0;

    const stars = [];

    for (let i = 0; i < fullStars; i++) {
      stars.push(
        <FontAwesomeIcon
          key={`full-star-${i}`}
          icon={faStar}
          className="text-yellow-300"
          size="lg"
        />
      );
    }

    if (hasHalfStar) {
      stars.push(
        <FontAwesomeIcon
          key={`half-star`}
          icon={faStarHalfStroke}
          className="text-yellow-300 mr-2"
          size="lg"
        />
      );
    }

    return stars;
  };

  return (
    <Card className="w-full product">
      <CardHeader shadow={false} floated={false} className="h-[350px] w-auto">
        <div className="">
          {image && (
            <img
              src={image}
              alt="card-image"
              className="h-full w-full object-cover rounded-lg"
            />
          )}
          {price > 100 && (
            <div className="absolute top-5 left-0 bg-gray-700 bg-opacity-30 text-white px-3 py-1  rounded-tr-lg rounded-br-lg">
              <div className="flex justify-center items-center gap-2 text-md">
                <MdOutlineLocalShipping /> Free Shipping
              </div>
            </div>
          )}
        </div>
      </CardHeader>
      <CardBody>
        <div className="mb-2 flex flex-col">
          <Typography color="blue-gray" className="font-bold">
            {name}
          </Typography>
          <Typography
            variant="small"
            color="gray"
            className="font-normal opacity-75"
          >
            {truncateDescription(description)}
          </Typography>
        </div>
        <div className="flex  justify-between">
          <Typography color="blue-gray" className="">
            <span className="font-bold flex justify-center items-center mt-3">
              ${price}
            </span>
          </Typography>
          <div className="flex items-center">
            {renderRatingStars(rating)}
            <span className="text-neutral-500 text-sm font-bold ml-1">
              {rating}
            </span>
          </div>
        </div>
      </CardBody>
      <CardFooter className="pt-0 flex gap-2 ">
        <Link
          to={`/product/${gender}/${category}/${id}/${nameSlug}`}
          className="font-medium flex basis-full items-center justify-center bg-sky-50 py-2 text-sky-500 shadow-none hover:scale-105 hover:bg-sky-500 border-2 border-sky-500 hover:text-white hover:shadow-none focus:scale-105 focus:shadow-none active:scale-100 no-underline rounded-lg"
        >
          More Details
        </Link>

        <Button
          onClick={handleAddToCart}
          className=" bg-sky-500 mx-auto py-2 shadow-none hover:scale-105 text-white hover:shadow-none focus:scale-105 focus:shadow-none active:scale-100 "
        >
          <div className="flex justify-center items-center">
            <BsCartCheck className="text-[30px] mb-0.5" />
          </div>
        </Button>
        {showOverlay && (
          <div className="product_overlay">
            <h2>Sepete Eklendi</h2>
          </div>
        )}
      </CardFooter>
    </Card>
  );
}
