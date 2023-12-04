import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Setloading } from "../../../redux/loadersSlice";
import {
  GetAllOrganizationsOfAHospital,
  GetAllOrganizationsOfDonar,
} from "../../../apicalls/users";
import { Modal, Table, message } from "antd";
import { getDateFormat } from "../../../utils/helpers";
import InventoryTable from "../../../components/InventoryTable";

function Organizations({ userType }) {
  const [showHistoryModal, setshowHistoryModal] = React.useState(false);
  const { currentUser } = useSelector((state) => state.users);
  const [selectedOrganization, setSelectedOrganization] = React.useState(null);
  const [data, SetData] = React.useState([]);
  const dispatch = useDispatch();

  const getData = async () => {
    try {
      dispatch(Setloading(true));
      let response = null;
      if (userType === "hospital") {
        response = await GetAllOrganizationsOfAHospital();
      } else {
        response = await GetAllOrganizationsOfDonar();
      }
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
      dataIndex: "organizationName",
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
      title: "Address",
      dataIndex: "address",
    },
    {
      title: "Created At",
      dataIndex: "createdAt",
      render: (text) => getDateFormat(text),
    },
    {
      title: "Action",
      dataIndex: "action",
      render: (text, record) => (
        <span
          className="underline text-md cursor-pointer"
          onClick={() => {
            setSelectedOrganization(record);
            setshowHistoryModal(true);
          }}
        >
          History
        </span>
      ),
    },
  ];

  React.useEffect(() => {
    getData();
  }, []);
  return (
    <div>
      <Table columns={columns} dataSource={data} />

      {showHistoryModal && (
        <Modal
          title={`${
            userType === "donar" ? "Donation History" : "Consumption History"
          } In ${selectedOrganization.organizationName}`}
          centered
          open={showHistoryModal}
          onClose={() => setshowHistoryModal(false)}
          width={1000}
          onCancel={() => setshowHistoryModal(false)}
        >
          <InventoryTable
            filters={{
              organization: selectedOrganization._id,
              [userType]: currentUser._id,
            }}
          />
        </Modal>
      )}
    </div>
  );
}

export default Organizations;
