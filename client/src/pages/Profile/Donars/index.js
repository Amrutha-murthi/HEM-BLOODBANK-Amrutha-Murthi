import React from "react";
import { useDispatch } from "react-redux";
import { Setloading } from "../../../redux/loadersSlice";
import { Table, message } from "antd";
import { GetAllDonarsOfAnOrganization } from "../../../apicalls/users";
import { getDateFormat } from "./../../../utils/helpers";

function Donars() {
  const [data, SetData] = React.useState([]);
  const dispatch = useDispatch();

  const getData = async () => {
    try {
      dispatch(Setloading(true));
      const response = await GetAllDonarsOfAnOrganization();
      dispatch(Setloading(false));
      if (response.success) {
        SetData(response.data);
      } else {
        throw new Error(response.message);
      }
    } catch (error) {
      message.error(error.message);
      dispatch(Setloading(false));
    }
  };

  const columns = [
    {
      title: "Name",
      dataIndex: "name",
    },
    {
      title: "Email",
      dataIndex: "email",
    },
    {
      title: "Phone",
      dataIndex: "phone",
    },
    {
      title: "Created At",
      dataIndex: "createdAt",
      render: (text) => getDateFormat(text),
    },
  ];

  React.useEffect(() => {
    getData();
  }, []);
  return (
    <div>
      <Table columns={columns} dataSource={data} />
    </div>
  );

  return <div>Donars</div>;
}

export default Donars;
