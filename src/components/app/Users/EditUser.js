// ... (imports remain the same)

import { useFormik } from "formik";
import { useEffect, useState } from "react";
import { createAxiosWithToken } from "../../../CreateAxios";
import { MdErrorOutline, MdOutlineDone, MdOutlineMailOutline } from "react-icons/md";
import { AiOutlineIdcard, AiOutlinePhone, AiOutlineUser } from "react-icons/ai";
import Model from "../../../controls/Model";
import { useToast } from "../../../toast/ToastProvider";
import * as Yup from "yup";
import { useAuthenticate } from "../../../useAuthenticate";
import Inputs, { inputCls } from "../../../controls/Inputs";
import { CiLocationOn } from "react-icons/ci";
import Button from "../../../controls/Button";

export default function EditUser({ isOpen, setIsOpen, id, getAllUser, editData }) {
    const [loading, setLoading] = useState(false);
    const toast = useToast();
    const [authenticate, setAuthenticate] = useAuthenticate()

    const schema = Yup.object().shape({
        email: Yup.string().required("Email is required"),
        phoneNumber: Yup.string().required("Phone Number is required"),
        userName: Yup.string().required("User Name is required"),
        fullName: Yup.string().required("Full Name is required"),
        address: Yup.string().required("Address is required"),
        password: Yup.string()
    });

    const { handleChange, handleSubmit, values, errors, touched, handleBlur, setValues } = useFormik({
        initialValues: {
            id: "",
            email: "",
            phoneNumber: "",
            userName: "",
            fullName: "",
            address: "",
            password: ""
        },
        validationSchema: schema,
        enableReinitialize: true,
        onSubmit(val) {
            editUser(val);
        },
    });

    useEffect(() => {
        if (editData) {
            setValues({
                id: editData.id || "",
                email: editData.email || "",
                phoneNumber: editData.phoneNumber || "",
                userName: editData.userName || "",
                fullName: editData.fullName || "",
                address: editData.address || "",
                password: ""
            });
        }
    }, [editData]);

    const editUser = (val) => {
        setLoading(true);
        createAxiosWithToken(authenticate.loginData.token).post('ApplicationUser/Update', val)
            .then((res) => {
                if (res.data) {
                    toast.open("User Edited Successfully.", "text-green-600", <MdOutlineDone />);
                    setIsOpen(false);
                    getAllUser();
                } else {
                    toast.open("Failed to update user.", "text-red-500", <MdErrorOutline />);
                }
                setLoading(false);
            })
            .catch((err) => {
                console.error("Error Response:", err.response?.data);
                toast.open("Something went wrong!", "text-red-500", <MdErrorOutline />);
                setLoading(false);
            });
    };

    return (
        <Model title="Edit User" isOpen={isOpen} setIsOpen={setIsOpen}>
            <form onSubmit={handleSubmit} className="flex flex-col max-h-[70vh]">
                <div className="px-5 md:px-8 py-5 overflow-y-auto">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-5">

                        {/* ── User Name ── */}
                        <Inputs label="User Name" error={touched.userName && errors.userName}>
                            <AiOutlineUser className="text-blue-500 shrink-0" size={20} />
                            <input
                                id="userName"
                                name="userName"
                                autoComplete="off"
                                className={inputCls}
                                value={values.userName}
                                onChange={handleChange}
                                onBlur={handleBlur}
                            />
                        </Inputs>

                        {/* ── Full Name ── */}
                        <Inputs label="Full Name" error={touched.fullName && errors.fullName}>
                            <AiOutlineIdcard className="text-purple-500 shrink-0" size={20} />
                            <input
                                id="fullName"
                                name="fullName"
                                autoComplete="off"
                                className={inputCls}
                                value={values.fullName}
                                onChange={handleChange}
                                onBlur={handleBlur}
                            />
                        </Inputs>

                        {/* ── Phone Number ── */}
                        <Inputs label="Phone Number" error={touched.phoneNumber && errors.phoneNumber}>
                            <AiOutlinePhone className="text-green-500 shrink-0" size={20} />
                            <input
                                id="phoneNumber"
                                name="phoneNumber"
                                autoComplete="off"
                                className={inputCls}
                                value={values.phoneNumber}
                                onChange={handleChange}
                                onBlur={handleBlur}
                            />
                        </Inputs>


                        <Inputs label="Address" error={touched.address && errors.address}>
                            <CiLocationOn className="text-blue-500 shrink-0" size={20} />
                            <input
                                id="address"
                                name="address"
                                autoComplete="off"
                                className={inputCls}
                                value={values.address}
                                onChange={handleChange}
                                onBlur={handleBlur}
                            />
                        </Inputs>
                        <div className="md:col-span-2">
                            <Inputs label="Email" error={touched.email && errors.email}>
                                <MdOutlineMailOutline className="text-gray-500 shrink-0" size={20} />
                                <input
                                    id="email"
                                    name="email"
                                    autoComplete="off"
                                    className={inputCls}
                                    value={values.email}
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                />
                            </Inputs>
                        </div>
                    </div>
                </div>

                <div className="border-t border-slate-100 bg-white px-5 md:px-12 py-4 flex gap-3 shrink-0">
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
        </Model>
    );
}