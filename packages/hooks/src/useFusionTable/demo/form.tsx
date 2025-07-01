import React from "react";
import ReactJson from "react-json-view";
import {
  Table,
  Pagination,
  Field,
  Form,
  Input,
  Button,
  Icon,
} from "@alifd/next";
import { useFusionTable } from "ahooks";

const style: React.CSSProperties = {
  display: "flex",
  alignItems: "center",
  justifyContent: "flex-end",
};

interface Item {
  name: { last: string };
  email: string;
  phone: string;
  gender: "male" | "female";
}

interface Result {
  total: number;
  list: Item[];
}

const getTableData = (
  { current, pageSize },
  formData: object
): Promise<Result> => {
  let query = `page=${current}&size=${pageSize}`;
  Object.entries(formData).forEach(([key, value]) => {
    if (value) {
      query += `&${key}=${value}`;
    }
  });

  return fetch(`https://randomuser.me/api?results=${pageSize}&${query}`)
    .then((res) => res.json())
    .then((res) => ({
      total: 55,
      list: res.results.slice(0, 10),
    }));
};

const AppList: React.FC = () => {
  const field = Field.useField([]);
  const { paginationProps, tableProps, search, loading, params } =
    useFusionTable(getTableData, { field });
  const { type, changeType, submit, reset } = search;

  const advanceSearchForm = (
    <Form inline field={field} style={style}>
      <Form.Item label="name:">
        <Input name="name" placeholder="name" />
      </Form.Item>
      <Form.Item label="email:">
        <Input name="email" placeholder="email" />
      </Form.Item>
      <Form.Item label="phone:">
        <Input name="phone" placeholder="phone" />
      </Form.Item>
      <Form.Item label=" ">
        <Form.Submit loading={loading} type="primary" onClick={submit}>
          Search
        </Form.Submit>
      </Form.Item>
      <Form.Item label=" ">
        <Button onClick={reset}>reset</Button>
      </Form.Item>
      <Form.Item label=" ">
        <Button text type="primary" onClick={changeType}>
          Simple Search
        </Button>
      </Form.Item>
    </Form>
  );

  const searchForm = (
    <Form inline field={field} style={style}>
      <Form.Item label=" ">
        <Input
          name="name"
          placeholder="enter name"
          onPressEnter={submit}
          innerAfter={
            <Icon
              type="search"
              size="xs"
              onClick={submit}
              style={{ margin: 4 }}
            />
          }
        />
      </Form.Item>
      <Form.Item label=" ">
        <Button text type="primary" onClick={changeType}>
          Advanced Search
        </Button>
      </Form.Item>
    </Form>
  );

  return (
    <>
      {type === "simple" ? searchForm : advanceSearchForm}
      <Table {...tableProps} primaryKey="email">
        <Table.Column title="name" dataIndex="name.last" width={140} />
        <Table.Column title="email" dataIndex="email" width={500} />
        <Table.Column title="phone" dataIndex="phone" width={500} />
        <Table.Column title="gender" dataIndex="gender" width={500} />
      </Table>
      <Pagination style={{ marginTop: 16 }} {...paginationProps} />
      <div style={{ background: "#f5f5f5", padding: 8, marginTop: 16 }}>
        <p>Current Table:</p>
        <ReactJson src={params[0]!} collapsed={2} />
        <p>Current Form:</p>
        <ReactJson src={params[1]!} collapsed={2} />
      </div>
    </>
  );
};

export default AppList;
