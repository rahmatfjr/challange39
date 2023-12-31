import React, { Fragment, useCallback, useState } from "react"
import { Button, Modal } from 'react-bootstrap'
import { useDispatch } from "react-redux"

export default function UserItem(props) {

    const dispatch = useDispatch()

    const [user, setUser] = useState({
        name: props.data.name,
        phone: props.data.phone,
        isEdit: false,
        showHide: false
    })

    const handleInputChange = (event) => {
        const target = event.target;
        const value = target.type === 'checkbox' ? target.checked : target.value;
        const name = target.name;
        const phone = target.phone
        setUser({
            ...user,
            [name]: value,
            [phone]: value
        });
    }

    const handleEdit = useCallback((event) => {
        event.preventDefault()
        setUser({
            name: user.name,
            phone: user.phone,
            isEdit: true
        });
    }, [user])

    const handleCancel = useCallback((event) => {
        event.preventDefault()
        setUser({
            name: props.data.name,
            phone: props.data.phone,
            isEdit: false
        });
    }, [])

    const saveEdit = useCallback((event) => {
        event.preventDefault()
        props.update(user.name, user.phone)
        setUser({
            ...user,
            name: user.name,
            phone: user.phone,
            isEdit: false
        });
    }, [dispatch, user])

    const handleModalShowHide = useCallback(() => {
        setUser({
            showHide: true
        })
    }, [])

    const cancelHandleModalShowHide = useCallback((event) => {
        event.preventDefault()
        setUser({
            name: props.data.name,
            phone: props.data.phone,
            showHide: false
        })
    }, [dispatch, user])

    return (
        <Fragment>
            <tr>
                <td>{props.no}</td>
                <td>
                    {user.isEdit ?
                        <input
                            type="teks"
                            name="name"
                            value={user.name}
                            onChange={handleInputChange}
                            className="form-control"
                        />
                        :
                        user.name
                    }
                </td>

                <td>
                    {user.isEdit ?
                        <input
                            type="teks"
                            name="phone"
                            value={user.phone}
                            onChange={handleInputChange}
                            className="form-control"
                        />
                        :
                        user.phone
                    }
                </td>

                {props.data.sent ?
                    user.isEdit ?
                        <td>
                            <button type="button"
                                className="btn btn-primary"
                                style={{ backgroundColor: '#85b35a', borderWidth: 0 }}
                                onClick={saveEdit}>
                                <i className="fa-solid fa-floppy-disk"></i>
                                &nbsp;
                                save
                            </button>
                            &nbsp;
                            <button type="button"
                                className="btn btn-warning"
                                onClick={handleCancel}
                                style={{ color: "white", backgroundColor: '#bdd9a0', borderWidth: 0 }}>
                                <i className="fa-solid fa-ban"></i>
                                &nbsp;
                                cancel
                            </button>
                        </td>
                        :
                        <td>
                            <button type="button"
                                className="btn btn-success"
                                style={{ backgroundColor: '#4a8122', borderWidth: 0 }}
                                onClick={handleEdit}>
                                &nbsp;
                                edit
                            </button>
                            &nbsp;
                            <button type="button"
                                className="btn btn-danger"
                                style={{ backgroundColor: '#85b35a', borderWidth: 0 }}
                                onClick={() => handleModalShowHide()}>
                                &nbsp;
                                delete
                            </button>
                        </td>
                    :
                    <td>
                        <button type="button"
                            className="btn btn-warning"
                            onClick={props.resend}
                            style={{ backgroundColor: '#173e07', borderWidth: 0, color:'white' }}>
                            resend
                        </button>
                    </td>
                }
            </tr>

            <Modal show={user.showHide}>
                <Modal.Header >
                    <Modal.Title style={{color:'#173e07'}}>Deleted Confirmation</Modal.Title>
                </Modal.Header>
                <Modal.Body>Are you sure, you want delete <b style={{color:'#173e07'}}>{props.data.name}</b></Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={cancelHandleModalShowHide} style={{ backgroundColor: '#85b35a', borderWidth: 0, color:'white' }}>
                        No
                    </Button>
                    <Button variant="primary" onClick={props.remove} style={{ backgroundColor: '#4a8122', borderWidth: 0, color:'white' }}>
                        Yes
                    </Button>
                </Modal.Footer>
            </Modal>

        </Fragment>
    )
}