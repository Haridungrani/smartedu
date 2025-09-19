"use client";

import { toast } from "react-toastify";

export const notify = {
    success(message) {
        toast.success(message);
    },
    error(message) {
        toast.error(message);
    },
    info(message) {
        toast.info(message);
    },
    promise(promise, msgs) {
        return toast.promise(promise, msgs);
    },
};


