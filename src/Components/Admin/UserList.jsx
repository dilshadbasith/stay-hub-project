import { Card, Typography } from "@material-tailwind/react";
import { MdDelete } from "react-icons/md";
import '../Admin/Admin.css'
 
const TABLE_HEAD = ["Name", "Mobile", "Email", ""];
 
const TABLE_ROWS = [
  {
    name: "John Michael",
    Mobile: "9876543344",
    Email: "john@gmail.com",
  },
  {
    name: "Alexa Liras",
    Mobile: "9876543212",
    Email: "alexa@gmail.com",
  },
  {
    name: "Laurent Perrier",
    Mobile: "9876545634",
    Email: "perrier@gmail.com",
  },
  {
    name: "Michael Levi",
    Mobile: "9876540987",
    Email: "levi@gmail.com",
  },
  {
    name: "Richard Gran",
    Mobile: "9456743212",
    Email: "gran@gmail.com",
  },
];
 
export function UserList() {
  return (
    <Card className="h-full w-full overflow-scroll">
      <table className="w-full min-w-max table-auto text-left">
        <thead>
          <tr>
            {TABLE_HEAD.map((head) => (
              <th key={head} className="border-b border-blue-gray-100 bg-blue-gray-50 p-4">
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
          {TABLE_ROWS.map(({ name, Mobile, Email }, index) => (
            <tr key={name} className="even:bg-blue-gray-50/50">
              <td className="p-4">
                <Typography variant="small" color="blue-gray" className="font-normal">
                  {name}
                </Typography>
              </td>
              <td className="p-4">
                <Typography variant="small" color="blue-gray" className="font-normal">
                  {Mobile}
                </Typography>
              </td>
              <td className="p-4">
                <Typography variant="small" color="blue-gray" className="font-normal">
                  {Email}
                </Typography>
              </td>
              <td className="p-4">
                <Typography as="a" href="#" variant="small" color="blue-gray" className="font-medium">
                <MdDelete className="admin-dlt-btn"/>
                </Typography>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </Card>
  );
}