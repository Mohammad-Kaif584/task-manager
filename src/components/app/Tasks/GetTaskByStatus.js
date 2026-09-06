import React, { useEffect, useState } from 'react';
import { CreateAxios } from '../../../CreateAxios';
import { MdCheckCircle, MdPendingActions, MdOutlineSettings, MdOutlinePendingActions } from 'react-icons/md';
import { BiTask } from 'react-icons/bi';
import { FaArrowLeft } from 'react-icons/fa';
import { HiOutlineClipboardList } from 'react-icons/hi';
import { FiHash, FiClipboard } from 'react-icons/fi';
import { AiOutlineFileText } from 'react-icons/ai';
import { CgProfile } from 'react-icons/cg';
import Loading from '../../../controls/Loading';

export default function GetTaskByStatus() {
  const [data, setData] = useState([]);
  const [status, setStatus] = useState(1);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => { getData(status); }, [status]);

  const getData = (status) => {
    setIsLoading(true);
    CreateAxios.get(`TaskManager/GetByIsCompleted?eBool=${status}`)
      .then((res) => { setData(res.data.data); })
      .catch((err) => console.log(err))
      .finally(() => setIsLoading(false));
  };

  const total = data.length;
  const doneCount = data.filter(t => t.isCompleted).length;
  const pendCount = data.filter(t => !t.isCompleted).length;
  const pct = total > 0 ? Math.round((doneCount / total) * 100) : 0;

  return (
    <div className="min-h-screen w-full px-6 pt-2 pb-6 md:py-6 space-y-5 bg-white">

      {/* ✅ LOADING - poore page pe */}
      {isLoading && (
        <Loading
          Icon={<FiClipboard className="text-sky-500" size={25} />}
          bgColor="bg-sky-100"
          color="bg-sky-500"
          text="Loading Tasks..."
        />
      )}

      {!isLoading && (
        <>
          {/* ✅ MOBILE ONLY - Back button banner ke UPAR bahar */}
          <div className="flex md:hidden">
            <button
              onClick={() => window.history.back()}
              className="flex items-center gap-2 text-sky-500 font-semibold text-sm hover:text-sky-700 transition-colors"
            >
              <FaArrowLeft size={14} />
              Back
            </button>
          </div>

          {/* ── BANNER DESKTOP ── */}
          <div className="hidden md:flex bg-gradient-to-r from-sky-500 to-sky-300 rounded-3xl p-8 items-center justify-between shadow-md shadow-sky-400 relative">
            <div className="flex items-center gap-4">
              {/* Back button desktop banner ke andar - same as before */}
              <FaArrowLeft
                size={22}
                title='Back'
                className="absolute top-1 left-4 text-white cursor-pointer hover:scale-110 active:scale-95 transition-all duration-200"
                onClick={() => window.history.back()}
              />
              <div className="w-14 h-14 rounded-2xl bg-white/20 flex items-center justify-center flex-shrink-0">
                <FiClipboard size={26} className="text-white" />
              </div>
              <div>
                <h1 className="text-2xl font-extrabold text-white leading-tight">Task Status List</h1>
                <p className="text-sm text-cyan-50/90 mt-1">Filter tasks by completion status</p>
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
                <MdOutlinePendingActions className="mr-1" /> {pendCount} Pending
              </span>
              <span className="inline-flex items-center bg-white/20 text-white text-sm font-semibold px-4 py-2 rounded-full whitespace-nowrap">
                {pct}% Done
              </span>
            </div>
          </div>

          {/* ── BANNER MOBILE ── */}
          <div className="flex md:hidden bg-gradient-to-r from-sky-500 to-sky-300 rounded-2xl p-5 flex-col gap-3 shadow-md shadow-sky-400">
            <div className="flex items-center justify-between gap-3">
              <div className="flex items-center gap-2.5">
                <div className="w-9 h-9 rounded-xl bg-white/20 flex items-center justify-center flex-shrink-0">
                  <FiClipboard size={18} className="text-white" />
                </div>
                <div>
                  <h1 className="text-sm font-extrabold text-white leading-tight">Task Status List</h1>
                  <p className="text-[10px] text-cyan-50/90 mt-0.5">Filter by completion status</p>
                </div>
              </div>
              <span className="inline-flex items-center bg-white/20 text-white text-xs font-semibold px-3 py-1.5 rounded-full whitespace-nowrap flex-shrink-0">
                {total} Total
              </span>
            </div>
            <div className="grid grid-cols-3 gap-2">
              <span className="inline-flex items-center justify-center bg-white/20 text-white text-xs font-semibold px-3 py-1 rounded-full whitespace-nowrap">
                ✓ {doneCount} Done
              </span>
              <span className="inline-flex items-center justify-center bg-white/20 text-white text-xs font-semibold px-3 py-1 rounded-full whitespace-nowrap">
                <MdOutlinePendingActions className="mr-1" />{pendCount} Pending
              </span>
              <span className="inline-flex items-center justify-center bg-white/20 text-white text-xs font-semibold px-3 py-1 rounded-full whitespace-nowrap">
                {pct}% Done
              </span>
            </div>
          </div>

          {/* ── TOOLBAR ── */}
          <div className="flex flex-wrap items-center gap-3">

            {/* Desktop */}
            <div className="hidden md:flex items-center gap-3 w-full">
              <div className="flex gap-1.5">
                {[
                  { key: 1, label: 'Completed' },
                  { key: 0, label: 'Pending' },
                ].map(f => (
                  <button
                    key={f.key}
                    onClick={() => setStatus(f.key)}
                    className={`px-4 py-2 rounded-2xl text-sm font-semibold transition-all duration-200
                      ${status === f.key
                        ? 'bg-gradient-to-br from-sky-300 to-sky-500 text-white shadow-md shadow-sky-200'
                        : 'bg-white text-slate-500 border border-slate-200 hover:bg-slate-50 hover:text-slate-700 hover:scale-105'
                      }`}
                  >
                    {f.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Mobile */}
            <div className="flex md:hidden flex-col gap-3 w-full">
              <div className="flex gap-1.5 w-full">
                {[
                  { key: 1, label: 'Completed' },
                  { key: 0, label: 'Pending' },
                ].map(f => (
                  <button
                    key={f.key}
                    onClick={() => setStatus(f.key)}
                    className={`flex-1 py-2 rounded-2xl text-sm font-semibold transition-all duration-200
                      ${status === f.key
                        ? 'bg-gradient-to-br from-sky-300 to-sky-500 text-white shadow-md shadow-sky-200'
                        : 'bg-white text-slate-500 border border-slate-200 hover:bg-slate-50'
                      }`}
                  >
                    {f.label}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* ── EMPTY STATE ── */}
          {data.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-36 gap-3">
              <div className="w-14 h-14 rounded-2xl bg-white border border-slate-200 flex items-center justify-center shadow-sm">
                <HiOutlineClipboardList size={26} className="text-blue-600" />
              </div>
              <p className="text-sm font-semibold text-slate-500">No tasks found</p>
              <p className="text-xs text-slate-400">Try switching the status filter above.</p>
            </div>

          ) : (
            <>
              {/* ══ DESKTOP TABLE ══ */}
              <div className="hidden md:block rounded-2xl overflow-hidden bg-white shadow-sm border border-slate-100">
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
                    </tr>
                  </thead>
                  <tbody>
                    {data.map((task, i) => (
                      <tr
                        key={task.id}
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
                              {task.title?.slice(0, 2)?.toUpperCase() || '??'}
                            </div>
                            <span className="text-slate-700 font-semibold">{task.title}</span>
                          </div>
                        </td>
                        <td className="px-5 py-3.5 max-w-xs">
                          <span className="text-slate-500 font-semibold whitespace-normal break-words">
                            {task.description}
                          </span>
                        </td>
                        <td className="px-5 py-3.5">
                          <StatusBadge done={task.isCompleted} />
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
                <div className="px-5 py-3 bg-gradient-to-br from-gray-100 to-sky-50 flex items-center justify-between">
                  <p className="text-xs text-slate-400">
                    Showing{' '}
                    <span className="font-semibold text-slate-600">{data.length}</span> of{' '}
                    <span className="font-semibold text-slate-600">{data.length}</span>{' '}
                    {status === 1 ? 'completed' : 'pending'} task{data.length !== 1 ? 's' : ''}
                  </p>
                </div>
              </div>

              {/* ══ MOBILE CARDS ══ */}
              <div className="md:hidden space-y-3">
                {data.map((task, i) => (
                  <div
                    key={task.id}
                    className="rounded-2xl bg-white border border-slate-200 border-l-4 border-l-sky-300 border-r-sky-300 border-r-4 shadow-md p-4 transition-all"
                  >
                    <div className="flex items-center justify-between mb-3 gap-4">
                      <span className="text-[10px] font-mono font-bold text-sky-500 bg-sky-50 px-2 py-0.5 rounded-full">
                        #{i + 1}
                      </span>
                    </div>
                    <div className="flex items-center justify-between gap-2 mb-3">
                      <div className="flex items-center gap-2.5 min-w-0">
                        <div className="flex items-center justify-center w-9 h-9 rounded-full bg-gradient-to-br from-sky-400 to-sky-500 text-white text-sm font-bold flex-shrink-0">
                          {task.title?.charAt(0)?.toUpperCase() || '?'}
                        </div>
                        <div className="min-w-0">
                          <p className="text-sm font-bold text-slate-800 leading-tight truncate">{task.title}</p>
                        </div>
                      </div>
                      <div className="flex-shrink-0">
                        <StatusBadge done={task.isCompleted} />
                      </div>
                    </div>
                    <div className="border-t border-slate-100 pt-2.5">
                      <div className="flex items-start gap-2 text-xs">
                        <AiOutlineFileText className="text-sky-500 flex-shrink-0 mt-0.5" size={13} />
                        <span className="text-slate-500 whitespace-normal break-words">{task.description}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </>
          )}
        </>
      )}
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