import { FaTruckFast } from "react-icons/fa6";
import { RiCustomerService2Line } from "react-icons/ri";
import { RiHandCoinLine } from "react-icons/ri";
export default function ServicesSec() {
  return (
    <div className="grid grid-cols-3">
      <div className="flex flex-col justify-center items-center gap-5">
        <div className="w-20 h-20 rounded-full bg-neutral flex justify-center items-center">
          <FaTruckFast className="w-10 h-10" />
        </div>
        <h1 className="text-3xl font-semibold text-center">
          Fast and Free Delivery
        </h1>
      </div>
      <div className="flex flex-col justify-center items-center gap-5">
        <div className="w-20 h-20 rounded-full bg-neutral flex justify-center items-center">
          <RiCustomerService2Line className="w-10 h-10" />
        </div>
        <h1 className="text-3xl font-semibold text-center">
          24/7 Customer Service
        </h1>
      </div>
      <div className="flex flex-col justify-center items-center gap-5">
        <div className="w-20 h-20 rounded-full bg-neutral flex justify-center items-center">
          <RiHandCoinLine className="w-10 h-10" />
        </div>
        <h1 className="text-3xl font-semibold text-center">Cash On Delivery</h1>
      </div>
    </div>
  );
}
