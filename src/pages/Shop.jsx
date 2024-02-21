import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRight } from "@fortawesome/free-solid-svg-icons";
import ProductCard from "../components/shop/ProductCard";
import { data } from '../data/data';

export default function Shop() {
    return (
        <div>
            <div className="w-full">
                <div className=" flex justify-around items-center py-[24px] bg-[#FAFAFA] max-sm:flex-col max-sm:gap-8">
                    <h2 className="text-[#252B42] text-[24px] font-bold">Shop</h2>
                    <div className="flex gap-[15px]">
                        <p className="text-[#252B42] text-[14px] font-bold">Home</p>
                        <FontAwesomeIcon icon={faArrowRight} size="sm" className='text-slate-400' />
                        <p className="text-[#BDBDBD] text-[14px] font-bold">Shop</p>
                    </div>
                </div>
                <ProductCard />
            </div>
        </div>
    )
}