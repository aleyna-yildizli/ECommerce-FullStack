import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import axios from 'axios';
import LoadingSpinner from "../components/widgets/LoadingSpinner"


const axiosInstance = axios.create({
    baseURL: "https://workintech-fe-ecommerce.onrender.com"
});

export default function SignUpPage() {
    const { register, handleSubmit, watch, setValue, formState: { errors, isValid } } = useForm();

    const [roles, setRoles] = useState([]);
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        const fetchRoles = async () => {
            try {
                const response = await axiosInstance.get("/roles");
                setRoles(response.data);
            } catch (error) {
                console.error("Error fetching roles.", error);
            }
        };
        fetchRoles();
    }, []);

    useEffect(() => {
        const role = watch("role_id");
        if (role === "store") {
            setValue("store.name", "");
            setValue("store.phone", "");
            setValue("store.tax_no", "");
            setValue("store.bank_account", "");
        }
    }, [watch]);

    const handleUserTypeChange = (roleId) => {
        setValue("role_id", roleId);
    };

    const onSubmit = async (data) => {
        delete data.confirmPassword;
        // SİGNUP endpointe girilen datayı post at
        try {
            setIsLoading(true);
            const response = await axiosInstance.post("/signup", data);
            if (response.status === 201 || response.status === 204) {
                console.log("Check your email address to activate your account. Redirecting to the previous page.");
                setTimeout(() => {
                    window.history.back();
                }, 3000);
            }
        } catch (error) {
            console.log("An error occurred while submitting the form. Please try again.");
        } finally {
            setIsLoading(false);
        }
    };


    return (
        <div className="w-full flex flex-col bg-[#e7f0fd]">
            <h2 className="absolute font-extrabold text-[54px] sm:text-[174px] text-white opacity-50 right-[1%] top-[12%] z-50">
                Sign Up
            </h2>
            <div className="max-w-xl w-full mx-auto p-10 mt-20">
                <div className="bg-white p-10 border border-gray-300 mt-6 rounded-lg shadow-md">
                    <form onSubmit={handleSubmit(onSubmit)} className='flex flex-col gap-3'>
                        <div>
                            <p className="text-lg text-center w-[90%] sm:w-full font-extrabold text-gray-600">WHAT TYPE OF USER ARE YOU?</p>
                            <div className="flex gap-3 justify-center items-center">
                                {roles.map(role => (
                                    <button
                                        key={role.id}
                                        type="button"
                                        className={`w-[50%] sm:p-2.5 sm:w-[30%] mt-1 font-base rounded-lg ${watch("role_id") === role.id ? "bg-[#1da0f2] text-white" : "bg-gray-200 text-[#888]"}  hover:text-white`}
                                        onClick={() => handleUserTypeChange(role.id)}
                                    >
                                        {role.name}
                                    </button>
                                ))}
                            </div>
                        </div>
                        {/* Name en az 3 karakter olmalı */}
                        <div>
                            <label htmlFor="name" className="form-label"></label>
                            <input
                                type="text"
                                id="name"
                                placeholder="Full Name..."
                                className="form-input"
                                {...register("name", {
                                    required: "Name is required",
                                    minLength: {
                                        value: 3,
                                        message: "Name must be at least 3 characters",
                                    },
                                })}
                            />
                            {errors.name && (
                                <p className="form-error">{errors.name.message}</p>
                            )}
                        </div>
                        {/* Emaill Address zorunlu olmalı */}
                        <div>
                            <label htmlFor="email" className="form-label"></label>
                            <input
                                className="form-input"
                                placeholder="Email Address..."
                                type="email"
                                id="email"
                                {...register("email", {
                                    required: "Email address is required",
                                    pattern: /^\S+@\S+$/i,
                                })}
                            />
                            {errors.email && (
                                <p className="form-error">{errors.email.message}</p>
                            )}
                        </div>
                        {/* Şifrenin sayı, küçük harf, büyük harf ve özel karakterler dahil en az 8 karakter olması gerekir */}
                        <div>
                            <label
                                htmlFor="password"
                                className="form-label"></label>
                            <input
                                placeholder="Password..."
                                className="form-input"
                                type="password"
                                id="password"
                                {...register("password", {
                                    required: "Password is required",
                                    pattern: {
                                        value: /^(?=.*\d)(?=.*[A-Z])(?=.*[a-z])(?=.*[^\w\d\s:])([^\s])/,
                                        message: "Password must be at least 8 characters, including a number, uppercase and lowercase letter, and a special character",
                                    },
                                })}
                            />
                            {errors.password && (
                                <p className="text-xs text-red-500">{errors.password.message}</p>
                            )}
                        </div>
                        <div>
                            {/*Şifrenin ikinci giriş alanıyla eşleşmesi gerekiyor*/}
                            <label className="form-label" htmlFor="confirmPassword"></label>
                            <input
                                className="form-input"
                                id="confirmPassword"
                                type="password"
                                placeholder='Confirm Password...'
                                {...register('confirmPassword', {
                                    required: 'Enter your password',
                                    validate: (val) => {
                                        if (watch('password') !== val) {
                                            return "Your passwords do not match";
                                        }
                                    }
                                })}
                            />
                            {errors.confirmPassword && (
                                <p className="text-xs text-red-500">{errors.confirmPassword.message}</p>
                            )}
                        </div>
                        {/* Store section */}
                        <div>
                            {(String(watch("role_id")) === "3" && (
                                <div>
                                    {/* Store Name en az 3 karakter olmalı */}
                                    <div className="flex flex-col gap-3">
                                        <div>
                                            <label htmlFor="store.name" className="form-label"></label>
                                            <input
                                                type="text"
                                                id="store.name"
                                                placeholder="Store Name..."
                                                className="form-input"
                                                {...register("store.name", {
                                                    required: "Store name is required",
                                                    minLength: {
                                                        value: 3,
                                                        message: "Store name must be at least 3 characters",
                                                    },
                                                })}
                                            />
                                            {errors.store?.name && (
                                                <p className="form-error">{errors.store.name.message}</p>
                                            )}
                                        </div>
                                        {/* Mağaza Telefonu alanı geçerli Türkiye telefon numarası olmalıdır*/}
                                        <div>
                                            <label htmlFor="store.phone" className="form-label"></label>
                                            <input
                                                type="text"
                                                id="store.phone"
                                                placeholder="Store Phone..."
                                                className="form-input"
                                                {...register("store.phone", {
                                                    required: "Store Phone field should be a valid Turkish phone number",
                                                    pattern: {
                                                        value: /^(\+90|0)?\d{10}$/,
                                                        message: "Please enter a valid phone number. Example: +90-XXX-XXX-XX-XX or 0XXXXXXXXXX",
                                                    }
                                                })}
                                            />
                                            {errors.store?.phone && (
                                                <p className="form-error">{errors.store.phone.message}</p>
                                            )}
                                        </div>
                                        {/* Mağaza Vergi Numarası alanı görünmeli ve "TXXXXVXXXXXX" modeliyle eşleşmelidir */}
                                        <div>
                                            <label htmlFor="store.tax_no" className="form-label"></label>
                                            <input
                                                className="form-input"
                                                id="store.tax_no"
                                                type="text"
                                                placeholder="Tax No..."
                                                {...register("store.tax_no", {
                                                    required: 'Store Tax ID is required',
                                                    pattern: {
                                                        value: /T\d{4}V\d{6}/,
                                                        message: 'Please enter a valid Tax No in the format "TXXXXVXXXXXX".'
                                                    }
                                                })}
                                            />
                                            {errors.store?.tax_no && (
                                                <p className="form-error">{errors.store.tax_no.message}</p>
                                            )}
                                        </div>
                                        {/* Store IBAN */}
                                        <div>
                                            <label className="form-label" htmlFor="storeIban" />
                                            <div>
                                                <input
                                                    className="form-input"
                                                    id="store.bank_account"
                                                    type="text"
                                                    placeholder='Store IBAN...'
                                                    {...register('store.bank_account', {
                                                        required: 'Store IBAN is required',
                                                        pattern: {
                                                            value: /^TR\d{2}\s\d{4}\s\d{4}\s\d{4}\s\d{4}\s\d{4}\s\d{2}$/,
                                                            message: 'Invalid IBAN format. It should be like TRXX XXXX XXXX XXXX XXXX XXXX XX',
                                                        }
                                                    })}
                                                />
                                                {errors.store?.bank_account && (
                                                    <span className="form-error">
                                                        {errors.store.bank_account.message}
                                                    </span>
                                                )}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                        <button
                            type="submit"
                            className={`sm:w-full sm:p-2 p-3 bg-[#1da0f2] text-md text-white rounded-lg font-semibold${!isValid || isLoading ? "opacity-50 cursor-not-allowed" : "hover:scale-105"}`}
                        >
                            {isLoading ? <LoadingSpinner /> : "Create Account"}
                        </button>
                        <p className="sm:w-full w-[90%] text-md text-center font-semibold text-[#888]">
                            Already have an account?
                            <a href="/login" className="text-[#1da0f2] text-md font-semibold ml-1 no-underline">Log in</a>
                        </p>
                    </form>
                </div>
            </div >
        </div >


    );
};


