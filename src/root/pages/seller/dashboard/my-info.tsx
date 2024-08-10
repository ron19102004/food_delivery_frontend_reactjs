/* eslint-disable @typescript-eslint/no-unused-vars */
import React, {useEffect, useState} from "react";
import {
    getMyInfoSeller,
    SellerEntity,
    updateSellerInfo,
} from "../../../../apis/seller.api";
import useAuth from "../../../../hooks/useAuth.hook";
import useLocation from "../../../../hooks/useLocation.hook";
import LoopList from "../../../../components/loop.component";
import {LocationEntity} from "../../../../apis/location.api";
import {toast} from "react-toastify";
import {HiMiniChevronDown, HiMiniChevronUp} from "react-icons/hi2";
import {cn} from "../../../../lib/utils";

const MyShopInformation: React.FC = () => {
    const [isMore, setIsMore] = useState<boolean>(true);
    const {accessToken} = useAuth();
    const {list: locations} = useLocation();
    const [seller, setSeller] = useState<SellerEntity | null>(null);
    const [locationDefault, setLocationDefault] = useState<LocationEntity | null>(
        null
    );
    const [name, setName] = useState<string | null>(null);
    const [address, setAddress] = useState<string | null>(null);
    const [phone_number, setPhone] = useState<string | null>(null);
    const [email, setEmail] = useState<string | null>(null);
    const [open_at, setOpenAt] = useState<string | null>(null);
    const [close_at, setCloseAt] = useState<string | null>(null);
    const [avatar_url, setAvt] = useState<string | null>(null);
    const [background_url, setBgUrl] = useState<string | null>(null);

    const initialize = async () => {
        await getMyInfoSeller(
            {token: accessToken ?? ""},
            (res) => {
                if (res.status) {
                    setSeller(res.data);
                    setLocationDefault(res?.data?.location);
                    setName(res?.data?.name);
                    setAddress(res?.data?.address);
                    setPhone(res?.data?.phone_number);
                    setEmail(res?.data?.email);
                    setOpenAt(res?.data?.open_at);
                    setCloseAt(res?.data?.close_at);
                    setAvt(res?.data?.avatar);
                    setBgUrl(res?.data?.background_image);
                }
            },
            (err) => {
                console.error(err);
            }
        );
    };
    useEffect(() => {
        initialize();
    }, []);
    const saveInfo = async () => {
        if (seller && seller.location == null) {
            toast("Please select location", {type: "warning"});
            return;
        }
        if (seller) {
            const date = new Date();
            const time_date = date.getFullYear() + `-${date.getMonth() < 9 ? "0":""}` + (date.getMonth() + 1) + "-" + date.getDate() +"T";
            console.log(time_date)
            await updateSellerInfo(
                {
                    data: {
                        name: name ?? "",
                        address: address ?? "",
                        latitude: 0,
                        longitude: 0,
                        phone_number: phone_number ?? "",
                        email: email ?? "",
                        open_at: time_date + open_at ?? "",
                        close_at: time_date + close_at ?? "",
                        location_id: seller.location?.id ?? 0,
                        avatar_url: avatar_url ?? "",
                        background_url: background_url ?? "",
                    },
                    token: accessToken ?? "",
                },
                (res) => {
                    if (res.status) {
                        toast("Update information successfully!", {
                            type: "success",
                        });
                    }
                },
                (_err) => {
                    toast("Undefined error", {
                        type: "error",
                    });
                }
            );
        }
    };
    return (
        <div>
            <div className="flex items-center space-x-2">
                <h1 className="text-xl font-font3 font-bold">My shop information</h1>
                {!isMore ? (
                    <HiMiniChevronDown
                        className="text-2xl cursor-pointer hover:text-orange-600"
                        onClick={() => {
                            setIsMore(true);
                        }}
                    />
                ) : (
                    <HiMiniChevronUp
                        className="text-2xl cursor-pointer hover:text-orange-600"
                        onClick={() => {
                            setIsMore(false);
                        }}
                    />
                )}
            </div>
            <div
                className={cn("space-y-2 2xl:max-w-[calc(100%-30rem)] bg-white p-4 rounded-xl shadow-lg", {
                    hidden: !isMore,
                })}
            >
                <div className="md:flex items-center md:space-x-2 font-font3">
                    <div
                        className="md:rounded-l-3xl basis-1/4 border h-10 inline-flex items-center justify-start md:justify-end px-2 w-full md:w-auto md:pr-2 bg-orange-600 text-white">
                        <h1 className="font-bold">Location</h1>
                    </div>
                    <select
                        defaultValue={"-1"}
                        className="flex-1 border outline-none h-10 px-2 text-black w-full"
                        onChange={(e) => {
                            if (seller) {
                                const value = e.target.value.toString();
                                const _seller = seller;
                                if (value !== "-1") {
                                    _seller.location = locations[parseInt(value)];
                                } else {
                                    _seller.location = locationDefault;
                                }
                                setSeller(_seller);
                                console.log(seller);
                            }
                        }}
                    >
                        {seller && seller.location ? (
                            <option value={"-1"}>Current : {seller.location.name}</option>
                        ) : (
                            <option value={"-1"}>Waiting update ...</option>
                        )}
                        <LoopList
                            list={locations}
                            render={(item, index) => {
                                return <option value={index}>{item.name}</option>;
                            }}
                        />
                    </select>
                </div>
                <div className="md:flex items-center md:space-x-2 font-font3">
                    <div
                        className="md:rounded-l-3xl basis-1/4 border h-10 inline-flex items-center justify-start md:justify-end px-2 w-full md:w-auto md:pr-2 bg-orange-600 text-white">
                        <h1 className="font-bold">Name</h1>
                    </div>
                    <input
                        onChange={(e) => {
                            setName(e.target.value);
                        }}
                        type="text"
                        value={name ?? "Unknown"}
                        className="flex-1 border outline-none h-10 px-2 text-black w-full"
                    />
                </div>
                <div className="md:flex items-center md:space-x-2 font-font3">
                    <div
                        className="md:rounded-l-3xl basis-1/4 border h-10 inline-flex items-center justify-start md:justify-end px-2 w-full md:w-auto md:pr-2 bg-orange-600 text-white">
                        <h1 className="font-bold">Address</h1>
                    </div>
                    <input
                        onChange={(e) => {
                            setAddress(e.target.value);
                        }}
                        type="text"
                        value={address ?? "Unknown"}
                        className="flex-1 border outline-none h-10 px-2 text-black w-full"
                    />
                </div>
                <div className="md:flex items-center md:space-x-2 font-font3">
                    <div
                        className="md:rounded-l-3xl basis-1/4 border h-10 inline-flex items-center justify-start md:justify-end px-2 w-full md:w-auto md:pr-2 bg-orange-600 text-white">
                        <h1 className="font-bold">Phone number</h1>
                    </div>
                    <input
                        onChange={(e) => {
                            setPhone(e.target.value);
                        }}
                        type="tel"
                        value={phone_number ?? "Unknown"}
                        className="flex-1 border outline-none h-10 px-2 text-black w-full"
                    />
                </div>
                <div className="md:flex items-center md:space-x-2 font-font3">
                    <div
                        className="md:rounded-l-3xl basis-1/4 border h-10 inline-flex items-center justify-start md:justify-end px-2 w-full md:w-auto md:pr-2 bg-orange-600 text-white">
                        <h1 className="font-bold">Email</h1>
                    </div>
                    <input
                        onChange={(e) => {
                            setEmail(e.target.value);
                        }}
                        type="email"
                        value={email ?? "Unknown"}
                        className="flex-1 border outline-none h-10 px-2 text-black w-full"
                    />
                </div>
                <div className="md:flex items-center md:space-x-2 font-font3">
                    <div
                        className="md:rounded-l-3xl basis-1/4 border h-10 inline-flex items-center justify-start md:justify-end px-2 w-full md:w-auto md:pr-2 bg-orange-600 text-white">
                        <h1 className="font-bold">Avatar</h1>
                    </div>
                    <input
                        onChange={(e) => {
                            setAvt(e.target.value);
                        }}
                        type="text"
                        value={avatar_url ?? "Unknown"}
                        className="flex-1 border outline-none h-10 px-2 text-black w-full"
                    />
                </div>
                <div className="md:flex items-center md:space-x-2 font-font3">
                    <div
                        className="md:rounded-l-3xl basis-1/4 border h-10 inline-flex items-center justify-start md:justify-end px-2 w-full md:w-auto md:pr-2 bg-orange-600 text-white">
                        <h1 className="font-bold">Background</h1>
                    </div>
                    <input
                        onChange={(e) => {
                            setBgUrl(e.target.value);
                        }}
                        type="text"
                        value={background_url ?? "Unknown"}
                        className="flex-1 border outline-none h-10 px-2 text-black w-full"
                    />
                </div>
                <div className="md:flex items-center md:space-x-2 font-font3">
                    <div
                        className="md:rounded-l-3xl basis-1/4 border h-10 inline-flex items-center justify-start md:justify-end px-2 w-full md:w-auto md:pr-2 bg-orange-600 text-white">
                        <h1 className="font-bold">Latitude</h1>
                    </div>
                    <input
                        disabled
                        type="text"
                        value={seller?.latitude ?? "Waiting update in mobile device..."}
                        className="flex-1 border outline-none h-10 px-2 text-black w-full"
                    />
                </div>
                <div className="md:flex items-center md:space-x-2 font-font3">
                    <div
                        className="md:rounded-l-3xl basis-1/4 border h-10 inline-flex items-center justify-start md:justify-end px-2 w-full md:w-auto md:pr-2 bg-orange-600 text-white">
                        <h1 className="font-bold">Longitude</h1>
                    </div>
                    <input
                        disabled
                        type="text"
                        value={seller?.longitude ?? "Waiting update in mobile device..."}
                        className="flex-1 border outline-none h-10 px-2 text-black w-full"
                    />
                </div>
                <div className="md:flex items-center md:space-x-2 font-font3">
                    <div
                        className="md:rounded-l-3xl basis-1/4 border h-10 inline-flex items-center justify-start md:justify-end px-2 w-full md:w-auto md:pr-2 bg-orange-600 text-white">
                        <h1 className="font-bold">Open at</h1>
                    </div>
                    <div className="md:flex w-full flex-1">
                        <input
                            disabled
                            value={open_at ?? "Waiting update..."}
                            type="text"
                            className="border outline-none h-10 px-2 text-black  w-full"
                        />
                        <input
                            onChange={(e) => {
                                setOpenAt(`${e.target.value}`);
                            }}
                            type="time"
                            className="border outline-none h-10 px-2 text-black w-full"
                        />
                    </div>
                </div>
                <div className="md:flex items-center md:space-x-2 font-font3">
                    <div
                        className="md:rounded-l-3xl basis-1/4 border h-10 inline-flex items-center justify-start md:justify-end px-2 w-full md:w-auto md:pr-2 bg-orange-600 text-white">
                        <h1 className="font-bold">Close at</h1>
                    </div>
                    <div className="md:flex w-full flex-1">
                        <input
                            disabled
                            value={close_at ?? "Waiting update..."}
                            type="text"
                            className="border outline-none h-10 px-2 text-black w-full"
                        />
                        <input
                            onChange={(e) => {
                                setCloseAt(`${e.target.value}`);
                            }}
                            type="time"
                            className="border outline-none h-10 px-2 text-black w-full"
                        />
                    </div>
                </div>
                <div className="md:flex justify-center items-center md:space-x-2 font-font3 ">
                    <div className="flex flex-col justify-center items-center">
                        <div className="border rounded-full p-2 hover:border-orange-600 transition-all">
                            <a
                                href={avatar_url ?? ""}
                                target="_blank"
                                rel="noopener noreferrer"
                            >
                                <img
                                    src={avatar_url ?? ""}
                                    alt="avatar"
                                    className="md:w-52 md:h-52 w-32 h-32 object-cover rounded-full"
                                />
                            </a>
                        </div>
                        <h1>Avatar</h1>
                    </div>
                    <div className="flex flex-col justify-center items-center">
                        <div className="border rounded-full p-2 hover:border-orange-600 transition-all">
                            <a
                                href={background_url ?? ""}
                                target="_blank"
                                rel="noopener noreferrer"
                            >
                                <img
                                    src={background_url ?? ""}
                                    alt="bg"
                                    className="md:w-52 md:h-52 w-32 h-32 object-cover rounded-full"
                                />
                            </a>
                        </div>
                        <h1>Background</h1>
                    </div>
                </div>
                <div className=" items-center flex justify-end items-center font-font3">
                    {seller && (
                        <button
                            className="border px-4 py-2 bg-green-600 text-white font-font3 hover:bg-green-700 rounded-3xl"
                            onClick={saveInfo}
                        >
                            Save
                        </button>
                    )}
                </div>
            </div>
        </div>
    );
};

export default MyShopInformation;
