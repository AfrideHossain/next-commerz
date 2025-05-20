import { FaTruckFast } from "react-icons/fa6";
import { RiCustomerService2Line } from "react-icons/ri";
import { RiHandCoinLine } from "react-icons/ri";
import ServicesSecBox from "./ServicesSecBox";
export default function ServicesSec() {
  return (
    <div className="grid md:grid-cols-3 gap-10">
      {/* here i need to pass component function through icon prop */}
      <ServicesSecBox icon={FaTruckFast}>Fast and Free Delivery</ServicesSecBox>
      <ServicesSecBox icon={RiCustomerService2Line}>
        24/7 Customer Service
      </ServicesSecBox>
      <ServicesSecBox icon={RiHandCoinLine}>Cash On Delivery</ServicesSecBox>
    </div>
  );
}
