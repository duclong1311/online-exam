import { useState } from 'react';
import defaultAvatar from '../../Assets/default-avatar-icon-of-social-media-user-vector.jpg';
import { useSelector } from 'react-redux';
import { postUpdateProfile } from '../../Utils/apiServices';
import { toast } from 'react-toastify';
import './Profile.scss';

const Profile = () => {
    const account = useSelector(state => state.user.account);

    const [previewImage, setPreviewImage] = useState(
        account.image !== "" ? `data:image/jpeg;base64,${account.image}` : defaultAvatar
    );
    const [image, setImage] = useState(null);
    const [username, setUsername] = useState(account?.username || "");

    const handleUploadImage = (event) => {
        if (event.target && event.target.files && event.target.files[0]) {
            setPreviewImage(URL.createObjectURL(event.target.files[0]))
            setImage(event.target.files[0]);
        }
    }

    const postUpdateUser = async () => {
        const res = await postUpdateProfile(username, image);
        res && res.EC === 0 ? toast.success(res.EM) : toast.error(res.EM);
    }

    return (
        <>
            <form className="row g-3">
                <div className="col-md-6">
                    <label className="form-label">Email</label>
                    <input
                        type="email"
                        className="form-control"
                        disabled={true}
                        value={account?.email}
                    />
                </div>
                <div className="col-md-6">
                    <label className="form-label">Password</label>
                    <input
                        type="password"
                        className="form-control"
                        disabled={true}
                        value={"password"}
                    />
                </div>
                <div className="col-md-6">
                    <label className="form-label">Username</label>
                    <input
                        type="text"
                        className="form-control"
                        value={username}
                        onChange={(event) => setUsername(event.target.value)}
                    />
                </div>
                <div className="col-md-4">
                    <label className="form-label">Role</label>
                    <select
                        className="form-select"
                        value={account.role}
                        disabled={true}
                    >
                        <option value={"User"}>USER</option>
                        <option value={"ADMIN"}>ADMIN</option>
                    </select>
                </div>
                <div className="mb-3">
                    <label className="form-label">Image</label>
                    <input
                        className="form-control"
                        type="file"
                        onChange={(event) => handleUploadImage(event)}
                    />
                </div>
                <div className='col-md-12 img-fluid img-preview'>
                    {previewImage ? <img src={previewImage} alt='Avatar preview' /> : <span>Preview Image</span>}
                </div>
            </form>
            <button
                className='btn btn-warning'
                onClick={() => postUpdateUser()}
            >
                Update Profile
            </button>
        </>
    );
}

export default Profile;