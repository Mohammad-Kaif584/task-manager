import React, { useEffect, useState } from 'react'
import { CreateAxios } from '../../../CreateAxios';
import { BiSolidEditAlt } from "react-icons/bi";
import { MdDelete, MdErrorOutline, MdEmail, MdPhone, MdLocationOn, MdPhoneInTalk, MdOutlineMailOutline, MdOutlineSettings, MdRefresh } from "react-icons/md";
import { GrFormAdd } from "react-icons/gr";
import { HiOutlineUserCircle } from 'react-icons/hi';
import { TbLockBitcoin } from "react-icons/tb";
import { FiHash, FiUsers } from 'react-icons/fi';
import { useToast } from '../../../toast/ToastProvider';
import { useAuthenticate } from '../../../useAuthenticate';
import DeleteUser from './DeleteUser';
import EditUser from './EditUser';
import AddUser from './AddUser';
import ChangePassword from './ChangePassword';
import Search from '../../../controls/Search';
import { AiOutlineIdcard, AiOutlineUser } from 'react-icons/ai';
import { CiLocationOn } from 'react-icons/ci';
import { CgProfile } from 'react-icons/cg';
import Loading from '../../../controls/Loading';

export default function GetAllUser() {
  const [loading, setLoading] = useState(false);
  const [users, setUsers] = useState([]);
  const [editData, setEditData] = useState();
  const [isOpen, setIsOpen] = useState(false);
  const [isOpenDelete, setIsOpenDelete] = useState(false);
  const [isChangePassOpen, setIsChangePassOpen] = useState(false);
  const [isOpenAdd, setIsOpenAdd] = useState(false);
  const [search, setSearch] = useState('');
  const toast = useToast();
  const [authenticate, setAuthenticate] = useAuthenticate();

  useEffect(() => { getAllUser(); }, []);

  const editOpen = (data) => { setEditData(data); setIsOpen(!isOpen); };
  const deleteOpen = (data) => { setEditData(data); setIsOpenDelete(!isOpenDelete); };
  const changepassOpen = (data) => { setEditData(data); setIsChangePassOpen(!isChangePassOpen); };

  const getAllUser = () => {
    setLoading(true);
    CreateAxios.get("ApplicationUser/GetAll")
      .then((res) => {
        const mydata = res.data;
        if (mydata) { setUsers(mydata); }
        else { toast.open(res.data, "text-red-400", <MdErrorOutline />); }
        setLoading(false);
      })
      .catch(() => {
        toast.open("Something went wrong!", "text-red-400", <MdErrorOutline />);
        setLoading(false);
      });
  };

  const filtered = users.filter(u =>
    search.trim() === '' ? true :
      (u.fullName || '').toLowerCase().includes(search.toLowerCase()) ||
      (u.userName || '').toLowerCase().includes(search.toLowerCase()) ||
      (u.email || '').toLowerCase().includes(search.toLowerCase()) ||
      (u.phoneNumber || '').toLowerCase().includes(search.toLowerCase())
  );

  const total = users.length;

  const ActionButtons = ({ item }) => (
    <div className="flex items-center gap-1.5">
      <button
        title="Change Password"
        onClick={() => changepassOpen(item)}
        className="w-9 h-9 rounded-xl bg-violet-50 border border-violet-200 text-violet-600 flex items-center justify-center hover:bg-violet-100 hover:-translate-y-0.5 transition-all shadow-sm"
      >
        <TbLockBitcoin size={14} />
      </button>
      <button
        title="Edit"
        onClick={() => editOpen(item)}
        className="w-9 h-9 rounded-xl bg-blue-50 border border-blue-200 text-blue-600 flex items-center justify-center hover:bg-blue-100 hover:-translate-y-0.5 transition-all shadow-sm"
      >
        <BiSolidEditAlt size={14} />
      </button>
      <button
        title="Delete"
        onClick={() => deleteOpen(item)}
        className="w-9 h-9 rounded-xl bg-red-50 border border-red-200 text-red-600 flex items-center justify-center hover:bg-red-100 hover:-translate-y-0.5 transition-all shadow-sm"
      >
        <MdDelete size={14} />
      </button>
    </div>
  );
  const getInitials = (name) => {
    if (!name) return '?';
    const parts = name.trim().split(/\s+/);
    if (parts.length > 1) {
      return (parts[0].charAt(0) + parts[1].charAt(0)).toUpperCase();
    }
    return parts[0].charAt(0).toUpperCase();
  };
  return (
    <div className="min-h-screen w-full px-6 pt-2 pb-6 md:py-6 space-y-5 bg-white">

      {loading && (
        <Loading
          Icon={<FiUsers className="text-sky-500" size={25} />}
          bgColor="bg-sky-100"
          color="bg-sky-500"
          text="Loading Users..."
        />
      )}

      {!loading && (
        <>
          <div className="hidden md:flex bg-gradient-to-r from-sky-500 to-sky-300 rounded-3xl p-8 items-center justify-between shadow-md shadow-sky-400">
            <div className="flex items-center gap-4">
              <div className="w-14 h-14 rounded-2xl bg-white/20 flex items-center justify-center flex-shrink-0">
                <FiUsers size={26} className="text-white" />
              </div>
              <div>
                <h1 className="text-2xl font-extrabold text-white leading-tight">Manage Users</h1>
                <p className="text-sm text-cyan-50/90 mt-1">User management dashboard</p>
              </div>
            </div>
            <span className="inline-flex items-center bg-white/20 text-white text-sm font-semibold px-4 py-2 rounded-full whitespace-nowrap">
              {total} Users Total
            </span>
          </div>

          <div className="flex md:hidden bg-gradient-to-r from-sky-500 to-sky-300 rounded-2xl p-6 items-center justify-between shadow-md shadow-sky-400">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-white/20 flex items-center justify-center flex-shrink-0">
                <FiUsers size={20} className="text-white" />
              </div>
              <div>
                <h1 className="text-base font-extrabold text-white leading-tight">Manage Users</h1>
                <p className="text-xs text-cyan-50/90 mt-0.5">User management dashboard</p>
              </div>
            </div>
            <span className="inline-flex items-center bg-white/20 text-white text-xs font-semibold px-3 py-1.5 rounded-full whitespace-nowrap">
              {total} Total
            </span>
          </div>

          <div className="flex flex-wrap items-center gap-3">

            <div className="hidden md:flex items-center gap-3 w-full">
              <div className="mr-auto flex items-center gap-2">
                <button
                  onClick={() => setIsOpenAdd(true)}
                  className="flex items-center gap-2
                    bg-gradient-to-br from-sky-300 to-sky-500 active:scale-95
                    text-white text-sm font-bold px-5 py-2.5 rounded-2xl
                    shadow-md hover:shadow-lg hover:scale-105 transition-all duration-200"
                >
                  <GrFormAdd size={18} />
                  Add User
                </button>
              </div>
              <Search search={search} setSearch={setSearch} placeholder="Search users..." className="w-80" />
            </div>

            <div className="flex md:hidden flex-col gap-3 w-full">
              <button
                onClick={() => setIsOpenAdd(true)}
                className="flex items-center justify-center gap-2
                  bg-gradient-to-br from-sky-500 to-sky-300 active:scale-95
                  text-white text-sm font-bold px-5 py-2.5 rounded-2xl
                  shadow-md transition-all duration-200 w-full"
              >
                <GrFormAdd size={18} />
                Add User
              </button>
              <Search
                search={search}
                setSearch={setSearch}
                placeholder="Search users..."
                className="w-full"
              />
            </div>
          </div>

          {users.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-36 gap-3">
              <button
                title="Refresh"
                onClick={getAllUser}
                className="w-14 h-14 rounded-2xl bg-white border border-slate-200 flex items-center justify-center shadow-sm hover:bg-sky-50 hover:border-sky-300 hover:-translate-y-0.5 active:scale-95 transition-all"
              >
                <MdRefresh size={26} className="text-blue-600" />
              </button>
              <p className="text-sm font-semibold text-slate-500">No users available</p>
              <p className="text-xs text-slate-400">Click "Add User" to register your first user.</p>
            </div>

          ) : (
            <>
              <div className="hidden md:block rounded-2xl overflow-hidden bg-white shadow-lg border border-slate-100">
                <table className="min-w-full text-sm text-left">
                  <thead>
                    <tr className="bg-gradient-to-br from-gray-100 to-sky-50 text-xs uppercase tracking-wider">
                      <th className="px-5 py-4 font-bold text-slate-500">
                        <div className="flex items-center gap-1.5">
                          <FiHash size={16} className="text-slate-500" /> ID
                        </div>
                      </th>
                      <th className="px-5 py-4 font-bold text-slate-500">
                        <div className="flex items-center gap-1.5">
                          <CgProfile size={16} className="text-blue-500" /> Username
                        </div>
                      </th>
                      <th className="px-5 py-4 font-bold text-slate-500">
                        <div className="flex items-center gap-1.5">
                          <AiOutlineIdcard size={16} className="text-purple-500" /> Full Name
                        </div>
                      </th>
                      <th className="px-5 py-4 font-bold text-slate-500">
                        <div className="flex items-center gap-1.5">
                          <MdPhoneInTalk size={16} className="text-green-500" /> Phone
                        </div>
                      </th>
                      <th className="px-5 py-4 font-bold text-slate-500">
                        <div className="flex items-center gap-1.5">
                          <CiLocationOn size={16} className="text-orange-500" /> Address
                        </div>
                      </th>
                      <th className="px-5 py-4 font-bold text-slate-500">
                        <div className="flex items-center gap-1.5">
                          <MdOutlineMailOutline size={16} className="text-slate-500" /> Email
                        </div>
                      </th>
                      <th className="px-5 py-4 font-bold text-slate-500">
                        <div className="flex items-center gap-1.5">
                          <MdOutlineSettings size={16} className="text-red-500" /> Actions
                        </div>
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {filtered.length === 0 ? (
                      <tr>
                        <td colSpan={7}>
                          <EmptyFilter onReset={() => setSearch('')} />
                        </td>
                      </tr>
                    ) : filtered.map((item, i) => (
                      <tr
                        key={item.id}
                        className="border-b border-slate-100 hover:bg-sky-50/40 transition-colors bg-white"
                      >
                        <td className="px-5 py-3.5">
                          <div className="flex items-center gap-2">
                            <div className="w-7 h-7 rounded-full bg-sky-100 border border-sky-200 flex items-center justify-center flex-shrink-0">
                              <FiHash size={11} className="text-sky-500" />
                            </div>
                            <span className="text-xs font-bold text-sky-600">{i + 1}</span>
                          </div>
                        </td>

                        <td className="px-5 py-3.5">
                          <div className="flex items-center gap-2">
                            <div className="w-8 h-8 rounded-full bg-gradient-to-br from-sky-300 to-sky-500 flex items-center justify-center text-white text-xs font-bold flex-shrink-0">
                               {getInitials(item.userName)}
                            </div>
                            <span className="text-slate-700 font-semibold">{item.userName}</span>
                          </div>
                        </td>

                        <td className="px-5 py-3.5">
                          <div className="flex items-center gap-2">
                            <div className="flex items-center justify-center w-8 h-8 rounded-full bg-gradient-to-br from-sky-300 to-sky-500 text-white text-xs font-bold flex-shrink-0">
                              {getInitials(item.fullName)}
                            </div>
                            <span className="text-slate-800 font-semibold whitespace-nowrap">{item.fullName}</span>
                          </div>
                        </td>

                        <td className="px-5 py-3.5">
                          <span className="inline-flex items-center gap-1.5 bg-green-50 border border-green-200 text-green-700 text-xs font-semibold px-3 py-1.5 rounded-full whitespace-nowrap">
                            <MdPhoneInTalk size={12} />
                            {item.phoneNumber}
                          </span>
                        </td>

                        <td className="px-5 py-3.5">
                          <span className="inline-flex items-center gap-1.5 bg-orange-50 border border-orange-200 text-orange-600 text-xs font-medium px-3 py-1.5 rounded-full whitespace-nowrap">
                            <CiLocationOn size={12} />
                            {item.address}
                          </span>
                        </td>

                        <td className="px-5 py-3.5">
                          <span className="inline-flex items-center gap-1.5 bg-slate-100 border border-slate-200 text-slate-600 text-xs font-medium px-3 py-1.5 rounded-full whitespace-nowrap">
                            <MdOutlineMailOutline size={12} />
                            {item.email}
                          </span>
                        </td>

                        <td className="px-5 py-3.5">
                          <ActionButtons item={item} />
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>

                {filtered.length > 0 && (
                  <div className="px-5 py-3 bg-gradient-to-br from-gray-100 to-sky-50 flex items-center justify-between">
                    <p className="text-xs text-slate-400">
                      Showing{' '}
                      <span className="font-semibold text-slate-600">{filtered.length}</span> of{' '}
                      <span className="font-semibold text-slate-600">{users.length}</span> users
                    </p>
                  </div>
                )}
              </div>

              <div className="md:hidden space-y-3">
                {filtered.length === 0 ? (
                  <EmptyFilter onReset={() => setSearch('')} />
                ) : filtered.map((item, i) => (
                  <div
                    key={item.id}
                    className="rounded-2xl bg-white border border-slate-200 border-l-4 border-l-sky-300 border-r-sky-300 border-r-4 shadow-md p-4 transition-all"
                  >
                    <div className="flex items-center justify-between mb-3 gap-4">
                      <span className="text-[10px] font-mono font-bold text-sky-500 bg-sky-50 px-2 py-0.5 rounded-full">
                        #{i + 1}
                      </span>
                      <ActionButtons item={item} />
                    </div>

                    <div className="flex items-center gap-2.5 mb-3">
                      <div className="flex items-center justify-center w-9 h-9 rounded-full bg-gradient-to-br from-sky-400 to-sky-500 text-white text-sm font-bold flex-shrink-0">
                        {item.fullName?.charAt(0)?.toUpperCase() || '?'}
                      </div>
                      <div>
                        <p className="text-sm font-bold text-slate-800 leading-tight">{item.fullName}</p>
                        <p className="text-xs font-medium text-slate-400">{item.userName}</p>
                      </div>
                    </div>

                    <div className="border-t border-slate-100 pt-2.5 space-y-1.5">
                      <div className="flex items-center gap-2 text-xs">
                        <MdEmail className="text-sky-500 flex-shrink-0" size={13} />
                        <span className="text-slate-500 truncate">{item.email}</span>
                      </div>
                      <div className="flex items-center gap-2 text-xs">
                        <MdPhone className="text-sky-500 flex-shrink-0" size={13} />
                        <span className="text-slate-500">{item.phoneNumber}</span>
                      </div>
                      {item.address && (
                        <div className="flex items-center gap-2 text-xs">
                          <MdLocationOn className="text-sky-500 flex-shrink-0" size={13} />
                          <span className="text-slate-500 truncate">{item.address}</span>
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </>
          )}
        </>
      )}

      <EditUser
        isOpen={isOpen}
        setIsOpen={setIsOpen}
        editData={editData}
        id={editData && editData.id}
        getAllUser={getAllUser}
      />
      <DeleteUser
        isOpen={isOpenDelete}
        setIsOpen={setIsOpenDelete}
        editData={editData}
        id={editData && editData.id}
        getAllUser={getAllUser}
      />
      <AddUser
        isOpen={isOpenAdd}
        setIsOpen={setIsOpenAdd}
        getAllUser={getAllUser}
      />
      <ChangePassword
        isOpen={isChangePassOpen}
        setIsOpen={setIsChangePassOpen}
        editData={editData}
      />
    </div>
  );
}

function EmptyFilter({ onReset }) {
  return (
    <div className="flex flex-col items-center py-16 gap-2">
      <p className="text-sm text-slate-400">No users match your search.</p>
      <button
        onClick={onReset}
        className="text-xs text-blue-600 underline underline-offset-2 hover:text-blue-800 transition-colors"
      >
        Clear search
      </button>
    </div>
  );
}