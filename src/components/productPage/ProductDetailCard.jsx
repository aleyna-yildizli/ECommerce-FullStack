export default function ProductDetailCard({ item }) {
  return (
    <div className=" flex flex-col">
      <img
        src={item.img}
        alt={item.product}
        className="sm:w-60 h-[280px] object-cover"
      />
      <div className="flex flex-col items-left py-[30px] gap-[10px] bg-white shadow-sm">
        <h5 className="text-[16px] font-semibold">{item.category}</h5>

        <p className="text-[14px] text-[#7e6262] font-bold">{item.product}</p>
        <div className="flex gap-[5px] py-[5px] px-[3px] text-[16px] font-bold">
          <p className="text-[#BDBDBD]"> {item.oldPrice}</p>
          <p className="text-[#23856D]"> {item.newPrice}</p>
        </div>
      </div>
    </div>
  );
}
