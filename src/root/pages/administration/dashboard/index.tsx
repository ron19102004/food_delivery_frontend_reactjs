import React, { useEffect, useState } from "react";
import StatusRequestRole from "../user/status-request-role";
import { getTotalsUser } from "../../../../apis/admin.api";
import useAuth from "../../../../hooks/useAuth.hook";
import { HiArrowLongRight } from "react-icons/hi2";

const DashboardAdminPage: React.FC = () => {
  const [totalsUser, setTotalsUser] = useState<{
    totalsUser: number;
    totalsDeliver: number;
    totalsSeller: number;
  }>({
    totalsUser: 0,
    totalsDeliver: 0,
    totalsSeller: 0,
  });
  const { accessToken } = useAuth();
  const initialize = async () => {
    await getTotalsUser(
      { token: accessToken ?? "" },
      (res) => {
        if (res.status) {
          setTotalsUser(res.data);
        }
      },
      (err) => {
        console.log(err);
      }
    );
  };
  useEffect(() => {
    initialize();
  }, []);
  return (
    <div>
      <h1 className="px-2 pt-2 md:px-4 md:pt-4 font-font3 font-semibold text-xl">
        Totals request role
      </h1>
      <StatusRequestRole className="pt-1 md:pt-1" />
      <h1 className="px-2 pt-1 md:px-4 font-font3 font-semibold text-xl">
        Totals user on system
      </h1>
      <div className="px-2 md:px-4 flex items-center space-y-1 md:space-y-0 md:space-x-2 flex-wrap">
        <div className="inline-flex items-center justify-center space-x-2 border px-2 md:px-4 py-2 w-full md:w-auto">
          <h1 className="font-font2">User </h1>
          <HiArrowLongRight className="text-orange-600" />
          <h1>
            <span className="font-bold font-font3">
              {totalsUser.totalsUser}
            </span>{" "}
            {totalsUser.totalsUser > 1 ? "users" : "user"}
          </h1>
        </div>
        <div className="inline-flex items-center justify-center space-x-2 border px-2 md:px-4 py-2 w-full md:w-auto">
          <h1 className="font-font2">Seller </h1>
          <HiArrowLongRight className="text-orange-600" />
          <h1>
            <span className="font-bold font-font3">
              {totalsUser.totalsSeller}
            </span>{" "}
            {totalsUser.totalsSeller > 1 ? "sellers" : "seller"}
          </h1>
        </div>
        <div className="inline-flex items-center justify-center space-x-2 border px-2 md:px-4 py-2 w-full md:w-auto">
          <h1 className="font-font2">Deliver </h1>
          <HiArrowLongRight className="text-orange-600" />
          <h1>
            <span className="font-bold font-font3">
              {totalsUser.totalsDeliver}
            </span>{" "}
            {totalsUser.totalsDeliver > 1 ? "sellers" : "seller"}
          </h1>
        </div>
      </div>
    </div>
  );
};

export default DashboardAdminPage;
