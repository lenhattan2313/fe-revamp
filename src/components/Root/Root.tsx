import { Outlet } from 'react-router-dom';

const Root = () => {
  return (
    <div>
      <h1>header</h1>
      <Outlet />
      <h1>footer</h1>
    </div>
  );
};

export default Root;
