import { Table } from "antd";
import React, { useEffect, useState } from "react";
import { connect, useDispatch } from "react-redux";
import { get_accounts, get_transactions } from "../../Actions/actions";
import { baseUrl } from "../../shared";
import { getDateString } from "../../utils/date";
import AddTransaction from "./AddTransaction";
import EditTransaction from "./EditTransaction";
import "./transactions.css";

function Transactions({
  Accounts: { fetched, accounts },
  Transactions: { transactions },
  Auth: { user },
}) {
  const [id, setId] = useState(null);
  const dispatch = useDispatch();

  useEffect(() => {
    var config = {
      params: { user_id: user.user_id },
    };
    baseUrl
      .get("/transactions/user_id", config)
      .then((res) => {
        dispatch(get_transactions(res.data));
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  useEffect(() => {
    var config = {
      params: { user_id: user.user_id },
    };
    baseUrl
      .get("/accounts/user_id", config)
      .then((res) => {
        dispatch(get_accounts(res.data));
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  console.log(transactions);
  const columns = [
    {
      title: "Amount",
      dataIndex: "transaction_amount",
      key: "transaction_amount",
    },
    {
      title: "Transaction Type",
      dataIndex: "transaction_type",
      key: "transaction_type",
    },
    {
      title: "Transaction Date",
      dataIndex: "transaction_date",
      key: "transaction_date",
      render: (text) => getDateString(text),
    },
    // {
    //   title: "Actions",
    //   dataIndex: "transaction_id",
    //   key: "transaction_id",
    //   render: (text) => (
    //     <div>
    //       <Button
    //         type="primary"
    //         icon={<EditOutlined />}
    //         // loading={loadings[1]}
    //         onClick={() => setId(text)}
    //       >
    //         Edit
    //       </Button>
    //     </div>
    //   ),
    // },
  ];

  return (
    <div>
      <AddTransaction />
      <EditTransaction id={id} setId={setId} />
      <Table columns={columns} dataSource={transactions} />
    </div>
  );
}

const mapStateToProps = ({ Auth, Accounts, Transactions }) => ({
  Auth,
  Accounts,
  Transactions,
});
export default connect(mapStateToProps)(Transactions);
