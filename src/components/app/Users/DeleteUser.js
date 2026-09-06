import React, { useState } from 'react';
import { createAxiosWithToken } from '../../../CreateAxios';
import Model from '../../../controls/Model';
import { MdOutlineDone, MdErrorOutline, MdDeleteOutline } from "react-icons/md";
import { useToast } from '../../../toast/ToastProvider';
import { useAuthenticate } from '../../../useAuthenticate';
import Button from '../../../controls/Button';

export default function DeleteUser({ isOpen, setIsOpen, editData, getAllUser }) {
  const [loading, setLoading] = useState(false);
  const toast = useToast();
  const [authenticate] = useAuthenticate();

  const deleteUser = (id) => {
    setLoading(true);
    createAxiosWithToken(authenticate.loginData.token)
      .post('ApplicationUser/Delete?Id=' + id)
      .then(res => {
        if (res.data) {
          toast.open("User Deleted Successfully.", "text-green-400", <MdOutlineDone />);
          setIsOpen(!isOpen);
          getAllUser();
        } else {
          toast.open(res.data, "text-red-400", <MdErrorOutline />);
        }
        setLoading(false);
      })
      .catch(() => {
        toast.open("Something went wrong!", "text-red-400", <MdErrorOutline />);
        setLoading(false);
      });
  };

  return (
    <Model title="Delete User" isOpen={isOpen} setIsOpen={setIsOpen}>
      {editData && (
        <div className="bg-gray-50 relative">

          {/* Glow orb */}
          <div className="pointer-events-none absolute -top-8 -right-8 w-36 h-36 rounded-full bg-red-500/15 blur-3xl" />

          <div className="relative flex flex-col items-center text-center gap-5 pt-6 px-6">

            {/* Icon */}
            <div className="w-16 h-16 rounded-2xl bg-red-500/15 border border-red-400/30
              flex items-center justify-center shadow-lg shadow-red-500/10">
              <MdDeleteOutline size={30} className="text-red-400" />
            </div>

            {/* Text */}
            <div>
              <h2 className="text-lg font-bold text-slate-700 mb-1.5">
                Delete this user?
              </h2>
              <p className="text-sm text-slate-400 leading-relaxed max-w-[260px]">
                This action cannot be undone. User will be permanently removed.
              </p>
            </div>

            {/* User name pill */}
            {editData.name && (
              <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full
                bg-white/5 border border-white/10 text-sm text-slate-500">
                <span className="w-1.5 h-1.5 rounded-full bg-purple-400 shadow-[0_0_6px_#c084fc]" />
                {editData.name}
              </div>
            )}
          </div>

          {/* Buttons */}
          <div className="border-t border-slate-100 bg-white/20 px-6 py-4 flex gap-3 mt-6">
            <Button
              variant="cancel"
              text="Cancel"
              className="flex-1"
              onClick={() => setIsOpen(false)}
            />
            <Button
              type="submit"
              variant="delete"
              loading={loading}
              loadingText="Deleting..."
              text="Delete"
              className="flex-1"
              onClick={() => deleteUser(editData.id)}
            />
          </div>
        </div>
      )}
    </Model>
  );
}