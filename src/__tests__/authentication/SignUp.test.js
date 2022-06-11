import SignUp from "../../components/authentication/SignUp";
import userEvent from "@testing-library/user-event";
import {signUp} from "../../service/authService";
import "@testing-library/jest-dom";
import {act, render, screen} from "@testing-library/react";
import {BrowserRouter as Router} from "react-router-dom";


jest.mock("../../service/authService");

describe("Test suite for sign up", () => {

    beforeEach(() => {
        // eslint-disable-next-line testing-library/no-render-in-setup
        render(
            <Router>
                <SignUp/>
            </Router>
        );
    });

    afterAll(() => jest.clearAllMocks());

    test("Should sign up new user", async () => {
        signUp.mockReturnValue(Promise.resolve());

        userEvent.type(screen.getByPlaceholderText("username"), "testUser");
        userEvent.type(screen.getByPlaceholderText("email address"), "testEmail");
        userEvent.type(screen.getByPlaceholderText("password"), "testPassword");
        userEvent.type(screen.getByPlaceholderText("confirm password"), "testPassword");
        await (async () => {
            userEvent.click(screen.getByDisplayValue("Sign Up"));
        });

        expect(signUp).toHaveBeenCalledTimes(1);
        expect(signUp).toHaveBeenCalledWith("testUser", "testPassword", "testEmail");
    });

    test("Should show information when password mismatch", async () => {
        userEvent.type(screen.getByPlaceholderText("username"), "testUser");
        userEvent.type(screen.getByPlaceholderText("email address"), "testEmail");
        userEvent.type(screen.getByPlaceholderText("password"), "testPassword");
        userEvent.type(screen.getByPlaceholderText("confirm password"), "anotherPassword");
        // eslint-disable-next-line testing-library/no-unnecessary-act
        await act(async () => {
            userEvent.click(screen.getByDisplayValue("Sign Up"));
        });

        expect(signUp).toBeCalledTimes(0);
        expect(screen.getByText("Mismatch between passwords! Please try again")).toBeInTheDocument();
    });
});