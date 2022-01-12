import SignIn from "../../body/authentication/SignIn";
import UserProvider from "../../config/UserContext";
import {signIn} from "../../service/authService";
import "@testing-library/jest-dom";
import {BrowserRouter as Router} from "react-router-dom";
import {act, render, screen} from "@testing-library/react";
import userEvent from "@testing-library/user-event";

jest.mock("../../service/authService");

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
        signIn.mockReturnValue(Promise.resolve());

        userEvent.type(screen.getByPlaceholderText("username"), "testUser");
        userEvent.type(screen.getByPlaceholderText("password"), "testPassword");
        await act(async () => {
            userEvent.click(screen.getByDisplayValue("Sign In"));
        });

        expect(signIn).toHaveBeenCalledTimes(1);
        expect(signIn).toHaveBeenCalledWith("testUser", "testPassword");
    });

    test("Should exist link to sign up page", () => {
        const createAccountLink = screen.getByText("Create new account");
        expect(createAccountLink).toBeInTheDocument();
    });
});