import React, { useEffect, useState } from 'react';
import axios from 'axios';

interface Guider {
    _id: string;
    name: string;
    email: string;
    gsm: string;
    imageUrl: string;
}

const GuidersList: React.FC = () => {
    const [guiders, setGuiders] = useState<Guider[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchGuiders = async () => {
            try {
                const response = await axios.get('http://localhost:3000/guiders');
                setGuiders(response.data);
                setLoading(false);
            } catch (err) {
                setError('Error fetching guiders');
                setLoading(false);
            }
        };

        fetchGuiders();
    }, []);

    if (loading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>{error}</div>;
    }
    return (
        <div className="container mt-4">
            <h1 className="mb-4 text-center">Guiders List</h1>
            <div className="row">
                {guiders.map((guider) => (
                    <div key={guider._id} className="col-md-3 mb-4">
                        <div className="card h-100">
                            <img src={guider.imageUrl} alt={guider.name} className="card-img-top" style={{width: '100%', height: '200px', objectFit: 'cover'}} />
                            <div className="card-body">
                                <h5 className="card-title text-center" > <span style={{fontWeight:'bold'}}>{guider.name}</span> </h5>
                                <p className="card-text" >Email: <span style={{fontWeight:'bold'}}>{guider.email}</span></p>
                                <p className="card-text" >GSM: <span style={{fontWeight:'bold'}}>{guider.gsm}</span></p>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default GuidersList;
