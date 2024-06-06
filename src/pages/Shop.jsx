import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faChevronRight,
  faBorderAll,
  faListCheck,
  faMagnifyingGlass,
  faChevronDown,
  faTimes,
} from "@fortawesome/free-solid-svg-icons";
import ProductCard from "../components/global/ProductCard";
import Categories from "../components/shop/Categories";
import { Pagination, PaginationItem, PaginationLink } from "reactstrap";

import Clients from "../components/global/Clients";
import { useDispatch, useSelector } from "react-redux";
import { setCategories } from "../store/actions/globalActions";
import { useEffect, useState } from "react";
import {
  fetchProduct,
  FetchStates,
  setActivePage,
} from "../store/actions/productActions";
import { useHistory, useLocation, useParams } from "react-router";
import LoadingSpinner from "../components/widgets/LoadingSpinner";
import { useRef } from "react";
import EmptyPage from "./EmptyPage";

export default function Shop() {
  const dispatch = useDispatch();
  const productList = useSelector((state) => state.product.productList) || [];

  useEffect(() => {
    dispatch(setCategories());
    dispatch(fetchProduct());
  }, []);

  return (
    <div>
      <div className="bg-[#FAFAFA] pb-5">
        <div className=" flex flex-col sm:flex-row justify-between items-center mx-auto px-[4%] py-4 ">
          <h2 className="text-[#252B42] text-[24px] font-bold">Shop</h2>
          <div className="flex  gap-[15px] ">
            <p className="text-[#252B42] text-[14px] font-bold">Home</p>
            <FontAwesomeIcon
              icon={faChevronRight}
              size="sm"
              className="text-[#BDBDBD] mt-1"
            />
            <p className="text-[#BDBDBD] text-[14px] font-bold">Shop</p>
          </div>
        </div>
        {/* Categories Componenti Buraya */}
        <div className=" bg-[#FAFAFA]">
          <Categories />
        </div>
      </div>

      <div>
        <div className="flex gap-[50px] flex-wrap items-center justify-center pb-[80px] mx-auto px-[10%]">
          {productList.map((item, index) => (
            <div key={item.id} className="flex-grow-1 basis-[290px]">
              <ProductCard data={item} key={index} />
            </div>
          ))}
        </div>
      </div>
      <Clients />
    </div>
  );
}
