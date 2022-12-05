import { Button, Label, TextInput } from "flowbite-react";
import React from "react";

const Signup = () => {
    return (
        <div>
            <form className="flex flex-col gap-4">
                <div>
                    <div className="mb-2 block">
                        <Label htmlFor="email1" value="Your email" />
                    </div>
                    <TextInput
                        id="email1"
                        type="email"
                        placeholder="name@flowbite.com"
                        required={true}
                    />
                </div>
                <div>
                    <div className="mb-2 block">
                        <Label htmlFor="password1" value="Your password" />
                    </div>
                    <TextInput id="password1" type="password" required={true} />
                </div>

                <Button type="submit">Submit</Button>
            </form>
        </div>
    );
};

export default Signup;
