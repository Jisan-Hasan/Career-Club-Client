import React from 'react';
import { setTitle } from '../../api/title';

const MyPosts = () => {
    setTitle("My Posts");
    return (
        <div>
            <p>My Posts</p>
        </div>
    );
};

export default MyPosts;