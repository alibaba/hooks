import { useRequest } from "ahooks";
import React, { useState } from "react";
import { message } from "antd";

const editUsername = (username: string) => {
  return new Promise((_, reject) => {
    setTimeout(() => {
      reject(new Error("Failed to modify username"));
    }, 1000);
  });
};

const Demo: React.FC = () => {
  const [state, setState] = useState("");
  const { loading, run } = useRequest(editUsername, {
    retryCount: 3,
    manual: true,
    onError: (error) => {
      message.error(error.message);
    },
  });

  return (
    <div>
      <input
        onChange={(e) => setState(e.target.value)}
        value={state}
        placeholder="Please enter username"
        style={{ width: 240, marginRight: 16 }}
      />
      <button disabled={loading} type="button" onClick={() => run(state)}>
        {loading ? "Loading" : "Edit"}
      </button>
    </div>
  );
};

export default Demo;
