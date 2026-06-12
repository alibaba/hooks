import { useRequest, useToggle } from 'ahooks';
import Mock from 'mockjs';
function getUsername() {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(Mock.mock('@name'));
    }, 1000);
  });
}

export default () => {
  const [ready, { toggle }] = useToggle(false);

  const { data, loading } = useRequest(getUsername, {
    ready,
  });

  return (
    <>
      <p>
        Ready: {JSON.stringify(ready)}
        <button onClick={toggle} style={{ marginLeft: 16 }}>
          Toggle Ready
        </button>
      </p>
      <p>Username: {loading ? 'Loading' : String(data)}</p>
    </>
  );
};
