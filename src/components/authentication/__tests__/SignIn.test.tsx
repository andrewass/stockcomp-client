import {rest} from "msw";
import {render, screen} from "@testing-library/react";
import {SignIn} from "../SignIn";
import {Wrapper} from "../../common/test/TestUtils";
import userEvent from "@testing-library/user-event";
import {CONTEST_BASE_URL} from "../../../config/serviceConfig";
import {setupServer} from "msw/node";


const server = setupServer(
    rest.post(CONTEST_BASE_URL + "/auth/sign-in", (req, res, ctx) => {
        return res(
            ctx.status(200)
        )
    })
)

beforeAll(() => server.listen())
afterEach(() => server.resetHandlers())
afterAll(() => server.close())


test('sign in user', async () => {
    render(
        <Wrapper>
            <SignIn setDisplaySignUp={() => {
            }}/>))
        </Wrapper>
    )

    await userEvent.type(screen.getByLabelText("Username"), "testUser")
    await userEvent.type(screen.getByLabelText("Password"), "testPassword")
    await userEvent.click(screen.getByText("Sign In"))
})