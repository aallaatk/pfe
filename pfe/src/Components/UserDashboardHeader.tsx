import axios from "axios";
import { useState, useEffect } from "react";

interface UserImage {
  imageUrl: string;
  name: string;
}

function UserDashboardHeader({ userId }: { userId: string }) {
  const [imageUrl, setimageUrl] = useState('');
  const [name, setname] = useState('');

  useEffect(() => {
    const fetchUserImage = async () => {
      try {
        const response = await axios.get<UserImage>(`http://localhost:3000/info/user/${userId}`);
        setimageUrl(response.data.imageUrl);
        setname(response.data.name);
      } catch (error) {
        console.error("Error fetching user image:", error);
      }
    };

    fetchUserImage();
  }, [userId]);

  return (
    <div className="container-fluid bg-primary p-3 ">
      <div className="row ">
        <div className="col-sm-9">
        <h3 className="p-2" style={{color:'white'}}>Welcome Back <span style={{color:'white'}} className="h2">{name}</span></h3>
        </div>
        <div className="col-sm-3">
          <img src={imageUrl} alt="userimage" style={{ height: '60px', width: '60px', borderRadius: '50%' }} />
        </div>
      </div>
    </div>
  );
}

export default UserDashboardHeader;
