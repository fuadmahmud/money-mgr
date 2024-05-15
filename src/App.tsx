import { RouterProvider } from 'react-router-dom';
import { router } from './router';
import { Provider } from 'react-redux';
import { store } from './store';
import { LocalStorageProvider } from './context/useLocalStorage';

function App() {
  return (
    <Provider store={store}>
      <LocalStorageProvider>
        <RouterProvider router={router}/>
      </LocalStorageProvider>
    </Provider>
  )
}

export default App
