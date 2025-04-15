import "../styles/App.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBars,
  faChevronDown,
  faClose,
  faHardHat,
  faHome,
  faListCheck,
  faUser,
} from "@fortawesome/free-solid-svg-icons";
import { LanguageSwitcher } from "../components/language/LanguageSwitcher.tsx";
import { useState } from "react";
import {
  Dialog,
  DialogBackdrop,
  DialogPanel,
  Menu,
  MenuButton,
  MenuItem,
  MenuItems,
  TransitionChild,
} from "@headlessui/react";
import { useAuth } from "../services/useAuth.tsx";
import { useNavigate } from "@tanstack/react-router";

export const AppLayout = ({ children }: { children: any }) => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  return (
    <div className={"flex flex-col justify-between h-full"}>
      <div className={"flex justify-between p-2 shrink-1"}>
        <SidebarMenu
          sidebarOpen={sidebarOpen}
          setSidebarOpen={setSidebarOpen}
        />
      </div>
      <div className={"lg:p-2 flex-auto shrink-0  lg:pl-72 w-full "}>
        <TopMenu sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
        <div className={"p-2"}>{children}</div>
      </div>
      <div className={"p-2  shrink-1 lg:pl-72 "}>
        <LanguageSwitcher />
      </div>
    </div>
  );
};

export const TopMenu = ({
  setSidebarOpen,
}: {
  sidebarOpen: boolean;
  setSidebarOpen: any;
}) => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  if (!user) return <></>;
  return (
    <div className="w-full flex justify-between border-b border-gray-200  px-4 h-8 sm:px-6 lg:pr-8 ">
      <button
        type="button"
        onClick={() => setSidebarOpen(true)}
        className="-m-2.5 p-2.5 text-gray-700 lg:hidden"
      >
        <span className="sr-only">Open sidebar</span>
        <FontAwesomeIcon icon={faBars} className={"size-6"} />
      </button>
      <div className={"hidden lg:block font-bold text-left"}>Work Manager</div>
      <div className="text-right">
        <div className="flex items-center gap-x-4 lg:gap-x-6 ">
          <div
            aria-hidden="true"
            className="h-6 w-px bg-gray-900/10 lg:hidden"
          />
          {/* Profile dropdown */}
          <Menu as="div" className="relative right-0 w-full">
            <MenuButton className="-m-1.5 flex items-center p-1.5">
              <span className="sr-only">Open user menu</span>
              <FontAwesomeIcon icon={faUser} />
              <span className="hidden lg:flex lg:items-center flex gap-2">
                <span
                  aria-hidden="true"
                  className="ml-4 text-sm/6 font-semibold text-gray-900"
                >
                  {user.user.first_name} {user.user.last_name}
                </span>
                <FontAwesomeIcon icon={faChevronDown} />
              </span>
            </MenuButton>
            <MenuItems
              transition
              className="absolute right-0 z-10 mt-2.5 w-32 origin-top-right rounded-md bg-white py-2 shadow-lg ring-1 ring-gray-900/5 transition focus:outline-none data-[closed]:scale-95 data-[closed]:transform data-[closed]:opacity-0 data-[enter]:duration-100 data-[leave]:duration-75 data-[enter]:ease-out data-[leave]:ease-in"
            >
              <MenuItem key={"signout"}>
                <button
                  onClick={async () => {
                    await logout();
                    await navigate({ to: "/" });
                  }}
                  className="block px-3 py-1 text-sm/6 text-gray-900 data-[focus]:bg-gray-50 data-[focus]:outline-none"
                >
                  Sign Out
                </button>
              </MenuItem>
            </MenuItems>
          </Menu>
        </div>
      </div>
    </div>
  );
};

const navigation = [
  { name: "Dashboard", href: "#", icon: faHome, current: true },
  { name: "Work Orders", href: "#", icon: faHardHat, current: false },
  { name: "Inventory", href: "#", icon: faListCheck, current: false },
];

function classNames(...classes: any[]) {
  return classes.filter(Boolean).join(" ");
}

