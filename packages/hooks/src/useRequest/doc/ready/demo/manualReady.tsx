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

  const { data, loading, run } = useRequest(getUsername, {
    ready,
    manual: true,
  });

  return (
    <>
      <p>
        Ready: {JSON.stringify(ready)}
        <button onClick={toggle} style={{ marginLeft: 16 }}>
          Toggle Ready
        </button>
      </p>
      <p>
        Username: {loading ? 'Loading' : String(data)}
        <button type="button" onClick={run} style={{ marginLeft: 16 }}>
          run
        </button>
      </p>
    </>
  );
};
