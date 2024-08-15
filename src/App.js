import { useEffect, useState } from 'react';
import { auth } from './Firebase/firebase';
import './App.css';
import Auth from './pages/Authentication/Auth';
import Todo from './pages/ToDo/Todo';

function App() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((currentUser) => {
      if (currentUser) {
        // Check session expiration
        const expirationTime = 7 * 24 * 60 * 60 * 1000; // 7 days in milliseconds
        const lastSignInTime = currentUser.metadata.lastSignInTime;
        const lastSignInTimestamp = Date.parse(lastSignInTime);
        const currentTimestamp = new Date().getTime();

        if (currentTimestamp - lastSignInTimestamp > expirationTime) {
          // Session has expired, sign out the user
          auth.signOut();
          setUser(null);
        } else {
          // Session is still valid
          setUser(currentUser);
        }
      } else {
        setUser(null);
      }
    });

    return () => {
      unsubscribe();
    };
  }, []);
  return (
    <div>
      {user ? (
        <Todo />
      ) : (
        <Auth />
      )}
    </div>
  );
}

export default App;
