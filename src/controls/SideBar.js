import { NavLink, useNavigate } from 'react-router-dom'
import { BiTask } from 'react-icons/bi'
import { MdDashboard, MdChecklist, MdLogout, MdManageAccounts } from 'react-icons/md'
import { RiShieldUserFill } from 'react-icons/ri'
import { useAuthenticate } from '../useAuthenticate'
import { setLoginInfo } from '../LoginInfo'
import { FiFilter } from 'react-icons/fi'

const navItems = [
  { to: '/dashboard', label: 'Dashboard', icon: <MdDashboard className="text-sky-500" /> },
  { to: '/tasks',     label: 'All Tasks',  icon: <MdChecklist className="text-sky-500" /> },
  { to: '/get/user',  label: 'All Users',  icon: <RiShieldUserFill className="text-sky-500" /> },
  { to: '/status',   label: 'Status', icon: <FiFilter className="text-sky-500" /> },
]

export default function SideBar({ user, isOpen, onClose }) {
  const [, setAuthenticate] = useAuthenticate()
  const navigate = useNavigate()

  const handleLogout = () => {
    onClose()
    setAuthenticate({ isLogin: false, loginData: '' })
    setLoginInfo({ isLogin: false, loginData: '' })
    navigate('/login')
  }

  const initials = user?.userName
    ? user.userName.charAt(0).toUpperCase()
    : 'U'

  return (
    <>
      {/* Backdrop blur overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-slate-900/45 backdrop-blur-sm z-20"
          onClick={onClose}
        />
      )}

      {/* Slide-in Sidebar */}
      <div
        className={`fixed top-0 left-0 h-full w-64 z-30 transform transition-transform duration-300
          ${isOpen ? 'translate-x-0' : '-translate-x-full'}`}
      >
        <div className="flex flex-col h-full bg-white shadow-2xl shadow-slate-300">

          {/* Brand Header */}
          <div className="relative px-4 py-3 overflow-hidden">
            <div className="absolute -top-6 -right-6 w-24 h-24 rounded-full bg-white/10 pointer-events-none" />
            <div className="absolute -bottom-4 -left-4 w-16 h-16 rounded-full bg-white/10 pointer-events-none" />
            <div className="relative flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl bg-cyan-700 flex items-center justify-center flex-shrink-0">
                <BiTask className="text-white text-lg" />
              </div>
              <div>
                <p className="text-[15px] font-extrabold text-slate-800 tracking-tight leading-tight">
                  Task<span className="text-cyan-600">Board</span>
                </p>
                <p className="text-[11px] text-slate-400 font-medium">Navigation Menu</p>
              </div>
            </div>
          </div>

          {/* Nav */}
          <nav className="flex-1 overflow-y-auto px-3 py-4">
            <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest px-3 mb-2">
              Menu
            </p>
            <ul className="space-y-1">
              {navItems.map((item, idx) => (
                <li key={idx} onClick={onClose}>
                  <NavLink
                    to={item.to}
                    className={({ isActive }) =>
                      `flex items-center gap-3 px-3 py-2.5 rounded-xl text-[13.5px] font-semibold transition-all group
                      ${isActive ? 'bg-sky-50 text-cyan-700' : 'text-slate-700 hover:bg-slate-100'}`
                    }
                  >
                    {({ isActive }) => (
                      <>
                        <div className={`w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0 transition-all
                          ${isActive ? 'bg-cyan-100' : 'bg-slate-100 group-hover:bg-slate-200'}`}>
                          <span className="text-base">{item.icon}</span>
                        </div>
                        {item.label}
                      </>
                    )}
                  </NavLink>
                </li>
              ))}
            </ul>
          </nav>

          {/* User + Logout */}
          <div className="px-4 py-4 border-t border-slate-100 space-y-2">
            <div className="flex items-center gap-3 px-2">
              <div className="w-8 h-8 rounded-full bg-gradient-to-br from-cyan-500 to-indigo-500 flex items-center justify-center flex-shrink-0">
                <span className="text-white text-[11px] font-bold">{initials}</span>
              </div>
              <div className="min-w-0">
                <p className="text-[12px] font-bold text-slate-700 truncate">{user?.userName || 'User'}</p>
                <p className="text-[10.5px] text-slate-400 font-medium truncate">{user?.email || ''}</p>
              </div>
              <div className="ml-auto w-2 h-2 rounded-full bg-emerald-400 flex-shrink-0" />
            </div>

            <button
              onClick={handleLogout}
              className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-[13.5px] font-semibold text-red-500 hover:bg-red-50 transition-all group"
            >
              <div className="w-8 h-8 rounded-lg bg-red-50 group-hover:bg-red-100 flex items-center justify-center flex-shrink-0 transition-all">
                <MdLogout size={16} className="text-red-400" />
              </div>
              Logout
            </button>
          </div>

        </div>
      </div>

      {/* Mobile Bottom Nav */}
      <nav className="md:hidden fixed bottom-0 left-0 right-0 z-10 bg-white border-t border-slate-100 shadow-[0_-4px_16px_rgba(0,0,0,0.06)] flex items-center justify-around px-2 h-16">
        {navItems.map(({ to, label, icon }, idx) => (
          <NavLink key={idx} to={to}
            className={({ isActive }) =>
              `flex flex-col items-center gap-0.5 px-3 py-1 rounded-xl transition-all
              ${isActive ? 'text-sky-700' : 'text-slate-400'}`}
          >
            {({ isActive }) => (
              <>
                <span className={`w-9 h-9 rounded-xl flex items-center justify-center transition-all ${isActive ? 'bg-cyan-50' : ''}`}>
                  <span className={`text-xl ${isActive ? '[&>*]:!text-sky-500' : ''}`}>{icon}</span>
                </span>
                <span className="text-[10px] font-semibold">{label}</span>
              </>
            )}
          </NavLink>
        ))}
        <button onClick={handleLogout} className="flex flex-col items-center gap-0.5 px-3 py-1 rounded-xl text-red-400">
          <span className="w-9 h-9 rounded-xl flex items-center justify-center hover:bg-red-50 transition-all">
            <MdLogout size={19} />
          </span>
          <span className="text-[10px] font-semibold">Logout</span>
        </button>
      </nav>
    </>
  )
}