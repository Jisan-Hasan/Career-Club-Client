import { toast } from "react-hot-toast";

// set job approved status
export const setApprovedStatus = (id, status) => {
    fetch(`${process.env.REACT_APP_API_URL}/jobStatus/${id}`, {
        method: "PATCH",
        headers: {
            "content-type": "application/json",
        },
        body: JSON.stringify({ status }),
    })
        .then((res) => res.json())
        .then((data) => {
            if (data.status) {
                toast.success("Job Approved!");
            }
        });
};
