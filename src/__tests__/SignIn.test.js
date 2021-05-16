import SignIn from "../body/authentication/SignIn";
import UserProvider from "../context/UserContext";
import {signIn} from "../service/authService";
import "@testing-library/jest-dom";
import {BrowserRouter as Router} from "react-router-dom";
import {act, render, screen} from "@testing-library/react";
import userEvent from "@testing-library/user-event";

jest.mock("../service/authService");

describe("Test suite for sign in", () => {

    beforeEach(() => {
            render(
                <Router>
                    <UserProvider>
                        <SignIn/>
                    </UserProvider>
                </Router>
            );
        }
    );

    afterAll(() => jest.clearAllMocks());

    test("Should sign in as expected", async () => {
        const usernameInput = screen.getByPlaceholderText("username");
        const passwordInput = screen.getByPlaceholderText("password");
        const submitButton = screen.getByDisplayValue("Sign In");
        signIn.mockReturnValue(Promise.resolve());

        userEvent.type(usernameInput, "testUser");
        userEvent.type(passwordInput, "testPassword");
        await act(async () => {
            userEvent.click(submitButton);
        });

        expect(signIn).toHaveBeenCalledTimes(1);
        expect(signIn).toHaveBeenCalledWith("testUser", "testPassword");
    });

    test("Should exist link to sign up page", () => {
        const createAccountLink = screen.getByText("Create new account");
        expect(createAccountLink).toBeInTheDocument();
    });
});