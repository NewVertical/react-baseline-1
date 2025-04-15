import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHardHat, faListCheck } from "@fortawesome/free-solid-svg-icons";

export const Dashboard = ({ context }: { context: any }) => {
  console.log("context", context);
  return (
    <div>
      <div>Dashboard</div>
      <div className={"grid md:grid-cols-2 grid-cols-1 text-center gap-3"}>
        <div
          className={
            "border p-8 border-gray-300  sm:flex  gap-2 justify-center items-center"
          }
        >
          <div>
            <FontAwesomeIcon icon={faHardHat} />
          </div>

          <span>Work Orders</span>
        </div>
        <div
          className={
            "border p-8 border-gray-300  sm:flex gap-2 justify-center items-center"
          }
        >
          <div>
            <FontAwesomeIcon icon={faListCheck} />
          </div>
          <span>Inventory</span>
        </div>
      </div>
    </div>
  );
};
