'use client';
import React, { useState } from 'react';

export default function StaffForm() {
  const [business, setBusiness] = useState({
    name: '',
    contactEmail: '',
    phoneNumber: '',
    address: '',
    website: '',
  });

  const [staff, setStaff] = useState([
    {
      userId: '',
      role: '',
      aboutMe: '',
      profileImage: '',
    },
  ]);

  const handleBusinessChange = (e: any) => {
    const { name, value } = e.target;
    setBusiness({ ...business, [name]: value });
  };

  const handleStaffChange = (index: any, e: any) => {
    const { name, value } = e.target;
    const updatedStaff = [...staff];
    updatedStaff[index] = { ...updatedStaff[index], [name]: value };
    setStaff(updatedStaff);
  };

  const addStaffMember = () => {
    setStaff([
      ...staff,
      {
        userId: '',
        role: '',
        aboutMe: '',
        profileImage: '',
      },
    ]);
  };

  const handleSubmit = (e: any) => {
    e.preventDefault();
    const formData = {
      business,
      staff,
    };
    console.log('Form Data:', formData);
    // You can now send this data to your backend API
  };
  return (
    <form>
      <div className="mb-6">
        <h2 className="mb-4 text-xl font-semibold">Staff Members</h2>
        {staff.map((member, index) => (
          <div
            key={index}
            className="mb-4 rounded-lg border border-gray-200 p-4"
          >
            <h3 className="mb-2 text-lg font-medium">
              Staff Member {index + 1}
            </h3>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  User ID
                </label>
                <input
                  type="text"
                  name="userId"
                  value={member.userId}
                  onChange={(e) => handleStaffChange(index, e)}
                  className="mt-1 block w-full rounded-md border border-gray-300 p-2"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Role
                </label>
                <input
                  type="text"
                  name="role"
                  value={member.role}
                  onChange={(e) => handleStaffChange(index, e)}
                  className="mt-1 block w-full rounded-md border border-gray-300 p-2"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  About Me
                </label>
                <textarea
                  name="aboutMe"
                  value={member.aboutMe}
                  onChange={(e) => handleStaffChange(index, e)}
                  className="mt-1 block w-full rounded-md border border-gray-300 p-2"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Profile Image URL
                </label>
                <input
                  type="url"
                  name="profileImage"
                  value={member.profileImage}
                  onChange={(e) => handleStaffChange(index, e)}
                  className="mt-1 block w-full rounded-md border border-gray-300 p-2"
                />
              </div>
            </div>
            <button
              type="button"
              onClick={addStaffMember}
              className="mt-4 rounded bg-blue-500 px-4 py-2 text-white"
            >
              Add Staff Member
            </button>
          </div>
        ))}
      </div>
      <button
        type="submit"
        onClick={handleSubmit}
        className="mt-4 rounded bg-green-500 px-4 py-2 text-white"
      >
        Submit
      </button>
    </form>
  );
}
