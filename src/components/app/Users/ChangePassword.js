import React, { useEffect, useState } from 'react'
import { RiArrowGoBackLine } from 'react-icons/ri';
import { useNavigate } from 'react-router-dom';
import { CreateAxios } from '../../../CreateAxios';
import Model from '../../../controls/Model';
import { FaArrowLeft } from 'react-icons/fa';
import { useToast } from '../../../toast/ToastProvider';
import { MdOutlineDone, MdErrorOutline } from 'react-icons/md';
import { AiOutlineLock, AiOutlineEye, AiOutlineEyeInvisible } from 'react-icons/ai';
import Inputs, { inputCls } from '../../../controls/Inputs';
import Button from '../../../controls/Button';

export default function ChangePassword({ isOpen, setIsOpen, editData }) {
    const [loading, setLoading] = useState(false)
    const [userId, setUserId] = useState('');
    const [oldPassword, setOldPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [showOld, setShowOld] = useState(false);
    const [showNew, setShowNew] = useState(false);
    const toast = useToast()

    const [message, setMessage] = useState("");

    const handleSubmit = async (e) => {
        setLoading(true)
        e.preventDefault();
        setMessage("");
        console.log({
            userId,
            oldPassword,
            newPassword
        })
        try {
            const res = await CreateAxios.post("ApplicationUser/ChangePassword", {
                userId: userId.trim(),
                oldPassword,
                newPassword
            },);
            setMessage(res.data);
            setIsOpen(!isOpen)
            setLoading(false)
            setOldPassword('');
            setNewPassword('');
            toast.open("Changed password successfully", "text-green-600", <MdOutlineDone />);

        } catch (err) {
            setLoading(false)
            setMessage(err.response?.data || "Something went wrong");
            toast.open(err.response?.data || "Something went wrong!", "text-red-500", <MdErrorOutline />);
        }

    };
    useEffect(() => {
        if (editData) {
            setUserId(editData.id);
        }
    }, [editData])

    return (
        <Model title="Change Password" isOpen={isOpen} setIsOpen={setIsOpen}>

            <div className="px-6 pb-6 pt-5 bg-white">

                <form onSubmit={handleSubmit} className="flex flex-col gap-5 relative">

                    {/* ── Old Password ── */}
                    <div className="relative">
                        <Inputs label="Old Password">
                            <AiOutlineLock className="text-amber-500 shrink-0" size={20} />
                            <input
                                id="oldPassword"
                                name="oldPassword"
                                type={showOld ? "text" : "password"}
                                autoComplete="off"
                                placeholder="Enter old password"
                                className={inputCls}
                                value={oldPassword}
                                onChange={(e) => setOldPassword(e.target.value)}
                            />
                        </Inputs>
                        <button
                            type="button"
                            onClick={() => setShowOld(!showOld)}
                            className="absolute right-3.5 top-[34px] text-slate-400 hover:text-slate-600 transition-colors"
                        >
                            {showOld ? <AiOutlineEyeInvisible size={18} /> : <AiOutlineEye size={18} />}
                        </button>
                    </div>

                    {/* ── New Password ── */}
                    <div className="relative">
                        <Inputs label="New Password">
                            <AiOutlineLock className="text-blue-500 shrink-0" size={20} />
                            <input
                                id="newPassword"
                                name="newPassword"
                                type={showNew ? "text" : "password"}
                                autoComplete="off"
                                placeholder="Enter new password"
                                className={inputCls}
                                value={newPassword}
                                onChange={(e) => setNewPassword(e.target.value)}
                            />
                        </Inputs>
                        <button
                            type="button"
                            onClick={() => setShowNew(!showNew)}
                            className="absolute right-3.5 top-[34px] text-slate-400 hover:text-slate-600 transition-colors"
                        >
                            {showNew ? <AiOutlineEyeInvisible size={18} /> : <AiOutlineEye size={18} />}
                        </button>
                    </div>

                    {message && (
                        <p className="text-xs text-red-500 flex items-center gap-1.5 -mt-1">
                            <span className="w-3.5 h-3.5 rounded-full bg-red-500 text-white text-[9px] font-bold flex items-center justify-center flex-shrink-0">!</span>
                            {typeof message === 'string' ? message : 'Something went wrong'}
                        </p>
                    )}

                    <div className="h-px bg-slate-100" />

                    <div className="flex gap-3">
                        <Button
                            variant="cancel"
                            text="Cancel"
                            onClick={() => setIsOpen(false)}
                        />
                        <Button
                            type="submit"
                            variant="primary"
                            loading={loading}
                            text="Save"
                        />
                    </div>
                </form>
            </div>
        </Model>
    );
}