import { act } from '@testing-library/react-hooks/dom';
import { setup } from '.';

const navigate = jest.fn();
jest.mock('react-router', () => {
  return {
    ...jest.requireActual('react-router'),
    useNavigate: () => navigate,
  };
});

describe('React Router V6', () => {
  it('useUrlState should be work', () => {
    const res = setup(['/index']);
    act(() => {
      res.setState({ count: 1 });
    });

    expect(res.state).toMatchObject({ count: '1' });
    expect(navigate).toBeCalledWith({ hash: '', search: 'count=1' }, { replace: false });
  });
});
