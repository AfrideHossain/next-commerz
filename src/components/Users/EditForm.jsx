"use client";

import Form from "next/form";

// import icons
import {
  FaRegUser,
  FaRegEnvelope,
  FaPhoneAlt,
  FaRegAddressCard,
} from "react-icons/fa";
// import server action
import { editUser } from "@/app/actions/userAction";
import { useState } from "react";
import { toast } from "react-toastify";
export default function EditForm({ prevInfo }) {
  const [isLoading, setIsLoading] = useState(false);
  const handleSubmit = async (formData) => {
    setIsLoading(true);
    const toastId = toast.loading("loading...");
    try {
      const res = await editUser(formData, prevInfo._id.toString());
      // toast.success("User updated successfully!");
      if (res.success) {
        toast.update(toastId, {
          render: "User updated successfully!",
          type: "success",
          isLoading: false,
          autoClose: 1000,
        });
      }
    } catch (error) {
      console.error("Error updating user:", error);
      toast.error("Failed to update user. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };
  // console.log(prevInfo);
  return (
    <Form action={handleSubmit}>
      <fieldset className="fieldset p-4 border border-gray-400 space-y-3">
        <legend className="fieldset-legend text-gray-300 px-2">
          Basic information
        </legend>
        <div className="flex gap-4">
          <div className="space-y-4">
            <div className="input w-full">
              <label className="label">
                <FaRegUser /> Name
              </label>
              <input
                type="text"
                className="w-full"
                name="name"
                defaultValue={prevInfo?.name}
              />
            </div>
            <div className="input w-full">
              <label className="label">
                <FaRegEnvelope /> Email
              </label>
              <input
                type="email"
                className="w-full"
                name="email"
                defaultValue={prevInfo?.email}
              />
            </div>
          </div>
          <div className="space-y-4">
            <div className="input w-full">
              <label className="label">
                <FaPhoneAlt /> Phone
              </label>
              <input
                type="text"
                className="w-full"
                name="phone"
                defaultValue={prevInfo?.phone}
              />
            </div>
            <div className="input w-full">
              <label className="label">
                <FaRegAddressCard /> NID
              </label>
              <input
                type="text"
                className="w-full"
                name="nid"
                defaultValue={prevInfo?.nid}
              />
            </div>
          </div>
        </div>
      </fieldset>
      <fieldset className="fieldset p-4 border border-gray-400 space-y-3">
        <legend className="fieldset-legend text-gray-300 px-2">Address</legend>
        <div className="flex gap-4">
          <fieldset className="fieldset grow p-4 border border-gray-400 space-y-3">
            <legend className="fieldset-legend text-gray-300 px-2">
              Permanent
            </legend>
            <div className="input w-full">
              <label className="label">City</label>
              <input
                type="text"
                className="w-full"
                name="city_permanent"
                defaultValue={prevInfo?.address?.permanent?.city}
              />
            </div>
            <div className="input w-full">
              <label className="label">District</label>
              <input
                type="text"
                className="w-full"
                name="district_permanent"
                defaultValue={prevInfo?.address?.permanent?.district}
              />
            </div>
            <div className="input w-full">
              <label className="label">Division</label>
              <input
                type="text"
                className="w-full"
                name="division_permanent"
                defaultValue={prevInfo?.address?.permanent?.division}
              />
            </div>
            <div className="input w-full">
              <label className="label">Zip code</label>
              <input
                type="text"
                className="w-full"
                name="zip_permanent"
                defaultValue={prevInfo?.address?.permanent?.zip}
              />
            </div>
          </fieldset>
          <fieldset className="fieldset grow p-4 border border-gray-400 space-y-3">
            <legend className="fieldset-legend text-gray-300 px-2">
              Shipping
            </legend>
            <div className="input w-full">
              <label className="label">City</label>
              <input
                type="text"
                className="w-full"
                name="city_shipping"
                defaultValue={prevInfo?.address?.shipping?.city}
              />
            </div>
            <div className="input w-full">
              <label className="label">District</label>
              <input
                type="text"
                className="w-full"
                name="district_shipping"
                defaultValue={prevInfo?.address?.shipping?.district}
              />
            </div>
            <div className="input w-full">
              <label className="label">Division</label>
              <input
                type="text"
                className="w-full"
                name="division_shipping"
                defaultValue={prevInfo?.address?.shipping?.division}
              />
            </div>
            <div className="input w-full">
              <label className="label">Zip code</label>
              <input
                type="text"
                className="w-full"
                name="zip_shipping"
                defaultValue={prevInfo?.address?.shipping?.zip}
              />
            </div>
          </fieldset>
        </div>
      </fieldset>
      <div className="flex justify-end mt-4">
        {/* <button type="submit" className="btn btn-primary">
          {isLoading ? "Saving..." : "Save Changes"}
        </button> */}
        <button
          type="submit"
          className={`btn btn-primary ${isLoading ? "loading" : ""}`}
          disabled={isLoading}
        >
          Save Changes
        </button>
      </div>
    </Form>
  );
}
