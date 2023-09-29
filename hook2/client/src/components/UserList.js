import UserItem from "./UserItem"

export default function UserList(props) {

    const scrolling = (event) => {
        var element = event.target
        if (element.scrollHeight - element.scrollTop === element.clientHeight) {
            props.loadMore()
        }
    }
    return (
        <div onScroll={scrolling} style={{ overflowY: "scroll", height: 200 }}>
            <table className="box table table-striped">
                <tbody>
                    {props.data.map((user, index) => (
                        <UserItem
                            key={user.id}
                            no={index + 1}
                            user={user}
                            remove={() => props.remove(user.id)}
                            resend={() => props.resend(user)}
                            update={props.update}
                        />
                    ))}
                </tbody>
            </table>
        </div>
    )
}