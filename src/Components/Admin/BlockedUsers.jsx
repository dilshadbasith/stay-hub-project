import { Card, Typography } from "@material-tailwind/react";
import "../Admin/Admin.css";
import { useEffect, useState } from "react";
import Axios from "../../lib/Axios";
import { useCookies } from "react-cookie";
import { toast } from "react-toastify";

const TABLE_HEAD = ["Name", "Mobile", "Email", ""];

export function BlockedUsers() {
  const [userlist, setUserlist] = useState([]);
  const [cookies] = useCookies(["access_token"]);

  async function User() {
    const list = await Axios.get("/api/admin/users", {
      headers: { Authorization: `Bearer ${cookies.access_token}` },
    });
    console.log(list.data);
    setUserlist(list.data.data);
  }

  useEffect(() => {
    User();
  }, []);

  
  const blocked=userlist.filter((user)=>user.adminSuspended==true)

  return (
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
          {blocked.map((item, index) => (
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
                </Typography>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </Card>
  );
}
