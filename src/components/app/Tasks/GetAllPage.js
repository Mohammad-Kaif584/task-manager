import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { CreateAxios } from '../../../CreateAxios';
import { MdErrorOutline, MdPendingActions, MdCheckCircle } from 'react-icons/md';
import { BiTask } from 'react-icons/bi';
import { HiOutlineClipboardList, HiOutlineLogin } from 'react-icons/hi';
import { FiHash } from 'react-icons/fi';
import { AiOutlineFileText } from 'react-icons/ai';
import { CgProfile } from 'react-icons/cg';
import { useToast } from '../../../toast/ToastProvider';
import Loading from '../../../controls/Loading';

export default function GetAllPage() {
    const [loading, setLoading] = useState(false);
    const [students, setStudents] = useState([]);
    const [filter, setFilter] = useState('all');
    const toast = useToast();

    useEffect(() => { getAll(); }, []);

    const getAll = () => {
        setLoading(true);
        CreateAxios.get('TaskManager/GetAllTasks')
            .then((res) => {
                const mydata = res.data;
                if (mydata) {
                    setStudents(mydata);
                } else {
                    toast.open(res.data.result.message, 'text-red-500', <MdErrorOutline />);
                }
                setLoading(false);
            })
            .catch(() => {
                toast.open('Something went wrong!', 'text-red-500', <MdErrorOutline />);
                setLoading(false);
            });
    };

    const pending = students.filter(t => !t.isCompleted);
    const completed = students.filter(t => t.isCompleted);

    const filtered =
        filter === 'pending' ? pending :
            filter === 'completed' ? completed :
                students;

    const getInitials = (name) => {
        if (!name) return '?';
        const parts = name.trim().split(/\s+/);
        if (parts.length > 1) {
            return (parts[0].charAt(0) + parts[1].charAt(0)).toUpperCase();
        }
        return parts[0].charAt(0).toUpperCase();
    };

    return (
        <div className="min-h-screen bg-white">

            {/* ── HEADER ── same as before */}
            <header className="sticky top-0 z-20 bg-white border-b border-slate-200 shadow-sm">
              <div className="max-w-7xl mx-auto px-4 sm:px-6 md:pr-2 h-16 grid grid-cols-3 items-center ml-5 md:flex md:justify-between md:ml-0">
                    <div className="flex items-center gap-2">
                        <div className="relative">
                            <div className="w-8 h-8 animate-bounce rounded-lg flex items-center justify-center font-black text-white text-sm bg-gradient-to-br from-sky-400 to-sky-500">
                                T
                            </div>
                            <span className="absolute -bottom-0.5 -right-0.5 w-2.5 h-2.5 rounded-full bg-emerald-400 border-2 border-white" />
                        </div>
                        <div className="flex items-baseline gap-1">
                            <span className="text-lg font-black text-gray-400 tracking-tight">Task</span>
                            <span className="text-lg font-black text-sky-500 tracking-tight">Manager</span>
                        </div>
                    </div>

                    <div className="justify-self-center ml-40 md:ml-0">
                        <Link
                            to="/login"
                            className="flex items-center gap-1.5 text-xs font-semibold text-sky-500 bg-sky-50 hover:bg-sky-100 hover:scale-105 px-4 py-1.5 rounded-full shadow-md transition-colors no-underline"
                        >
                            <HiOutlineLogin size={13} />
                            Login To Application
                        </Link>
                    </div>
                </div>
            </header>

            {/* ── PAGE BODY ── */}
            <main className="max-w-7xl mx-auto px-4 sm:px-12 py-6 space-y-5">

                {/* ✅ LOADING */}
                {loading && (
                    <Loading
                        Icon={<BiTask className="text-sky-500" size={25} />}
                        bgColor="bg-sky-100"
                        color="bg-sky-500"
                        text="Loading Tasks..."
                    />
                )}

                {!loading && (
                    <>
                        {/* ── EMPTY STATE ── */}
                        {students.length === 0 ? (
                            <div className="flex flex-col items-center justify-center py-36 gap-3">
                                <div className="w-14 h-14 rounded-2xl bg-white border border-slate-200 flex items-center justify-center shadow-sm">
                                    <HiOutlineClipboardList size={26} className="text-blue-600" />
                                </div>
                                <p className="text-sm font-semibold text-slate-500">No tasks available</p>
                                <p className="text-xs text-slate-400">Tasks will appear here once added.</p>
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
                                                        <CgProfile size={16} className="text-blue-500" /> Title
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
                                            {filtered.length === 0 ? (
                                                <tr>
                                                    <td colSpan={4}>
                                                        <EmptyFilter filter={filter} onReset={() => setFilter('all')} />
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
                                        <EmptyFilter filter={filter} onReset={() => setFilter('all')} />
                                    ) : filtered.map((item, i) => (
                                        <div
                                            key={item.id}
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
                                            <div className="border-t border-slate-100 pt-2.5">
                                                <div className="flex items-start gap-2 text-xs">
                                                    <AiOutlineFileText className="text-sky-500 flex-shrink-0 mt-0.5" size={13} />
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
            </main>
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

function EmptyFilter({ filter, onReset }) {
    return (
        <div className="flex flex-col items-center py-16 gap-2">
            <p className="text-sm text-slate-400">No {filter} tasks found.</p>
            <button
                onClick={onReset}
                className="text-xs text-blue-600 underline underline-offset-2 hover:text-blue-800 transition-colors"
            >
                Show all
            </button>
        </div>
    );
}