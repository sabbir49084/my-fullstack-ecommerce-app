import React, { useEffect, useState } from "react";
import Swal from "sweetalert2";
import { FaFacebook, FaInstagram, FaLinkedin, FaTwitter, FaYoutube } from "react-icons/fa";
import { FiExternalLink, FiLock, FiSave, FiUnlock } from "react-icons/fi";

const socialMediaLinks = [
    { name: "Facebook", icon: <FaFacebook /> },
    { name: "Instagram", icon: <FaInstagram /> },
    { name: "Twitter", icon: <FaTwitter /> },
    { name: "LinkedIn", icon: <FaLinkedin /> },
    { name: "YouTube", icon: <FaYoutube /> },
];

const Settings = () => {
    const [generalSettings, setGeneralSettings] = useState({
        websiteName: "",
        websiteUrl: "",
        websiteLogo: "",
    });

    const [socialLinks, setSocialLinks] = useState({});

    const [securitySettings, setSecuritySettings] = useState({
        currentPassword: "",
        newPassword: "",
        confirmNewPassword: "",
    });

    const [accessControl, setAccessControl] = useState({
        adminPanelAccess: true,
        websiteAccess: true,
    });

    const [loading, setLoading] = useState(false);

    // Initial data fetch simulation
    useEffect(() => {
        // Here you would typically fetch current settings from your backend API
        // For now, we'll use dummy data
        const dummyGeneralSettings = {
            websiteName: "Afritabs Ecom",
            websiteUrl: "http://localhost:3001",
            websiteLogo: "https://via.placeholder.com/150",
        };
        const dummySocialLinks = {
            Facebook: "https://facebook.com/afritabs",
            Instagram: "https://instagram.com/afritabs",
        };
        const dummyAccessControl = {
            adminPanelAccess: true,
            websiteAccess: true,
        };
        setGeneralSettings(dummyGeneralSettings);
        setSocialLinks(dummySocialLinks);
        setAccessControl(dummyAccessControl);
    }, []);

    const handleGeneralChange = (e) => {
        setGeneralSettings({ ...generalSettings, [e.target.name]: e.target.value });
    };

    const handleSocialChange = (e) => {
        setSocialLinks({ ...socialLinks, [e.target.name]: e.target.value });
    };

    const handleSecurityChange = (e) => {
        setSecuritySettings({ ...securitySettings, [e.target.name]: e.target.value });
    };

    const handleAccessChange = (e) => {
        setAccessControl({ ...accessControl, [e.target.name]: e.target.checked });
    };

    const handleSaveGeneral = async (e) => {
        e.preventDefault();
        setLoading(true);
        // Simulate API call
        setTimeout(() => {
            Swal.fire('Saved!', 'General settings updated successfully.', 'success');
            setLoading(false);
        }, 1500);
    };

    const handleSaveSocial = async (e) => {
        e.preventDefault();
        setLoading(true);
        setTimeout(() => {
            Swal.fire('Saved!', 'Social media links updated successfully.', 'success');
            setLoading(false);
        }, 1500);
    };

    const handleSaveSecurity = async (e) => {
        e.preventDefault();
        if (securitySettings.newPassword !== securitySettings.confirmNewPassword) {
            Swal.fire('Error', 'New passwords do not match!', 'error');
            return;
        }
        setLoading(true);
        setTimeout(() => {
            Swal.fire('Password Changed!', 'Your password has been updated.', 'success');
            setLoading(false);
            setSecuritySettings({
                currentPassword: "",
                newPassword: "",
                confirmNewPassword: "",
            });
        }, 1500);
    };

    const handleSaveAccess = async (e) => {
        e.preventDefault();
        setLoading(true);
        setTimeout(() => {
            Swal.fire('Saved!', 'Access control settings updated successfully.', 'success');
            setLoading(false);
        }, 1500);
    };

    const renderSection = (title, formId, children, onSave) => (
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 mb-8 transition-colors duration-200">
            <div className="flex justify-between items-center border-b border-gray-200 dark:border-gray-700 pb-3 mb-4">
                <h2 className="text-xl font-semibold text-gray-900 dark:text-gray-100">{title}</h2>
                <button
                    onClick={onSave}
                    className="flex items-center gap-2 px-4 py-2 bg-purple-600 text-white rounded-md hover:bg-purple-700 transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
                    disabled={loading}
                >
                    <FiSave />
                    <span>{loading ? "Saving..." : "Save Changes"}</span>
                </button>
            </div>
            <form id={formId} onSubmit={onSave} className="space-y-4">
                {children}
            </form>
        </div>
    );

    return (
        <div className="p-6 bg-gray-100 dark:bg-gray-900 min-h-screen transition-colors duration-200">
            <h1 className="text-3xl font-bold mb-6 text-gray-900 dark:text-gray-100">
                Website Settings
            </h1>

            {/* General Settings Section */}
            {renderSection("General Settings", "generalForm", (
                <>
                    <div>
                        <label htmlFor="websiteName" className="block text-gray-700 dark:text-gray-300 font-medium mb-1">Website Name</label>
                        <input
                            type="text"
                            id="websiteName"
                            name="websiteName"
                            value={generalSettings.websiteName}
                            onChange={handleGeneralChange}
                            className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500 dark:bg-gray-700 dark:text-gray-200"
                            placeholder="Enter website name"
                        />
                    </div>
                    <div>
                        <label htmlFor="websiteUrl" className="block text-gray-700 dark:text-gray-300 font-medium mb-1">Website URL</label>
                        <input
                            type="url"
                            id="websiteUrl"
                            name="websiteUrl"
                            value={generalSettings.websiteUrl}
                            onChange={handleGeneralChange}
                            className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500 dark:bg-gray-700 dark:text-gray-200"
                            placeholder="https://yourwebsite.com"
                        />
                    </div>
                    <div>
                        <label htmlFor="websiteLogo" className="block text-gray-700 dark:text-gray-300 font-medium mb-1">Website Logo URL</label>
                        <input
                            type="url"
                            id="websiteLogo"
                            name="websiteLogo"
                            value={generalSettings.websiteLogo}
                            onChange={handleGeneralChange}
                            className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500 dark:bg-gray-700 dark:text-gray-200"
                            placeholder="https://yourwebsite.com/logo.png"
                        />
                        {generalSettings.websiteLogo && (
                            <div className="mt-4 p-2 border border-gray-300 rounded-md">
                                <img src={generalSettings.websiteLogo} alt="Website Logo Preview" className="h-16" />
                            </div>
                        )}
                    </div>
                </>
            ), handleSaveGeneral)}

            {/* Social Media Links Section */}
            {renderSection("Social Media Links", "socialForm", (
                <>
                    {socialMediaLinks.map((link) => (
                        <div key={link.name}>
                            <label htmlFor={link.name} className="flex items-center gap-2 text-gray-700 dark:text-gray-300 font-medium mb-1">
                                {link.icon} {link.name} URL
                            </label>
                            <input
                                type="url"
                                id={link.name}
                                name={link.name}
                                value={socialLinks[link.name] || ""}
                                onChange={handleSocialChange}
                                className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500 dark:bg-gray-700 dark:text-gray-200"
                                placeholder={`https://${link.name.toLowerCase()}.com/yourprofile`}
                            />
                        </div>
                    ))}
                </>
            ), handleSaveSocial)}

            {/* Security Settings Section */}
            {renderSection("Security Settings", "securityForm", (
                <>
                    <div>
                        <label htmlFor="currentPassword" className="block text-gray-700 dark:text-gray-300 font-medium mb-1">Current Password</label>
                        <input
                            type="password"
                            id="currentPassword"
                            name="currentPassword"
                            value={securitySettings.currentPassword}
                            onChange={handleSecurityChange}
                            className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500 dark:bg-gray-700 dark:text-gray-200"
                        />
                    </div>
                    <div>
                        <label htmlFor="newPassword" className="block text-gray-700 dark:text-gray-300 font-medium mb-1">New Password</label>
                        <input
                            type="password"
                            id="newPassword"
                            name="newPassword"
                            value={securitySettings.newPassword}
                            onChange={handleSecurityChange}
                            className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500 dark:bg-gray-700 dark:text-gray-200"
                        />
                    </div>
                    <div>
                        <label htmlFor="confirmNewPassword" className="block text-gray-700 dark:text-gray-300 font-medium mb-1">Confirm New Password</label>
                        <input
                            type="password"
                            id="confirmNewPassword"
                            name="confirmNewPassword"
                            value={securitySettings.confirmNewPassword}
                            onChange={handleSecurityChange}
                            className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500 dark:bg-gray-700 dark:text-gray-200"
                        />
                    </div>
                </>
            ), handleSaveSecurity)}

            {/* Access & Control Section */}
            {renderSection("Access & Control", "accessForm", (
                <div className="space-y-4">
                    <div className="flex items-center gap-4">
                        <label htmlFor="adminPanelAccess" className="text-gray-700 dark:text-gray-300 font-medium flex-1">
                            Admin Panel Access
                        </label>
                        <div className="relative inline-block w-10 mr-2 align-middle select-none transition duration-200 ease-in">
                            <input
                                type="checkbox"
                                name="adminPanelAccess"
                                id="adminPanelAccess"
                                checked={accessControl.adminPanelAccess}
                                onChange={handleAccessChange}
                                className="toggle-checkbox absolute block w-6 h-6 rounded-full bg-white border-4 appearance-none cursor-pointer"
                            />
                            <label htmlFor="adminPanelAccess" className="toggle-label block overflow-hidden h-6 rounded-full bg-gray-300 cursor-pointer"></label>
                        </div>
                        <span className={`text-sm font-semibold ${accessControl.adminPanelAccess ? "text-green-600" : "text-red-600"}`}>
                            {accessControl.adminPanelAccess ? "Enabled" : "Disabled"}
                        </span>
                    </div>
                    <div className="flex items-center gap-4">
                        <label htmlFor="websiteAccess" className="text-gray-700 dark:text-gray-300 font-medium flex-1">
                            Website Access
                        </label>
                        <div className="relative inline-block w-10 mr-2 align-middle select-none transition duration-200 ease-in">
                            <input
                                type="checkbox"
                                name="websiteAccess"
                                id="websiteAccess"
                                checked={accessControl.websiteAccess}
                                onChange={handleAccessChange}
                                className="toggle-checkbox absolute block w-6 h-6 rounded-full bg-white border-4 appearance-none cursor-pointer"
                            />
                            <label htmlFor="websiteAccess" className="toggle-label block overflow-hidden h-6 rounded-full bg-gray-300 cursor-pointer"></label>
                        </div>
                        <span className={`text-sm font-semibold ${accessControl.websiteAccess ? "text-green-600" : "text-red-600"}`}>
                            {accessControl.websiteAccess ? "Enabled" : "Disabled"}
                        </span>
                    </div>
                </div>
            ), handleSaveAccess)}

            {/* Tailwind Toggle CSS - Add this to your main CSS file */}
            <style jsx>{`
                .toggle-checkbox:checked {
                    right: 0;
                    border-color: #68d391;
                }
                .toggle-checkbox:checked + .toggle-label {
                    background-color: #68d391;
                }
                .toggle-label {
                    transition: background-color 0.2s ease-in-out;
                }
            `}</style>
        </div>
    );
};

export default Settings;