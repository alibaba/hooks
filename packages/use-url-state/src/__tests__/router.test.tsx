import { act } from 'react';
import { setup } from '.';

describe('React Router V6', () => {
  it('useUrlState should be work', () => {
    const res = setup(['/index']);
    act(() => {
      res.setState({ count: 1 });
    });

    expect(res.state).toMatchObject({ count: '1' });
  });
});
