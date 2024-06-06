import { faChevronRight, faPlus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useRef, useState } from "react";
import { GoHeart, GoTrash } from "react-icons/go";
import { useHistory } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import confetti from "https://esm.run/canvas-confetti@1";
import {
  addCoupon,
  removeFromCart,
  toggleCheck,
  updateCartItemQuantity,
} from "../store/actions/ShoppingCard/shoppingCardAction";
import Modal from "react-bootstrap/Modal";
import OrderSummary from "../components/shop/OrderSummary";

export default function ShoppingCart() {
  // Redux store'dan gerekli durumları al
  const shoppingCart = useSelector((store) => store.shop.cart);
  const categories = useSelector((store) => store.global.categories);
  const couponCodeApplied = useSelector(
    (store) => store.shop.couponCodeApplied
  );
  // Bileşen içi durumları tanımla
  const [show, setShow] = useState(false);
  const [showForm, setShowForm] = useState(false);
  const [inputValue, setInputValue] = useState("");

  const dispatch = useDispatch();
  const history = useHistory();

  const confettiRef = useRef(); //confetti için butonun lokasyonunu tutar
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  // Alışveriş sepetindeki ürün sayısını hesapla
  const totalProductCount = shoppingCart.reduce(
    (total, item) => total + item.count,
    0
  );

  // Kupon kodu gönderimini işle
  const handleSubmit = (e) => {
    e.preventDefault();
    const couponCode = e.target.elements.couponCode.value;
    if (couponCode === "PIGGY10") {
      dispatch(addCoupon());
      setShowForm(false);
      couponSuccessAnimation();
    }
  };

  const couponSuccessAnimation = () => {
    const { x, y } = confettiRef.current.getBoundingClientRect();
    confetti({
      particleCount: 150,
      spread: 60,
      origin: {
        x: x / window.innerWidth,
        y: y / window.innerHeight,
      },
    });
  };

  // Kupon kodu girişini dinle
  const handleInputChange = (e) => {
    setInputValue(e.target.value);
  };

  // İşaret durumunu değiştir
  const handleCheckboxChange = (productId) => {
    dispatch(toggleCheck(productId));
  };

  // Miktar değişikliğini işle
  const handleQuantityChange = (productId, count) => {
    dispatch(updateCartItemQuantity(productId, parseInt(count)));
  };

  // Ürünü sepetten silme işlemini gerçekleştir
  const handleDeleteAndClose = (productId) => {
    dispatch(removeFromCart(productId));
    setShow(false); // Modal'ı kapat
  };

  return (
    <div className="px-[10%] mx-auto py-5">
      <div className="flex flex-col md:flex-row justify-between gap-1">
        <div className="flex flex-col basis-2/3 gap-3">
          <span className="text-2xl font-medium text-[#111111] flex mb-2 ">
            Sepet (
            <span className="text-sky-500">{totalProductCount} ürün</span>)
          </span>
          {shoppingCart.length > 0 ? (
            shoppingCart.map((item, index) => {
              // Ürünün kategorisini bul
              const product = item.product;
              const categoryId = product.category_id;
              const category = categories.find((cat) => cat.id === categoryId);
              const categoryName = category ? category.title : "";
              const genderCategory =
                category && category.gender === "k" ? "Kadın" : "Erkek";

              // Ürün açıklamasını dönüştür
              const transformedDescription = product.description
                .replace(/%100\sPamuk/g, "100% Pamuk")
                .replace(/Regular\/Normal\sKalıp/g, "Regular Kalıp")
                .replace(/V\sYaka/g, "V Yaka")
                .replace(/Uzun\sKollu/g, "Uzun Kollu")
                .replace(/Örme\sT-Shirt/g, "Örme T-Shirt")
                .replace(/\bTWOAW21TS0099\b/g, "");

              return (
                <div key={index}>
                  <div className="flex gap-3">
                    <img
                      src={product.image}
                      className="object-cover w-[170px] h-[170px]"
                      alt="product"
                    />
                    <div className="flex flex-1 ">
                      <div className="flex flex-col tracking-wide basis-[380%] ">
                        <div className="flex flex-row gap-3 ">
                          {" "}
                          <h2 className="font-bold text-[#111111] text-[16px] ">
                            {product.name}{" "}
                          </h2>
                          <input
                            type="checkbox"
                            checked={item.checked}
                            onChange={() => handleCheckboxChange(product.id)}
                            className="mb-1.5"
                          />
                        </div>
                        <h3 className="font-normal text-[#707072] text-[16px]">
                          {genderCategory} {categoryName}
                        </h3>
                        <h3 className="font-normal text-[#707072] text-[16px]">
                          {transformedDescription}
                        </h3>
                        <div className="flex gap-3">
                          <div className="flex">
                            <span className="font-normal text-[#707072]">
                              Beden
                            </span>
                            <select className="text-[#707072] font-normal pl-1">
                              <option>32</option>
                              <option>34</option>
                              <option>36</option>
                              <option>38</option>
                              <option>40</option>
                              <option>42</option>
                              <option>44</option>
                              <option>46</option>
                            </select>
                          </div>
                          <div className="flex">
                            <span className="font-normal text-[#707072]">
                              Adet
                            </span>
                            <select
                              className="text-[#707072] font-normal pl-1"
                              onChange={(e) =>
                                handleQuantityChange(product.id, e.target.value)
                              }
                              value={item.count}
                            >
                              <option value={1}>1</option>
                              <option value={2}>2</option>
                              <option value={3}>3</option>
                              <option value={4}>4</option>
                              <option value={5}>5</option>
                              <option value={6}>6</option>
                              <option value={7}>7</option>
                              <option value={8}>8</option>
                              <option value={9}>9</option>
                              <option value={10}>10</option>
                            </select>
                          </div>
                        </div>
                        <div className="flex gap-4 mt-10">
                          <GoHeart className="text-[24px] hover:scale-105 hover:text-red-600" />
                          <button
                            className="bg-transparent"
                            onClick={handleShow}
                          >
                            <GoTrash className="text-[24px] hover:scale-105 hover:text-red-600" />
                          </button>
                          <Modal
                            show={show}
                            onHide={handleClose}
                            backdrop="static"
                            backdropClassName="custom-backdrop"
                            centered
                          >
                            <Modal.Body className="flex text-center justify-center text-lg font-semibold">
                              Are you sure you want to delete the product?
                            </Modal.Body>
                            <div className="flex items-center justify-center text-center mb-2 text-sm gap-2 p-2 rounded">
                              <button
                                className="bg-red-500 text-white rounded-md m-1 p-3 hover:scale-105"
                                onClick={() => handleDeleteAndClose(product.id)}
                              >
                                Delete <strong>☹️</strong>
                              </button>
                              <button
                                className="bg-blue-500 text-white rounded-md p-3 m-1 text-sm hover:scale-105"
                                onClick={handleClose}
                              >
                                Close <strong>☻</strong>
                              </button>
                            </div>
                          </Modal>
                        </div>
                      </div>
                      <p className="flex font-bold text-[#111111] text-[16px] leading-8 tracking-wide">
                        ${(item.count * product.price).toFixed(2)}
                      </p>
                    </div>
                  </div>
                  <hr className="w-[100%]" />
                </div>
              );
            })
          ) : (
            <p className="font-semibold">Your cart is empty.</p>
          )}
        </div>
        {shoppingCart.length > 0 && (
          <div className="flex flex-col basis-1/4 font-medium gap-3">
            <button
              className="bg-[#23a6f0] rounded-lg text-white py-3"
              onClick={() => {
                history.push("/sepetim/odeme");
              }}
            >
              Sepeti Onayla{" "}
              <FontAwesomeIcon
                icon={faChevronRight}
                size="sm"
                className="mr-2"
              />
            </button>
            <div className="mb-2 p-2 rounded border bg-green-50 flex flex-col">
              <span className="text-sm">
                piggybank{" "}
                <span className="text-sm text-green-400 font-semibold">
                  PIGGY10!
                </span>
              </span>
              <span className="text-[10px]">
                İlk alışverişin için özel %10 indirim kodunu kullan ve kargo
                ücretinden tasarruf et! Alışveriş keyfini artıracak bu fırsatı
                kaçırma!
              </span>
            </div>
            <OrderSummary />
            <div className="flex flex-col gap-2">
              <div className="flex flex-col text-center gap-2">
                {!showForm && !couponCodeApplied && (
                  <button
                    onClick={() => setShowForm(!showForm)}
                    disabled={showForm}
                    className="border rounded-lg text-[#23a6f0] py-3 "
                  >
                    <FontAwesomeIcon icon={faPlus} /> İndirim Kodu
                  </button>
                )}
                <div>
                  {showForm ? (
                    <form
                      onSubmit={handleSubmit}
                      className="flex flex-row justify-between"
                    >
                      <input
                        type="text"
                        name="couponCode"
                        placeholder="İndirim Kodu Gir"
                        className="text-sm flex basis-1/2 py-3 text-center border-2 border-gray-300 rounded-l-lg outline-none"
                        value={inputValue}
                        onChange={handleInputChange}
                      />
                      <button
                        id="applyButton"
                        type="submit"
                        className={`px-4 text-white text-md flex basis-1/2 py-3 justify-center rounded-r-lg ${
                          inputValue ? "bg-[#23a6f0]" : "bg-gray-300"
                        }`}
                        disabled={!inputValue}
                        ref={confettiRef}
                      >
                        Uygula
                      </button>
                    </form>
                  ) : (
                    <div>
                      {couponCodeApplied && (
                        <div className="border rounded-lg text-[#23a6f0] py-3">
                          <span className="">Kupon Uygulandı 🎉</span>
                        </div>
                      )}
                    </div>
                  )}
                </div>
              </div>
              <button
                className="bg-[#23a6f0] rounded-lg text-white py-3"
                onClick={() => {
                  history.push("/sepetim/odeme");
                }}
              >
                Sepeti Onayla{" "}
                <FontAwesomeIcon
                  icon={faChevronRight}
                  size="sm"
                  className="mr-2"
                />
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
