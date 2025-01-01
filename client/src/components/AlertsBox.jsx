import { IoWarningOutline } from "react-icons/io5";

const AlertsBox = ({ children }) => {
  return (
    <div className="flex w-full rounded-xl bg-neutral-50 py-4 text-xl text-[#ef5353]">
      <div className="flex w-full items-center justify-center gap-2">
        <IoWarningOutline /> {children}
      </div>
    </div>
  );
};

export default AlertsBox;
