
interface Props{
    errorMessage: string
}

const ErrorComponent = ({errorMessage}: Props) => {
    return(
        <h5>{errorMessage}</h5>
    )
}

export default ErrorComponent