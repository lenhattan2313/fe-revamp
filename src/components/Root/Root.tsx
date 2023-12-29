import { Outlet } from 'react-router-dom';

export const Root = () => {
  return (
    <div>
      <h1>header</h1>
      <Outlet />
      <h1>footer</h1>
    </div>
  );
};
