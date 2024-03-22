import { data } from "../data/data";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faPhone,
  faEnvelope,
  faUser,
  faSearch,
  faCartShopping,
  faHeart,
  faBars,
} from "@fortawesome/free-solid-svg-icons";
import {
  faFacebook,
  faInstagram,
  faTwitter,
  faYoutube,
} from "@fortawesome/free-brands-svg-icons";
import {
  Menu,
  MenuHandler,
  MenuList,
  MenuItem,
  Button,
} from "@material-tailwind/react";
import { NavLink, Link, useHistory } from "react-router-dom";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useGravatar } from "use-gravatar";
import { userLogout } from "../store/actions/userActions";
import { useDispatch } from "react-redux";
import { IoIosArrowForward } from "react-icons/io";
import { ChevronDownIcon, ChevronUpIcon } from "@heroicons/react/24/solid";
import slugify from "slugify";
import { fetchProduct } from "../store/actions/productActions";
import { Card, CardBody, Collapse } from "reactstrap";

export default function Header({ direction, ...args }) {
  const { phone, mail, message, firmName } = data.header;
  const dispatch = useDispatch();
  const history = useHistory();
  const userData = useSelector((state) => state.user.userData);
  const cart = useSelector((state) => state.shop.cart);
  console.log(cart);
  const categories = useSelector((store) => store.global.categories);
  const [openMenu, setOpenMenu] = useState(false);
  const [isCartOpen, setIsCartOpen] = useState(false);

  let totalProductCount = 0;
  let subtotal = 0;

  cart.forEach((item) => {
    totalProductCount += item.count;
    const productTotal = item.count * item.product.price;
    subtotal += productTotal;
  });

  const toggleCart = () => {
    setIsCartOpen(!isCartOpen);
  };
  const womanCategories = categories.filter(
    (category) => category.gender === "k"
  );
  const manCategories = categories.filter(
    (category) => category.gender === "e"
  );

  const isAuthenticated = useSelector((state) => state.user.isAuthenticated);
  const gravatar = useGravatar(userData?.email);
  const [isMenuVisible, setMenuVisible] = useState(false);

  const toggleMenuVisibility = () => {
    setMenuVisible(!isMenuVisible);
  };
  const handleMenuToggle = () => {
    setOpenMenu(!openMenu);
  };
  const handleNestedItemClick = () => {
    setOpenMenu(false); // itema tıklandığında menüyü kapat
  };

  const handleLogout = () => {
    dispatch(userLogout());
    localStorage.removeItem("token");
    sessionStorage.removeItem("isUserWelcomed");
  };
  const handleCategoryClick = (category) => {
    const categoryId = category.id;
    const genderSlug = category.gender === "e" ? "erkek" : "kadin";
    const categorySlug = slugify(category.title, { lower: true });
    dispatch(fetchProduct(categoryId, null, null));
    history.push(`/shop/${categoryId}/${genderSlug}/${categorySlug}`);
  };

  return (
    <div className="mb-2">
      <div
        className={`bg-[#252B42] text-white sm:flex justify-between px-6 hidden  `}
      >
        <div className="flex ">
          <div className="flex items-center gap-[5px] p-2.5 ">
            <FontAwesomeIcon
              icon={faPhone}
              size="sm"
              style={{ color: "#ffffff" }}
            />
            <h6 className="text-sm font-bold mb-0">{phone}</h6>
          </div>
          <div className="flex items-center gap-[5px] p-2.5 ">
            <FontAwesomeIcon icon={faEnvelope} size="sm" />
            <span className="text-sm font-bold">{mail}</span>
          </div>
        </div>
        <div className="p-2.5">
          <h6 className="text-sm font-bold mb-0 hidden lg:flex">{message}</h6>
        </div>
        <div className="flex items-center justify-start gap-2.5 p-2.5">
          <h6 className="text-sm font-bold mb-0">Follow us:</h6>
          <div className="flex flex-wrap items-center justify-start gap-1">
            <FontAwesomeIcon icon={faInstagram} size="sm" className="p-1" />
            <FontAwesomeIcon icon={faYoutube} size="sm" className="p-1" />
            <FontAwesomeIcon icon={faFacebook} size="sm" className="p-1" />
            <FontAwesomeIcon icon={faTwitter} size="sm" className="p-1" />
          </div>
        </div>
      </div>
      <div
        className={`flex flex-col sm:flex-row justify-between flex-wrap sm:items-center px-10 ${
          isMenuVisible ? "h-[501px]" : ""
        } `}
      >
        <div className="flex flex-row justify-between">
          <NavLink
            to="/"
            className="text-2xl text-slate-800 font-bold no-underline "
          >
            {firmName}
          </NavLink>
          <button
            onClick={toggleMenuVisibility}
            className="text-secondaryColor flex sm:hidden m-2 "
          >
            <FontAwesomeIcon icon={faBars} />
          </button>
        </div>
        <nav
          className={` items-center gap-4 flex flex-col sm:flex-row ${
            isMenuVisible ? "flex" : "hidden sm:flex"
          } `}
        >
          <NavLink to="/" className="text-[#737373] nav-link">
            Home
          </NavLink>
          <Menu
            placement="bottom-start"
            open={openMenu}
            handler={setOpenMenu}
            offset={15}
          >
            <MenuHandler onClick={handleMenuToggle}>
              <NavLink
                to="/shop"
                className="text-[#737373] flex items-center nav-link"
              >
                <span
                  className="mr-1"
                  onClick={() => {
                    window.location.href = "/shop";
                  }}
                >
                  Shop
                </span>
                <span className="inline-block">
                  {openMenu ? (
                    <ChevronUpIcon strokeWidth={2.5} className="h-3.5 w-3.5" />
                  ) : (
                    <ChevronDownIcon
                      strokeWidth={2.5}
                      className="h-3.5 w-3.5"
                    />
                  )}
                </span>
              </NavLink>
            </MenuHandler>
            <MenuList>
              <Menu placement="right-start">
                <MenuHandler onClick={handleNestedItemClick}>
                  <MenuItem className="flex items-center w-full gap-4 bg-transparent  text-gray-500 hover:text-blue-600">
                    MEN{" "}
                    <div className="flex ml-10">
                      <IoIosArrowForward className="hover:text-blue-600  text-gray-500 hover:scale-150" />
                    </div>
                  </MenuItem>
                </MenuHandler>
                <MenuList>
                  {manCategories.map((category) => (
                    <MenuItem
                      className="hover:text-blue-600 text-gray-500 bg-transparent"
                      key={category.id}
                      onClick={() => handleCategoryClick(category)}
                    >
                      {category.title}
                    </MenuItem>
                  ))}
                </MenuList>
              </Menu>
              <Menu placement="right-start">
                <MenuHandler onClick={handleNestedItemClick}>
                  <MenuItem className="flex items-center justify-between w-full gap-4 bg-transparent hover:text-blue-600 text-gray-500">
                    WOMEN{" "}
                    <div className="flex ml-3">
                      <IoIosArrowForward className="hover:text-blue-600 text-gray-500 hover:scale-150" />
                    </div>
                  </MenuItem>
                </MenuHandler>
                <MenuList className="">
                  {womanCategories.map((category) => (
                    <MenuItem
                      className="bg-transparent hover:text-blue-600  text-gray-500"
                      key={category.id}
                      onClick={() => handleCategoryClick(category)}
                    >
                      {category.title}
                    </MenuItem>
                  ))}
                </MenuList>
              </Menu>
            </MenuList>
          </Menu>
          <NavLink to="/about" className="text-[#737373] nav-link">
            About
          </NavLink>
          <NavLink to="/team" className="text-[#737373] nav-link">
            Team
          </NavLink>
          <NavLink to="/contact" className="text-[#737373] nav-link">
            Contact
          </NavLink>
        </nav>
        <div
          className={` flex flex-col sm:flex-row  text-sky-500 items-center gap-2 sm:gap-10 ${
            isMenuVisible ? "flex" : "hidden sm:flex"
          } `}
        >
          <div className="flex flex-col sm:flex-row items-center">
            {isAuthenticated ? ( // Eğer kullanıcı giriş yapmışsa
              <div className="items-center flex flex-row">
                <img
                  src={gravatar}
                  className="w-9 h-9 border-2 border-[#23A6F0] mr-3"
                />
                <span className="no-underline font-bold text-md text-[#23A6F0] mr-2">
                  {userData.name}
                </span>
                <button
                  onClick={handleLogout}
                  className="no-underline font-bold bg-white text-md text-[#23A6F0] ml-2"
                >
                  Sign out
                </button>
              </div>
            ) : (
              <div className="items-center flex flex-row">
                <FontAwesomeIcon icon={faUser} size="sm" className="mr-2" />
                <Link
                  className="no-underline font-bold text-md text-[#23A6F0] mr-2"
                  to="/login"
                >
                  Login
                </Link>
                /
                <Link
                  className="no-underline font-bold text-md text-[#23A6F0] ml-2"
                  to="/signup"
                >
                  Register
                </Link>
              </div>
            )}
          </div>

          <div className=" flex flex-col sm:flex-row  items-center">
            <FontAwesomeIcon icon={faSearch} size="sm" className="p-3" />
            <div className="flex items-center p-3">
              <button className=" header-button" onClick={toggleCart}>
                <FontAwesomeIcon icon={faCartShopping} />
              </button>
              {isCartOpen && (
                <div>
                  <Card className="w-[350px] sm:w-[450px] position-absolute z-10 left-[67.5%] top-[11.5%] ">
                    <CardBody className="flex flex-col">
                      {cart.map((item) => (
                        <div>
                          <div className="flex flex-row gap-3 rounded-md justify-between">
                            <div className="flex basis-1/4 justify-center items-center">
                              <img
                                src={item.product.images[0].url}
                                className="object-cover w-[100px] h-[100px] rounded-lg"
                                alt="product"
                              />
                            </div>
                            <div className="flex flex-row justify-between basis-3/4 ">
                              <div
                                className="flex flex-col leading-8 tracking-wide text-slate-700 "
                                style={{ fontFamily: "Roboto" }}
                              >
                                <div className="font-bold text-xl  ">
                                  {item.product.name}
                                </div>
                                <div className="font-medium">Size: XS</div>
                                <div className="font-medium">
                                  Count: {item.count}
                                </div>
                              </div>
                              <div className="flex font-bold text-xl leading-8 tracking-wide text-slate-700">
                                ${(item.count * item.product.price).toFixed(2)}
                              </div>
                            </div>
                          </div>
                          <hr></hr>
                        </div>
                      ))}
                      <p className="leading-8 tracking-wide text-slate-700 font-medium flex justify-center">
                        Subtotal ({totalProductCount} product): $
                        {subtotal.toFixed(2)}
                      </p>
                      <div className="flex flex-row justify-center ">
                        <div className="flex w-max gap-2">
                          <Button
                            ripple={false}
                            className="text-xs hover:bg-[#23A6F0] px-[135px] hover:shadow-xl hover:scale-105 text-black unHoverTextColor bg-gray-200 active:scale-100 "
                          >
                            Complete Purchase
                          </Button>
                        </div>
                      </div>
                    </CardBody>
                  </Card>
                </div>
              )}
              <div className="font-normal text-sm pl-2">
                {totalProductCount}{" "}
              </div>
            </div>
            <div className="flex items-center p-3">
              <FontAwesomeIcon icon={faHeart} size="sm" className="pr-1" />
              <div className="font-normal text-sm pl-1">1</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
