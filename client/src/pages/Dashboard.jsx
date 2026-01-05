import { useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import DashSidebar from "../components/DashSidebar";
import DashProfile from "../components/DashProfile";
import DashPosts from "../components/DashPosts";
import DashUsers from "../components/DashUsers";
import DashComments from "../components/DashComments";
import DashboardComp from "../components/DashboardComp";
import DashOverview from "../components/DashOverview";
import DashBookmarks from "../components/DashBookmarks";
import { HiMenu, HiX } from "react-icons/hi";

const Dashboard = () => {
  const location = useLocation();
  const [tab, setTab] = useState("");
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const { currentUser } = useSelector((state) => state.user);

  useEffect(() => {
    const urlParams = new URLSearchParams(location.search);
    const tabFromUrl = urlParams.get("tab");
    if (tabFromUrl) {
      setTab(tabFromUrl);
    }
  }, [location.search]);
  return (
    <div className="min-h-screen pt-20 lg:pt-24 bg-gray-50 dark:bg-slate-900">
      <div className="flex relative">
        {/* Mobile Menu Button */}
        <button
          onClick={() => setSidebarOpen(!sidebarOpen)}
          className="md:hidden fixed top-24 left-4 z-50 p-2 bg-white dark:bg-slate-800 rounded-lg shadow-lg border border-gray-200 dark:border-slate-700"
          aria-label="Toggle sidebar"
        >
          {sidebarOpen ? (
            <HiX className="w-6 h-6 text-gray-700 dark:text-gray-300" />
          ) : (
            <HiMenu className="w-6 h-6 text-gray-700 dark:text-gray-300" />
          )}
        </button>

        {/* Sidebar - Fixed on left for desktop, overlay on mobile */}
        <aside
          className={`${
            sidebarOpen ? "translate-x-0" : "-translate-x-full"
          } md:translate-x-0 fixed md:static left-0 top-20 lg:top-24 h-[calc(100vh-5rem)] lg:h-[calc(100vh-6rem)] w-64 md:w-56 z-40 md:z-30 overflow-y-auto border-r border-gray-200 dark:border-slate-700 bg-white dark:bg-slate-800 transition-transform duration-300 ease-in-out`}
        >
          <DashSidebar onClose={() => setSidebarOpen(false)} />
        </aside>

        {/* Overlay for mobile */}
        {sidebarOpen && (
          <div
            className="md:hidden fixed inset-0 bg-black/50 z-30 top-20 lg:top-24"
            onClick={() => setSidebarOpen(false)}
          />
        )}

        {/* Main Content Area */}
        <main className="flex-1 md:ml-0 min-h-[calc(100vh-5rem)] lg:min-h-[calc(100vh-6rem)] p-4 sm:p-6 lg:p-8">
          {/* Admin Dashboard */}
          {currentUser.isAdmin && tab === "dash" && <DashboardComp />}

          {/* Normal User Overview */}
          {!currentUser.isAdmin && tab === "overview" && <DashOverview />}

          {/* profile.. */}
          {tab === "profile" && <DashProfile />}

          {/* bookmarks - everyone */}
          {tab === "bookmarks" && <DashBookmarks />}

          {/*posts - admin only*/}
          {currentUser.isAdmin && tab === "posts" && <DashPosts />}

          {/*users - admin only */}
          {currentUser.isAdmin && tab === "users" && <DashUsers />}

          {/* comments - admin only */}
          {currentUser.isAdmin && tab === "comments" && <DashComments />}

          {/* Default view based on role */}
          {!tab && (currentUser.isAdmin ? <DashboardComp /> : <DashOverview />)}
        </main>
      </div>
    </div>
  );
};

export default Dashboard;
