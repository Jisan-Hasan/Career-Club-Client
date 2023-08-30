// set employer package
export const setPostNumber = (email, postNumber) => {
    fetch(`${process.env.REACT_APP_API_URL}/postNumber/${email}`, {
        method: "PATCH",
        headers: {
            "content-type": "application/json",
            email: email,
        },
        body: JSON.stringify({ postNumber }),
    })
        .then((res) => res.json())
        .then((data) => {
            return data;
        });
};
