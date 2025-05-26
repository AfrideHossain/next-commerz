"use client";

import { useState } from "react";
import ChangeOrderStatusBtn from "./ChangeOrderStatusBtn";

export default function DeclineMsgForm({ orderId, status, email }) {
  const [message, setMessage] = useState("");

  return (
    <div className="">
      <p className="text-sm text-gray-400 mb-2">Decline with a message</p>
      <div className="flex flex-col items-start gap-2">
        <textarea
          type="text"
          placeholder="Enter message..."
          className="w-full input h-20 py-2 px-2"
          value={message}
          onChange={(e) => {
            setMessage(e.target.value);
            console.log(message);
          }}
        ></textarea>
        <ChangeOrderStatusBtn
          className={`btn btn-wide text-sm bg-red-800 text-red-100
                            `}
          status={"declined"}
          orderId={orderId}
          options={{ message, status, email }}
        >
          Decline
        </ChangeOrderStatusBtn>
      </div>
    </div>
  );
}
