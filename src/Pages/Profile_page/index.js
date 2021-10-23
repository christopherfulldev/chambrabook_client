import "./index.css";

import AlbumComponent from "../../Components/Album";
import APIconect from "../../Services/APIconect";

import {Redirect} from "react-router-dom";
import { useEffect, useState } from "react";
const ProfilePage = (props) => {
    const [payload, setPayload] = useState([]);
    const {useToken} = props;
    const {token} = useToken();

    useEffect( async () => {
        const payloadData = JSON.parse(localStorage.getItem("payload"));
        const pickedPayload = await APIconect.getProfilePayload({...payloadData, token});
        setPayload(pickedPayload.data);
        console.log(pickedPayload.data);
    }, []);

    if(!token) {
        return <Redirect to="/"/>
    }

    return (
        <div className="row py-5 px-4">
            <div className="col-md-5 mx-auto">
                {/* Profile widget */}
                <div className="bg-white shadow rounded overflow-hidden">
                <div className="px-4 pt-0 pb-4 cover">
                    <div className="media align-items-end profile-head">
                    <div className="profile mr-3">
                        <img src="https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=80" alt="..." width={130} className="rounded mb-2 img-thumbnail" />
                        <a href="#" className="btn btn-outline-dark btn-sm btn-block">Edit profile</a>
                    </div>
                    <div className="media-body mb-5 text-white">
                        <h4 className="mt-0 mb-0">Mark Williams</h4>
                        <p className="small mb-4"> <i className="fas fa-map-marker-alt mr-2" />New York</p>
                    </div>
                    </div>
                </div>
                <div className="bg-light p-4 d-flex justify-content-end text-center">
                    <ul className="list-inline mb-0">
                    <li className="list-inline-item">
                        <h5 className="font-weight-bold mb-0 d-block">215</h5>
                        <small className="text-muted"> <i className="fas fa-image mr-1" />Photos</small>
                    </li>
                    <li className="list-inline-item">
                        <h5 className="font-weight-bold mb-0 d-block">745</h5>
                        <small className="text-muted"> <i className="fas fa-user mr-1" />Followers</small>
                    </li>
                    <li className="list-inline-item">
                        <h5 className="font-weight-bold mb-0 d-block">340</h5>
                        <small className="text-muted"> <i className="fas fa-user mr-1" />Following</small>
                    </li>
                    </ul>
                </div>
                <div className="px-4 py-3">
                    <h5 className="mb-0">About</h5>
                    <div className="p-4 rounded shadow-sm bg-light">
                    <p className="font-italic mb-0">Web Developer</p>
                    </div>
                </div>
                    <AlbumComponent/>
                </div>
            </div>
        </div>
    );
};

export default ProfilePage;