import axios from "axios";
import { useState, useEffect } from "react";

interface GuiderInfo {
  imageUrl: string;
  name: string;
}

function  GuiderDashboardHeader({ userId }: Readonly<{ userId: string }>) {
  const [imageUrl, setImageUrl] = useState('');
  const [name, setName] = useState('');

  useEffect(() => {
    const fetchGuiderInfo = async () => {
      try {
        const response = await axios.get<GuiderInfo>(`http://localhost:3000/guiders/info/${userId}`);
        setImageUrl(response.data.imageUrl);
        setName(response.data.name);
      } catch (error) {
        console.error("Error fetching guider info:", error);
      }
    };

    fetchGuiderInfo();
  }, [userId]);

  return (
    <div className="container-fluid bg-primary p-3">
      <div className="row">
        <div className="col-sm-9">
          <h3 className="p-2" style={{ color: 'white' }}>Welcome Back <span style={{ color: 'white' }} className="h2">{name}</span></h3>
        </div>
        <div className="col-sm-3">
          <img src={imageUrl} alt="guiderimage" style={{ height: '60px', width: '60px', borderRadius: '50%' }} />
        </div>
      </div>
    </div>
  );
}

export default GuiderDashboardHeader;
