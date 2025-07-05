import useLocalStorageState from '../../useLocalStorageState';
import { useBroadcastChannel } from '../index';

interface IAuthMessage {
  type: 'LOGOUT';
  timestamp: number;
}

const App = () => {
  const [state, setState] = useLocalStorageState('auth_token', {
    defaultValue: '',
  });
  const authChannel = useBroadcastChannel<IAuthMessage>('auth_channel', {
    onMessage: message => {
      if (message.type === 'LOGOUT') {
        console.log(
          'Received logout message at:',
          new Date(message.timestamp).toLocaleTimeString()
        );
        setState('');
      }
    },
    onMessageError: event => {
      console.error('Message error', event.data);
    },
  });

  const logoutWithBroadcast = () => {
    authChannel.sendMessage({
      type: 'LOGOUT',
      timestamp: Date.now(),
    });
    setState('');
  };

  return (
    <main className="p-4 space-y-4">
      <button
        className="px-4 py-2 bg-yellow-600 text-white rounded hover:bg-yellow-700 transition"
        onClick={logoutWithBroadcast}
      >
        Broadcast Logout
      </button>

      <p className="text-gray-700">Current Auth Token: {state}</p>
    </main>
  );
};

export default App;
