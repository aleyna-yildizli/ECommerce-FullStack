import { data } from "../../data/data";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircle } from "@fortawesome/free-solid-svg-icons";

export default function ProductCard() {
  const { productCards } = data.shop;

  return (
    <div className=" m-auto px-[12%] ">
      <div className="flex gap-[50px] flex-wrap items-center justify-center pb-[80px]">
        {productCards.map((item) => (
          <div key={item.id} className="flex-grow-1 basis-[210px]">
            <img
              src={item.img}
              alt={item.product}
              className="w-100 object-cover"
            />
            <div className="flex flex-col items-center py-[30px] gap-[10px]">
              <h5 className="text-[16px] font-semibold">{item.category}</h5>

              <p className="text-[14px] text-[#737373] font-bold">
                {item.product}
              </p>
              <div className="flex gap-[5px] text-[16px] font-bold">
                <p className="text-[#BDBDBD]">{item.oldPrice}</p>
                <p className="text-[#23856D]">{item.newPrice}</p>
              </div>
              <div className="flex gap-1">
                <div className="w-[20px] h-[20px] bg-sky-500 rounded-full shadow-sm" />
                <div className="w-[20px] h-[20px] bg-green-500 rounded-full shadow-sm" />
                <div className="w-[20px] h-[20px] bg-orange-400 rounded-full shadow-sm" />
                <div className="w-[20px] h-[20px] bg-slate-800 rounded-full shadow-sm" />
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
