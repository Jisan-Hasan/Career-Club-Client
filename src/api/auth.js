// save user in the db
export const saveUser = async(email) => {
    const userObj = {
        email,
    };
    fetch(`${process.env.REACT_APP_API_URL}/user`, {
        method: "POST",
        headers: {
            "content-type": "application/json",
        },
        body: JSON.stringify(userObj),
    })
        .then((res) => res.json())
        .then((data) => {
            return data.status;
            // console.log(data);
        });
};

// set user role
export const setUserRole = async(email, role) => {
    const roleObj = {
        role: role,
    };

    fetch(`${process.env.REACT_APP_API_URL}/userRole/${email}`, {
        method: "PATCH",
        headers: {
            "content-type": "application/json",
        },
        body: JSON.stringify(roleObj),
    })
        .then((res) => res.json())
        .then((data) => {
            return data.status;
            // console.log(data);
        });
};

// set user verify status
export const setUserVerifyStatus = async(email, isVerified) => {
    const verifyObj = {
        isVerified: isVerified,
    };

    fetch(`${process.env.REACT_APP_API_URL}/verifyStatus/${email}`, {
        method: "PATCH",
        headers: {
            "content-type": "application/json",
        },
        body: JSON.stringify(verifyObj),
    })
        .then((res) => res.json())
        .then((data) => {
            // console.log(data);
            return data.status;
        });
};
