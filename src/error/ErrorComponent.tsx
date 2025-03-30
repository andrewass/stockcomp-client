
interface Props {
    error: Error | null
}

export default function ErrorComponent({error}: Props){
    return (
        <h5>Error : {error?.message ?? "Unknown error"}</h5>
    )
}
