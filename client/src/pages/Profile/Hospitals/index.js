import React from "react";
import { useDispatch } from "react-redux";
import { Setloading } from "../../../redux/loadersSlice";
import { Table, message } from "antd";
import { GetAllHospitalsOfAnOrganization } from "../../../apicalls/users";
import { getDateFormat } from "../../../utils/helpers";

function Hospitals() {
  const [data, SetData] = React.useState([]);
  const dispatch = useDispatch();

  const getData = async () => {
    try {
      dispatch(Setloading(true));
      const response = await GetAllHospitalsOfAnOrganization();
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
      title: "Hospital Name",
      dataIndex: "hospitalName",
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
      title:"Address",
      dataIndex:"address",
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

  return <div>Hospitals</div>;
}

export default Hospitals;
