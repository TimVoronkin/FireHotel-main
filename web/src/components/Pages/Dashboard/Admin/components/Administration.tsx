import CreateCell from './Cells/CreateCell';
import CreateLocker from './Lockers/CreateLocker';
import CreateOrder from './Orders/CreateOrder';
import CreateUser from './Users/CreateUser';
import UpdateUser from './Users/UpdateUser';
import DeleteUser from './Users/DeleteUser';
import UpdateOrder from './Orders/UpdateOrder';
import DeleteOrder from './Orders/DeleteOrder';
import UpdateLocker from './Lockers/UpdateLocker';
import UpdateCell from './Cells/UpdateCell';
import DeleteCell from './Cells/DeleteCell';

function Administration({ pathname }: { pathname: string }) {
  return (
    <section>
      {pathname.includes('/manage/users') && (
        <>
          <div className="flex flex-col items-center gap-5">
            <span>
              <h1 className="text-xl font-bold text-red-500">Users Management</h1>
            </span>
            <div className="flex flex-col gap-5">
              <CreateUser />
              <UpdateUser />
              <DeleteUser />
            </div>
          </div>
        </>
      )}
      {pathname.includes('/manage/orders') && (
        <>
          <div className="flex flex-col items-center gap-5">
            <span>
              <h1 className="text-xl font-bold text-red-500">Orders Management</h1>
            </span>
            <div className="flex flex-col gap-5">
              <CreateOrder />
              <UpdateOrder />
              <DeleteOrder />
            </div>
          </div>
        </>
      )}
      {pathname.includes('manage/cells') && (
        <>
          <div className="flex flex-col items-center gap-5">
            <span>
              <h1 className="text-xl font-bold text-red-500">Cells Management</h1>
            </span>
            <div className="flex flex-col gap-5">
              <CreateCell />
              <UpdateCell />
              <DeleteCell />
            </div>
          </div>
        </>
      )}
      {pathname.includes('manage/lockers') && (
        <>
          <div className="flex flex-col items-center gap-5">
            <span>
              <h1 className="text-xl font-bold text-red-500">Lockers Management</h1>
            </span>
            <div className="flex flex-col gap-5">
              <CreateLocker />
              <UpdateLocker />
              <DeleteOrder />
            </div>
          </div>
        </>
      )}
    </section>
  );
}

export default Administration;
