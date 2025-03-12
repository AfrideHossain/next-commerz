import Link from "next/link";
import React from "react";
import { LuPlus } from "react-icons/lu";

export default function TabularUsers({ users }) {
  //   const users = JSON.parse(users);
  return (
    <>
      {!users.length > 0 && "Not found any user"}
      {users.length > 0 && (
        <div className="mt-10 bg-gray-800 p-6 rounded-lg">
          <div className="mb-4 flex justify-between items-center">
            <h2 className="text-xl font-semibold">All Users</h2>
            <Link
              href={"./products/add"}
              className="btn btn-ghost btn-outline rounded-full"
            >
              <LuPlus className="text-xl" />
              Add New User
            </Link>
          </div>
          <table className="table">
            {/* head */}
            <thead>
              <tr className="text-sm">
                {/* <th>ID</th> */}
                <th>Name</th>
                <th>Email & Phone</th>
                <th>Role</th>
                <th>Joined At</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {users.map((user) => (
                <tr key={user._id.toString()}>
                  {/* <th>{user._id.toString()}</th> */}
                  <td>{user.name}</td>
                  <td className="space-y-1">
                    <p>{user.email}</p>
                    <p>
                      {user.phone || (
                        <span className="text-red-600">
                          Phone number not found
                        </span>
                      )}
                    </p>
                  </td>
                  <td>
                    <p
                      className={`badge ${
                        user.role === "admin" ? "badge-success" : "badge-info"
                      } uppercase`}
                    >
                      {user.role}
                    </p>
                  </td>
                  <td>
                    {new Date(user.createdAt).toLocaleDateString("en-US", {
                      weekday: "long",
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                    })}
                  </td>
                  <td>
                    <div className="join">
                      <Link
                        href={`./users/${user._id.toString()}`}
                        className="btn btn-sm btn-ghost text-success join-item"
                      >
                        View
                      </Link>
                      <button className="btn btn-sm btn-ghost text-info join-item">
                        Edit
                      </button>
                      <button className="btn btn-sm btn-ghost text-error  join-item">
                        Delete
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </>
  );
}
