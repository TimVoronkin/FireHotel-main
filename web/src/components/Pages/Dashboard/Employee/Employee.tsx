import AvailableCells from './components/AvailableCells/AvailableCells';
import { Button, TextField } from '@radix-ui/themes';

function Employee() {
  return (
    <section className="flex flex-col items-center">
      <div>
        <h1 className="text-[40px] font-bold">Hi, Employee</h1>
      </div>
      <article className="mt-8">
        <AvailableCells />
        <div className="flex flex-col gap-5 mt-10">
          <div className="text-center">
            <h1 className="text-2xl font-bold text-red-500">Add Parcel</h1>
          </div>
          <div>
            <div className="flex flex-col gap-3 w-[210px]">
              <TextField.Root placeholder="Locker ID" className="text-center" />
              <TextField.Root placeholder="Track Number" className="text-center" />
              <Button>Submit</Button>
            </div>
          </div>
        </div>
      </article>
    </section>
  );
}

export default Employee;
