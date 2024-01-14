import { Card, Typography } from "@material-tailwind/react";
import { MdDelete } from "react-icons/md";
import "../Admin/Admin.css";
import { useEffect, useState } from "react";
import Axios from "../../lib/Axios";
import { useCookies } from "react-cookie";
import { toast } from "react-toastify";

const TABLE_HEAD = ["Name", "Mobile", "Email", ""];

export function UserList() {
  const [userlist, setUserlist] = useState([]);
  const [cookies] = useCookies(["access_token"]);
  const [search, setSearch] = useState("");

  async function User() {
    const list = await Axios.get("/api/admin/users", {
      headers: { Authorization: `Bearer ${cookies.access_token}` },
    });
    // console.log(list.data);
    setUserlist(list.data.data);
  }

  useEffect(() => {
    User();
  }, []);

  const handleBlock = async (e, id) => {
    e.preventDefault();
    try {
      const block = await Axios.put(
        `/api/admin/users/${id}`,
        { adminSuspended: true },
        {
          headers: { Authorization: `Bearer ${cookies.access_token}` },
        }
      );
      toast.success("user blocked");
      // location.reload()
      User();
    } catch (error) {
      console.log(error);
    }
  };
  const handleUnBlock = async (e, id) => {
    e.preventDefault();
    try {
      const block = await Axios.put(
        `/api/admin/users/${id}`,
        { adminSuspended: false },
        {
          headers: { Authorization: `Bearer ${cookies.access_token}` },
        }
      );
      toast.success("user unblocked");
      // location.reload()
      User();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <input
        type="text"
        className="search-user"
        placeholder="&nbsp;&nbsp;&nbsp;search user"
        onChange={(e) => setSearch(e.target.value)}
      />
      <br />
      <br />
      <Card className="h-full w-full overflow-scroll">
        <table className="w-full min-w-max table-auto text-left">
          <thead>
            <tr>
              {TABLE_HEAD.map((head) => (
                <th
                  key={head}
                  className="border-b border-blue-gray-100 bg-blue-gray-50 p-4"
                >
                  <Typography
                    variant="small"
                    color="blue-gray"
                    className="font-normal leading-none opacity-70"
                  >
                    {head}
                  </Typography>
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {userlist
              .filter((item) => {
                return search.toLowerCase() === ""
                  ? item
                  : item.name.toLowerCase().includes(search);
              })
              .map((item, index) => (
                <tr key={index} className="even:bg-blue-gray-50/50">
                  <td className="p-4">
                    <Typography
                      variant="small"
                      color="blue-gray"
                      className="font-normal"
                    >
                      {item.name}
                    </Typography>
                  </td>
                  <td className="p-4">
                    <Typography
                      variant="small"
                      color="blue-gray"
                      className="font-normal"
                    >
                      {item.mobilenumber}
                    </Typography>
                  </td>
                  <td className="p-4">
                    <Typography
                      variant="small"
                      color="blue-gray"
                      className="font-normal"
                    >
                      {item.email}
                    </Typography>
                  </td>
                  <td className="p-4">
                    <Typography
                      as="a"
                      href="#"
                      variant="small"
                      color="blue-gray"
                      className="font-medium"
                    >
                      {" "}
                      {item.adminSuspended ? (
                        <button
                          className="unblock-btn"
                          onClick={(e) => handleUnBlock(e, item._id)}
                        >
                          unBlock
                        </button>
                      ) : (
                        <button
                          className="block-btn"
                          onClick={(e) => handleBlock(e, item._id)}
                        >
                          Block
                        </button>
                      )}
                    </Typography>
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
      </Card>
    </>
  );
}
