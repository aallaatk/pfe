import React, { useState, useEffect } from "react";
import axios from "axios";
import DashboardSiteItem from "./DashboardSiteItem";
import { Link } from "react-router-dom";

interface SiteData {
  _id: string;
  sitename: string;
  sitelocation: string;
  description?: string;
}

const DashboardSites: React.FC = () => {
  const [sites, setSites] = useState<SiteData[]>([]);

  useEffect(() => {
    fetchSites();
  }, []);

  const fetchSites = async () => {
    try {
      const response = await axios.get<SiteData[]>("http://localhost:3000/sites");
      setSites(response.data);
    } catch (error) {
      console.error("Error fetching sites:", error);
    }
  };

  const deleteSite = async (id: string) => {
    try {
      await axios.delete(`http://localhost:3000/sites/${id}`);
      setSites(prevSites => prevSites.filter(site => site._id !== id));
    } catch (error) {
      console.error("Error deleting site:", error);
    }
  };

  const updateSite = async (updatedSite: SiteData) => {
    try {
      const response = await axios.put<SiteData>(`http://localhost:3000/sites/${updatedSite._id}`, updatedSite);
      const updatedSiteFromResponse: SiteData = response.data;
      const updatedSites = sites.map(site => (site._id === updatedSite._id ? updatedSiteFromResponse : site));
      setSites(updatedSites);
    } catch (error) {
      console.error("Error updating site:", error);
    }
  };

  return (
    <div className="site-list">
      {sites.length === 0 ? (
        <p className="text-center">
          No sites available. <Link to="/site/create">Create</Link> a site now.
        </p>
      ) : (
        sites.map(site => (
          <DashboardSiteItem
            key={site._id}
            site={site}
            deleteSite={deleteSite}
            updateSite={updateSite}
          />
        ))
      )}
    </div>
  );
};

export default DashboardSites;
