import React from 'react';
import {cn} from "../../../../lib/utils.ts";
import {HiArrowLongRight} from "react-icons/hi2";
import {ClassValue} from "clsx";
import useVoucher from "../../../../hooks/useVoucher.hook.tsx";

const VoucherStatus: React.FC<{ className?: ClassValue }> = ({className}) => {
    const {list} = useVoucher()
    return (
        <div>
            <div
                className={cn(" pb-4 px-2 pt-2 md:px-4 md:pt-4 flex-wrap flex items-center justify-center md:justify-start md:space-x-2", className)}>
                <div
                    className="inline-flex items-center justify-center space-x-2 border px-2 md:px-4 py-2 w-full md:w-auto bg-white shadow-lg rounded-lg">
                    <h1 className="font-font2">Voucher </h1>
                    <HiArrowLongRight className="text-orange-600"/>
                    <h1>
                        <span className="font-bold font-font3">
                            {list.length}{` `}
                            {list.length > 1 ? "items" : "item"}
                        </span>
                    </h1>
                </div>
            </div>
        </div>
    );
};

export default VoucherStatus;