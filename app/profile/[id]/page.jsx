'use client';

import { useState, useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import Profile from '@components/Profile';

const UserProfile = ({ params }) => {
  const searchParams = useSearchParams();
  const username = searchParams.get('name');
  const [userPosts, setUserPosts] = useState([]);

  useEffect(() => {
    const fetchUserPosts = async () => {
      const response = await fetch(`/api/users/${params?.id}/posts`);
      const data = await response.json();
      setUserPosts(data);
    };

    if (params?.id) fetchUserPosts();
  }, [params?.id]);

  return (
    <div>
      <Profile
        name={username}
        desc={`Welcome to ${username}'s personalized profile page. Share ${username}'s exceptional prompts and inspire others with the power of your imagination`}
        posts={userPosts}
      />
    </div>
  );
};

export default UserProfile;
