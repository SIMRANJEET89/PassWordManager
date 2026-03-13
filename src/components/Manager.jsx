import React, { useEffect, useState, useRef } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { v4 as uuidv4 } from "uuid";

const Manager = () => {
  const ref = useRef();
  const passwordRef = useRef();
  const [form, setForm] = useState({ site: "", username: "", password: "" });
  const [passwordArray, setPasswordArray] = useState([]);

  const getPasswords = async () => {
    let req = await fetch("https://passwordmanager-y9ch.onrender.com/");
    let passwords = await req.json();
    setPasswordArray(passwords);
    console.log(passwords);
  };

  useEffect(() => {
    getPasswords();
  }, []);

  const copyText = (text) => {
    toast("Copied To Clipboard!", {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: false,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "dark",
    });
    navigator.clipboard.writeText(text);
  };
  const showPassword = () => {
    passwordRef.current.type = "text";
    if (ref.current.src.includes("/icon/crosseye.png")) {
      ref.current.src = "/icon/eye-icon-9665.png";
      passwordRef.current.type = "password";
    } else {
      ref.current.src = "/icon/crosseye.png";
    }
  };

  const savePassword = async () => {
    if (
      form.site.length > 3 &&
      form.username.length > 3 &&
      form.password.length > 3
    ) {
      // if any such id exists in db delete it
      await fetch("https://passwordmanager-y9ch.onrender.com/", {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id: form.id }),
      });

      const newId = uuidv4()

      setPasswordArray([...passwordArray, { ...form, id: newId }]);
      await fetch("https://passwordmanager-y9ch.onrender.com/", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...form, id: uuidv4() }),
      });
      
      setForm({ site: "", username: "", password: "" });
      toast("password saved!", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: false,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
      });
    } else {
      toast("password saved!", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: false,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
      });
    }
  };
  const deletePassword = async (id) => {
    console.log("Deleting password with id", id);
    let c = confirm("Do you really want to delete this password");
    if (c) {
      setPasswordArray(passwordArray.filter((item) => item.id !== id));
      let res = await fetch("https://passwordmanager-y9ch.onrender.com/", {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id }),
      });
      // localStorage.setItem(
      //   "passwords",
      //   JSON.stringify(passwordArray.filter((item) => item.id !== id)),
      // );

      toast("Password deleted successfully!", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: false,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
      });
    }
  };

  const editPassword = (id) => {
    console.log("Editing password with id", id);
    setForm({ ...passwordArray.filter((i) => i.id === id)[0], id: id });
    setPasswordArray(passwordArray.filter((item) => item.id !== id));
  };

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  return (
    <>
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick={false}
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />

      <div className="absolute inset-0 -z-10 h-full w-full bg-green-100 bg-[linear-gradient(to_right,#8080800a_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] bg-[size:14px_24px]">
        <div className="absolute left-0 right-0 top-0 -z-10 m-auto h-[310px] w-[310px] rounded-full bg-fuchsia-400 opacity-20 blur-[100px]"></div>
      </div>

      <div className="p-3 md:mycontainer min-h-[86vh]">
        <h1 className="text-4xl font-bold text-center">
          <span className="text-green-700"> &lt; </span>
          <span>Pass</span>
          <span className="text-green-500">OP/&gt;</span>
        </h1>
        <p className="text-gray-900 text-lg text-center">
          Your own Password Manager
        </p>

        <div className="flex flex-col p-4 text-black gap-8 items-center">
          <input
            value={form.site}
            onChange={handleChange}
            className="rounded-full border border-green-500  w-full p-4 py-1"
            type="text"
            placeholder="Enter Website URL"
            name="site"
            id="site"
          />
          <div className="flex flex-col md:flex-row w-full gap-8 justify-between">
            <input
              value={form.username}
              onChange={handleChange}
              className="rounded-full border border-green-500  w-full p-4 py-1"
              type="text"
              placeholder="Enter Username"
              name="username"
              id="username"
            />

            <div className="relative">
              <input
                ref={passwordRef}
                value={form.password}
                onChange={handleChange}
                className="rounded-full border border-green-500  w-full p-4 py-1"
                type="password"
                placeholder="Enter Password"
                name="password"
                id="password"
              />
              <span
                className="absolute right-[3px] top-[4px] cursor-pointer"
                onClick={showPassword}
              >
                <img
                  ref={ref}
                  className="p-1"
                  width={26}
                  src="/icon/eye-icon-9665.png"
                  alt="eye"
                />
              </span>
            </div>
          </div>

          <button
            onClick={savePassword}
            className="flex gap-2 justify-center items-center bg-green-400 rounded-full px-8 py-2 w-fit hover:bg-green-300 border border-green-900"
          >
            <lord-icon
              src="https://cdn.lordicon.com/vjgknpfx.json"
              trigger="hover"
              colors="primary:#000000,secondary:#000000"
            ></lord-icon>
            Save
          </button>
        </div>

        <div className="passwords">
          <h2 className="font-bold text-2xl py-4">Your Passwords</h2>
          {passwordArray.length === 0 && <div>No passwords to show</div>}
          {passwordArray.length != 0 && (
            <div className="hidden md:block overflow-x-auto">

            <table className="table-auto w-full rounded-md overflow-hidden mb-10">
              <thead className="bg-green-800 text-white">
                <tr>
                  <th className="py-2">Site</th>
                  <th className="py-2">Username</th>
                  <th className="py-2">Password</th>
                  <th className="py-2">Actions</th>
                </tr>
              </thead>
              <tbody className="bg-green-200">
                {passwordArray.map((item, index) => {
                  return (
                    <tr key={index}>
                      <td className="py-2 border border-white text-center">
                        <div className="flex items-center justify-center">
                          <a href={item.site} target="_blank">
                            {item.site}
                          </a>
                          <div
                            className="loardiconcopy cursor-pointer size-7"
                            onClick={() => {
                              copyText(item.site);
                            }}
                          >
                            <lord-icon
                              style={{ width: "25px", height: "25px" }}
                              src="https://cdn.lordicon.com/aleriptu.json"
                              trigger="hover"
                            ></lord-icon>
                          </div>
                        </div>
                      </td>
                      <td className="py-2 border border-white text-center">
                        <div className="flex items-center justify-center">
                          {item.username}
                          <div
                            className="loardiconcopy cursor-pointer size-7"
                            onClick={() => {
                              copyText(item.username);
                            }}
                          >
                            <lord-icon
                              style={{ width: "25px", height: "25px" }}
                              src="https://cdn.lordicon.com/aleriptu.json"
                              trigger="hover"
                            ></lord-icon>
                          </div>
                        </div>
                      </td>
                      <td className="py-2 border border-white text-center">
                        <div className="flex items-center justify-center">
                          {"*".repeat(item.password.length)}
                          <div
                            className="loardiconcopy cursor-pointer size-7"
                            onClick={() => {
                              copyText(item.password);
                            }}
                          >
                            <lord-icon
                              style={{ width: "25px", height: "25px" }}
                              src="https://cdn.lordicon.com/aleriptu.json"
                              trigger="hover"
                            ></lord-icon>
                          </div>
                        </div>
                      </td>
                      <td className="py-2 border border-white text-center">
                        <span
                          className="cursor-pointer mx-1"
                          onClick={() => {
                            editPassword(item.id);
                          }}
                        >
                          <lord-icon
                            src="https://cdn.lordicon.com/exymduqj.json"
                            trigger="hover"
                            style={{ width: "25px", height: "25px" }}
                          ></lord-icon>
                        </span>
                        <span
                          className="cursor-pointer mx-1"
                          onClick={() => {
                            deletePassword(item.id);
                          }}
                        >
                          <lord-icon
                            src="https://cdn.lordicon.com/jzinekkv.json"
                            trigger="hover"
                            style={{ width: "25px", height: "25px" }}
                          ></lord-icon>
                        </span>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
               </div>
          )}
        </div>
      </div>
    </>
  );
};

export default Manager;
