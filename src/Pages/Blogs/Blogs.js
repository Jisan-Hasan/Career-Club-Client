import React from "react";
import { setTitle } from "../../api/title";

const Blogs = () => {
    setTitle("Blogs");
    return (
        <div>
            <p>Blog Page</p>
        </div>
    );
};

export default Blogs;