export const SidebarMenu = ({
  sidebarOpen,
  setSidebarOpen,
}: {
  sidebarOpen: boolean;
  setSidebarOpen: any;
}) => {
  return (
    <div className={""}>
      <Dialog
        open={sidebarOpen}
        onClose={setSidebarOpen}
        className="relative z-50 lg:hidden"
      >
        <DialogBackdrop
          transition
          className="fixed inset-0 bg-gray-900/80 transition-opacity duration-300 ease-linear data-[closed]:opacity-0"
        />

        <div className="fixed inset-0 flex">
          <DialogPanel
            transition
            className="relative mr-16 flex w-full max-w-xs flex-1 transform transition duration-300 ease-in-out data-[closed]:-translate-x-full"
          >
            <TransitionChild>
              <div className="absolute left-full top-0 flex w-16 justify-center pt-5 duration-300 ease-in-out data-[closed]:opacity-0"></div>
            </TransitionChild>
            {/* Sidebar component, swap this element with another sidebar if you like */}
            <div className="flex grow flex-col gap-y-5 overflow-y-auto bg-white px-6 pb-4">
              <div className="flex h-16 shrink-0 items-center justify-between">
                <div>
                  <img
                    alt="Your Company"
                    src="/wood-ingenuity-logo-1.png"
                    className="h-8 w-auto"
                  />
                  <div className={"hidden lg:block font-bold text-left"}>
                    Wood Ingenuity
                  </div>
                </div>

                <button
                  type="button"
                  onClick={() => setSidebarOpen(false)}
                  className="p-2.5"
                >
                  <span className="sr-only">Close sidebar</span>
                  <FontAwesomeIcon icon={faClose} />
                </button>
              </div>
              <nav className="flex flex-1 flex-col">
                <ul role="list" className="flex flex-1 flex-col gap-y-7">
                  <li>
                    <ul role="list" className="-mx-2 space-y-1">
                      {navigation.map((item) => (
                        <li key={item.name}>
                          <a
                            href={item.href}
                            className={classNames(
                              item.current
                                ? "bg-indigo-700 text-white"
                                : "text-gray-500 hover:bg-indigo-700 hover:text-white",
                              "group flex gap-x-3 rounded-md p-2 text-sm/6 font-semibold",
                            )}
                          >
                            <FontAwesomeIcon
                              icon={item.icon}
                              aria-hidden="true"
                              className={classNames(
                                item.current
                                  ? "text-white"
                                  : "text-gray-500 group-hover:text-white",
                                "size-6 shrink-0",
                              )}
                            />
                            {item.name}
                          </a>
                        </li>
                      ))}
                    </ul>
                  </li>
                </ul>
              </nav>
            </div>
          </DialogPanel>
        </div>
      </Dialog>

      {/* Static sidebar for desktop */}
      <div className="hidden lg:fixed lg:inset-y-0 lg:z-50 lg:flex lg:w-68 lg:flex-col w-full">
        {/* Sidebar component, swap this element with another sidebar if you like */}
        <div className="flex grow flex-col gap-y-5 overflow-y-auto bg-white px-6 pb-4 border-r border-gray-300">
          <div className="flex h-16 shrink-0 items-center gap-2">
            <img
              alt="FinPro - Wood Ingenuity"
              src="/wood-ingenuity-logo-1.png"
              className="h-8 w-auto"
            />
            <div className={"hidden lg:block font-bold text-left"}>
              Wood Ingenuity
            </div>
          </div>
          <nav className="flex flex-1 flex-col">
            <ul role="list" className="flex flex-1 flex-col gap-y-7">
              <li>
                <ul role="list" className="-mx-2 space-y-1">
                  {navigation.map((item) => (
                    <li key={item.name}>
                      <a
                        href={item.href}
                        className={classNames(
                          item.current
                            ? "bg-indigo-700 text-white"
                            : "text-gray-500 hover:bg-indigo-700 hover:text-white",
                          "group flex gap-x-3 rounded-md p-2 text-sm/6 font-semibold",
                        )}
                      >
                        <FontAwesomeIcon
                          icon={item.icon}
                          aria-hidden="true"
                          className={classNames(
                            item.current
                              ? "text-white"
                              : "text-gray-500 group-hover:text-white",
                            "size-6 shrink-0",
                          )}
                        />
                        {item.name}
                      </a>
                    </li>
                  ))}
                </ul>
              </li>
            </ul>
          </nav>
        </div>
      </div>
    </div>
  );
};
