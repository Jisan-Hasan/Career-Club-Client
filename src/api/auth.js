import { setPostNumber } from "./pack";

// save user in the db
export const saveUser = (user) => {
    const currentUser = {
        name: user.displayName,
        email: user.email,
    };
    fetch(`${process.env.REACT_APP_API_URL}/user/${user?.email}`, {
        method: "PUT",
        headers: {
            "content-type": "application/json",
            email: user?.email,
        },
        body: JSON.stringify(currentUser),
    })
        .then((res) => res.json())
        .then((data) => {
            return data.status;
        });
};

// set employer package

// set user role
export const setUserRole = async (email, role) => {
    const roleObj = {
        role: role,
    };

    fetch(`${process.env.REACT_APP_API_URL}/userRole/${email}`, {
        method: "PATCH",
        headers: {
            "content-type": "application/json",
            email: email,
        },
        body: JSON.stringify(roleObj),
    })
        .then((res) => res.json())
        .then((data) => {
            // set initial package number 0
            if (role === "employer") {
                setPostNumber(email, 0);
            }
            return data.status;
            // console.log(data);
        });
};

// save user image
export const setImageUrl = async (email, img) => {
    const imgObj = {
        image: img,
    };

    fetch(`${process.env.REACT_APP_API_URL}/image/${email}`, {
        method: "PATCH",
        headers: {
            "content-type": "application/json",
            email: email,
        },
        body: JSON.stringify(imgObj),
    })
        .then((res) => res.json())
        .then((data) => {
            return data.status;
        });
};

// set user verify status
export const setUserVerifyStatus = async (email, isVerified) => {
    const verifyObj = {
        isVerified: isVerified,
    };

    fetch(`${process.env.REACT_APP_API_URL}/verifyStatus/${email}`, {
        method: "PATCH",
        headers: {
            "content-type": "application/json",
            email: email,
        },
        body: JSON.stringify(verifyObj),
    })
        .then((res) => res.json())
        .then((data) => {
            // console.log(data);
            return data.status;
        });
};
