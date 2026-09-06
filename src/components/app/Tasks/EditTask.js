import React, { useEffect, useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { createAxiosWithToken } from "../../../CreateAxios";
import Model from "../../../controls/Model";
import { AiOutlineEdit, AiOutlineFileText, AiOutlineCheckCircle } from 'react-icons/ai';
import { MdOutlineDone, MdErrorOutline } from "react-icons/md";
import { useToast } from "../../../toast/ToastProvider";
import { useAuthenticate } from "../../../useAuthenticate";
import Inputs, { inputCls } from "../../../controls/Inputs";
import { RiDiscountPercentFill } from "react-icons/ri";
import { CgProfile } from "react-icons/cg";
import { TbFileDescription } from "react-icons/tb";
import { FaUserEdit } from "react-icons/fa";
import Button from "../../../controls/Button";

export default function EditTask({ isOpen, setIsOpen, id, getAll, editData }) {
  const [loading, setLoading] = useState(false);
  const [isCompleted] = useState("0");
  const toast = useToast();
  const [authenticate] = useAuthenticate();

  const schema = Yup.object().shape({
    title: Yup.string().required("Title is required"),
    description: Yup.string().required("Description is required"),
    isCompleted: Yup.string().required("Status is required"),
  });

  const { handleChange, handleSubmit, values, errors, touched, handleBlur, setValues } =
    useFormik({
      initialValues: { id, title: "", description: "", isCompleted },
      validationSchema: schema,
      enableReinitialize: true,
      onSubmit(val) {
        val.isCompleted = Number(val.isCompleted);
        editTask(val);
      },
    });

  useEffect(() => {
    if (id) setValues(editData);
  }, [id]);

  const editTask = (val) => {
    setLoading(true);
    createAxiosWithToken(authenticate.loginData.token)
      .post("TaskManager/UpdateTasks", val)
      .then((res) => {
        if (res.data) {
          toast.open("Task Edited Successfully.", "text-green-600", <MdOutlineDone />);
          setIsOpen(!isOpen);
          getAll();
        } else {
          toast.open(res.data.result.message, "text-red-500", <MdErrorOutline />);
        }
        setLoading(false);
      })
      .catch(() => {
        toast.open("Something went wrong!", "text-red-500", <MdErrorOutline />);
        setLoading(false);
      });
  };

  const isTaskCompleted = String(values.isCompleted) === "1";

  const fieldBase =
    "w-full rounded-2xl border px-4 py-2.5 pl-12 text-sm placeholder-slate-400 outline-none transition-all bg-white text-slate-700";
  const fieldNormal = "border-slate-200 hover:border-blue-300 focus:border-blue-400 focus:ring-2 focus:ring-blue-100";
  const fieldError = "border-red-400 bg-red-50 focus:ring-red-100 focus:border-red-400";

  const fieldCls = (hasError) => `${fieldBase} ${hasError ? fieldError : fieldNormal}`;

  return (
    <Model title="Edit Task" isOpen={isOpen} setIsOpen={setIsOpen}>

      <div className="px-6 pb-6 pt-5 bg-white">

        <form onSubmit={handleSubmit} className="flex flex-col gap-5 relative">

          {/* ── Title ── */}
          <Inputs label="Name" error={touched.title && errors.title}>
            <CgProfile className="text-blue-500 shrink-0" size={20} />
            <input
              id="title"
              autoComplete="off"
              className={inputCls}
              value={values.title}
              onChange={handleChange}
              onBlur={handleBlur}
            />
          </Inputs>

          {/* ── Description ── */}
          <Inputs label="Description" error={touched.description && errors.description}>
            <TbFileDescription className="text-yellow-500 shrink-0" size={20} />
            <input
              id="description"
              autoComplete="off"
              className={inputCls}
              value={values.description}
              onChange={handleChange}
              onBlur={handleBlur}
            />
          </Inputs>

          {/* ── Status ── */}
          <div>
            <label className="block text-[11px] font-semibold text-slate-400 tracking-widest uppercase mb-2 text-xs">
              Status
            </label>
            <div className="relative">
              <div className="absolute left-3.5 top-1/2 -translate-y-1/2 w-7 h-7 flex items-center justify-center">
                <AiOutlineCheckCircle className="text-amber-500" size={20} />
              </div>
              <select
                name="isCompleted"
                value={values.isCompleted}
                onChange={handleChange}
                onBlur={handleBlur}
                className={`w-full appearance-none rounded-xl border px-4 py-2.5 pl-12 pr-10
                  text-sm font-semibold outline-none transition-all cursor-pointer bg-white
                  focus:ring-2
                  ${isTaskCompleted
                    ? "text-green-700 border-green-300 focus:ring-green-100 focus:border-green-400"
                    : "text-amber-700 border-amber-300 focus:ring-amber-100 focus:border-amber-400"}
                  ${errors.isCompleted && touched.isCompleted ? "border-red-400" : ""}`}
              >
                <option value="1" className="bg-white text-green-700">✅  Completed</option>
                <option value="0" className="bg-white text-amber-700">⏳  Pending</option>
              </select>
              <div className="pointer-events-none absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-400">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </div>
            </div>
            {errors.isCompleted && touched.isCompleted && (
              <p className="text-xs text-red-500 mt-1.5 flex items-center gap-1">
                <span className="w-3.5 h-3.5 rounded-full bg-red-500 text-white text-[9px] font-bold flex items-center justify-center flex-shrink-0">!</span>
                {errors.isCompleted}
              </p>
            )}
          </div>

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