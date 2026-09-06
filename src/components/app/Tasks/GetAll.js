import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { CreateAxios } from '../../../CreateAxios';
import EditTask from './EditTask';
import DeleteTask from './DeleteTask';
import AddTask from './AddTask';
import { GrFormAdd } from 'react-icons/gr';
import { BiSolidEditAlt, BiLinkAlt } from 'react-icons/bi';
import { MdDelete, MdPendingActions, MdCheckCircle, MdErrorOutline, MdOutlineSettings, MdOutlinePending, MdOutlinePendingActions, MdRefresh } from 'react-icons/md';
import { HiOutlineClipboardList } from 'react-icons/hi';
import { FiHash, FiClipboard } from 'react-icons/fi';
import { AiOutlineFileText } from 'react-icons/ai';
import { useToast } from '../../../toast/ToastProvider';
import Search from '../../../controls/Search';
import { CgProfile } from 'react-icons/cg';
import Loading from '../../../controls/Loading';

export default function GetAll() {
  const [loading, setLoading] = useState(false);
  const [students, setStudents] = useState([]);
  const [editData, setEditData] = useState();
  const [isOpen, setIsOpen] = useState(false);
  const [isOpenDelete, setIsOpenDelete] = useState(false);
  const [isOpenAdd, setIsOpenAdd] = useState(false);
  const [filter, setFilter] = useState('all');
  const [search, setSearch] = useState('');
  const toast = useToast();

  useEffect(() => { getAll(); }, []);

  const editOpen = (data) => { setEditData(data); setIsOpen(true); };
  const deleteOpen = (data) => { setEditData(data); setIsOpenDelete(true); };

  const getAll = () => {
    setLoading(true);
    CreateAxios.get('TaskManager/GetAllTasks')
      .then((res) => {
        if (res.data) setStudents(res.data);
        else toast.open(res.data.result.message, 'text-red-400', <MdErrorOutline />);
        setLoading(false);
      })
      .catch(() => {
        toast.open('Something went wrong!', 'text-red-400', <MdErrorOutline />);
        setLoading(false);
      });
  };

  const filtered = students
    .filter(t =>
      filter === 'pending' ? !t.isCompleted :
        filter === 'completed' ? t.isCompleted :
          true
    )
    .filter(t =>
      search.trim() === '' ? true :
        (t.name || '').toLowerCase().includes(search.toLowerCase()) ||
        (t.title || '').toLowerCase().includes(search.toLowerCase()) ||
        (t.description || '').toLowerCase().includes(search.toLowerCase())
    );

  const total = students.length;
  const doneCount = students.filter(t => t.isCompleted).length;
  const pendCount = students.filter(t => !t.isCompleted).length;
  const pct = total > 0 ? Math.round((doneCount / total) * 100) : 0;

  const ActionButtons = ({ item }) => (
    <div className="flex items-center gap-1.5">
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
          Icon={<FiClipboard className="text-sky-500" size={25} />}
          bgColor="bg-sky-100"
          color="bg-sky-500"
          text="Loading Tasks..."
        />
      )}

      {!loading && (
        <>
          {/* ── BANNER DESKTOP ── */}
          <div className="hidden md:flex bg-gradient-to-r from-sky-500 to-sky-300 rounded-3xl p-8 items-center justify-between shadow-md shadow-sky-400">
            <div className="flex items-center gap-4">
              <div className="w-14 h-14 rounded-2xl bg-white/20 flex items-center justify-center flex-shrink-0">
                <FiClipboard size={26} className="text-white" />
              </div>
              <div>
                <h1 className="text-2xl font-extrabold text-white leading-tight">Manage Tasks</h1>
                <p className="text-sm text-cyan-50/90 mt-1">Task management dashboard</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <span className="inline-flex items-center bg-white/20 text-white text-sm font-semibold px-4 py-2 rounded-full whitespace-nowrap">
                {total} Tasks Total
              </span>
              <span className="inline-flex items-center bg-white/20 text-white text-sm font-semibold px-4 py-2 rounded-full whitespace-nowrap">
                ✓ {doneCount} Done
              </span>
              <span className="inline-flex items-center bg-white/20 text-white text-sm font-semibold px-4 py-2 rounded-full whitespace-nowrap">
                <MdOutlinePendingActions /> {pendCount} Pending
              </span>
              <span className="inline-flex items-center bg-white/20 text-white text-sm font-semibold px-4 py-2 rounded-full whitespace-nowrap">
                {pct}% Done
              </span>
            </div>
          </div>

          {/* ── BANNER MOBILE ── */}
          <div className="flex md:hidden bg-gradient-to-r from-sky-500 to-sky-300 rounded-2xl p-6 flex-col gap-3 shadow-md shadow-sky-400">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-white/20 flex items-center justify-center flex-shrink-0">
                  <FiClipboard size={20} className="text-white" />
                </div>
                <div>
                  <h1 className="text-base font-extrabold text-white leading-tight">Manage Tasks</h1>
                  <p className="text-xs text-cyan-50/90 mt-0.5">Task management dashboard</p>
                </div>
              </div>
              <span className="inline-flex items-center bg-white/20 text-white text-xs font-semibold px-3 py-1.5 rounded-full whitespace-nowrap">
                {total} Total
              </span>
            </div>
            <div className="flex gap-2 flex-wrap">
              <span className="inline-flex items-center bg-white/20 text-white text-xs font-semibold px-3 py-1 rounded-full whitespace-nowrap">
                ✓ {doneCount} Done
              </span>
              <span className="inline-flex items-center bg-white/20 text-white text-xs font-semibold px-3 py-1 rounded-full whitespace-nowrap">
                <MdOutlinePendingActions />{pendCount} Pending
              </span>
              <span className="inline-flex items-center bg-white/20 text-white text-xs font-semibold px-3 py-1 rounded-full whitespace-nowrap">
                {pct}% Done
              </span>
            </div>
          </div>

          {/* ── TOOLBAR ── */}
          <div className="flex flex-wrap items-center gap-3">

            {/* Desktop */}
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
                  Add Task
                </button>
                <Link
                  to="/status"
                  className="flex items-center gap-2
                    bg-white hover:bg-slate-50 active:scale-95 hover:scale-105
                    text-slate-500 hover:text-slate-700 text-sm font-semibold
                    px-4 py-2.5 rounded-2xl border border-slate-200
                    hover:border-slate-300 transition-all duration-200 no-underline shadow-sm"
                >
                  <BiLinkAlt size={15} />
                  Get by Status
                </Link>
              </div>
              <div className="flex gap-1.5">
                {[
                  { key: 'all', label: 'All' },
                  { key: 'completed', label: 'Done' },
                  { key: 'pending', label: 'Pending' },
                ].map(f => (
                  <button
                    key={f.key}
                    onClick={() => setFilter(f.key)}
                    className={`px-4 py-2 rounded-2xl text-sm font-semibold transition-all duration-200
                      ${filter === f.key
                        ? 'bg-gradient-to-br from-sky-300 to-sky-500 text-white shadow-md shadow-sky-200'
                        : 'bg-white text-slate-500 border border-slate-200 hover:bg-slate-50 hover:text-slate-700 hover:scale-105'
                      }`}
                  >
                    {f.label}
                  </button>
                ))}
              </div>
              <Search search={search} setSearch={setSearch} placeholder="Search tasks..." className="w-80" />
            </div>

            {/* Mobile */}
            <div className="flex md:hidden flex-col gap-3 w-full">
              <div className="flex items-center gap-3">
                <button
                  onClick={() => setIsOpenAdd(true)}
                  className="flex items-center justify-center gap-2
                    bg-gradient-to-br from-sky-500 to-sky-300 active:scale-95
                    text-white text-sm font-bold px-5 py-2.5 rounded-2xl
                    shadow-md transition-all duration-200 flex-1"
                >
                  <GrFormAdd size={18} />
                  Add Task
                </button>
                <Link
                  to="/status"
                  className="flex items-center gap-2
                    bg-white text-slate-500 text-sm font-semibold
                    px-4 py-2.5 rounded-2xl border border-slate-200
                    transition-all duration-200 no-underline shadow-sm whitespace-nowrap"
                >
                  <BiLinkAlt size={15} />
                  View Status
                </Link>
              </div>
              <div className="flex gap-1.5 w-full">
                {[
                  { key: 'all', label: 'All' },
                  { key: 'completed', label: 'Done' },
                  { key: 'pending', label: 'Pending' },
                ].map(f => (
                  <button
                    key={f.key}
                    onClick={() => setFilter(f.key)}
                    className={`flex-1 py-2 rounded-2xl text-sm font-semibold transition-all duration-200
                      ${filter === f.key
                        ? 'bg-gradient-to-br from-sky-300 to-sky-500 text-white shadow-md shadow-sky-200'
                        : 'bg-white text-slate-500 border border-slate-200 hover:bg-slate-50'
                      }`}
                  >
                    {f.label}
                  </button>
                ))}
              </div>
              <Search
                search={search}
                setSearch={setSearch}
                placeholder="Search tasks..."
                className="w-full"
              />
            </div>
          </div>

          {/* ── EMPTY STATE ── */}
          {students.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-36 gap-3">
              <button
                title="Refresh"
                onClick={getAll}
                className="w-14 h-14 rounded-2xl bg-white border border-slate-200 flex items-center justify-center shadow-sm hover:bg-sky-50 hover:border-sky-300 hover:-translate-y-0.5 active:scale-95 transition-all"
              >
                <MdRefresh size={26} className="text-blue-600" />
              </button>
              <p className="text-sm font-semibold text-slate-500">No tasks available</p>
              <p className="text-xs text-slate-400">Click "Add Task" to create your first task.</p>
            </div>

          ) : (
            <>
              {/* ══ DESKTOP TABLE ══ */}
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
                          <CgProfile size={16} className="text-blue-500" /> Name
                        </div>
                      </th>
                      <th className="px-5 py-4 font-bold text-slate-500">
                        <div className="flex items-center gap-1.5">
                          <AiOutlineFileText size={16} className="text-purple-500" /> Description
                        </div>
                      </th>
                      <th className="px-5 py-4 font-bold text-slate-500">
                        <div className="flex items-center gap-1.5">
                          <MdCheckCircle size={16} className="text-green-500" /> Status
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
                        <td colSpan={5}>
                          <EmptyFilter onReset={() => { setFilter('all'); setSearch(''); }} />
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
                              {getInitials(item.title)}
                            </div>
                            <span className="text-slate-700 font-semibold">{item.title}</span>
                          </div>
                        </td>
                        <td className="px-5 py-3.5 max-w-xs">
                          <span className="text-slate-500 font-semibold whitespace-normal break-words">
                            {item.description}
                          </span>
                        </td>
                        <td className="px-5 py-3.5">
                          <StatusBadge done={item.isCompleted} />
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
                      <span className="font-semibold text-slate-600">{students.length}</span> tasks
                    </p>
                  </div>
                )}
              </div>

              {/* ══ MOBILE CARDS ══ */}
              <div className="md:hidden space-y-3">
                {filtered.length === 0 ? (
                  <EmptyFilter onReset={() => { setFilter('all'); setSearch(''); }} />
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
                    <div className="flex items-center justify-between gap-2 mb-3">
                      <div className="flex items-center gap-2.5 min-w-0">
                        <div className="flex items-center justify-center w-9 h-9 rounded-full bg-gradient-to-br from-sky-400 to-sky-500 text-white text-sm font-bold flex-shrink-0">
                          {item.title?.charAt(0)?.toUpperCase() || '?'}
                        </div>
                        <div className="min-w-0">
                          <p className="text-sm font-bold text-slate-800 leading-tight truncate">{item.title}</p>
                        </div>
                      </div>
                      <div className="flex-shrink-0">
                        <StatusBadge done={item.isCompleted} />
                      </div>
                    </div>
                    <div className="border-t border-slate-100 pt-2.5 space-y-1.5">
                      <div className="flex items-center gap-2 text-xs max-w-xs">
                        <AiOutlineFileText className="text-sky-500 flex-shrink-0" size={13} />
                        <span className="text-slate-500 whitespace-normal break-words">{item.description}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </>
          )}
        </>
      )}

      {/* ✅ Modals - loading ke bahar hamesha */}
      <EditTask isOpen={isOpen} setIsOpen={setIsOpen} editData={editData} id={editData?.id} getAll={getAll} />
      <DeleteTask isOpen={isOpenDelete} setIsOpen={setIsOpenDelete} editData={editData} id={editData?.id} getAll={getAll} />
      <AddTask isOpen={isOpenAdd} setIsOpen={setIsOpenAdd} getAll={getAll} />
    </div>
  );
}

function StatusBadge({ done }) {
  return (
    <span className={`inline-flex items-center gap-1.5 text-[11px] font-bold px-3 py-1 rounded-full border
      ${done
        ? 'bg-green-50 border-green-200 text-green-600'
        : 'bg-amber-50 border-amber-200 text-amber-500'}`}
    >
      <span className={`w-1.5 h-1.5 rounded-full flex-shrink-0 ${done ? 'bg-green-500' : 'bg-amber-400'}`} />
      {done
        ? <><MdCheckCircle size={11} /> Done</>
        : <><MdPendingActions size={11} /> Pending</>
      }
    </span>
  );
}

function EmptyFilter({ onReset }) {
  return (
    <div className="flex flex-col items-center py-16 gap-2">
      <p className="text-sm text-slate-400">No tasks match your search.</p>
      <button
        onClick={onReset}
        className="text-xs text-blue-600 underline underline-offset-2 hover:text-blue-800 transition-colors"
      >
        Clear filters
      </button>
    </div>
  );
}